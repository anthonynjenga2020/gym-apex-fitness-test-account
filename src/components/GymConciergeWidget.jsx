import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function GymConciergeWidget({ config, onOpenQuiz }) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('actions') // 'actions' | 'chat'
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      text: `Habari! 👋 I am your 24/7 AI Receptionist for ${config?.gymName || 'Prestige Fitness'}. Ask me anything about our membership plans, classes, pricing, or booking a free workout session!`
    }
  ])
  const [inputMsg, setInputMsg] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [sessionId] = useState(() => `web-visitor-${Math.floor(1000 + Math.random() * 9000)}`)
  const messagesEndRef = useRef(null)
  const navigate = useNavigate()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (activeTab === 'chat') {
      scrollToBottom()
    }
  }, [chatMessages, activeTab])

  const handleAction = (action) => {
    setIsOpen(false)
    if (action === 'quiz' && onOpenQuiz) {
      onOpenQuiz()
    } else if (action === 'classes') {
      navigate('/classes')
    } else if (action === 'memberships') {
      navigate('/memberships')
    } else if (action === 'shop') {
      navigate('/shop')
    } else if (action === 'trainers') {
      navigate('/trainers')
    } else if (action === 'whatsapp') {
      const waMsg = encodeURIComponent(config?.whatsappMessage || 'Hi! I would like to access the member portal and check training options.')
      window.open(`https://wa.me/${config?.whatsappNumber}?text=${waMsg}`, '_blank')
    }
  }

  const handleDirectWhatsApp = () => {
    const waMsg = encodeURIComponent(config?.whatsappMessage || 'Hi! I would like to access the member portal and check training options.')
    window.open(`https://wa.me/${config?.whatsappNumber}?text=${waMsg}`, '_blank')
  }

  const handleSendMessage = async (textToSend) => {
    const msg = textToSend || inputMsg
    if (!msg.trim() || isSending) return

    const userMsg = { role: 'user', text: msg.trim() }
    setChatMessages(prev => [...prev, userMsg])
    setInputMsg('')
    setIsSending(true)

    try {
      // Determine API URL (Local Next.js dashboard backend is at localhost:3000)
      const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3000/api/ai-agents/chat'
        : '/api/ai-agents/chat'

      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          niche: 'gym',
          message: userMsg.text,
          phone: sessionId,
          channel: 'widget',
        })
      })

      const data = await res.json()
      if (data && data.response) {
        setChatMessages(prev => [...prev, { role: 'assistant', text: data.response }])
      } else {
        setChatMessages(prev => [
          ...prev, 
          { 
            role: 'assistant', 
            text: `Our monthly memberships start from Ksh 3,999/mo including gym floor, classes, and locker access. Would you like to book a free 7-day trial?` 
          }
        ])
      }
    } catch (err) {
      // Friendly fallback if backend is offline
      setChatMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: `Thanks for asking! ${config?.gymName || 'Prestige Fitness'} is open Mon–Sat (5:30 AM – 9:00 PM) and Sundays (8:00 AM – 5:00 PM). Feel free to click 'Direct WhatsApp' below to speak with our manager!`
        }
      ])
    } finally {
      setIsSending(false)
    }
  }

  const conciergeName = config?.gymName 
    ? `${config.gymName.split(' ')[0]} Concierge`
    : 'Gym Concierge'

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Direct WhatsApp Client Portal Floating Button */}
      <motion.a
        href={`https://wa.me/${config?.whatsappNumber}?text=${encodeURIComponent(config?.whatsappMessage || 'Hi! I would like to access the member portal.')}`}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-[#25D366] text-white shadow-2xl px-4 py-3.5 rounded-full flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider border border-emerald-400/30 hover:bg-[#20ba5a] transition-all"
        title="Connect directly to member portal via WhatsApp"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        <span>WhatsApp</span>
      </motion.a>

      {/* Concierge Toggle Button */}
      <div className="relative">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="shadow-2xl px-5 py-3.5 rounded-full flex items-center gap-3 text-xs uppercase tracking-widest font-black border border-white/20 text-white transition-all"
          style={{ backgroundColor: 'var(--surface, #141414)', borderColor: 'var(--border, #222222)' }}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span>{isOpen ? 'Close Concierge' : '💪 Concierge'}</span>
        </motion.button>

        {/* Slide-Up Concierge Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 right-0 w-80 sm:w-[400px] bg-[#141414] border border-[#222222] shadow-2xl overflow-hidden mb-2 rounded-2xl max-h-[85vh] flex flex-col"
              style={{ backgroundColor: 'var(--surface, #141414)', borderColor: 'var(--border, #222222)' }}
            >
              {/* Header */}
              <div 
                className="p-4 border-b flex items-center justify-between"
                style={{ backgroundColor: 'var(--bg, #0A0A0A)', borderColor: 'var(--border, #222222)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src="/gym (1).jpg"
                      alt="Gym Concierge"
                      className="w-11 h-11 object-cover rounded-full border border-white/10"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&q=80'
                      }}
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#0A0A0A] rounded-full" />
                  </div>
                  <div>
                    <h4 className="font-headline text-sm text-white font-bold leading-tight">
                      {conciergeName}
                    </h4>
                    <p className="text-[11px] text-gray-400 font-medium">
                      Online · 24/7 AI Assistant
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-colors text-xs"
                >
                  ✕
                </button>
              </div>

              {/* Mode Switcher Tabs */}
              <div className="grid grid-cols-2 p-2 bg-black/50 border-b border-white/5 gap-1">
                <button
                  onClick={() => setActiveTab('actions')}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'actions'
                      ? 'bg-white/10 text-white shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  ⚡ Quick Navigator
                </button>
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'chat'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span>🤖 AI Receptionist</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </button>
              </div>

              {/* TAB 1: Quick Actions List */}
              {activeTab === 'actions' && (
                <div className="p-4 space-y-2.5 text-xs font-medium overflow-y-auto max-h-[380px]">
                  <p className="text-gray-400 uppercase tracking-widest text-[10px] mb-2 font-bold">
                    How may we assist your training?
                  </p>

                  {/* AI Chat Teaser Button */}
                  <button
                    onClick={() => setActiveTab('chat')}
                    className="w-full text-left p-3 bg-gradient-to-r from-emerald-500/15 to-primary/15 hover:from-emerald-500/25 hover:to-primary/25 border border-emerald-500/30 text-white transition-all flex items-center justify-between font-bold rounded-xl group shadow-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">🤖</span>
                      <div>
                        <span className="block text-emerald-400 text-xs">Chat with 24/7 AI Receptionist</span>
                        <span className="block text-[10px] text-gray-400 font-normal">Ask anything about prices, workouts & free trial</span>
                      </div>
                    </div>
                    <span className="text-emerald-400 group-hover:translate-x-1 transition-transform">→</span>
                  </button>

                  {/* WhatsApp Action */}
                  <button
                    onClick={handleDirectWhatsApp}
                    className="w-full text-left p-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 transition-all flex items-center justify-between font-bold rounded-xl group"
                  >
                    <div className="flex items-center gap-2.5">
                      <svg className="w-4 h-4 fill-current text-[#25D366]" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      <span>Direct WhatsApp Client Portal</span>
                    </div>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>

                  {/* Quiz Action */}
                  <button
                    onClick={() => handleAction('quiz')}
                    className="w-full text-left p-3 bg-black/40 hover:bg-white/5 border border-white/10 hover:border-primary transition-all flex items-center justify-between rounded-xl group"
                  >
                    <span className="text-white group-hover:text-primary transition-colors flex items-center gap-2">
                      <span>✨</span>
                      <span>Find My Ideal Workout Plan</span>
                    </span>
                    <span className="text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all">→</span>
                  </button>

                  {/* Classes Timetable Action */}
                  <button
                    onClick={() => handleAction('classes')}
                    className="w-full text-left p-3 bg-black/40 hover:bg-white/5 border border-white/10 hover:border-primary transition-all flex items-center justify-between rounded-xl group"
                  >
                    <span className="text-white group-hover:text-primary transition-colors flex items-center gap-2">
                      <span>📅</span>
                      <span>Check Class Schedule & Slots</span>
                    </span>
                    <span className="text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all">→</span>
                  </button>

                  {/* Memberships Action */}
                  <button
                    onClick={() => handleAction('memberships')}
                    className="w-full text-left p-3 bg-black/40 hover:bg-white/5 border border-white/10 hover:border-primary transition-all flex items-center justify-between rounded-xl group"
                  >
                    <span className="text-white group-hover:text-primary transition-colors flex items-center gap-2">
                      <span>💳</span>
                      <span>View Membership & Pricing Plans</span>
                    </span>
                    <span className="text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all">→</span>
                  </button>

                  {/* Merch / Shop Action */}
                  <button
                    onClick={() => handleAction('shop')}
                    className="w-full text-left p-3 bg-black/40 hover:bg-white/5 border border-white/10 hover:border-primary transition-all flex items-center justify-between rounded-xl group"
                  >
                    <span className="text-white group-hover:text-primary transition-colors flex items-center gap-2">
                      <span>🛍️</span>
                      <span>Gym Gear & Supplements Boutique</span>
                    </span>
                    <span className="text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all">→</span>
                  </button>
                </div>
              )}

              {/* TAB 2: Live AI Receptionist Chat */}
              {activeTab === 'chat' && (
                <div className="flex flex-col h-[380px] bg-black/40">
                  {/* Messages Scroll Area */}
                  <div className="flex-1 p-4 space-y-3 overflow-y-auto text-xs">
                    {chatMessages.map((m, idx) => (
                      <div
                        key={idx}
                        className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[82%] p-3 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                            m.role === 'user'
                              ? 'bg-emerald-500 text-black font-bold rounded-br-none shadow-md'
                              : 'bg-white/10 text-white rounded-bl-none border border-white/10'
                          }`}
                        >
                          {m.text}
                        </div>
                      </div>
                    ))}
                    {isSending && (
                      <div className="flex justify-start">
                        <div className="bg-white/10 text-emerald-400 p-3 rounded-2xl rounded-bl-none border border-white/10 flex items-center gap-2 text-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          <span>Kai is typing...</span>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Suggested Question Chips */}
                  <div className="px-3 py-1.5 bg-black/60 border-t border-white/5 flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
                    <button
                      onClick={() => handleSendMessage('How much is the membership?')}
                      className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 whitespace-nowrap border border-white/10"
                    >
                      💰 Prices
                    </button>
                    <button
                      onClick={() => handleSendMessage('Can I book a free trial?')}
                      className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 whitespace-nowrap border border-white/10"
                    >
                      ⚡ Free Trial
                    </button>
                    <button
                      onClick={() => handleSendMessage('What classes are available?')}
                      className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 whitespace-nowrap border border-white/10"
                    >
                      📅 Classes
                    </button>
                  </div>

                  {/* Input form */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSendMessage()
                    }}
                    className="p-3 border-t border-white/10 flex items-center gap-2 bg-[#0A0A0A]"
                  >
                    <input
                      type="text"
                      value={inputMsg}
                      onChange={(e) => setInputMsg(e.target.value)}
                      placeholder="Ask our AI receptionist..."
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                      disabled={isSending}
                    />
                    <button
                      type="submit"
                      disabled={isSending || !inputMsg.trim()}
                      className="w-9 h-9 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold flex items-center justify-center transition-all disabled:opacity-40 shrink-0"
                    >
                      ➤
                    </button>
                  </form>
                </div>
              )}

              {/* Footer note */}
              <div 
                className="px-4 py-2.5 border-t text-[10px] text-gray-400 text-center font-medium"
                style={{ backgroundColor: 'var(--bg, #0A0A0A)', borderColor: 'var(--border, #222222)' }}
              >
                {config?.gymName || 'Prestige Fitness'} Concierge · Instant AI Portal Sync
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
