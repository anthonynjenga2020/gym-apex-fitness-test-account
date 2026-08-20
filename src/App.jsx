import { useMemo } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import defaultConfig from './config/config.json'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'

// Pages
import HomePage from './pages/HomePage.jsx'
import ClassesPage from './pages/ClassesPage.jsx'
import TrainersPage from './pages/TrainersPage.jsx'
import TrainerPage from './pages/TrainerPage.jsx'
import ReviewPage from './pages/ReviewPage.jsx'
import ShopPage from './pages/ShopPage.jsx'
import { AnimatePresence } from 'framer-motion'

// Hide navbar/footer/whatsapp button on the /review page
function Layout({ children, config }) {
  const { pathname } = useLocation()
  const isReview = pathname === '/review'
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      {!isReview && <Navbar config={config} />}
      {children}
      {!isReview && <Footer config={config} />}
      {!isReview && <WhatsAppButton config={config} />}
    </div>
  )
}

export default function App() {
  const config = useMemo(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const gymQuery = searchParams.get('gym')
    const locationQuery = searchParams.get('location')
    
    if (gymQuery || locationQuery) {
      const newConfig = { ...defaultConfig }
      
      if (gymQuery) {
        newConfig.gymName = gymQuery
        // Replace all instances of Ironclad Fitness in messages and descriptions
        newConfig.whatsappMessage = newConfig.whatsappMessage.replace(/Ironclad Fitness/g, gymQuery)
        newConfig.aboutDescription = newConfig.aboutDescription.replace(/Ironclad Fitness/g, gymQuery)
      }
      
      if (locationQuery) {
        newConfig.location = locationQuery
      }
      
      return newConfig
    }
    return defaultConfig
  }, [])

  return (
    <BrowserRouter>
      <Layout config={config}>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/"                    element={<HomePage    config={config} />} />
            <Route path="/classes"             element={<ClassesPage config={config} />} />
            <Route path="/trainers"            element={<TrainersPage config={config} />} />
            <Route path="/trainers/:trainerId" element={<TrainerPage  config={config} />} />
            <Route path="/shop"                element={<ShopPage     config={config} />} />
            <Route path="/review"              element={<ReviewPage   config={config} />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </BrowserRouter>
  )
}
