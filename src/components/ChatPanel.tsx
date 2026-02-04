'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'assistant' | 'user'
  text: string
  time: string
  loading?: boolean
}

const initialMessages: Message[] = [
  { role: 'assistant', text: 'Merhaba! Master Stüdyo hazır. Benimle chat edebilirsin! 🐄', time: formatTime(new Date()) },
]

function formatTime(date: Date) {
  return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
}

export default function ChatPanel() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    
    const userMessage = input.trim()
    setInput('')
    setIsLoading(true)
    
    // Kullanıcı mesajını ekle
    const userMsg: Message = {
      role: 'user',
      text: userMessage,
      time: formatTime(new Date())
    }
    setMessages(prev => [...prev, userMsg])
    
    // Loading mesajı ekle
    const loadingMsg: Message = {
      role: 'assistant', 
      text: 'Yazıyor...',
      time: formatTime(new Date()),
      loading: true
    }
    setMessages(prev => [...prev, loadingMsg])
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'API hatası')
      }
      
      // Loading mesajını kaldır ve gerçek cevapla değiştir
      setMessages(prev => prev.slice(0, -1))
      
      const assistantMsg: Message = {
        role: 'assistant',
        text: data.response || 'Mesaj alındı!',
        time: formatTime(new Date())
      }
      setMessages(prev => [...prev, assistantMsg])
      
    } catch (error: any) {
      console.error('Chat error:', error)
      
      // Loading mesajını kaldır ve hata mesajıyla değiştir
      setMessages(prev => prev.slice(0, -1))
      
      const errorMsg: Message = {
        role: 'assistant',
        text: `Hata: ${error.message}`,
        time: formatTime(new Date())
      }
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <aside className="w-80 glass border-l border-white/10 flex flex-col">
      {/* Header */}
      <div className="h-12 flex items-center justify-between px-4 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-tech-purple to-pink-500 flex items-center justify-center text-xs font-bold">
            B
          </div>
          <span className="font-semibold text-sm">Betsy</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-white/50 glass px-2 py-1 rounded">Sonnet</span>
          <div className="w-2 h-2 rounded-full bg-tech-green" />
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[85%] p-3 rounded-2xl text-sm ${
              msg.role === 'assistant'
                ? 'bg-white/10 rounded-bl-sm'
                : 'bg-tech-blue ml-auto rounded-br-sm'
            } ${msg.loading ? 'animate-pulse' : ''}`}
          >
            <p>{msg.text}</p>
            <span className="text-[10px] text-white/40 mt-1 block">{msg.time}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <div className="p-3 border-t border-white/10">
        <form onSubmit={handleSubmit}>
          <div className="glass rounded-xl overflow-hidden">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
              placeholder="Betsy'ye mesaj yaz..."
              className="w-full p-3 bg-transparent text-sm resize-none outline-none min-h-[48px] max-h-[120px]"
              rows={1}
              disabled={isLoading}
            />
            <div className="flex items-center justify-between px-3 pb-2 gap-2">
              <div className="flex gap-1 flex-shrink-0">
                <ToolButton icon="attach" title="Dosya Ekle" />
                <ToolButton icon="image" title="Görsel" />
                <ToolButton icon="mic" title="Ses" />
              </div>
              <button 
                type="submit"
                disabled={!input.trim() || isLoading}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-tech-cyan to-tech-blue text-xs font-bold rounded-lg flex-shrink-0 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Gönderiliyor...' : 'Gönder'}
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </aside>
  )
}

function ToolButton({ icon, title }: { icon: string; title: string }) {
  const icons: Record<string, JSX.Element> = {
    attach: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
      </svg>
    ),
    image: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={1.5}/>
        <circle cx="8.5" cy="8.5" r="1.5" strokeWidth={1.5}/>
        <path d="M21 15l-5-5L5 21" strokeWidth={1.5}/>
      </svg>
    ),
    mic: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3zM19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" />
      </svg>
    ),
  }
  
  return (
    <button 
      title={title}
      className="w-8 h-8 min-w-[32px] flex items-center justify-center text-white/50 hover:text-white/90 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
    >
      {icons[icon]}
    </button>
  )
}
