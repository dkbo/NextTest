// components/CopilotDrawer.tsx
'use client'

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'

export default function CopilotDrawer() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Floating button */}
      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 z-50"
        aria-label="Open Copilot Chat"
        onClick={() => setOpen(true)}
      >
        <MessageCircle size={24} />
      </button>

      {/* Overlay */}
      {open && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setOpen(false)} />}

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[90vw] max-w-[420px]  z-50 shadow-xl transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <iframe
          src="https://copilotstudio.microsoft.com/environments/Default-c0b8e2ad-56b1-4066-bb61-6e83109289fa/bots/crfb5_BlBhhzHK4yl6hge2Ek52J/webchat?__version__=2"
          width="100%"
          height="100%"
          className="border-none"
          allow="microphone; camera"
          title="Copilot Chat"
        />
      </div>
    </>
  )
}
