'use client'

import { useState } from 'react'

const tabs = ['Preview', 'Code', 'Sell', 'Tasks', 'Process', 'Console', 'Assets']

export default function Preview() {
  const [activeTab, setActiveTab] = useState('Preview')
  
  return (
    <main className="flex-1 flex flex-col p-5 gap-4 overflow-hidden">
      {/* Tab Bar */}
      <div className="flex items-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-medium rounded-xl transition-all ${
              activeTab === tab
                ? 'bg-gradient-to-r from-tech-cyan to-tech-blue text-white'
                : 'glass text-white/60 hover:text-white/90'
            }`}
          >
            {tab}
          </button>
        ))}
        
        <div className="ml-auto flex items-center gap-3">
          <span className="text-xs text-white/40 glass px-3 py-1.5 rounded-lg">100%</span>
          <button className="w-8 h-8 glass rounded-lg flex items-center justify-center text-white/60 hover:text-white/90">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Preview Area */}
      <div className="flex-1 glass rounded-2xl flex flex-col items-center justify-center">
        <svg className="w-16 h-16 text-tech-cyan/60 mb-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        
        <h3 className="text-lg font-semibold mb-2">Çalışma Alanı</h3>
        <p className="text-sm text-white/50 mb-6 text-center max-w-xs">
          Dosya yükle veya Betsy'den oluşturmasını iste
        </p>
        
        <div className="flex gap-4">
          <button className="px-6 py-2.5 bg-gradient-to-r from-tech-cyan to-tech-blue text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity">
            Dosya Yükle
          </button>
          <button className="px-6 py-2.5 glass text-tech-cyan text-sm font-semibold rounded-xl border border-tech-cyan/30 hover:bg-tech-cyan/10 transition-colors">
            Betsy'ye Sor
          </button>
        </div>
      </div>
    </main>
  )
}
