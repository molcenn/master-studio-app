'use client'

export default function Header() {
  return (
    <header className="h-12 flex items-center justify-between px-4 glass border-b border-white/10">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-tech-cyan to-tech-purple flex items-center justify-center text-xs font-bold">
          MS
        </div>
        <span className="font-semibold text-sm">Master Stüdyo</span>
      </div>
      
      {/* Project Selector */}
      <div className="flex items-center gap-2 px-3 py-1.5 glass rounded-full">
        <div className="w-2 h-2 rounded-full bg-tech-cyan" />
        <span className="text-xs font-medium">SAHA EXPO</span>
      </div>
      
      {/* User */}
      <div className="flex items-center gap-3">
        <button className="w-8 h-8 glass rounded-lg flex items-center justify-center text-white/60 hover:text-white/90">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-tech-green to-tech-cyan" />
      </div>
    </header>
  )
}
