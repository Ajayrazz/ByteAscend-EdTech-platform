package com.byteascend.executionservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.*;
import java.nio.file.*;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.Comparator;

@RestController
@RequestMapping("/api/execute")
@CrossOrigin(origins = "http://localhost:3000") // Enable CORS for development
public class ExecutionController {

    static class ExecutionRequest {
        public String code;
        public String language;
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> executeCode(@RequestBody ExecutionRequest req) {
        Map<String, String> response = new HashMap<>();
        
        try {
            Path tempDir = Files.createTempDirectory("exec");
            Path sourceFile = null;
            String[] compileCmd = null;
            String[] runCmd = null;
            String executable = tempDir.resolve("out").toAbsolutePath().toString();

            String lang = req.language != null ? req.language.toLowerCase() : "";
            
            switch (lang) {
                case "python":
                    sourceFile = tempDir.resolve("code.py");
                    runCmd = new String[]{"python3", sourceFile.toAbsolutePath().toString()};
                    break;
                case "javascript":
                    sourceFile = tempDir.resolve("code.js");
                    runCmd = new String[]{"node", sourceFile.toAbsolutePath().toString()};
                    break;
                case "java":
                    sourceFile = tempDir.resolve("Main.java");
                    compileCmd = new String[]{"javac", sourceFile.toAbsolutePath().toString()};
                    runCmd = new String[]{"java", "-cp", tempDir.toAbsolutePath().toString(), "Main"};
                    break;
                case "cpp":
                    sourceFile = tempDir.resolve("code.cpp");
                    compileCmd = new String[]{"g++", sourceFile.toAbsolutePath().toString(), "-o", executable};
                    runCmd = new String[]{executable};
                    break;
                case "c":
                    sourceFile = tempDir.resolve("code.c");
                    compileCmd = new String[]{"gcc", sourceFile.toAbsolutePath().toString(), "-o", executable};
                    runCmd = new String[]{executable};
                    break;
                case "go":
                    sourceFile = tempDir.resolve("code.go");
                    runCmd = new String[]{"go", "run", sourceFile.toAbsolutePath().toString()};
                    break;
                case "ruby":
                    sourceFile = tempDir.resolve("code.rb");
                    runCmd = new String[]{"ruby", sourceFile.toAbsolutePath().toString()};
                    break;
                case "rust":
                    sourceFile = tempDir.resolve("code.rs");
                    compileCmd = new String[]{"rustc", sourceFile.toAbsolutePath().toString(), "-o", executable};
                    runCmd = new String[]{executable};
                    break;
                case "php":
                    sourceFile = tempDir.resolve("code.php");
                    runCmd = new String[]{"php", sourceFile.toAbsolutePath().toString()};
                    break;
                case "shell":
                    sourceFile = tempDir.resolve("code.sh");
                    runCmd = new String[]{"bash", sourceFile.toAbsolutePath().toString()};
                    break;
                default:
                    response.put("error", "Unsupported language: " + lang);
                    Files.deleteIfExists(tempDir);
                    return ResponseEntity.badRequest().body(response);
            }

            Files.writeString(sourceFile, req.code);

            // Compilation step
            if (compileCmd != null) {
                String compileResult = runProcess(compileCmd, tempDir);
                if (compileResult.startsWith("ERROR:")) {
                    response.put("error", "Compilation Error:\n" + compileResult.substring(6));
                    cleanup(tempDir);
                    return ResponseEntity.ok(response); // Return 200 with error so frontend can show it nicely
                }
            }

            // Execution step
            String runResult = runProcess(runCmd, tempDir);
            if (runResult.startsWith("ERROR:")) {
                response.put("output", runResult.substring(6));
            } else if (runResult.startsWith("TIMEOUT")) {
                response.put("error", "Execution timed out (5s limit).");
            } else {
                response.put("output", runResult);
            }

            cleanup(tempDir);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("error", "Execution failed: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    private String runProcess(String[] cmd, Path workDir) {
        try {
            ProcessBuilder pb = new ProcessBuilder(cmd);
            pb.directory(workDir.toFile());
            pb.redirectErrorStream(true);
            Process process = pb.start();

            StringBuilder output = new StringBuilder();
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    output.append(line).append("\n");
                }
            }

            boolean finished = process.waitFor(5, TimeUnit.SECONDS);
            if (!finished) {
                process.destroyForcibly();
                return "TIMEOUT";
            }
            
            if (process.exitValue() != 0) {
                return "ERROR:" + output.toString();
            }

            return output.toString();
        } catch (Exception e) {
            return "ERROR:" + e.getMessage();
        }
    }

    private void cleanup(Path dir) {
        try {
            Files.walk(dir)
                 .sorted(Comparator.reverseOrder())
                 .map(Path::toFile)
                 .forEach(File::delete);
        } catch (Exception ignored) {
        }
    }
}
