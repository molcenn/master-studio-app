'use client'

const projects = [
  { name: 'SAHA EXPO', color: 'bg-tech-cyan', active: true },
  { name: 'Master Stüdyo UI', color: 'bg-tech-blue', active: false },
  { name: 'Müşteri Lansmanı', color: 'bg-tech-purple', active: false },
  { name: 'Deneyim Merkezi', color: 'bg-tech-green', active: false },
]

const files = [
  { name: 'Tüm Dosyalar', icon: 'folder' },
  { name: 'Görseller', icon: 'image' },
  { name: 'Videolar', icon: 'video' },
  { name: 'Dokümanlar', icon: 'doc' },
]

export default function Sidebar() {
  return (
    <aside className="w-52 glass border-r border-white/10 flex flex-col">
      {/* Projects */}
      <div className="py-4">
        <div className="px-4 mb-2 text-[10px] font-semibold uppercase tracking-wider text-white/40">
          Projeler
        </div>
        <div className="space-y-0.5">
          {projects.map((project) => (
            <div
              key={project.name}
              className={`mx-2 px-3 py-2 rounded-lg flex items-center gap-2.5 cursor-pointer transition-all ${
                project.active 
                  ? 'bg-white/10 border border-tech-cyan/20' 
                  : 'hover:bg-white/5'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${project.color}`} />
              <span className="text-xs font-medium truncate">{project.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Files */}
      <div className="py-4 border-t border-white/5">
        <div className="px-4 mb-2 text-[10px] font-semibold uppercase tracking-wider text-white/40">
          Dosyalar
        </div>
        <div className="space-y-0.5">
          {files.map((file) => (
            <div
              key={file.name}
              className="mx-2 px-3 py-2 rounded-lg flex items-center gap-2.5 cursor-pointer hover:bg-white/5 transition-all"
            >
              <FileIcon type={file.icon} />
              <span className="text-xs text-white/70">{file.name}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}

function FileIcon({ type }: { type: string }) {
  const icons: Record<string, JSX.Element> = {
    folder: (
      <svg className="w-4 h-4 text-white/50" fill="currentColor" viewBox="0 0 24 24">
        <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
      </svg>
    ),
    image: (
      <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5"/>
        <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="1.5"/>
        <path d="M21 15l-5-5L5 21" strokeWidth="1.5"/>
      </svg>
    ),
    video: (
      <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <polygon points="23 7 16 12 23 17 23 7" strokeWidth="1.5"/>
        <rect x="1" y="5" width="15" height="14" rx="2" strokeWidth="1.5"/>
      </svg>
    ),
    doc: (
      <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" strokeWidth="1.5"/>
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeWidth="1.5"/>
      </svg>
    ),
  }
  return icons[type] || icons.doc
}
