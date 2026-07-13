import { useState, useEffect } from 'react';
import { getMessages, markRead, getAdminStats, clearToken } from '../api/client';
import BlogManager from './BlogManager';

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  read: number;
  created_at: string;
}

function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-[#1a1a1a] rounded ${className}`} />;
}

export default function AdminDashboard() {
  const [tab, setTab] = useState<'messages' | 'blog'>('messages');
  const [messages, setMessages] = useState<Message[]>([]);
  const [stats, setStats] = useState({ totalMessages: 0, unreadMessages: 0 });
  const [selectedMsg, setSelectedMsg] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [msgs, st] = await Promise.all([getMessages(), getAdminStats()]);
      setMessages(msgs);
      setStats(st);
    } catch {
      setError('Failed to load messages.');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id: number) => {
    try {
      await markRead(id);
      setMessages(prev => prev.map(m => m.id === id ? { ...m, read: 1 } : m));
      setStats(prev => ({ ...prev, unreadMessages: Math.max(0, prev.unreadMessages - 1) }));
    } catch { /* silent */ }
  };

  return (
    <div className="min-h-screen bg-black text-gray-300 font-mono flex flex-col">
      {/* Header */}
      <header className="border-b border-[#1a1a1a] px-4 py-3 flex items-center justify-between sticky top-0 bg-black/95 backdrop-blur z-20">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-green-500 text-sm uppercase tracking-wider leading-tight">Admin</h1>
            <p className="text-[10px] text-gray-600 leading-tight">
              {stats.unreadMessages} unread · {stats.totalMessages} total
            </p>
          </div>
          <nav className="flex gap-1 ml-4 border-l border-[#1a1a1a] pl-4" aria-label="Admin section">
            <button onClick={() => { setTab('messages'); setSelectedMsg(null); }}
              className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded transition-colors ${tab === 'messages' ? 'text-green-500 bg-green-500/10' : 'text-gray-600 hover:text-gray-400'}`}>
              Messages
            </button>
            <button onClick={() => setTab('blog')}
              className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded transition-colors ${tab === 'blog' ? 'text-green-500 bg-green-500/10' : 'text-gray-600 hover:text-gray-400'}`}>
              Blog
            </button>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" className="text-[11px] text-gray-600 hover:text-green-500 transition-colors">Portfolio</a>
          <button onClick={() => { clearToken(); window.location.hash = '#/admin'; }}
            className="text-[11px] text-gray-600 hover:text-red-400 transition-colors">Logout</button>
        </div>
      </header>

      {tab === 'blog' ? (
        <BlogManager />
      ) : (
        <>
          {error && (
            <div className="mx-4 mt-4 border-l-[3px] border-l-red-500 pl-3 py-2" role="alert">
              <p className="text-xs text-red-400">{error}</p>
              <button onClick={loadData} className="text-xs text-green-500 hover:underline mt-1">Retry</button>
            </div>
          )}

          <div className="flex flex-1 overflow-hidden">
            {/* Message List */}
            <div className={`${sidebarOpen || !selectedMsg ? 'block' : 'hidden md:block'} w-full md:w-80 lg:w-96 border-r border-[#1a1a1a] overflow-y-auto flex-shrink-0 bg-black/50`}>
              {loading ? (
                <div className="p-4 space-y-3">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Skeleton className="w-2 h-2 rounded-full" />
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-2 w-10 ml-auto" />
                      </div>
                      <Skeleton className="h-3 w-48 ml-4" />
                    </div>
                  ))}
                </div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-6">
                  <svg className="w-8 h-8 text-gray-800 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="text-sm text-gray-700 mb-1">No messages yet</p>
                  <p className="text-[10px] text-gray-800">Contact form submissions will appear here.</p>
                </div>
              ) : (
                messages.map(msg => (
                  <button key={msg.id} onClick={() => { setSelectedMsg(msg); if (!msg.read) handleMarkRead(msg.id); setSidebarOpen(false); }}
                    className={`w-full text-left px-4 py-3 border-b border-[#1a1a1a] hover:bg-[#0c0c0c] transition-all duration-150 cursor-pointer ${
                      selectedMsg?.id === msg.id ? 'bg-[#0c0c0c] border-l-2 border-l-green-500' : 'border-l-2 border-l-transparent'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${msg.read ? 'bg-gray-800' : 'bg-green-500 shadow-[0_0_6px_rgba(0,255,0,0.4)]'}`} aria-label={msg.read ? 'Read' : 'Unread'} />
                      <span className="text-sm text-white truncate flex-1 font-medium">{msg.name}</span>
                      <span className="text-[10px] text-gray-700 flex-shrink-0">{new Date(msg.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs text-gray-600 truncate pl-4">{msg.message}</p>
                  </button>
                ))
              )}
            </div>

            {/* Message Detail */}
            <div className={`${selectedMsg ? 'block' : 'hidden md:flex'} flex-1 overflow-y-auto p-6 items-center justify-center`}>
              {selectedMsg ? (
                <div className="max-w-2xl w-full">
                  <button onClick={() => { setSelectedMsg(null); setSidebarOpen(true); }}
                    className="md:hidden text-xs text-gray-600 hover:text-green-500 transition-colors mb-4 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    Back to messages
                  </button>
                  <div className="mb-6">
                    <h2 className="text-white text-lg leading-tight mb-1">{selectedMsg.name}</h2>
                    <a href={`mailto:${selectedMsg.email}`} className="text-xs text-green-500/70 hover:text-green-500 transition-colors">{selectedMsg.email}</a>
                    <p className="text-[10px] text-gray-700 mt-1.5">{new Date(selectedMsg.created_at).toLocaleString()}</p>
                  </div>
                  <div className="border-t border-[#1a1a1a] pt-4">
                    <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-wrap">{selectedMsg.message}</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center">
                  <svg className="w-10 h-10 text-gray-800 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <p className="text-sm text-gray-700">Select a message</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
