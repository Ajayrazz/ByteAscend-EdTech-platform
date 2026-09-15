"use client";

import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Code2, Terminal, CheckCircle2, RotateCcw } from 'lucide-react';

interface CodeEditorProps {
  onRunCode: (code: string, language: string) => void;
  isRunning: boolean;
  output: string;
}

const LANGUAGES = [
  { id: 'python', name: 'Python', defaultCode: 'class Solution(object):\n    def solve(self):\n        """\n        :rtype: None\n        """\n        print("Hello from Python!")\n\nSolution().solve()' },
  { id: 'javascript', name: 'JavaScript', defaultCode: '/**\n * @return {void}\n */\nvar solve = function() {\n    console.log("Hello from JavaScript!");\n};\n\nsolve();' },
  { id: 'java', name: 'Java', defaultCode: 'class Solution {\n    public static void main(String[] args) {\n        System.out.println("Hello from Java!");\n    }\n}' },
  { id: 'cpp', name: 'C++', defaultCode: '#include <iostream>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        cout << "Hello from C++!" << endl;\n    }\n};\n\nint main() {\n    Solution().solve();\n    return 0;\n}' },
  { id: 'c', name: 'C', defaultCode: '#include <stdio.h>\n\nvoid solve() {\n    printf("Hello from C!\\n");\n}\n\nint main() {\n    solve();\n    return 0;\n}' },
  { id: 'go', name: 'Go', defaultCode: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello from Go!")\n}' },
  { id: 'ruby', name: 'Ruby', defaultCode: 'def solve\n  puts "Hello from Ruby!"\nend\n\nsolve' },
  { id: 'rust', name: 'Rust', defaultCode: 'impl Solution {\n    pub fn solve() {\n        println!("Hello from Rust!");\n    }\n}\n\nfn main() {\n    Solution::solve();\n}' },
  { id: 'php', name: 'PHP', defaultCode: 'class Solution {\n    function solve() {\n        echo "Hello from PHP!\\n";\n    }\n}\n\n$sol = new Solution();\n$sol->solve();' },
  { id: 'shell', name: 'Bash', defaultCode: '#!/bin/bash\n\n# Read from stdin\necho "Hello from Bash!"' }
];

export default function CodeEditor({ onRunCode, isRunning, output }: CodeEditorProps) {
  const [language, setLanguage] = useState(LANGUAGES[0].id);
  const [code, setCode] = useState(LANGUAGES[0].defaultCode);
  const [activeTab, setActiveTab] = useState('testResult');

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    const defaultCode = LANGUAGES.find(l => l.id === newLang)?.defaultCode || "";
    setCode(defaultCode);
  };

  return (
    <div className="flex flex-col h-full space-y-2">
      
      {/* Editor Section */}
      <div className="flex-1 flex flex-col bg-[#1a1a1a] border border-[#2d2d2d] rounded-lg overflow-hidden shadow-sm">
        {/* Editor Header */}
        <div className="flex justify-between items-center px-2 pt-1 bg-[#1a1a1a] border-b border-[#2d2d2d]">
          <div className="flex items-center space-x-1 text-gray-400 font-medium text-sm px-2 py-1.5 border-b-2 border-transparent">
            <Code2 size={16} className="text-green-500" />
            <span>Code</span>
          </div>
          
          <div className="flex items-center space-x-2 pb-1 pr-2">
            <select 
              value={language}
              onChange={handleLanguageChange}
              className="bg-[#2d2d2d] border border-[#3d3d3d] rounded px-2 py-1 text-xs text-gray-300 outline-none hover:bg-[#3d3d3d] transition cursor-pointer"
            >
              {LANGUAGES.map(lang => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>
            <button className="p-1 hover:bg-[#2d2d2d] rounded text-gray-500 hover:text-gray-300 transition" title="Reset Code">
              <RotateCcw size={14} />
            </button>
          </div>
        </div>

        {/* Monaco Editor */}
        <div className="flex-1 min-h-[300px]">
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
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              renderLineHighlight: 'all',
              cursorBlinking: 'smooth',
            }}
          />
        </div>
      </div>

      {/* Output Console Section */}
      <div className="h-1/3 min-h-[220px] flex flex-col bg-[#1a1a1a] border border-[#2d2d2d] rounded-lg overflow-hidden shadow-sm">
        <div className="flex items-center px-1 pt-1 bg-[#1a1a1a] border-b border-[#2d2d2d]">
          <button 
            onClick={() => setActiveTab('testcase')}
            className={`flex items-center space-x-1.5 px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'testcase' 
              ? 'border-blue-500 text-white bg-[#1a1a1a]' 
              : 'border-transparent text-gray-500 hover:text-gray-300'
            }`}
          >
            <CheckCircle2 size={14} className={activeTab === 'testcase' ? "text-green-500" : ""} />
            <span>Testcase</span>
          </button>
          <button 
            onClick={() => setActiveTab('testResult')}
            className={`flex items-center space-x-1.5 px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'testResult' 
              ? 'border-blue-500 text-white bg-[#1a1a1a]' 
              : 'border-transparent text-gray-500 hover:text-gray-300'
            }`}
          >
            <Terminal size={14} className={activeTab === 'testResult' ? "text-white" : ""} />
            <span>Test Result</span>
          </button>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto bg-[#1a1a1a]">
          {activeTab === 'testResult' ? (
            output ? (
              <div>
                <h3 className="text-gray-400 text-xs font-semibold mb-2">Output</h3>
                <pre className="text-gray-300 font-mono text-sm bg-[#0f0f11] border border-[#2d2d2d] rounded-lg p-4 whitespace-pre-wrap">
                  {output}
                </pre>
              </div>
            ) : (
              <div className="text-gray-500 italic flex items-center justify-center h-full text-sm">
                You must run your code first
              </div>
            )
          ) : (
             <div className="text-gray-500 text-sm">
                Custom testcases can be provided here...
             </div>
          )}
        </div>
      </div>

    </div>
  );
}
