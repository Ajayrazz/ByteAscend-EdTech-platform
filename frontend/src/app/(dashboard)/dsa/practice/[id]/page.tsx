"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, List, Settings, Maximize2, Play, CloudUpload, ThumbsUp, ThumbsDown, MessageSquare, Star, FileText, CheckCircle, Clock, Tag } from 'lucide-react';
import CodeEditor from '@/components/dsa/CodeEditor';
import { dsaApi } from '@/lib/api';
import axios from 'axios';

export default function PracticePage({ params }: { params: { id: string } }) {
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [problem, setProblem] = useState<any>(null);
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await dsaApi.get(`/dsa/sheet/problems/${params.id}`);
        setProblem(res.data);
        
        // Fetch rich details from LeetCode GraphQL
        const detailsRes = await dsaApi.get(`/dsa/sheet/problems/${params.id}/details`);
        setDetails(detailsRes.data);
      } catch (err) {
        console.error("Failed to load problem", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [params.id]);

  const problemTitle = problem ? `${problem.orderNum || ''}. ${problem.title}` : "Loading..."; 
  const difficulty = problem ? problem.difficulty : "Medium";
  const tags = problem && problem.topics ? problem.topics.split(',') : [];

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

  const getDifficultyColor = (diff: string) => {
    switch (diff.toLowerCase()) {
      case 'easy': return 'text-teal-400 bg-teal-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'hard': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-[#0f0f11] text-gray-300">
      {/* Top Navbar */}
      <div className="h-12 flex items-center justify-between px-4 bg-[#1a1a1a] border-b border-[#2d2d2d] shrink-0">
        <div className="flex items-center space-x-4">
          <Link href="/dsa" className="text-gray-400 hover:text-gray-200 flex items-center transition-colors hover:bg-[#2d2d2d] p-1.5 rounded">
            <List size={18} />
          </Link>
          <div className="flex items-center space-x-1">
            <button className="p-1.5 text-gray-500 hover:text-gray-300 hover:bg-[#2d2d2d] rounded transition"><ChevronLeft size={18} /></button>
            <button className="p-1.5 text-gray-500 hover:text-gray-300 hover:bg-[#2d2d2d] rounded transition"><ChevronRight size={18} /></button>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="p-1.5 text-gray-400 hover:bg-[#2d2d2d] rounded"><Settings size={18} /></button>
          <button className="p-1.5 text-gray-400 hover:bg-[#2d2d2d] rounded"><Maximize2 size={18} /></button>
          <button 
            onClick={() => handleRunCode(document.querySelector('.monaco-editor')?.textContent || "", "python")} // Simplified
            disabled={isRunning}
            className="px-4 py-1.5 text-sm font-medium bg-[#2d2d2d] hover:bg-[#3d3d3d] text-gray-200 rounded transition flex items-center space-x-1"
          >
            <Play size={14} className="text-green-500" />
            <span>Run</span>
          </button>
          <button className="px-4 py-1.5 text-sm font-medium bg-green-600 hover:bg-green-500 text-white rounded transition flex items-center space-x-1 shadow-sm">
            <CloudUpload size={14} />
            <span>Submit</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden p-2 space-x-2">
        {/* Left Pane: Description & Tabs */}
        <div className="flex flex-col w-1/2 bg-[#1a1a1a] rounded-lg border border-[#2d2d2d] overflow-hidden shadow-sm">
          {/* Tabs */}
          <div className="flex px-1 pt-1 bg-[#1a1a1a] border-b border-[#2d2d2d] overflow-x-auto no-scrollbar">
            {['description', 'editorial', 'solutions', 'submissions'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center space-x-2 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 capitalize ${
                  activeTab === tab 
                  ? 'border-blue-500 text-white bg-[#1a1a1a]' 
                  : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              >
                {tab === 'description' && <FileText size={16} className={activeTab === tab ? "text-blue-500" : ""} />}
                {tab === 'editorial' && <CheckCircle size={16} />}
                {tab === 'solutions' && <MessageSquare size={16} />}
                {tab === 'submissions' && <Clock size={16} />}
                <span>{tab}</span>
              </button>
            ))}
          </div>

          {/* Description Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'description' && (
              <>
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-2xl font-bold text-white">{problemTitle}</h1>
                  
                  <div className="flex space-x-2">
                    {problem?.practiceUrl && problem.practiceUrl !== '#' && (
                      <a 
                        href={problem.practiceUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-xs font-semibold text-yellow-500 hover:bg-[#2d2d2d] px-2 py-1 rounded transition"
                      >
                        <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png" className="w-4 h-4 filter invert opacity-80" alt="LeetCode" />
                        <span>LeetCode</span>
                      </a>
                    )}
                    <a 
                      href={`https://www.geeksforgeeks.org/problems/${
                        (problem?.practiceUrl && problem.practiceUrl !== '#') 
                          ? (problem.practiceUrl.split('/problems/')[1]?.split('/')[0] || problemTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))
                          : problemTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                      }/1`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-xs font-semibold text-green-500 hover:bg-[#2d2d2d] px-2 py-1 rounded transition"
                    >
                      <span className="font-bold">GFG</span>
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 mb-6 text-xs font-medium">
                  <span className={`px-2.5 py-1 rounded-full ${getDifficultyColor(difficulty)}`}>
                    {difficulty}
                  </span>
                  <button className="flex items-center space-x-1 text-gray-400 hover:bg-[#2d2d2d] px-2 py-1 rounded">
                    <Tag size={12} /> <span>Topics</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-400 hover:bg-[#2d2d2d] px-2 py-1 rounded">
                    <Star size={12} /> <span>Companies</span>
                  </button>
                </div>

                <div className="prose prose-sm prose-invert max-w-none text-gray-300 leading-relaxed">
                  {details?.content ? (
                    <div dangerouslySetInnerHTML={{ __html: details.content }} className="leetcode-content" />
                  ) : loading ? (
                    <p className="text-gray-500 animate-pulse">Loading description from LeetCode...</p>
                  ) : (
                    <div className="text-red-400">
                      Failed to fetch problem description. Ensure the problem URL is a valid LeetCode problem.
                    </div>
                  )}
                </div>
              </>
            )}
            
            {activeTab !== 'description' && (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
                <p>This tab is currently under construction.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Pane: Code Editor */}
        <div className="w-1/2 h-full">
          <CodeEditor 
            onRunCode={handleRunCode}
            isRunning={isRunning}
            output={output}
          />
        </div>
      </div>
      
      {/* Inject CSS to style LeetCode's raw HTML tags (like <pre> for examples) for Dark Theme */}
      <style dangerouslySetInnerHTML={{__html: `
        .leetcode-content pre {
          background-color: #2d2d2d;
          padding: 1rem;
          border-radius: 0.5rem;
          border: 1px solid #3d3d3d;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          white-space: pre-wrap;
          font-size: 0.875rem;
          color: #e5e7eb;
          margin: 1rem 0;
        }
        .leetcode-content code {
          background-color: #2d2d2d;
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          color: #e5e7eb;
        }
        .leetcode-content ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }
      `}} />
    </div>
  );
}
