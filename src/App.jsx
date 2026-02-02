import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown, X, MapPin, Calendar } from 'lucide-react'

function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [cursorTrail, setCursorTrail] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [openExhibition, setOpenExhibition] = useState(null)
  const [activeTab, setActiveTab] = useState('upcoming')

  // Custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
      
      setCursorTrail(prev => [
        ...prev.slice(-8),
        { x: e.clientX, y: e.clientY, id: Date.now() }
      ])
    }

    if (window.innerWidth > 768) {
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Gallery images
  const galleryImages = [
    { id: 1, url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80', size: 'large', title: 'Neon Dreams' },
    { id: 2, url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80', size: 'medium', title: 'Digital Chaos' },
    { id: 3, url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=600&q=80', size: 'medium', title: 'Cyber Pulse' },
    { id: 4, url: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=600&q=80', size: 'small', title: 'Electric Soul' },
    { id: 5, url: 'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?w=600&q=80', size: 'small', title: 'Vaporwave' },
    { id: 6, url: 'https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=800&q=80', size: 'medium', title: 'Glitch Reality' },
  ]

  // Exhibitions data
  const exhibitions = {
    upcoming: [
      {
        id: 1,
        title: 'DIGITAL RENAISSANCE',
        date: 'March 15 - April 30, 2024',
        location: 'Cyber Gallery, Tokyo',
        description: 'An immersive exploration of digital consciousness through glitch art and AI-generated visuals. Experience the fusion of traditional techniques with cutting-edge technology.'
      },
      {
        id: 2,
        title: 'NEON DYSTOPIA',
        date: 'May 10 - June 20, 2024',
        location: 'Virtual Space, Metaverse',
        description: 'A virtual exhibition showcasing cyberpunk aesthetics and dystopian narratives. Step into a world where reality blurs with digital dreams.'
      }
    ],
    past: [
      {
        id: 3,
        title: 'CHAOS THEORY',
        date: 'November 5 - December 15, 2023',
        location: 'Modern Art Museum, Berlin',
        description: 'A retrospective collection exploring the beauty in digital chaos and algorithmic randomness. Featured 50+ pieces spanning 3 years of creative evolution.'
      },
      {
        id: 4,
        title: 'ELECTRIC DREAMS',
        date: 'August 20 - September 30, 2023',
        location: 'Street Art Festival, New York',
        description: 'Outdoor projection mapping exhibition transforming urban landscapes into living digital canvases. Witnessed by over 100,000 visitors.'
      }
    ]
  }

  const HeroSection = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    return (
      <section ref={ref} className="min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-cyber-purple/5 via-transparent to-transparent" />
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center z-10 max-w-6xl mx-auto"
        >
          {/* Glitch Portrait */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="mb-12 inline-block"
          >
            <img
              src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=600&q=80"
              alt="Artist Portrait"
              className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover glitch-hover border-4 border-cyber-purple/30 shadow-2xl shadow-cyber-purple/50 mx-auto"
            />
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-7xl md:text-9xl font-black mb-6 tracking-tighter chrome-text"
            style={{ fontFamily: 'Arial Black, sans-serif' }}
          >
            ALEX NOIR
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl md:text-4xl text-cyber-purple font-bold mb-8"
          >
            Digital Alchemist & Chaos Creator
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16"
          >
            <ChevronDown className="w-8 h-8 text-gray-500 mx-auto animate-bounce" />
          </motion.div>
        </motion.div>
      </section>
    )
  }

  const GallerySection = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    return (
      <section ref={ref} className="py-20 px-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto max-w-7xl"
        >
          <h2 className="text-5xl md:text-7xl font-black text-white mb-16 text-center chrome-text">
            THE GALLERY
          </h2>

          {/* Masonry Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.8 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`
                  relative overflow-hidden rounded-lg cursor-pointer group
                  ${image.size === 'large' ? 'col-span-2 row-span-2' : ''}
                  ${image.size === 'medium' ? 'row-span-2' : ''}
                  ${image.size === 'small' ? 'row-span-1' : ''}
                `}
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-bold text-lg">{image.title}</p>
                  </div>
                </div>
                <div className="absolute inset-0 border-2 border-cyber-purple/0 group-hover:border-cyber-purple/50 transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Fullscreen Image Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-cyber-black/95 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: 'spring', damping: 25 }}
                className="relative max-w-6xl max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain rounded-lg"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 bg-cyber-purple hover:bg-cyber-purple/80 text-white p-2 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <p className="text-white text-2xl font-bold">{selectedImage.title}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    )
  }

  const ProcessSection = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    return (
      <section ref={ref} className="py-32 px-4 overflow-hidden bg-gradient-to-b from-transparent via-cyber-purple/5 to-transparent">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto max-w-7xl"
        >
          <h2 className="text-5xl md:text-7xl font-black text-white mb-16 text-center chrome-text">
            THE PROCESS
          </h2>

          <div className="mb-20 text-center max-w-3xl mx-auto">
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8">
              Art is not about perfection—it's about transformation. Each piece begins in chaos, 
              evolves through destruction, and emerges reborn as something entirely new.
            </p>
            <p className="text-gray-500 text-base md:text-lg">
              Through algorithmic manipulation and digital alchemy, I explore the boundaries 
              between control and randomness, order and entropy.
            </p>
          </div>

          {/* Marquee */}
          <div className="relative overflow-hidden py-12 border-y border-cyber-purple/30">
            <div className="flex whitespace-nowrap animate-marquee">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center">
                  <span className="text-6xl md:text-8xl font-black text-cyber-purple/20 mx-8">CREATION</span>
                  <span className="text-6xl md:text-8xl font-black text-white/10 mx-8">•</span>
                  <span className="text-6xl md:text-8xl font-black text-cyber-purple/20 mx-8">DESTRUCTION</span>
                  <span className="text-6xl md:text-8xl font-black text-white/10 mx-8">•</span>
                  <span className="text-6xl md:text-8xl font-black text-cyber-purple/20 mx-8">REBIRTH</span>
                  <span className="text-6xl md:text-8xl font-black text-white/10 mx-8">•</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    )
  }

  const ExhibitionsSection = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    return (
      <section ref={ref} className="py-20 px-4 pb-32 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto max-w-5xl"
        >
          <h2 className="text-5xl md:text-7xl font-black text-white mb-12 text-center chrome-text">
            EXHIBITIONS
          </h2>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-8 py-3 rounded-full font-bold transition-all ${
                activeTab === 'upcoming'
                  ? 'bg-cyber-purple text-white shadow-lg shadow-cyber-purple/50'
                  : 'bg-white/5 text-gray-500 hover:bg-white/10'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-8 py-3 rounded-full font-bold transition-all ${
                activeTab === 'past'
                  ? 'bg-cyber-purple text-white shadow-lg shadow-cyber-purple/50'
                  : 'bg-white/5 text-gray-500 hover:bg-white/10'
              }`}
            >
              Past
            </button>
          </div>

          {/* Accordion */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {exhibitions[activeTab].map((exhibition, index) => (
                <motion.div
                  key={exhibition.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-cyber-purple/30 rounded-lg overflow-hidden bg-white/5 backdrop-blur-sm"
                >
                  <button
                    onClick={() => setOpenExhibition(openExhibition === exhibition.id ? null : exhibition.id)}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                    <div className="text-left">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{exhibition.title}</h3>
                      <p className="text-cyber-purple text-sm">{exhibition.date}</p>
                    </div>
                    <motion.div
                      animate={{ rotate: openExhibition === exhibition.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-6 h-6 text-gray-500" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openExhibition === exhibition.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-cyber-purple/20">
                          <div className="flex items-center gap-2 text-gray-400 mb-3">
                            <MapPin className="w-4 h-4" />
                            <span>{exhibition.location}</span>
                          </div>
                          <p className="text-gray-300 leading-relaxed">{exhibition.description}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </section>
    )
  }

  return (
    <div className="min-h-screen bg-cyber-black text-white overflow-x-hidden">
      {/* Custom Cursor */}
      {window.innerWidth > 768 && (
        <>
          {/* Main cursor */}
          <div
            className="fixed w-6 h-6 pointer-events-none z-[9999] mix-blend-difference"
            style={{
              left: cursorPosition.x - 12,
              top: cursorPosition.y - 12,
              transition: 'all 0.05s ease-out'
            }}
          >
            <div className="w-full h-full relative">
              <div className="absolute inset-0 bg-cyber-purple rounded-full" />
              <div className="absolute inset-0 border-2 border-white rounded-full" />
            </div>
          </div>

          {/* Trail */}
          {cursorTrail.map((point, index) => (
            <div
              key={point.id}
              className="fixed w-3 h-3 pointer-events-none z-[9998] bg-cyber-purple/30 rounded-full"
              style={{
                left: point.x - 6,
                top: point.y - 6,
                opacity: 1 - (index / cursorTrail.length),
                transition: 'opacity 0.3s ease-out'
              }}
            />
          ))}
        </>
      )}

      {/* Sections */}
      <HeroSection />
      <GallerySection />
      <ProcessSection />
      <ExhibitionsSection />

      {/* Footer */}
      <footer className="border-t border-cyber-purple/30 py-8 px-4 bg-cyber-black">
        <div className="container mx-auto max-w-7xl text-center">
          <p className="text-gray-500 text-sm">
            © 2024 Alex Noir. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App