import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Brain, Zap, ChevronRight, Play, Github, Twitter, Linkedin, Mail, FileText, MessageCircle, Users, TrendingUp, Award, Shield, Bell } from 'lucide-react'
import { personasWithImages, heroImage, demoImage } from './data/pregenerated-content'

const agentMessages = [
  {
    agent: 'Neuroscience',
    content: 'Podcast mentions dopamine reward circuits affecting long-term learning retention. This aligns with the spacing effect in memory consolidation...',
    color: 'from-blue-500 to-cyan-500',
    avatar: '🧠'
  },
  {
    agent: 'Economics',
    content: 'The behavioral economics perspective suggests loss aversion plays a key role here. People overweight potential losses vs. equivalent gains...',
    color: 'from-emerald-500 to-teal-500',
    avatar: '📊'
  },
  {
    agent: 'AI Ethics',
    content: 'This raises questions about algorithmic transparency in cognitive enhancement tools. We must consider the ethical implications of AI-mediated learning...',
    color: 'from-amber-500 to-orange-500',
    avatar: '⚖️'
  },
]

const features = [
  {
    id: 'multi-agent',
    icon: MessageCircle,
    title: 'Multi-Agent Synthesis',
    tagline: 'Three minds, one breakthrough',
    description: 'Specialized AI agents from neuroscience, economics, and ethics debate complex ideas, revealing connections you would never find alone.',
    benefits: [
      'Each agent brings domain expertise',
      'Debates expose hidden assumptions',
      'Synthesis creates novel insights'
    ],
    visual: {
      type: 'agents',
      agents: [
        { name: 'Neuroscience', emoji: '🧠', color: 'blue' },
        { name: 'Economics', emoji: '📊', color: 'emerald' },
        { name: 'AI Ethics', emoji: '⚖️', color: 'amber' }
      ]
    },
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'real-time',
    icon: Zap,
    title: 'Real-Time Interaction',
    tagline: 'Steer the conversation',
    description: 'Pause any debate, ask questions, and challenge assumptions. The agents respond instantly, adapting their analysis to your interests.',
    benefits: [
      'Interrupt and redirect at any moment',
      'Ask "what if" questions',
      'Get instant expert responses'
    ],
    visual: {
      type: 'interaction',
      demo: 'Live message exchange'
    },
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 'cross-disciplinary',
    icon: Brain,
    title: 'Cross-Disciplinary Discovery',
    tagline: 'Connect the dots',
    description: 'Watch economic theory collide with neuroscience, ethics challenge assumptions, and unexpected patterns emerge from interdisciplinary dialogue.',
    benefits: [
      'Bridge siloed knowledge domains',
      'Discover non-obvious connections',
      'Generate testable hypotheses'
    ],
    visual: {
      type: 'network',
      connections: true
    },
    gradient: 'from-orange-500 to-red-500'
  }
]

// Section transition component
const SectionDivider = ({ variant = 'wave' }: { variant?: 'wave' | 'gradient' | 'dots' }) => {
  if (variant === 'wave') {
    return (
      <div className="relative w-full h-24 overflow-hidden">
        <svg className="absolute bottom-0 w-full h-24" preserveAspectRatio="none" viewBox="0 0 1440 100" fill="none">
          <path
            d="M0,50 C240,80 480,20 720,50 C960,80 1200,20 1440,50 L1440,100 L0,100 Z"
            className="fill-white"
          />
          <path
            d="M0,60 C240,30 480,90 720,60 C960,30 1200,90 1440,60 L1440,100 L0,100 Z"
            className="fill-slate-50/50"
          />
        </svg>
      </div>
    )
  }

  if (variant === 'gradient') {
    return (
      <div className="relative w-full h-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`gradient-bar-${i}`}
                animate={{
                  scaleY: [0.5, 1, 0.5],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2
                }}
                className="w-1 h-16 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'dots') {
    return (
      <div className="relative w-full h-20 flex items-center justify-center overflow-hidden">
        <div className="flex gap-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={`dot-${i}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-40"
            />
          ))}
        </div>
      </div>
    )
  }

  return null
}

