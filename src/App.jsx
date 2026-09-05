import { useState, useMemo } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import defaultConfig from './config/config.json'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import GymConciergeWidget from './components/GymConciergeWidget.jsx'
import ScrollProgressBar from './components/ScrollProgressBar.jsx'
import MobileFloatingBar from './components/MobileFloatingBar.jsx'
import ThemeSwitcher from './components/ThemeSwitcher.jsx'
import GoalQuizModal from './components/GoalQuizModal.jsx'

// Pages
import HomePage from './pages/HomePage.jsx'
import ClassesPage from './pages/ClassesPage.jsx'
import TrainersPage from './pages/TrainersPage.jsx'
import TrainerPage from './pages/TrainerPage.jsx'
import MembershipsPage from './pages/MembershipsPage.jsx'
import FacilitiesPage from './pages/FacilitiesPage.jsx'
import FaqPage from './pages/FaqPage.jsx'
import ReviewPage from './pages/ReviewPage.jsx'
import ShopPage from './pages/ShopPage.jsx'
import { AnimatePresence } from 'framer-motion'

// Layout wrapper
function Layout({ children, config, onOpenQuiz }) {
  const { pathname } = useLocation()
  const isReview = pathname === '/review'

  return (
    <div className="min-h-screen pb-20 lg:pb-0" style={{ backgroundColor: 'var(--bg)' }}>
      <ScrollProgressBar />
      {!isReview && <Navbar config={config} onOpenQuiz={onOpenQuiz} />}
      {children}
      {!isReview && <Footer config={config} />}
      {!isReview && <GymConciergeWidget config={config} onOpenQuiz={onOpenQuiz} />}
      {!isReview && <MobileFloatingBar config={config} onOpenQuiz={onOpenQuiz} />}
      <ThemeSwitcher currentVariant={config.templateVariant || 'V1'} />
    </div>
  )
}

export default function App() {
  const [isQuizOpen, setIsQuizOpen] = useState(false)

  const config = useMemo(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const gymQuery = searchParams.get('gym')
    const locationQuery = searchParams.get('location')

    if (gymQuery || locationQuery) {
      const newConfig = { ...defaultConfig }

      if (gymQuery) {
        newConfig.gymName = gymQuery
        newConfig.whatsappMessage = newConfig.whatsappMessage.replace(/Prestige Fitness/g, gymQuery)
        newConfig.aboutDescription = newConfig.aboutDescription.replace(/Prestige Fitness/g, gymQuery)
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
      <Layout config={config} onOpenQuiz={() => setIsQuizOpen(true)}>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage config={config} onOpenQuiz={() => setIsQuizOpen(true)} />} />
            <Route path="/classes" element={<ClassesPage config={config} />} />
            <Route path="/trainers" element={<TrainersPage config={config} />} />
            <Route path="/trainers/:trainerId" element={<TrainerPage config={config} />} />
            <Route path="/memberships" element={<MembershipsPage config={config} />} />
            <Route path="/facilities" element={<FacilitiesPage config={config} />} />
            <Route path="/faq" element={<FaqPage config={config} />} />
            <Route path="/shop" element={<ShopPage config={config} />} />
            <Route path="/review" element={<ReviewPage config={config} />} />
          </Routes>
        </AnimatePresence>
      </Layout>

      <GoalQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        config={config}
      />
    </BrowserRouter>
  )
}
