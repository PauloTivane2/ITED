import React from 'react';
import { motion } from 'framer-motion';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { FaClock, FaChevronRight, FaChevronDown } from 'react-icons/fa';
import { MatrixRain } from '../styles/effect/MatrixRain';

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
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] animate-pulse-soft" />
        <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-highlight/8 rounded-full blur-[100px] animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]" />
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
      <div className="relative z-10 container mx-auto px-5 md:px-8 lg:px-10 max-w-7xl py-32 md:py-40">
        <div className="max-w-3xl flex flex-col gap-8">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.07] border border-white/[0.12] backdrop-blur-sm text-sm font-medium text-white/90">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-highlight opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-highlight" />
              </span>
              Seja bem Vindo a ITED, estamos baseados na fé
            </div>
          </motion.div>

          {/* Heading with Typewriter */}
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: easeOut }}
          >
            <span className="block text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
              Encontre
            </span>
            <span className="block text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight mt-2">
              <span className="text-gradient">{typeText}</span>
              <Cursor cursorStyle="|" cursorColor="#6dffb3" />
              <span className="text-white">.</span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-white/60 leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: easeOut }}
          >
            "Em Êxodo 33:7-11, Moisés montava a 'Tenda do Encontro' (ou da Congregação) fora do arraial, longe do povo, para consultar a Deus. Quando Moisés entrava, a coluna de nuvem descia e Deus falava com ele face a face, como um homem fala com seu amigo."
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: easeOut }}
          >
            <motion.a
              href="#horarios"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl font-semibold text-white bg-gradient-accent shadow-glow hover:shadow-glow-lg transition-shadow duration-normal"
            >
              <FaClock className="w-5 h-5" />
              Nossos Horários
            </motion.a>
            <motion.a
              href="#sobre"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl font-semibold text-white/80 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-normal"
            >
              Conheça a Igreja
              <FaChevronRight className="w-3.5 h-3.5" />
            </motion.a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="flex flex-wrap gap-8 md:gap-12 pt-8 mt-4 border-t border-white/[0.06]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: easeOut }}
          >
            {[
              { number: '10+', label: 'Anos de história' },
              { number: '500+', label: 'Famílias conectadas' },
              { number: '12', label: 'Ministérios ativos' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.65 + i * 0.1, ease: easeOut }}
              >
                <div className="text-2xl md:text-3xl font-extrabold text-white">{stat.number}</div>
                <div className="text-sm text-white/40 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent z-10" />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="text-xs font-medium tracking-widest uppercase">Explorar</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <FaChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};
