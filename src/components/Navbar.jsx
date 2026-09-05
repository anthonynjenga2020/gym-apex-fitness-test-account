import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import MagneticButton from './MagneticButton.jsx'

export default function Navbar({ config, onOpenQuiz }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [location.pathname])

  const navLinks = [
    { label: 'Classes', href: '/classes' },
    { label: 'Trainers', href: '/trainers' },
    { label: 'Facilities', href: '/facilities' },
    { label: 'Memberships', href: '/memberships' },
    { label: 'Shop', href: '/shop' },
    { label: 'FAQ', href: '/faq' },
  ]

  const isExternal = (href) => href.startsWith('/#')

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'navbar-scrolled' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          {config.logoUrl ? (
            <img src={config.logoUrl} alt={config.gymName} className="h-10 w-auto" />
          ) : (
            <>
              <div
                className="w-9 h-9 rounded-sm flex items-center justify-center font-headline font-black text-white text-base shadow-md"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                {config.gymName.charAt(0)}
              </div>
              <span className="font-headline font-black text-white text-xl tracking-wider uppercase">
                {config.gymName}
              </span>
            </>
          )}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: 'easeOut' }}
            >
              {isExternal(link.href) ? (
                <a
                  href={link.href}
                  className="text-gray-300 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors duration-200"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  to={link.href}
                  className={`text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${
                    location.pathname === link.href ? 'text-primary font-black' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTAs */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={onOpenQuiz}
            className="text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white px-3 py-2 transition-colors flex items-center gap-1.5"
          >
            <span>🎯</span> Workout Quiz
          </button>

          <MagneticButton>
            <a
              href="/#free-trial"
              className="btn-primary px-6 py-3 rounded-sm text-xs font-black uppercase tracking-wider shadow-lg"
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault()
                  document.getElementById('free-trial')?.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              Free Trial Pass
            </a>
          </MagneticButton>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-[500px] border-b border-border' : 'max-h-0'}`}
        style={{ backgroundColor: 'rgba(10,10,10,0.98)', backdropFilter: 'blur(20px)' }}
      >
        <div className="px-6 pb-8 pt-4 flex flex-col gap-4">
          {navLinks.map((link) =>
            isExternal(link.href) ? (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-gray-300 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors py-1"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-gray-300 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors py-1"
              >
                {link.label}
              </Link>
            )
          )}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMenuOpen(false)
                if (onOpenQuiz) onOpenQuiz()
              }}
              className="py-3 px-4 rounded-sm text-xs font-bold uppercase tracking-wider bg-surface border border-border text-center text-white"
            >
              🎯 Take Workout Match Quiz
            </button>
            <a
              href="/#free-trial"
              onClick={() => setMenuOpen(false)}
              className="btn-primary py-3.5 px-4 rounded-sm text-xs font-black uppercase tracking-wider text-center"
            >
              Claim 7-Day Free Trial
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
