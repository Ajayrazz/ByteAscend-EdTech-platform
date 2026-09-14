"use client";

import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Play, TerminalSquare, Settings2 } from 'lucide-react';

interface CodeEditorProps {
  onRunCode: (code: string, language: string) => void;
  isRunning: boolean;
  output: string;
}

const LANGUAGES = [
  { id: 'python', name: 'Python', defaultCode: 'def solve():\n    # Write your code here\n    print("Hello from Python!")\n\nsolve()' },
  { id: 'javascript', name: 'JavaScript', defaultCode: 'function solve() {\n    // Write your code here\n    console.log("Hello from JavaScript!");\n}\n\nsolve();' },
  { id: 'java', name: 'Java', defaultCode: 'public class Main {\n    public static void main(String[] args) {\n        // Write your code here\n        System.out.println("Hello from Java!");\n    }\n}' },
  { id: 'cpp', name: 'C++', defaultCode: '#include <iostream>\n\nint main() {\n    // Write your code here\n    std::cout << "Hello from C++!" << std::endl;\n    return 0;\n}' },
  { id: 'c', name: 'C', defaultCode: '#include <stdio.h>\n\nint main() {\n    // Write your code here\n    printf("Hello from C!\\n");\n    return 0;\n}' },
  { id: 'go', name: 'Go', defaultCode: 'package main\n\nimport "fmt"\n\nfunc main() {\n    // Write your code here\n    fmt.Println("Hello from Go!")\n}' },
  { id: 'ruby', name: 'Ruby', defaultCode: 'def solve\n  # Write your code here\n  puts "Hello from Ruby!"\nend\n\nsolve' },
  { id: 'rust', name: 'Rust', defaultCode: 'fn main() {\n    // Write your code here\n    println!("Hello from Rust!");\n}' },
  { id: 'php', name: 'PHP', defaultCode: '<?php\n// Write your code here\necho "Hello from PHP!\\n";\n?>' },
  { id: 'shell', name: 'Bash', defaultCode: '#!/bin/bash\n# Write your code here\necho "Hello from Bash!"' }
];

export default function CodeEditor({ onRunCode, isRunning, output }: CodeEditorProps) {
  const [language, setLanguage] = useState(LANGUAGES[0].id);
  const [code, setCode] = useState(LANGUAGES[0].defaultCode);
  const [activeTab, setActiveTab] = useState('code');

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    const defaultCode = LANGUAGES.find(l => l.id === newLang)?.defaultCode || "";
    setCode(defaultCode);
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] border border-[#2d2d2d] rounded-lg overflow-hidden shadow-lg">
      {/* Editor Header / Tabs */}
      <div className="flex justify-between items-end px-2 pt-2 bg-[#1a1a1a] border-b border-[#2d2d2d]">
        <div className="flex space-x-1">
          <button 
            onClick={() => setActiveTab('code')}
            className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-t-md transition-colors ${activeTab === 'code' ? 'bg-[#1e1e1e] text-white' : 'text-gray-400 hover:bg-[#252525]'}`}
          >
            <TerminalSquare size={14} /> <span>Code</span>
          </button>
        </div>
        
        <div className="flex items-center space-x-4 mb-2 pr-2">
          <div className="flex items-center space-x-2 bg-[#2d2d2d] px-2 py-1 rounded text-gray-400 text-xs">
            <Settings2 size={12} />
            <select 
              value={language}
              onChange={handleLanguageChange}
              className="bg-transparent border-none outline-none text-white font-mono cursor-pointer"
            >
              {LANGUAGES.map(lang => (
                <option key={lang.id} value={lang.id} className="bg-[#1e1e1e]">
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => onRunCode(code, language)}
            disabled={isRunning}
            className="flex items-center space-x-1 px-3 py-1 bg-[#2cbb5d] hover:bg-[#249b4d] text-white text-xs font-semibold rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play size={12} fill="currentColor" />
            <span>{isRunning ? "Running..." : "Run"}</span>
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 min-h-[400px]">
        <Editor
          height="100%"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={(val) => setCode(val || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            fontFamily: "JetBrains Mono, Menlo, Monaco, Consolas, monospace",
            renderLineHighlight: 'all',
            cursorBlinking: 'smooth',
          }}
        />
      </div>

      {/* Output Console */}
      <div className="h-1/3 min-h-[180px] flex flex-col bg-[#1a1a1a] border-t border-[#2d2d2d]">
        <div className="flex items-center px-4 py-2 bg-[#1a1a1a] border-b border-[#2d2d2d]">
          <span className="text-gray-300 text-xs font-medium uppercase tracking-wider">Test Results</span>
        </div>
        <div className="flex-1 p-4 overflow-y-auto font-mono text-sm bg-[#1e1e1e]">
          {output ? (
            <pre className="text-gray-300 whitespace-pre-wrap">{output}</pre>
          ) : (
            <div className="text-gray-500 italic flex items-center justify-center h-full">
              Run your code to see output here...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

