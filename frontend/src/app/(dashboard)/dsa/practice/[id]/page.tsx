"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, CheckCircle, Clock, Tag } from 'lucide-react';
import CodeEditor from '@/components/dsa/CodeEditor';
import { dsaApi } from '@/lib/api';
import axios from 'axios';

export default function PracticePage({ params }: { params: { id: string } }) {
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [problem, setProblem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await dsaApi.get(`/dsa/sheet/problems/${params.id}`);
        setProblem(res.data);
      } catch (err) {
        console.error("Failed to load problem", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [params.id]);

  // Derived properties from fetched problem
  const problemTitle = problem ? `${problem.orderNum || ''}. ${problem.title}` : "Loading..."; 
  const difficulty = problem ? problem.difficulty : "Medium";
  const tags = problem && problem.topics ? problem.topics.split(',') : ["Array", "Hash Table"];


  const initialCode = `def solve():
    # Write your code here
    print('Hello World from ByteAscend!')

solve()`;

  const handleRunCode = async (code: string, language: string) => {
    setIsRunning(true);
    setOutput("Executing...");
    
    try {
      const res = await axios.post('http://localhost:8084/api/execute', {
        code,
        language
      });
      setOutput(res.data.output || "No output returned.");
    } catch (err: any) {
      setOutput(err.response?.data?.error || err.message || "Execution failed.");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-[#0f0f11] text-gray-300">
      {/* Top Navbar */}
      <div className="h-12 flex items-center px-4 bg-[#1a1a1a] border-b border-[#2d2d2d] shrink-0">
        <Link href="/dsa" className="text-gray-400 hover:text-white flex items-center space-x-2 transition-colors">
          <ArrowLeft size={16} /> <span className="text-sm font-medium">Back to Sheet</span>
        </Link>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden p-2 space-x-2">
        {/* Left Pane: Description & Tabs */}
        <div className="flex flex-col w-[45%] bg-[#1a1a1a] rounded-lg border border-[#2d2d2d] overflow-hidden shadow-lg">
          {/* Tabs */}
          <div className="flex space-x-1 px-2 pt-2 bg-[#1a1a1a] border-b border-[#2d2d2d]">
            <button 
              onClick={() => setActiveTab('description')}
              className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-t-md transition-colors ${activeTab === 'description' ? 'bg-[#2d2d2d] text-white' : 'text-gray-400 hover:bg-[#252525]'}`}
            >
              <FileText size={14} /> <span>Description</span>
            </button>
            <button 
              onClick={() => setActiveTab('solution')}
              className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-t-md transition-colors ${activeTab === 'solution' ? 'bg-[#2d2d2d] text-white' : 'text-gray-400 hover:bg-[#252525]'}`}
            >
              <CheckCircle size={14} /> <span>Solutions</span>
            </button>
          </div>

          {/* Description Content */}
          <div className="flex-1 overflow-y-auto p-6 bg-[#1a1a1a]">
            {activeTab === 'description' && (
              <>
                <h1 className="text-2xl font-bold text-white mb-2">{problemTitle}</h1>
                <div className="flex items-center space-x-4 mb-6 text-xs">
                  <span className="text-green-400 bg-green-400/10 px-2 py-1 rounded font-medium">{difficulty}</span>
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Clock size={12} /> <span>Expected Time: O(N)</span>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none text-gray-300">
                  <p>
                    Please solve the problem: <strong>{problem?.title || 'Loading...'}</strong>.
                  </p>
                  <p>
                    This is a placeholder description. In a production environment, this text would be fetched from the database along with the problem metadata. You can access the original problem on the platform using the external link.
                  </p>

                  <div className="my-6">
                    <h3 className="text-white font-semibold mb-2">Example 1:</h3>
                    <div className="bg-[#2d2d2d] p-4 rounded-md border border-[#3d3d3d] font-mono text-sm leading-relaxed">
                      <span className="text-gray-400">Input:</span> nums = [3,2,3]<br />
                      <span className="text-gray-400">Output:</span> 3
                    </div>
                  </div>

                  <div className="my-6">
                    <h3 className="text-white font-semibold mb-2">Example 2:</h3>
                    <div className="bg-[#2d2d2d] p-4 rounded-md border border-[#3d3d3d] font-mono text-sm leading-relaxed">
                      <span className="text-gray-400">Input:</span> nums = [2,2,1,1,1,2,2]<br />
                      <span className="text-gray-400">Output:</span> 2
                    </div>
                  </div>

                  <div className="my-6 border-t border-[#2d2d2d] pt-4">
                    <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                      <Tag size={14} /> <span>Related Topics</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {tags.map(tag => (
                        <span key={tag} className="text-xs text-gray-300 bg-[#2d2d2d] px-2 py-1 rounded-full border border-[#3d3d3d]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {activeTab === 'solution' && (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
                <CheckCircle size={48} className="text-gray-600" />
                <p>Solutions will be available after you attempt the problem.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Pane: Code Editor */}
        <div className="w-[55%] h-full">
          <CodeEditor 
            initialCode={initialCode}
            onRunCode={handleRunCode}
            isRunning={isRunning}
            output={output}
          />
        </div>
      </div>
    </div>
  );
}