function App() {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isScrolling = useRef(false)

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  // Create tripled personas array for infinite scroll
  const tripledPersonas = [...personasWithImages, ...personasWithImages, ...personasWithImages]

  // Hide top banner on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % agentMessages.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  // Infinite scroll logic
  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    // Set initial scroll position to middle set
    const cardWidth = 380 + 24 // width + gap
    const initialScroll = personasWithImages.length * cardWidth
    scrollContainer.scrollLeft = initialScroll

    const handleScroll = () => {
      if (isScrolling.current) return

      const scrollLeft = scrollContainer.scrollLeft
      const clientWidth = scrollContainer.clientWidth

      const singleSetWidth = personasWithImages.length * cardWidth

      // If scrolled to near the end (right edge), jump to middle set
      if (scrollLeft >= singleSetWidth * 2 - clientWidth / 2) {
        isScrolling.current = true
        scrollContainer.scrollLeft = scrollLeft - singleSetWidth
        setTimeout(() => { isScrolling.current = false }, 50)
      }

      // If scrolled to near the beginning (left edge), jump to middle set
      if (scrollLeft <= singleSetWidth / 2) {
        isScrolling.current = true
        scrollContainer.scrollLeft = scrollLeft + singleSetWidth
        setTimeout(() => { isScrolling.current = false }, 50)
      }
    }

    scrollContainer.addEventListener('scroll', handleScroll)
    return () => scrollContainer.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Rich Top Banner - hides on scroll */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: scrolled ? -40 : 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-2 px-6"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 font-medium">
              <Bell className="w-3.5 h-3.5 animate-pulse" />
              Beta v0.8.2 Live
            </span>
            <span className="hidden md:flex items-center gap-2">
              <Users className="w-3.5 h-3.5" />
              500 Slots Left
            </span>
            <span className="hidden lg:flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5" />
              94.2% Accuracy
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Navigation - adjusts position when banner hides */}
      <motion.nav
        animate={{ top: scrolled ? 0 : 40 }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">DeepCast</span>
          </div>
          <div className="flex items-center gap-8">
            <button onClick={() => scrollToSection('features')} className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Features
            </button>
            <button onClick={() => scrollToSection('demo')} className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Demo
            </button>
            <button onClick={() => scrollToSection('testimonials')} className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Testimonials
            </button>
            <a href="https://docs.deepcast.ai" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-1">
              <FileText className="w-4 h-4" />
              Docs
            </a>
            <button
              onClick={() => scrollToSection('cta')}
              className="px-5 py-2 text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg transition-all"
            >
              Join Beta
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Hero - Asymmetric Layout */}
      <motion.section
        style={{ opacity, scale }}
        className="pt-40 pb-24 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left: Main message */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 text-sm font-semibold text-blue-700 mb-6">
                  <Award className="w-4 h-4" />
                  World's #1 Cognitive Synthesis Engine
                </div>

                <h1 className="text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[1.05]">
                  <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                    Podcast knowledge,
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    synthesized by AI
                  </span>
                </h1>

                <p className="text-xl text-gray-600 mb-8 max-w-xl leading-relaxed">
                  Transform podcasts into interactive multi-agent conversations. Watch AI experts debate, synthesize, and extract insights in real-time.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => scrollToSection('cta')}
                    className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2"
                  >
                    Request Access
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <a
                    href="https://demo.deepcast.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 border-2 border-gray-300 rounded-full font-semibold hover:border-blue-600 hover:text-blue-600 transition-all flex items-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Watch Demo
                  </a>
                </div>

                {/* Stats with Colors */}
                <div className="flex items-center gap-6 mt-12 pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">94.2%</div>
                      <div className="text-sm text-gray-500">Accuracy</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">&lt;120ms</div>
                      <div className="text-sm text-gray-500">Response</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">500+</div>
                      <div className="text-sm text-gray-500">Beta users</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Hero image */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-3xl"></div>
                <img
                  src={heroImage.url}
                  alt={heroImage.alt}
                  className="relative w-full h-96 object-cover rounded-3xl shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Transition: Hero -> Demo */}
      <SectionDivider variant="gradient" />

      {/* Live Demo Section - Redesigned */}
      <section id="demo" className="py-32 px-6 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl font-black text-gray-900 mb-4">
              Watch AI agents
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                debate in real-time
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three specialized AI agents analyze podcasts from different perspectives, then synthesize insights through conversation.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Demo image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 rounded-2xl blur-xl"></div>
                <img
                  src={demoImage.url}
                  alt={demoImage.alt}
                  className="relative w-full h-80 object-cover rounded-2xl shadow-xl"
                />
              </div>
            </motion.div>

            {/* Right: Live messages */}
            <div>
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-xl">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-semibold text-gray-600">Live synthesis</span>
                </div>

                <div className="space-y-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentMessage}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      className={`p-6 rounded-2xl bg-gradient-to-br ${agentMessages[currentMessage].color} text-white shadow-lg`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">{agentMessages[currentMessage].avatar}</span>
                        <div className="text-xs font-bold uppercase tracking-wide opacity-90">
                          {agentMessages[currentMessage].agent}
                        </div>
                      </div>
                      <div className="text-sm leading-relaxed">
                        {agentMessages[currentMessage].content}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Progress indicator */}
                  <div className="flex items-center justify-center gap-2 pt-4">
                    {agentMessages.map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          i === currentMessage
                            ? 'w-10 bg-gradient-to-r from-blue-600 to-purple-600'
                            : 'w-2 bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transition: Demo -> Features */}
      <SectionDivider variant="dots" />

      {/* Features Section - Interactive Tab-Based Design */}
      <section id="features" className="py-32 px-6 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-blue-900">How it works</span>
            </div>
            <h2 className="text-6xl font-black text-gray-900 mb-6 leading-tight">
              Turn podcasts into
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                living conversations
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Not just transcription. Not just summaries. Watch AI agents with specialized expertise
              <br />debate ideas, challenge assumptions, and synthesize breakthrough insights.
            </p>
          </motion.div>

          {/* Interactive Feature Tabs */}
          <div className="grid lg:grid-cols-[minmax(0,1fr)_1.2fr] gap-12 items-start">
            {/* Left: Feature Selector */}
            <div className="space-y-3">
              {features.map((feature, i) => {
                const Icon = feature.icon
                const isActive = activeFeature === i
                return (
                  <motion.button
                    key={feature.id}
                    onClick={() => setActiveFeature(i)}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className={`w-full text-left p-6 rounded-3xl transition-all duration-300 group ${
                      isActive
                        ? 'bg-white shadow-2xl border-2 border-gray-900 scale-[1.02]'
                        : 'bg-white/60 backdrop-blur-sm border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? `bg-gradient-to-br ${feature.gradient} shadow-lg scale-110`
                            : 'bg-gray-100 group-hover:bg-gray-200'
                        }`}
                      >
                        <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className={`text-xs font-semibold mb-1 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                          {feature.tagline}
                        </div>
                        <h3 className={`text-xl font-black mb-2 transition-colors ${isActive ? 'text-gray-900' : 'text-gray-700'}`}>
                          {feature.title}
                        </h3>
                        <p className={`text-sm leading-relaxed transition-colors ${isActive ? 'text-gray-700' : 'text-gray-500'}`}>
                          {feature.description}
                        </p>

                        {/* Benefits list - only show when active */}
                        <AnimatePresence mode="wait">
                          {isActive && (
                            <motion.ul
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="space-y-2 mt-4"
                            >
                              {feature.benefits.map((benefit, j) => (
                                <motion.li
                                  key={j}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: j * 0.1 }}
                                  className="flex items-center gap-3 text-sm text-gray-600"
                                >
                                  <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.gradient}`}></div>
                                  {benefit}
                                </motion.li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Active indicator */}
                      <div className={`flex-shrink-0 w-3 h-3 rounded-full transition-all ${isActive ? `bg-gradient-to-r ${feature.gradient}` : 'bg-gray-300'}`}></div>
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* Right: Visual Demo */}
            <div className="sticky top-32">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="relative"
                >
                  {/* Glow effect */}
                  <div className={`absolute -inset-4 bg-gradient-to-r ${features[activeFeature].gradient} opacity-20 blur-3xl rounded-3xl`}></div>

                  {/* Demo container */}
                  <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-700">
                    {/* Browser chrome mockup */}
                    <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-700">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="flex-1 text-center text-xs text-gray-500 font-mono">
                        deepcast.ai/demo
                      </div>
                    </div>

                    {/* Visual content based on feature type */}
                    {features[activeFeature].visual.type === 'agents' && (
                      <div className="space-y-4">
                        {features[activeFeature].visual.agents?.map((agent, i) => (
                          <motion.div
                            key={agent.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.15 }}
                            className={`p-4 rounded-2xl bg-gradient-to-br from-${agent.color}-500/20 to-${agent.color}-600/10 border border-${agent.color}-500/30`}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-3xl">{agent.emoji}</span>
                              <span className="text-sm font-bold text-white">{agent.name}</span>
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(i + 1) * 30 + 10}%` }}
                                transition={{ delay: i * 0.15 + 0.2, duration: 0.6 }}
                                className={`h-full bg-gradient-to-r from-${agent.color}-400 to-${agent.color}-600`}
                              ></motion.div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {features[activeFeature].visual.type === 'interaction' && (
                      <div className="space-y-4">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex justify-end"
                        >
                          <div className="bg-blue-600 text-white px-4 py-3 rounded-2xl rounded-tr-sm max-w-[80%]">
                            <p className="text-sm">What about long-term effects?</p>
                          </div>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="flex justify-start"
                        >
                          <div className="bg-gray-700 text-white px-4 py-3 rounded-2xl rounded-tl-sm max-w-[80%]">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-bold text-blue-400">🧠 Neuroscience</span>
                            </div>
                            <p className="text-sm">Great question! Longitudinal studies show...</p>
                          </div>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                          className="flex justify-start"
                        >
                          <div className="bg-gray-700 text-white px-4 py-3 rounded-2xl rounded-tl-sm max-w-[80%]">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-bold text-emerald-400">📊 Economics</span>
                            </div>
                            <p className="text-sm">From a cost-benefit perspective...</p>
                          </div>
                        </motion.div>
                      </div>
                    )}

                    {features[activeFeature].visual.type === 'network' && (
                      <div className="relative h-64 flex items-center justify-center">
                        <svg className="w-full h-full" viewBox="0 0 400 300">
                          {/* Connections */}
                          {[
                            { x1: 80, y1: 80, x2: 200, y2: 150 },
                            { x1: 200, y1: 150, x2: 320, y2: 80 },
                            { x1: 80, y1: 220, x2: 200, y2: 150 },
                            { x1: 200, y1: 150, x2: 320, y2: 220 },
                            { x1: 80, y1: 80, x2: 320, y2: 220 },
                            { x1: 80, y1: 220, x2: 320, y2: 80 }
                          ].map((line, i) => (
                            <motion.line
                              key={i}
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 0.3 }}
                              transition={{ delay: i * 0.1, duration: 0.6 }}
                              x1={line.x1}
                              y1={line.y1}
                              x2={line.x2}
                              y2={line.y2}
                              stroke="url(#gradient)"
                              strokeWidth="2"
                              strokeDasharray="5,5"
                            />
                          ))}
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#f97316" />
                              <stop offset="100%" stopColor="#ef4444" />
                            </linearGradient>
                          </defs>

                          {/* Nodes */}
                          {[
                            { x: 80, y: 80, label: 'Economics', color: '#10b981' },
                            { x: 320, y: 80, label: 'Neuroscience', color: '#3b82f6' },
                            { x: 80, y: 220, label: 'Ethics', color: '#f59e0b' },
                            { x: 320, y: 220, label: 'AI Safety', color: '#ef4444' },
                            { x: 200, y: 150, label: 'Synthesis', color: '#8b5cf6' }
                          ].map((node, i) => (
                            <g key={i}>
                              <motion.circle
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: i * 0.1 + 0.3, duration: 0.4 }}
                                cx={node.x}
                                cy={node.y}
                                r={i === 4 ? 30 : 20}
                                fill={node.color}
                                opacity={i === 4 ? 1 : 0.8}
                              />
                              <motion.text
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.1 + 0.5 }}
                                x={node.x}
                                y={node.y + 45}
                                textAnchor="middle"
                                fill="white"
                                fontSize="12"
                                fontWeight="bold"
                              >
                                {node.label}
                              </motion.text>
                            </g>
                          ))}
                        </svg>
                      </div>
                    )}

                    {/* Status indicator */}
                    <div className="mt-6 pt-4 border-t border-gray-700 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-gray-400">Live synthesis in progress</span>
                      </div>
                      <div className="text-xs text-gray-500 font-mono">{(Math.random() * 100 + 20).toFixed(0)}ms</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Transition: Features -> Testimonials */}
      <SectionDivider variant="wave" />

      {/* Testimonials - Horizontal Scroll with Gradient Fade */}
      <section id="testimonials" className="py-32 px-6 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-5xl font-black text-gray-900 mb-4">
              Trusted by researchers,<br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                founders, and thinkers
              </span>
            </h2>
          </motion.div>

          {/* Horizontal scroll container with gradient masks */}
          <div className="relative">
            {/* Left gradient fade */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>

            {/* Right gradient fade */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            {/* Scrollable content */}
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {tripledPersonas.map((persona, i) => (
                <div
                  key={`persona-${i}`}
                  className="min-w-[380px]"
                >
                  <div className="h-full bg-white p-6 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all">
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={persona.avatar}
                        alt={persona.name}
                        className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-100"
                        onError={(e) => {
                          // Fallback to gradient if image fails to load
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(persona.name)}&background=random&size=128`
                        }}
                      />
                      <div>
                        <div className="font-bold text-gray-900 text-lg">{persona.name}</div>
                        <div className="text-sm text-gray-500">{persona.role}</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      "{persona.quote}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll hint */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">← Scroll to see more →</p>
          </div>
        </div>
      </section>

      {/* Transition: Testimonials -> CTA */}
      <div className="relative w-full overflow-hidden">
        <svg className="w-full h-32" preserveAspectRatio="none" viewBox="0 0 1440 120" fill="none">
          <path
            d="M0,60 C240,90 480,30 720,60 C960,90 1200,30 1440,60 L1440,120 L0,120 Z"
            className="fill-gradient-to-r from-white to-blue-50"
            fill="#ffffff"
          />
        </svg>
      </div>

      {/* CTA - Redesigned Modern Version */}
      <section id="cta" className="relative py-32 px-6 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient orbs - using will-change for better performance */}
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-20 animate-pulse-slow" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }} />

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-white">Limited Beta - 127 Spots Remaining</span>
            </motion.div>

            {/* Headline */}
            <h2 className="text-7xl md:text-8xl font-black text-white mb-6 leading-[0.9]">
              Start your
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  free trial
                </span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="absolute bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-blue-600/30 to-purple-600/30 -z-0"
                />
              </span>
            </h2>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join <span className="text-white font-bold">373</span> researchers, analysts, and lifelong learners
              <br className="hidden md:block" />
              already transforming how they consume knowledge
            </p>

            {/* Email form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto mb-8"
            >
              <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 rounded-xl border border-white/10 focus:outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 transition-all"
                />
                <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-600/20 hover:shadow-2xl hover:shadow-blue-600/40 hover:scale-[1.02]">
                  Get Early Access
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* Trust signals */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>No credit card required</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-600"></div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-400" />
                <span>14-day free trial</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-600"></div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-400" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl">DeepCast</span>
              </div>
              <p className="text-gray-400 text-sm mb-6">
                World's #1 cognitive synthesis engine.
              </p>
              <div className="flex items-center gap-3">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#features" className="hover:text-blue-400 transition-colors">Features</a></li>
                <li><a href="https://demo.deepcast.ai" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Demo</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="https://docs.deepcast.ai" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Documentation</a></li>
                <li><a href="https://status.deepcast.ai" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Status
                </a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="mailto:hello@deepcast.ai" className="hover:text-blue-400 transition-colors flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  Contact
                </a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
            © 2025 DeepCast. All rights reserved.
          </div>
        </div>
      </footer>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

export default App
