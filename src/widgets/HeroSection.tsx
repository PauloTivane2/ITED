import React from 'react';
import { motion } from 'framer-motion';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { Clock, ChevronRight, ChevronDown } from 'lucide-react';
import { BibleVerse } from './BibleVerse';
import { useHeroData } from '@/shared/hooks';
import { HeroSkeleton } from '@/shared/ui/Skeleton';

const easeOut = 'easeOut' as const;

export const HeroSection: React.FC = () => {
  const { heroData, isLoading } = useHeroData();

  const typewriterWords = heroData?.typewriterWords || [
    'fé e esperança',
    'amor e propósito',
    'comunhão e paz',
    'graça e redenção',
  ];

  const [typeText] = useTypewriter({
    words: typewriterWords,
    loop: true,
    delaySpeed: 2400,
    deleteSpeed: 42,
    typeSpeed: 68,
  });

  if (isLoading) {
    return <HeroSkeleton />;
  }

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden bg-transparent">

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="relative z-10 container mx-auto px-5 sm:px-8 lg:px-12 max-w-7xl pt-36 pb-24 sm:pt-44 sm:pb-32">
        <div className="max-w-3xl flex flex-col gap-6 sm:gap-8">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.05] border border-accent/25 backdrop-blur-xl text-2xs sm:text-xs font-semibold text-white/90 tracking-[0.2em] uppercase shadow-subtle">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              {heroData?.badge || 'Comunidade Cristã Internacional • ITED'}
            </div>
          </motion.div>

          {/* Heading with Typewriter */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: easeOut }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.08] tracking-[-0.035em]"
          >
            <span>Encontre</span>
            <span className="block mt-2 sm:mt-3 font-serif italic font-normal">
              <span className="text-gradient font-sans not-italic font-black">{typeText}</span>
              <Cursor cursorStyle="|" cursorColor="#C59B27" />
              <span className="text-accent">.</span>
            </span>
          </motion.h1>

          {/* Subtitle / Verse */}
          <BibleVerse 
            reference={heroData?.bibleReference || "Êxodo 33:7-11"}
            text={heroData?.bibleText || "Moisés montava a 'Tenda do Encontro' fora do arraial, longe do povo, para consultar a Deus. Quando Moisés entrava, a coluna de nuvem descia e Deus falava com ele face a face, como um homem fala com seu amigo."}
          />

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3.5 pt-2"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: easeOut }}
          >
            <a
              href="#horarios"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-[#070C18] bg-[#D4AF37] hover:bg-[#E2BE4B] border border-[#FFF5DC]/50 shadow-[0_1px_2px_rgba(0,0,0,0.4),0_0_18px_rgba(212,175,55,0.22)] hover:shadow-[0_0_26px_rgba(212,175,55,0.38)] transition-all duration-200 active:scale-[0.98] text-sm tracking-wide"
            >
              <Clock className="w-4 h-4 text-[#070C18]" />
              <span>{heroData?.ctaPrimaryLabel || 'Nossos Horários'}</span>
            </a>
            <a
              href="#sobre"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-slate-200 hover:text-white border border-white/[0.12] hover:border-[#D4AF37]/50 bg-[#0A1020]/80 hover:bg-[#121B32]/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-200 active:scale-[0.98] text-sm tracking-wide backdrop-blur-md"
            >
              <span>{heroData?.ctaSecondaryLabel || 'Conheça a Igreja'}</span>
              <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="flex flex-wrap gap-x-10 sm:gap-x-16 gap-y-6 pt-8 mt-4 border-t border-white/[0.08]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: easeOut }}
          >
            {(heroData?.stats || [
              { number: '7+', label: 'Anos de Edificação' },
              { number: '500+', label: 'Vidas Transformadas' },
            ]).map((stat: any, i: number) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 + i * 0.1, ease: easeOut }}
                className="flex flex-col"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-baseline gap-1">
                  <span>{stat.number}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                </div>
                <div className="text-2xs text-slate-400 mt-1 uppercase tracking-[0.2em] font-semibold font-sans">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#sobre"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-400/60 hover:text-accent transition-colors cursor-pointer z-10 py-2 px-4 rounded-full hover:bg-white/[0.03]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-2xs font-semibold tracking-[0.25em] uppercase">Explorar</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.div>
      </motion.a>
    </section>
  );
};
