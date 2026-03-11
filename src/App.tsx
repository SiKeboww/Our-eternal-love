/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Calendar, 
  Camera, 
  MessageCircleHeart, 
  Sparkles, 
  Music, 
  ChevronRight, 
  Star,
  Quote,
  Menu,
  X,
  Volume2,
  VolumeX,
  Home as HomeIcon,
  BookHeart,
  Image as ImageIcon
} from 'lucide-react';

// --- Types & Data ---
interface TimelineItem {
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ReasonItem {
  id: number;
  text: string;
  emoji: string;
}

const timelineData: TimelineItem[] = [
  {
    date: "First Meeting",
    title: "The Day It All Began",
    description: "The moment our paths crossed and the world suddenly felt a little brighter.",
    icon: <Sparkles className="w-5 h-5" />
  },
  {
    date: "First Date",
    title: "Coffee & Conversations",
    description: "Hours felt like minutes as we talked about everything and nothing.",
    icon: <Music className="w-5 h-5" />
  },
  {
    date: "The 'Yes' Moment",
    title: "Official Together",
    description: "When we decided to walk this beautiful journey hand in hand.",
    icon: <Heart className="w-5 h-5 fill-current" />
  },
  {
    date: "Our First Trip",
    title: "Exploring Together",
    description: "Creating memories in new places, finding home in each other.",
    icon: <Camera className="w-5 h-5" />
  }
];

const reasonsData: ReasonItem[] = [
  { id: 1, text: "The way your eyes sparkle when you laugh.", emoji: "✨" },
  { id: 2, text: "How you always know how to make me feel safe.", emoji: "🛡️" },
  { id: 3, text: "Your kindness towards everyone you meet.", emoji: "🌸" },
  { id: 4, text: "The little notes and messages you leave for me.", emoji: "📝" },
  { id: 5, text: "Your passion for the things you love.", emoji: "🔥" },
  { id: 6, text: "The way you hold my hand so perfectly.", emoji: "🤝" }
];

// --- Shared Components ---

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<{ id: number; left: number; duration: number; size: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts(prev => [
        ...prev.slice(-10),
        {
          id: Date.now(),
          left: Math.random() * 100,
          duration: 6 + Math.random() * 6,
          size: 10 + Math.random() * 20
        }
      ]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <AnimatePresence>
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            initial={{ y: '110vh', opacity: 0 }}
            animate={{ y: '-10vh', opacity: [0, 0.4, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: heart.duration, ease: "linear" }}
            className="absolute text-romantic-300/20"
            style={{ left: `${heart.left}%` }}
          >
            <Heart size={heart.size} fill="currentColor" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="min-h-[calc(100vh-80px)] pt-20 pb-10 px-4"
  >
    {children}
  </motion.div>
);

const Navbar = ({ isPlaying, toggleMusic }: { isPlaying: boolean; toggleMusic: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home', icon: <HomeIcon size={18} /> },
    { path: '/story', label: 'Our Story', icon: <BookHeart size={18} /> },
    { path: '/reasons', label: 'Why You', icon: <Sparkles size={18} /> },
    { path: '/memories', label: 'Memories', icon: <ImageIcon size={18} /> },
    { path: '/message', label: 'Message', icon: <MessageCircleHeart size={18} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-card border-b border-romantic-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-romantic-500 font-serif font-bold text-xl">
          <Heart fill="currentColor" size={24} className="heart-beat" />
          <span className="hidden sm:inline">Eternal Love</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-romantic-500 flex items-center gap-1 ${location.pathname === link.path ? 'text-romantic-600' : 'text-gray-500'}`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleMusic}
            className="p-2 rounded-full bg-romantic-100 text-romantic-500 hover:bg-romantic-200 transition-colors"
            title={isPlaying ? "Mute Music" : "Play Music"}
          >
            {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
          
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-romantic-100 overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map(link => (
                <Link 
                  key={link.path} 
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-xl ${location.pathname === link.path ? 'bg-romantic-50 text-romantic-600' : 'text-gray-600'}`}
                >
                  {link.icon}
                  <span className="font-medium">{link.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Pages ---

const Home = () => (
  <PageWrapper>
    <div className="flex flex-col items-center justify-center text-center py-10">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="mb-6 inline-block">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-romantic-500"
          >
            <Heart size={80} fill="currentColor" className="drop-shadow-xl" />
          </motion.div>
        </div>
        <h1 className="font-serif text-5xl md:text-8xl font-bold mb-6 text-gray-900 leading-tight">
          Hello, <br />
          <span className="font-script text-romantic-500 text-6xl md:text-9xl">My Beloved</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-lg mx-auto font-light italic mb-10">
          "I saw that you were perfect, and so I loved you. Then I saw that you were not perfect and I loved you even more."
        </p>
        
        <Link 
          to="/story"
          className="px-10 py-4 bg-romantic-500 text-white rounded-full font-bold shadow-xl hover:bg-romantic-600 transition-all flex items-center gap-3 mx-auto w-fit group"
        >
          Begin Our Journey
          <ChevronRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </div>
  </PageWrapper>
);

const Story = () => (
  <PageWrapper>
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-serif text-4xl font-bold mb-4">Our Beautiful Story</h2>
        <p className="text-gray-500 italic">Every moment with you is a treasure.</p>
      </div>

      <div className="space-y-12 relative">
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-romantic-200 -translate-x-1/2 hidden md:block"></div>
        
        {timelineData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
          >
            <div className="flex-1 w-full">
              <div className={`glass-card p-8 rounded-3xl shadow-sm border-l-4 border-romantic-400 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                <span className="text-romantic-500 font-bold text-sm uppercase tracking-widest">{item.date}</span>
                <h3 className="text-2xl font-bold mt-2 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            </div>
            
            <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-white border-4 border-romantic-100 shadow-md text-romantic-500 shrink-0">
              {item.icon}
            </div>
            
            <div className="flex-1 hidden md:block"></div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-20 text-center">
        <Link to="/reasons" className="text-romantic-500 font-medium flex items-center justify-center gap-2 hover:underline">
          Next: Why I Love You <ChevronRight size={18} />
        </Link>
      </div>
    </div>
  </PageWrapper>
);

const Reasons = () => {
  const [index, setIndex] = useState(0);
  return (
    <PageWrapper>
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-serif text-4xl font-bold mb-12">Reasons Why You're Special</h2>
        
        <div className="relative h-80 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
              className="glass-card p-12 rounded-[2.5rem] shadow-2xl w-full border-2 border-romantic-100 relative"
            >
              <Quote className="absolute -top-6 -left-6 text-romantic-200 w-16 h-16 opacity-50" />
              <div className="text-5xl mb-6">{reasonsData[index].emoji}</div>
              <p className="text-2xl md:text-3xl font-serif italic text-gray-800 leading-snug">
                "{reasonsData[index].text}"
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex justify-center gap-4">
          <button
            onClick={() => setIndex((prev) => (prev - 1 + reasonsData.length) % reasonsData.length)}
            className="w-12 h-12 rounded-full border-2 border-romantic-200 flex items-center justify-center text-romantic-400 hover:bg-romantic-50 transition-colors"
          >
            <ChevronRight size={24} className="rotate-180" />
          </button>
          <button
            onClick={() => setIndex((prev) => (prev + 1) % reasonsData.length)}
            className="px-8 py-3 bg-romantic-500 text-white rounded-full font-bold shadow-lg hover:bg-romantic-600 transition-all"
          >
            Next Reason
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};

const Memories = () => (
  <PageWrapper>
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-serif text-4xl font-bold mb-4">Captured Moments</h2>
        <p className="text-gray-500">A gallery of our favorite memories together.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10, scale: 1.02 }}
            className="group relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lg bg-romantic-50"
          >
            <img 
              src={`https://picsum.photos/seed/romance-${i}/800/1000`} 
              alt={`Memory ${i}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
              <span className="text-romantic-300 font-bold text-xs uppercase tracking-widest mb-1">Memory #{i}</span>
              <p className="text-white font-serif italic">"A beautiful day we'll never forget."</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </PageWrapper>
);

const Message = () => {
  const [open, setOpen] = useState(false);
  return (
    <PageWrapper>
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-serif text-4xl font-bold mb-8">A Secret Message</h2>
        <p className="text-gray-600 mb-12">I've hidden something special here just for you. Tap the heart to reveal it.</p>
        
        <div className="relative flex justify-center">
          <AnimatePresence mode="wait">
            {!open ? (
              <motion.div
                key="closed"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                onClick={() => setOpen(true)}
                className="w-48 h-48 bg-romantic-500 rounded-3xl shadow-2xl flex flex-col items-center justify-center text-white cursor-pointer hover:bg-romantic-600 transition-colors"
              >
                <Heart size={64} fill="currentColor" className="heart-beat mb-2" />
                <span className="font-bold uppercase tracking-widest text-xs">Tap to Open</span>
              </motion.div>
            ) : (
              <motion.div
                key="opened"
                initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                className="glass-card p-12 rounded-[3rem] shadow-2xl border-4 border-dashed border-romantic-200 max-w-md"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                >
                  <MessageCircleHeart size={64} className="mx-auto mb-6 text-romantic-500" />
                </motion.div>
                <h3 className="font-serif text-2xl font-bold mb-4">My Dearest,</h3>
                <p className="text-xl font-serif italic text-gray-700 leading-relaxed mb-6">
                  "You are the best thing that has ever happened to me. Every day I spend with you is a gift, and I promise to love you more with every passing second."
                </p>
                <p className="text-romantic-500 font-script text-3xl">Forever Yours.</p>
                <button 
                  onClick={() => setOpen(false)}
                  className="mt-8 text-sm text-gray-400 hover:text-romantic-400 underline"
                >
                  Close Message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageWrapper>
  );
};

// --- Main App ---

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Romantic background music (Royalty free/Creative Commons)
    // Using a reliable source for a soft piano track
    audioRef.current = new Audio('https://www.chosic.com/wp-content/uploads/2021/04/Warm-Memories-Emotional-Inspiring-Piano.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log("Autoplay blocked:", err));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Router>
      <div className="min-h-screen bg-romantic-50 selection:bg-romantic-200 selection:text-romantic-600">
        <FloatingHearts />
        <Navbar isPlaying={isPlaying} toggleMusic={toggleMusic} />
        
        <main className="relative z-10">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/story" element={<Story />} />
              <Route path="/reasons" element={<Reasons />} />
              <Route path="/memories" element={<Memories />} />
              <Route path="/message" element={<Message />} />
            </Routes>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="py-10 text-center text-gray-400 text-xs uppercase tracking-widest">
          <div className="flex justify-center gap-4 mb-4 text-romantic-200">
            <Heart size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Sparkles size={16} fill="currentColor" />
          </div>
          &copy; {new Date().getFullYear()} Our Eternal Love Story
        </footer>

        {/* Music Start Prompt for Mobile/First Interaction */}
        {!isPlaying && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
          >
            <button 
              onClick={toggleMusic}
              className="px-6 py-2 bg-white/80 backdrop-blur-md border border-romantic-200 rounded-full shadow-lg flex items-center gap-2 text-romantic-500 text-sm font-medium"
            >
              <Music size={16} className="animate-bounce" />
              Tap to play romantic music
            </button>
          </motion.div>
        )}
      </div>
    </Router>
  );
}
