import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function WhatsAppButton({ config }) {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')

  const openWhatsApp = (text) => {
    const url = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
    setIsOpen(false)
  }

  const handleSend = (e) => {
    e.preventDefault()
    if (message.trim()) {
      openWhatsApp(message)
    }
  }

  const quickOptions = [
    "Membership Pricing",
    "Book a Free Trial",
    "Class Schedule",
    "Location & Hours"
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-[350px] bg-[#111B21] rounded-2xl shadow-2xl overflow-hidden border border-gray-800"
          >
            {/* Header */}
            <div className="bg-[#00A884] p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xl">
                  {config.gymName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">{config.gymName}</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#25D366]"></span>
                    <span className="text-white/80 text-xs">Online now</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-4 bg-[#0B141A] space-y-4">
              <div className="bg-[#202C33] p-4 rounded-xl rounded-tl-sm text-gray-200 text-sm shadow-sm relative">
                <p className="font-bold text-white mb-1">Hi there! Welcome to {config.gymName}. How can I help you today?</p>
                <p className="text-gray-400 text-xs">Choose an option below or type your message.</p>
              </div>

              <div className="space-y-2">
                {quickOptions.map((opt, i) => (
                  <button 
                    key={i} 
                    onClick={() => openWhatsApp(opt)}
                    className="w-full text-left p-3 rounded-full border border-[#00A884] text-[#00A884] hover:bg-[#00A884] hover:text-[#0B141A] transition-colors text-sm font-bold"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Input */}
            <div className="p-3 bg-[#202C33] border-t border-gray-800">
              <form onSubmit={handleSend} className="flex gap-2 items-center">
                <input 
                  type="text" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..." 
                  className="flex-1 bg-[#2A3942] text-white placeholder-gray-400 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#00A884]"
                />
                <button type="submit" className="p-2.5 bg-[#00A884] rounded-full text-[#0B141A] hover:opacity-90">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                </button>
              </form>
              <div className="mt-2 text-center flex items-center justify-center gap-1.5 opacity-50">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                <span className="text-[10px] text-white uppercase tracking-widest">Powered by WhatsApp</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_4px_30px_rgba(37,211,102,0.5)] hover:shadow-[0_6px_40px_rgba(37,211,102,0.7)] transition-all duration-300 hover:scale-110 group"
        aria-label="Toggle WhatsApp Chat"
      >
        <span className="hidden sm:block absolute right-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white text-gray-900 text-xs font-bold px-3 py-2 rounded-sm shadow-xl uppercase tracking-widest whitespace-nowrap">
          {isOpen ? 'Close Chat' : 'Chat with us'}
        </span>
        <div className="absolute w-16 h-16 rounded-full bg-[#25D366] opacity-30 animate-ping" />
        {isOpen ? (
          <svg className="w-8 h-8 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        ) : (
          <svg className="w-8 h-8 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
        )}
      </button>
    </div>
  )
}
