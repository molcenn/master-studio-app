'use client'

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Preview from '@/components/Preview'
import ChatPanel from '@/components/ChatPanel'

export default function Home() {
  return (
    <main className="h-screen flex flex-col relative">
      {/* Background */}
      <div className="tech-bg" />
      <div className="grid-pattern" />
      
      {/* App */}
      <div className="relative z-10 h-full flex flex-col">
        <Header />
        
        <div className="flex-1 flex overflow-hidden">
          <Sidebar />
          <Preview />
          <ChatPanel />
        </div>
      </div>
    </main>
  )
}
