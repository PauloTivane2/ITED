import React from 'react';
import { motion } from 'framer-motion';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { FaClock, FaChevronRight, FaChevronDown } from 'react-icons/fa';
import { MatrixRain } from '../styles/effect/MatrixRain';
import { BibleVerse } from './BibleVerse';

const easeOut = 'easeOut' as const;

export const HeroSection: React.FC = () => {
  const [typeText] = useTypewriter({
    words: [
      'fé, esperança',
      'amor e propósito',
      'comunidade e paz',
      'graça e redenção',
    ],
    loop: true,
    delaySpeed: 2400,
    deleteSpeed: 42,
    typeSpeed: 68,
  });

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden bg-gradient-hero">

      {/* ── Matrix Rain overlay ─────────────────────────────────── */}
      <MatrixRain
        opacity={0.14}
        fontSize={13}
        color="#6dffb3"
        className="z-0"
      />

      {/* ── Animated background orbs ────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        <div className="absolute top-1/4 -left-20 w-[280px] h-[280px] sm:w-[500px] sm:h-[500px] bg-accent/10 rounded-full blur-[80px] sm:blur-[120px] animate-pulse-soft" />
        <div className="absolute bottom-1/4 -right-20 w-[220px] h-[220px] sm:w-[400px] sm:h-[400px] bg-highlight/8 rounded-full blur-[80px] sm:blur-[100px] animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-accent/5 rounded-full blur-[100px] sm:blur-[150px]" />
      </div>

      {/* ── Subtle grid ─────────────────────────────────────────── */}
      <div className="absolute inset-0 opacity-[0.03] z-[1]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="relative z-10 container mx-auto px-4 sm:px-5 md:px-8 lg:px-10 max-w-7xl py-20 sm:py-28 md:py-40">
        <div className="max-w-3xl flex flex-col gap-6 sm:gap-8">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 sm:py-2 rounded-full bg-white/[0.05] border border-white/[0.1] backdrop-blur-md text-[10px] sm:text-xs md:text-sm font-medium text-white/80 tracking-wide uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-highlight opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-highlight shadow-[0_0_8px_rgba(109,255,179,0.8)]" />
              </span>
              Seja bem-vindo à ITED • Baseados na fé
            </div>
          </motion.div>

          {/* Heading with Typewriter */}
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: easeOut }}
          >
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
              Encontre
            </span>
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mt-2">
              <span className="text-gradient">{typeText}</span>
              <Cursor cursorStyle="|" cursorColor="#6dffb3" />
              <span className="text-white">.</span>
            </span>
          </motion.h1>

          {/* Subtitle / Verse */}
          <BibleVerse 
            reference="Êxodo 33:7-11"
            text="Moisés montava a 'Tenda do Encontro' fora do arraial, longe do povo, para consultar a Deus. Quando Moisés entrava, a coluna de nuvem descia e Deus falava com ele face a face, como um homem fala com seu amigo."
          />

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: easeOut }}
          >
            <a
              href="#horarios"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:px-7 sm:py-4 rounded-xl font-semibold text-white bg-gradient-accent shadow-glow hover:shadow-glow-lg transition-all duration-normal hover:-translate-y-0.5 min-h-[48px] active:scale-95 active:translate-y-0"
            >
              <FaClock className="w-5 h-5" />
              Nossos Horários
            </a>
            <a
              href="#sobre"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:px-7 sm:py-4 rounded-xl font-semibold text-white/80 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-normal hover:-translate-y-0.5 min-h-[48px] active:scale-95 active:translate-y-0"
            >
              Conheça a Igreja
              <FaChevronRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="flex flex-wrap gap-x-8 sm:gap-x-12 gap-y-6 pt-8 mt-4 border-t border-white/[0.08]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: easeOut }}
          >
            {[
              { number: '7+', label: 'Anos Manifestando o Reino' },
              { number: '500+', label: 'Vidas Edificadas no Altar' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.65 + i * 0.1, ease: easeOut }}
                className="flex flex-col"
              >
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">{stat.number}</div>
                <div className="text-[10px] sm:text-xs text-white/40 mt-1 uppercase tracking-widest font-bold font-sans">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent z-10" />

      {/* Scroll indicator */}
      <motion.a
        href="#sobre"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-white transition-colors cursor-pointer z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-xs font-medium tracking-widest uppercase">Explorar</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <FaChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.a>
    </section>
  );
};
