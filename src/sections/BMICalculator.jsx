import { useState } from 'react'
import { motion } from 'framer-motion'

export default function BMICalculator({ config }) {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [result, setResult] = useState(null)

  const calculateBMI = (e) => {
    e.preventDefault()
    if (weight > 0 && height > 0) {
      const heightInMeters = height / 100
      const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1)
      let category = ''
      let recommendation = ''

      if (bmi < 18.5) {
        category = 'Underweight'
        recommendation = 'Focus on a caloric surplus and our Hypertrophy / Bulking program.'
      } else if (bmi >= 18.5 && bmi < 24.9) {
        category = 'Normal Weight'
        recommendation = 'Maintain with our Body Recomposition or Strength programs.'
      } else if (bmi >= 25 && bmi < 29.9) {
        category = 'Overweight'
        recommendation = 'Focus on a slight caloric deficit and our Fat Loss / HIIT program.'
      } else {
        category = 'Obese'
        recommendation = 'Focus on sustainable weight loss with our Beginner Transformation program.'
      }

      setResult({ bmi, category, recommendation })
    }
  }

  return (
    <section className="py-24 bg-bg text-white relative overflow-hidden" id="bmi-section">
      <div className="absolute inset-0 z-0">
        <img 
          src="/gym (4).jpg" 
          alt="Gym Background" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/90 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-headline font-black uppercase mb-6">
              Calculate Your <span className="text-primary">BMI</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-lg">
              Find out your Body Mass Index and get a personalized training recommendation instantly. Your fitness journey starts with knowing where you stand.
            </p>
            
            {result && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface p-6 rounded-xl border-l-4 border-primary shadow-2xl mb-8"
              >
                <div className="flex items-end gap-4 mb-2">
                  <span className="text-5xl font-headline font-black text-primary">{result.bmi}</span>
                  <span className="text-xl font-bold uppercase tracking-widest text-white/80 pb-1">{result.category}</span>
                </div>
                <p className="text-gray-300 font-medium">{result.recommendation}</p>
              </motion.div>
            )}

            <form onSubmit={calculateBMI} className="space-y-6 max-w-md">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">Weight (kg)</label>
                  <input 
                    type="number" 
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="e.g. 75"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">Height (cm)</label>
                  <input 
                    type="number" 
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="e.g. 180"
                    required
                  />
                </div>
              </div>
              <button type="submit" className="w-full btn-primary py-4 text-lg rounded-lg">
                Calculate Now
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
