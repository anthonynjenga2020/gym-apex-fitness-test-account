import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PRODUCTS = [
  { id: 1, name: "Whey Protein Isolate", price: 45.99, category: "Supplements", image: "/gym (12).jpg" },
  { id: 2, name: "Pre-Workout Energy", price: 34.99, category: "Supplements", image: "/gym (8).jpg" },
  { id: 3, name: "Pro Lifting Belt", price: 55.00, category: "Equipment", image: "/gym (9).jpg" },
  { id: 4, name: "Wrist Wraps", price: 18.50, category: "Equipment", image: "/gym (6).jpg" },
  { id: 5, name: "BCAA Recovery", price: 29.99, category: "Supplements", image: "/gym (5).jpg" },
  { id: 6, name: "Premium Gym Bag", price: 65.00, category: "Gear", image: "/gym (10).jpg" },
]

export default function ShopPage({ config }) {
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = (product) => {
    setCart([...cart, product])
    setIsCartOpen(true)
  }

  const removeFromCart = (index) => {
    const newCart = [...cart]
    newCart.splice(index, 1)
    setCart(newCart)
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)

  return (
    <main className="pt-24 pb-16 min-h-screen bg-bg text-white relative">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12 border-b border-border pb-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-headline font-black uppercase tracking-tight">Pro <span className="text-primary">Shop</span></h1>
            <p className="text-gray-400 mt-2">Premium gear & supplements to fuel your workouts.</p>
          </div>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-3 bg-surface rounded-full hover:bg-primary transition-colors group border border-border"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
            </svg>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-bg">
                {cart.length}
              </span>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product, i) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-surface rounded-2xl overflow-hidden border border-border group"
            >
              <div className="relative aspect-square overflow-hidden bg-black/50">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/10">
                  {product.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-headline font-bold uppercase mb-2">{product.name}</h3>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="btn-outline px-4 py-2 text-sm hover:bg-primary hover:border-primary hover:text-white"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Slide-out Cart */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-surface border-l border-border z-[101] flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-border flex justify-between items-center">
                <h2 className="text-2xl font-headline font-bold uppercase tracking-widest">Your Cart</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center text-gray-500 mt-10">
                    <p>Your cart is empty.</p>
                  </div>
                ) : (
                  cart.map((item, index) => (
                    <div key={index} className="flex gap-4 items-center bg-bg p-3 rounded-xl border border-border">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h4 className="font-bold uppercase text-sm">{item.name}</h4>
                        <p className="text-primary font-bold">${item.price.toFixed(2)}</p>
                      </div>
                      <button onClick={() => removeFromCart(index)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="p-6 border-t border-border bg-bg">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold uppercase text-gray-400">Total</span>
                  <span className="text-3xl font-headline font-black text-white">${total}</span>
                </div>
                <button 
                  className={`w-full py-4 font-bold uppercase tracking-widest rounded-xl transition-all ${cart.length > 0 ? 'bg-primary text-white hover:bg-primary-dark hover:scale-[1.02]' : 'bg-surface text-gray-500 cursor-not-allowed'}`}
                  disabled={cart.length === 0}
                  onClick={() => alert("Checkout flow preview! This is where you would process payment.")}
                >
                  Checkout Now
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  )
}
