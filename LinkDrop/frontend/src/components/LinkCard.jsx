import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export default function LinkCard({ link, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: link.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 1,
  }

  return (
    <div ref={setNodeRef} style={style}
      className="bg-white border border-violet-100 rounded-2xl px-4 py-3.5 flex items-center gap-3 hover:border-violet-200 hover:shadow-sm transition-all">
      <button {...attributes} {...listeners}
        className="cursor-grab active:cursor-grabbing text-violet-200 hover:text-violet-400 transition select-none p-1">
        <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
          <circle cx="5" cy="4" r="1.5"/><circle cx="11" cy="4" r="1.5"/>
          <circle cx="5" cy="8" r="1.5"/><circle cx="11" cy="8" r="1.5"/>
          <circle cx="5" cy="12" r="1.5"/><circle cx="11" cy="12" r="1.5"/>
        </svg>
      </button>

      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm text-violet-950 truncate">{link.title}</p>
        <p className="text-xs text-violet-300 truncate mt-0.5">{link.url}</p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs text-violet-300 bg-violet-50 px-2.5 py-1 rounded-full">
          {link.clicks} clic{link.clicks !== 1 ? 's' : ''}
        </span>
        <button onClick={() => onDelete(link.id)}
          className="text-violet-200 hover:text-red-400 transition w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 3l8 8M11 3l-8 8"/>
          </svg>
        </button>
      </div>
    </div>
  )
}