import React from 'react';

export interface EnterpriseBackgroundProps {
  variant?: 'global' | 'section' | 'hero' | 'minimal';
  showSacredGeometry?: boolean;
  showShekinahAura?: boolean;
  showCelestialParticles?: boolean;
  showTopHorizon?: boolean;
  showSacredCross?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const EnterpriseBackground: React.FC<EnterpriseBackgroundProps> = ({
  variant = 'global',
  showSacredGeometry = true,
  showShekinahAura = true,
  showCelestialParticles = true,
  showTopHorizon = true,
  showSacredCross = true,
  className = '',
  children,
}) => {
  const isMinimal = variant === 'minimal';
  const isSection = variant === 'section';

  const shouldShowHorizon = showTopHorizon && !isMinimal;
  const shouldShowAura = showShekinahAura && !isMinimal;
  const shouldShowGeometry = showSacredGeometry;
  const shouldShowParticles = showCelestialParticles && !isMinimal;
  const shouldShowCross = showSacredCross && !isMinimal;

  return (
    <div className={`relative min-h-screen w-full bg-[#05070E] text-slate-100 selection:bg-accent/30 selection:text-white ${isSection ? 'py-16' : ''} ${className}`}>
      {/* ── Fixed Master Viewport Canvas (Sacred Centuries & Christian Heritage) ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
        
        {/* 1. Divine Altar Horizon Beam & Sacred Cross of Light (Cruz da Redenção / Luz do Mundo) */}
        {shouldShowHorizon && (
          <>
            {/* Top Light Ray Hairline */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E5C368] to-transparent z-20 shadow-[0_0_15px_rgba(212,175,55,0.6)]" />
            
            {/* Golden Horizon Glow Flare with Shekinah Breathing */}
            <div className="animate-shekinah absolute -top-24 left-1/2 -translate-x-1/2 w-[80vw] max-w-5xl h-48 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#D4AF37]/35 via-[#9E7A16]/12 to-transparent blur-3xl z-10" />

            {/* Sacred Christian Cross of Light (Ethereal & Holy) */}
            {shouldShowCross && (
              <div className="animate-sacred-cross absolute top-0 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center pointer-events-none">
                {/* Vertical Holy Beam */}
                <div className="w-[1.5px] h-28 sm:h-36 bg-gradient-to-b from-[#FFF5DC] via-[#E5C368] to-transparent shadow-[0_0_12px_#E5C368]" />
                
                {/* Horizontal Holy Transept Beam */}
                <div className="absolute top-7 sm:top-9 w-24 sm:w-32 h-[1.5px] bg-gradient-to-r from-transparent via-[#FFF5DC] to-transparent shadow-[0_0_10px_#E5C368]" />
                
                {/* Sacred Radiant Center Core */}
                <div className="absolute top-7 sm:top-9 w-2 h-2 rounded-full bg-[#FFF5DC] blur-[1px] shadow-[0_0_14px_#FFF5DC]" />
              </div>
            )}
          </>
        )}

        {/* 2. Shekinah Glory Auras (Coluna de Fogo & Nuvem Celestial de Êxodo 33) */}
        {shouldShowAura && (
          <>
            {/* Top Central Holy Presence - Radiant Warm Gold Sanctuary Pillar */}
            <div className="animate-shekinah absolute -top-32 left-1/2 -translate-x-1/2 w-[90vw] max-w-6xl h-[650px] bg-[radial-gradient(circle,_rgba(212,175,55,0.20)_0%,_rgba(180,136,30,0.09)_40%,_transparent_75%)] blur-[100px]" />

            {/* Deep Sinai Midnight Celestial Blue Aura (Lado Esquerdo) */}
            <div className="absolute top-[20%] -left-20 w-[600px] lg:w-[850px] h-[750px] bg-[radial-gradient(circle,_rgba(17,32,72,0.65)_0%,_rgba(11,20,46,0.3)_50%,_transparent_75%)] blur-[120px]" />

            {/* Ark of the Covenant Golden Reverberation (Lado Direito) */}
            <div className="absolute top-[50%] -right-20 w-[550px] lg:w-[800px] h-[700px] bg-[radial-gradient(circle,_rgba(212,175,55,0.14)_0%,_rgba(142,106,20,0.06)_50%,_transparent_75%)] blur-[110px]" />

            {/* Base Altar Smoke & Incense Depth */}
            <div className="absolute -bottom-20 left-1/3 w-[700px] lg:w-[1000px] h-[500px] bg-[radial-gradient(circle,_rgba(14,26,58,0.5)_0%,_transparent_70%)] blur-[130px]" />
          </>
        )}

        {/* 3. Sacred Ancient Geometry Pattern (Milenar Tabernacle & Byzantine Star Lattice) */}
        {shouldShowGeometry && (
          <div 
            className="absolute inset-0 z-0 opacity-100"
            style={{
              backgroundImage: `
                radial-gradient(circle at 24px 24px, rgba(229, 195, 104, 0.4) 1.5px, transparent 1.5px),
                linear-gradient(to right, rgba(212, 175, 55, 0.07) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(212, 175, 55, 0.07) 1px, transparent 1px)
              `,
              backgroundSize: '48px 48px',
              maskImage: 'radial-gradient(ellipse 90% 80% at 50% 30%, black 40%, rgba(0,0,0,0.2) 80%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 30%, black 40%, rgba(0,0,0,0.2) 80%, transparent 100%)',
            }}
          />
        )}

        {/* 4. Sacred Ancient Linen Weave & Papyrus Parchment Micro-Texture (Linho Fino Torcido de Êxodo 26) */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.12] mix-blend-screen pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />

        {/* 5. Ascending Altar Incense & Celestial Stardust (Oração dos Santos / Salmo 141:2 / Apocalipse 8:4) */}
        {shouldShowParticles && (
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Ascending Incense Spark 1 */}
            <div className="animate-incense absolute bottom-[25%] left-[20%] w-2 h-2 rounded-full bg-[#E5C368] shadow-[0_0_8px_#E5C368]" style={{ animationDelay: '0s' }} />
            
            {/* Ascending Incense Spark 2 */}
            <div className="animate-incense absolute bottom-[20%] right-[25%] w-1.5 h-1.5 rounded-full bg-[#FAF0D7] shadow-[0_0_6px_#FAF0D7]" style={{ animationDelay: '2.4s', animationDuration: '8s' }} />
            
            {/* Ascending Incense Spark 3 */}
            <div className="animate-incense absolute bottom-[15%] left-[50%] -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]" style={{ animationDelay: '4.8s', animationDuration: '9s' }} />
            
            {/* Ascending Incense Spark 4 */}
            <div className="animate-incense absolute bottom-[30%] left-[35%] w-1.5 h-1.5 rounded-full bg-[#E5C368] shadow-[0_0_7px_#E5C368]" style={{ animationDelay: '1.2s', animationDuration: '7.5s' }} />
            
            {/* Ascending Incense Spark 5 */}
            <div className="animate-incense absolute bottom-[22%] right-[40%] w-2 h-2 rounded-full bg-[#FAF0D7] shadow-[0_0_9px_#FAF0D7]" style={{ animationDelay: '3.6s', animationDuration: '8.5s' }} />

            {/* Fixed Desert Celestial Star 1 */}
            <div className="absolute top-[15%] left-[12%] w-1.5 h-1.5 rounded-full bg-[#E5C368] shadow-[0_0_8px_#E5C368] animate-pulse" style={{ animationDuration: '4s' }} />
            {/* Fixed Desert Celestial Star 2 */}
            <div className="absolute top-[28%] right-[14%] w-1 h-1 rounded-full bg-[#FAF0D7] shadow-[0_0_6px_#FAF0D7] animate-pulse" style={{ animationDuration: '5.5s', animationDelay: '1s' }} />
            {/* Fixed Desert Celestial Star 3 */}
            <div className="absolute top-[60%] left-[8%] w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_6px_#D4AF37] animate-pulse" style={{ animationDuration: '4.5s', animationDelay: '2.5s' }} />
          </div>
        )}

        {/* 6. Grand Altar Deep Vignette (Profundidade & Contraste Solene) */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 10%, transparent 20%, rgba(5, 7, 14, 0.4) 60%, rgba(5, 7, 14, 0.95) 100%)',
          }}
        />
      </div>

      {/* ── Foreground Content Layer ─────────────────────────────── */}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
};

export default EnterpriseBackground;
