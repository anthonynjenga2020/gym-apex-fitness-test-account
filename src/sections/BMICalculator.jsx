import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReveal } from '../hooks/useReveal.js'

export default function BMICalculator({ config }) {
  const [mode, setMode] = useState('bmi') // 'bmi' | 'tdee'
  const headerRef = useReveal()

  // BMI state
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [bmiResult, setBmiResult] = useState(null)

  // TDEE state
  const [gender, setGender] = useState('male')
  const [age, setAge] = useState('')
  const [activity, setActivity] = useState('moderate')
  const [tdeeGoal, setTdeeGoal] = useState('cut')
  const [tdeeResult, setTdeeResult] = useState(null)

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
        category = 'Optimal Range'
        recommendation = 'Great foundation! Maintain with our Body Recomposition or Strength programs.'
      } else if (bmi >= 25 && bmi < 29.9) {
        category = 'Overweight'
        recommendation = 'Focus on a caloric deficit and our Fat Loss / HIIT program.'
      } else {
        category = 'High BMI'
        recommendation = 'Focus on sustainable weight loss with our Guided Transformation program.'
      }

      setBmiResult({ bmi, category, recommendation })
    }
  }

  const calculateTDEE = (e) => {
    e.preventDefault()
    if (weight > 0 && height > 0 && age > 0) {
      // Mifflin-St Jeor Equation
      let bmr = (10 * Number(weight)) + (6.25 * Number(height)) - (5 * Number(age))
      bmr += gender === 'male' ? 5 : -161

      const multipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        heavy: 1.725,
        athlete: 1.9,
      }

      const tdee = Math.round(bmr * (multipliers[activity] || 1.55))
      let targetCalories = tdee
      let goalText = 'Maintain Weight'

      if (tdeeGoal === 'cut') {
        targetCalories = tdee - 500
        goalText = 'Aggressive Fat Loss (-500 kcal)'
      } else if (tdeeGoal === 'bulk') {
        targetCalories = tdee + 400
        goalText = 'Lean Muscle Gain (+400 kcal)'
      }

      // Macro breakdown
      const proteinGrams = Math.round(Number(weight) * 2.2) // 2.2g per kg
      const fatGrams = Math.round((targetCalories * 0.25) / 9) // 25% from fat
      const carbGrams = Math.max(50, Math.round((targetCalories - (proteinGrams * 4) - (fatGrams * 9)) / 4))

      setTdeeResult({
        tdee,
        targetCalories,
        goalText,
        proteinGrams,
        fatGrams,
        carbGrams,
      })
    }
  }

  return (
    <section className="py-28 lg:py-40 relative overflow-hidden bg-bg text-white" id="calculator">
      {/* Background aesthetic */}
      <div className="absolute inset-0 z-0">
        <img
          src="/gym (4).jpg"
          alt="Gym Background"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/90 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Copy & Explanations */}
          <div ref={headerRef} className="section-reveal lg:col-span-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-10" style={{ backgroundColor: 'var(--primary)' }} />
              <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--primary)' }}>
                Precision Performance
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-headline font-black uppercase mb-6 leading-tight">
              Know Your <span style={{ color: 'var(--primary)' }}>Numbers.</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg mb-8 leading-relaxed">
              Targeted training requires objective baseline metrics. Calculate your Body Mass Index or discover your exact daily caloric and macronutrient targets.
            </p>

            {/* Mode Switcher Tabs */}
            <div className="p-1 rounded-xl bg-surface border border-border inline-flex gap-1 mb-8">
              <button
                onClick={() => setMode('bmi')}
                className={`px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                  mode === 'bmi'
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                BMI Calculator
              </button>
              <button
                onClick={() => setMode('tdee')}
                className={`px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                  mode === 'tdee'
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Daily Calorie & Macros (TDEE)
              </button>
            </div>

            {/* Feature Callout */}
            <div className="p-6 rounded-xl border border-white/10 bg-surface/50 backdrop-blur-sm">
              <h4 className="font-headline font-bold text-sm uppercase text-white mb-2">
                Need a Custom Meal & Training Plan?
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                Our certified nutrition coaches design personalized periodized meal plans that guarantee progress.
              </p>
              <a
                href="#free-trial"
                className="text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1"
                style={{ color: 'var(--primary)' }}
              >
                Book a Free Nutrition Assessment →
              </a>
            </div>
          </div>

          {/* Right: Interactive Forms */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl border border-white/10 bg-surface shadow-2xl">
              <AnimatePresence mode="wait">
                {mode === 'bmi' ? (
                  <motion.div
                    key="bmi"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <h3 className="text-xl font-headline font-black uppercase text-white mb-6">
                      Body Mass Index Calculator
                    </h3>

                    {bmiResult && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-6 rounded-xl border-l-4 border-primary bg-bg shadow-xl mb-8"
                      >
                        <div className="flex items-end gap-4 mb-2">
                          <span className="text-5xl font-headline font-black text-primary">
                            {bmiResult.bmi}
                          </span>
                          <span className="text-lg font-bold uppercase tracking-wider text-white/90 pb-1">
                            {bmiResult.category}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">{bmiResult.recommendation}</p>
                      </motion.div>
                    )}

                    <form onSubmit={calculateBMI} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                            Weight (kg) *
                          </label>
                          <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm"
                            placeholder="e.g. 75"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                            Height (cm) *
                          </label>
                          <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm"
                            placeholder="e.g. 180"
                            required
                          />
                        </div>
                      </div>

                      <button type="submit" className="w-full btn-primary py-4 text-sm font-black uppercase tracking-wider rounded-lg">
                        Calculate BMI Now
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="tdee"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <h3 className="text-xl font-headline font-black uppercase text-white mb-6">
                      Daily Caloric Target & Macro Split
                    </h3>

                    {tdeeResult && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-6 rounded-xl border border-primary/30 bg-bg shadow-xl mb-8 space-y-4"
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-3">
                          <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider">Target Daily Calories</p>
                            <p className="text-4xl font-headline font-black text-primary">
                              {tdeeResult.targetCalories} <span className="text-sm font-medium text-gray-400">kcal/day</span>
                            </p>
                          </div>
                          <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/20 text-primary uppercase tracking-wider">
                            {tdeeResult.goalText}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-3 text-center pt-1">
                          <div className="p-3 rounded-lg bg-surface border border-border">
                            <p className="text-[11px] text-gray-400 uppercase font-bold">Protein</p>
                            <p className="text-lg font-black text-white">{tdeeResult.proteinGrams}g</p>
                          </div>
                          <div className="p-3 rounded-lg bg-surface border border-border">
                            <p className="text-[11px] text-gray-400 uppercase font-bold">Carbs</p>
                            <p className="text-lg font-black text-white">{tdeeResult.carbGrams}g</p>
                          </div>
                          <div className="p-3 rounded-lg bg-surface border border-border">
                            <p className="text-[11px] text-gray-400 uppercase font-bold">Fats</p>
                            <p className="text-lg font-black text-white">{tdeeResult.fatGrams}g</p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <form onSubmit={calculateTDEE} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                            Gender
                          </label>
                          <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-primary"
                          >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                            Age
                          </label>
                          <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-primary"
                            placeholder="e.g. 28"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                            Weight (kg)
                          </label>
                          <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-primary"
                            placeholder="e.g. 75"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                            Height (cm)
                          </label>
                          <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-primary"
                            placeholder="e.g. 180"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                            Weekly Activity
                          </label>
                          <select
                            value={activity}
                            onChange={(e) => setActivity(e.target.value)}
                            className="w-full bg-bg border border-border rounded-lg px-3 py-3 text-white text-xs focus:outline-none focus:border-primary"
                          >
                            <option value="sedentary">Sedentary (Office job)</option>
                            <option value="light">Light (1-2 workouts/wk)</option>
                            <option value="moderate">Moderate (3-5 workouts/wk)</option>
                            <option value="heavy">Heavy (6-7 workouts/wk)</option>
                            <option value="athlete">Athlete (2x training/day)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                            Primary Goal
                          </label>
                          <select
                            value={tdeeGoal}
                            onChange={(e) => setTdeeGoal(e.target.value)}
                            className="w-full bg-bg border border-border rounded-lg px-3 py-3 text-white text-xs focus:outline-none focus:border-primary"
                          >
                            <option value="cut">Fat Loss (-500 kcal)</option>
                            <option value="maintain">Maintenance</option>
                            <option value="bulk">Muscle Gain (+400 kcal)</option>
                          </select>
                        </div>
                      </div>

                      <button type="submit" className="w-full btn-primary py-4 text-sm font-black uppercase tracking-wider rounded-lg mt-2">
                        Calculate TDEE & Macros
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
