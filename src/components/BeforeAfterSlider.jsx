import { useState, useRef, useCallback } from 'react'

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  title = '',
  stats = ''
}) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percent)
  }, [])

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX)
  }

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleMove(e.clientX)
    }
  }

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-white/10 select-none group bg-surface">
      <div
        ref={containerRef}
        className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden cursor-ew-resize"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* After Image (Background) */}
        <img
          src={afterImage}
          alt="After Transformation"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        />

        {/* Before Image (Clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={beforeImage}
            alt="Before Transformation"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          />
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-1 pointer-events-none z-20"
          style={{
            left: `${sliderPosition}%`,
            backgroundColor: 'var(--primary)',
            boxShadow: '0 0 15px rgba(0,0,0,0.8), 0 0 8px var(--primary)'
          }}
        >
          {/* Handle */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shadow-2xl font-black text-xs border-2"
            style={{ borderColor: 'var(--primary)' }}
          >
            ↔
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-sm text-[11px] font-black uppercase tracking-widest bg-black/80 backdrop-blur-sm text-white border border-white/10">
          {beforeLabel}
        </div>
        <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-sm text-[11px] font-black uppercase tracking-widest text-white border border-white/10"
          style={{ backgroundColor: 'var(--primary)' }}>
          {afterLabel}
        </div>
      </div>

      {(title || stats) && (
        <div className="p-4 bg-surface border-t border-border flex items-center justify-between">
          <span className="font-headline font-bold text-white uppercase text-sm">{title}</span>
          <span className="font-bold text-xs px-2.5 py-1 rounded-sm" style={{ color: 'var(--primary)', backgroundColor: 'rgba(255,78,26,0.1)' }}>
            {stats}
          </span>
        </div>
      )}
    </div>
  )
}
