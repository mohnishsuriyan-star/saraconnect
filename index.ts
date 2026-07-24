import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, ExternalLink, Sparkles, RefreshCw, Copy, Check, Volume2, Mic, Trash2, HelpCircle } from 'lucide-react';
import { ChatMessage } from '../types';

interface AIAssistantProps {
  onNavigateToEvent?: (eventId: string) => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ onNavigateToEvent }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'bot',
      text: "Hello Freshers! 👋 I am **SaraBot**, your official Google Gemini powered AI Assistant for Saranathan College of Engineering.\n\nHow can I guide you today? Ask me anything about campus locations, clubs, faculty contacts, semester timetables, bus routes, or freshers event registrations!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        'Where is the CSE Department located?',
        'Tell me about Rotaract & SaraCode Clubs',
        'Who is the HoD of First Year Freshers?',
        'What are the Central Library timings & facilities?',
        'How do I apply for College Bus Pass?',
      ]
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const prompt = (textToSend || inputPrompt).trim();
    if (!prompt || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          history: messages.slice(-6)
        })
      });

      const data = await res.json();
      
      const botMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'bot',
        text: data.text || "I'm happy to help with all Saranathan College queries! Could you please clarify your request?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: [
          'What events are happening this month?',
          'Tell me about the Placement record',
          'Where is the Canteen & Food Court?'
        ]
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        id: `msg-err-${Date.now()}`,
        sender: 'bot',
        text: "I encountered a minor network glitch. Saranathan College of Engineering in Trichy offers CSE, ECE, EEE, IT, AI&DS, MECH, ICE, MBA, and MCA. Please try asking again!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: `msg-welcome-reset-${Date.now()}`,
        sender: 'bot',
        text: "Chat cleared! What else would you like to know about Saranathan College of Engineering?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: [
          'Timetable for CSE Sem 1',
          'Faculty directory for ECE',
          'How to register for AARAMBH 2026?'
        ]
      }
    ]);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Top Title Banner & Gemini External Link */}
      <div className="glass-card rounded-3xl p-6 mb-6 border border-emerald-500/20 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-emerald-900/30 via-slate-900/40 to-teal-900/30">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 via-green-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/30">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-emerald-400">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">
                SaraBot AI Assistant
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full">
                Google Gemini
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-0.5">
              Ask about campus blocks, clubs, faculty, timetable, events, hostels, & bus routes.
            </p>
          </div>
        </div>

        {/* Direct Link to Gemini Official Website */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <a
            href="https://gemini.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-slate-900 dark:text-white bg-slate-200/80 dark:bg-slate-800/80 hover:bg-emerald-500 hover:text-white border border-slate-300 dark:border-slate-700 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>Open Google Gemini Web</span>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-500 group-hover:text-white transition-colors" />
          </a>
          
          <button
            onClick={clearChat}
            className="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors border border-transparent hover:border-rose-500/20 cursor-pointer"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Chat Interface Container */}
      <div className="glass-card rounded-3xl border border-emerald-500/20 shadow-2xl overflow-hidden flex flex-col h-[580px]">
        
        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {/* Bot Avatar */}
              {msg.sender === 'bot' && (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
              )}

              {/* Message Bubble */}
              <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 shadow-sm text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-tr-none'
                  : 'bg-white/90 dark:bg-slate-900/90 border border-slate-200/70 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none'
              }`}>
                
                {/* Text Content */}
                <div className="whitespace-pre-line font-sans">
                  {msg.text.split('\n').map((line, idx) => (
                    <p key={idx} className={idx > 0 ? 'mt-2' : ''}>
                      {line}
                    </p>
                  ))}
                </div>

                {/* Footer Time & Copy Action */}
                <div className={`mt-2 pt-2 flex items-center justify-between text-[10px] ${
                  msg.sender === 'user' ? 'text-emerald-100 border-t border-emerald-500/30' : 'text-slate-400 border-t border-slate-100 dark:border-slate-800'
                }`}>
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'bot' && (
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="hover:text-emerald-500 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-500" />
                          <span className="text-emerald-500">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Quick Prompt Suggestions Pills */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-200/50 dark:border-slate-800/80 flex flex-wrap gap-1.5">
                    {msg.suggestions.map((sug, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(sug)}
                        className="px-2.5 py-1 text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 rounded-lg border border-emerald-500/20 transition-all text-left cursor-pointer flex items-center gap-1"
                      >
                        <Sparkles className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span>{sug}</span>
                      </button>
                    ))}
                  </div>
                )}

              </div>

              {/* User Avatar */}
              {msg.sender === 'user' && (
                <div className="w-9 h-9 rounded-xl bg-slate-800 dark:bg-slate-700 flex items-center justify-center text-white shadow-md shrink-0">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator Animation */}
          {isLoading && (
            <div className="flex gap-3.5 justify-start">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md shrink-0">
                <Bot className="w-5 h-5 animate-spin" />
              </div>
              <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200/70 dark:border-slate-800 rounded-2xl p-4 shadow-sm text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-medium">SaraBot is searching Saranathan College details...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar Footer */}
        <div className="p-4 bg-slate-100/80 dark:bg-slate-950/80 border-t border-slate-200/80 dark:border-slate-800 backdrop-blur-md">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder="Ask SaraBot about Saranathan College (e.g., Timetable, Faculty room, Bus routes)..."
                className="w-full pl-4 pr-10 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                disabled={isLoading}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !inputPrompt.trim()}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700 text-white font-bold text-sm shadow-md shadow-emerald-600/30 hover:shadow-emerald-600/50 disabled:opacity-50 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Ask</span>
            </button>
          </form>

          <p className="text-[10px] text-center text-slate-400 dark:text-slate-500 mt-2">
            SaraBot uses Google Gemini API to provide real-time guidance for Saranathan College of Engineering freshers.
          </p>
        </div>

      </div>

    </div>
  );
};
