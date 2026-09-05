import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { themes, applyTheme } from '../themes/themes.js'

export default function ThemeSwitcher({ currentVariant = 'V1', onThemeChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState(currentVariant)

  const handleSelect = (key) => {
    setSelectedVariant(key)
    applyTheme(key, themes[key].css['--primary'])
    if (onThemeChange) onThemeChange(key)
  }

  return (
    <div className="fixed bottom-20 lg:bottom-6 left-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-3 p-4 rounded-xl border border-white/15 bg-black/95 backdrop-blur-xl shadow-2xl w-64 text-white"
          >
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xs">🎨</span>
                <span className="text-xs font-black uppercase tracking-widest text-white">Visual Variants</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white text-xs p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-[11px] text-gray-400 mb-3 leading-relaxed">
              Switch themes live on demo calls to match any gym's brand aesthetic.
            </p>

            <div className="space-y-1.5">
              {Object.entries(themes).map(([key, theme]) => {
                const isSelected = selectedVariant === key
                return (
                  <button
                    key={key}
                    onClick={() => handleSelect(key)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-white/15 text-white border border-white/30'
                        : 'text-gray-300 hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                        style={{ backgroundColor: theme.css['--primary'] }}
                      />
                      <span>{theme.name}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono">{key}</span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/20 bg-black/80 backdrop-blur-md text-white text-xs font-bold shadow-xl hover:border-white/40 transition-all active:scale-95 group"
        title="Live Style & Theme Switcher"
      >
        <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--primary)' }} />
        <span className="text-[11px] uppercase tracking-wider text-gray-300 group-hover:text-white">Theme Demo</span>
        <span className="text-xs text-gray-400">⚡</span>
      </button>
    </div>
  )
}
