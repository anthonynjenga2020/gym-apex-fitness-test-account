import { useState } from 'react'
import { motion } from 'framer-motion'

const EVENTS = [
  {
    id: 1,
    title: "Summer Shred Bootcamp",
    date: "July 15 - Aug 15",
    time: "06:00 AM - 07:00 AM",
    description: "A high-intensity 4-week outdoor bootcamp designed to torch calories and build lean muscle before summer.",
    image: "/gym (3).jpg",
    spots: 10
  },
  {
    id: 2,
    title: "Powerlifting Fundamentals",
    date: "August 5",
    time: "10:00 AM - 01:00 PM",
    description: "Learn the big three: Squat, Bench, and Deadlift. Perfect for beginners looking to build a strong foundation.",
    image: "/gym (11).jpg",
    spots: 5
  },
  {
    id: 3,
    title: "Recovery & Mobility Workshop",
    date: "August 20",
    time: "09:00 AM - 11:00 AM",
    description: "Stop the aches and pains. A 2-hour deep dive into foam rolling, stretching, and mobility routines.",
    image: "/gym (7).jpg",
    spots: 15
  }
]

export default function Events({ config }) {
  return (
    <section className="py-24 bg-surface text-white relative overflow-hidden" id="events-section">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-headline font-black uppercase mb-4"
          >
            Upcoming <span className="text-primary">Events</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Take your training to the next level. Join our specialized workshops and bootcamps.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {EVENTS.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-bg rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-colors group"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {event.spots} Spots Left
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-primary font-bold text-sm uppercase tracking-widest">{event.date}</span>
                  <span className="text-gray-400 text-xs">{event.time}</span>
                </div>
                <h3 className="text-xl font-headline font-bold uppercase mb-2">{event.title}</h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                  {event.description}
                </p>
                <button className="w-full btn-outline py-3 text-sm hover:bg-primary hover:border-primary hover:text-white transition-colors">
                  Reserve Spot
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
