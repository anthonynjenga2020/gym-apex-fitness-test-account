import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PRODUCTS = [
  { id: 1, name: "Whey Protein Isolate (2kg)", price: 6500, category: "Supplements", image: "/gym (12).jpg", desc: "27g pure protein per scoop, ultra-filtered whey isolate." },
  { id: 2, name: "Pre-Workout High Energy", price: 4200, category: "Supplements", image: "/gym (8).jpg", desc: "Explosive focus, 300mg caffeine & beta-alanine boost." },
  { id: 3, name: "Leather Powerlifting Belt", price: 7500, category: "Equipment", image: "/gym (9).jpg", desc: "10mm thick genuine leather with quick-release steel lever." },
  { id: 4, name: "Heavy Duty Wrist Wraps", price: 2500, category: "Equipment", image: "/gym (6).jpg", desc: "Elastic thumb loop & reinforced stitching for maximum PR support." },
  { id: 5, name: "BCAA Recovery & Electrolytes", price: 3800, category: "Supplements", image: "/gym (5).jpg", desc: "2:1:1 ratio BCAAs + coconut water powder for intra-workout hydration." },
  { id: 6, name: "Prestige Tactical Duffle Bag", price: 8500, category: "Gear", image: "/gym (10).jpg", desc: "Waterproof 45L gym duffle with separate ventilated shoe compartment." },
]

export default function ShopPage({ config }) {
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [copiedTill, setCopiedTill] = useState(false)
  const tillNumber = config.whatsappNumber ? config.whatsappNumber.slice(-6) : '548900'

  const categories = ['All', 'Supplements', 'Equipment', 'Gear']

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item)
      }
      return [...prev, { ...product, qty: 1 }]
    })
    setIsCartOpen(true)
  }

  const updateQty = (id, delta) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.qty + delta
            return newQty > 0 ? { ...item, qty: newQty } : null
          }
          return item
        })
        .filter(Boolean)
    )
  }

  const filteredProducts = selectedCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === selectedCategory)

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  const handleWhatsAppCheckout = () => {
    const itemList = cart.map(item => `• ${item.name} (x${item.qty}) — KES ${(item.price * item.qty).toLocaleString()}`).join('\n')
    const text = `Hi ${config.gymName}! I would like to place an order from your Pro Shop:\n\n${itemList}\n\n💰 Total: KES ${total.toLocaleString()}\n\nPlease let me know pickup/delivery availability!`
    const url = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  const copyTill = () => {
    navigator.clipboard.writeText(tillNumber)
    setCopiedTill(true)
    setTimeout(() => setCopiedTill(false), 2500)
  }

  return (
    <main className="pt-28 pb-20 min-h-screen bg-bg text-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-border pb-8">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">
              Gym Store & Fuel
            </span>
            <h1 className="text-4xl sm:text-6xl font-headline font-black uppercase tracking-tight text-white mt-1">
              Pro <span style={{ color: 'var(--primary)' }}>Shop.</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base mt-2">
              Authentic supplements, lifting gear & apparel available for gym pickup and Nairobi delivery.
            </p>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative px-6 py-3.5 bg-surface rounded-xl hover:border-primary transition-all flex items-center gap-3 border border-border self-start md:self-auto shadow-lg"
          >
            <span className="text-lg">🛒</span>
            <span className="text-xs font-black uppercase tracking-wider text-white">View Cart</span>
            {cart.length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-black bg-primary text-white">
                {cart.reduce((s, i) => s + i.qty, 0)}
              </span>
            )}
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-10 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all border ${
                selectedCategory === cat
                  ? 'bg-primary text-white border-primary shadow-md'
                  : 'bg-surface text-gray-400 border-border hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-surface rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all group flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-black">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/10 text-white">
                  {product.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-headline font-bold uppercase text-white mb-1.5">{product.name}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-4">{product.desc}</p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase block">Price</span>
                    <span className="text-xl font-headline font-black text-primary">KES {product.price.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="px-4 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider bg-white/10 hover:bg-primary hover:text-white transition-all text-gray-200 border border-white/10"
                  >
                    + Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Slide-out Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#111111] border-l border-border z-[101] flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-border flex justify-between items-center bg-surface">
                <div>
                  <h2 className="text-xl font-headline font-black uppercase tracking-wider text-white">Shopping Cart</h2>
                  <p className="text-[11px] text-gray-400">{cart.length} item(s) in bag</p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center text-gray-500 py-16">
                    <span className="text-4xl block mb-3">🛍️</span>
                    <p className="text-sm font-medium">Your cart is currently empty.</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center bg-surface p-3.5 rounded-xl border border-border">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold uppercase text-xs text-white truncate">{item.name}</h4>
                        <p className="text-primary font-black text-sm mt-0.5">KES {item.price.toLocaleString()}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="w-6 h-6 rounded bg-bg text-gray-300 flex items-center justify-center font-bold hover:bg-white/20 text-xs"
                          >
                            −
                          </button>
                          <span className="text-xs font-bold">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="w-6 h-6 rounded bg-bg text-gray-300 flex items-center justify-center font-bold hover:bg-white/20 text-xs"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-border bg-surface space-y-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold uppercase text-gray-400">Estimated Total</span>
                    <span className="text-3xl font-headline font-black text-white">KES {total.toLocaleString()}</span>
                  </div>

                  {/* M-Pesa Till Info */}
                  <div className="p-3 rounded-lg bg-bg border border-border flex items-center justify-between text-xs">
                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase">M-Pesa Buy Goods</span>
                      <span className="font-mono font-bold text-green-400">Till: {tillNumber}</span>
                    </div>
                    <button
                      onClick={copyTill}
                      className="px-2.5 py-1 rounded text-[10px] font-bold uppercase bg-white/10 hover:bg-white/20 text-white"
                    >
                      {copiedTill ? 'Copied!' : 'Copy'}
                    </button>
                  </div>

                  <button
                    onClick={handleWhatsAppCheckout}
                    className="w-full py-4 font-headline font-black text-sm uppercase tracking-wider rounded-xl bg-green-500 hover:bg-green-600 text-black flex items-center justify-center gap-2 shadow-xl transition-all active:scale-95"
                  >
                    <span>💬</span> Complete Order via WhatsApp
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  )
}
