import React from 'react';

export interface EnterpriseBackgroundProps {
  variant?: 'global' | 'section' | 'hero' | 'minimal';
  showGrid?: boolean;
  showAurora?: boolean;
  showTopBeam?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const EnterpriseBackground: React.FC<EnterpriseBackgroundProps> = ({
  variant = 'global',
  showGrid = true,
  showAurora = true,
  showTopBeam = true,
  className = '',
  children,
}) => {
  const isHero = variant === 'hero';
  const isMinimal = variant === 'minimal';
  const isSection = variant === 'section';

  const shouldShowBeam = showTopBeam && !isMinimal;
  const shouldShowAurora = showAurora && !isMinimal;
  const shouldShowGrid = showGrid;

  return (
    <div className={`relative min-h-screen w-full bg-[#060911] text-slate-100 ${isSection ? 'py-16' : ''} ${className}`}>
      {/* ── Fixed Full-Viewport Background Canvas ────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* 1. Ultra-Refined Top Light Horizon Beam */}
        {shouldShowBeam && (
          <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent ${isHero ? 'via-accent/60' : 'via-accent/35'} to-transparent z-10`} />
        )}

        {/* 2. Ambient Deep Aurora Orbs (Soft, Pure & Non-Intrusive) */}
        {shouldShowAurora && (
          <>
            {/* Top-Center Warm Champagne Gold Ambient Light */}
            <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[900px] lg:w-[1300px] h-[550px] bg-gradient-to-b from-accent/[0.08] to-transparent rounded-full blur-[140px] opacity-80" />

            {/* Deep Royal Midnight Blue Depth Orb */}
            <div className="absolute top-[35%] left-[10%] w-[700px] lg:w-[1000px] h-[600px] bg-[#0E1E42]/25 rounded-full blur-[170px] opacity-80" />

            {/* Lateral Soft Gold Accent Reflection */}
            <div className="absolute top-[65%] right-[-5%] w-[600px] lg:w-[800px] h-[600px] bg-accent/[0.04] rounded-full blur-[160px]" />

            {/* Bottom Deep Obsidian Grounding Glow */}
            <div className="absolute bottom-[-100px] left-1/3 w-[700px] lg:w-[900px] h-[500px] bg-[#0A1224]/40 rounded-full blur-[150px]" />
          </>
        )}

        {/* 3. Geometric Nano-Grid Texture with Radial Vignette Mask */}
        {shouldShowGrid && (
          <div 
            className="absolute inset-0 z-0 opacity-[0.04]"
            style={{
              backgroundImage: `
                linear-gradient(to right, #FFFFFF 1px, transparent 1px),
                linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)
              `,
              backgroundSize: '48px 48px',
              maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 95%)',
              WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 95%)',
            }}
          />
        )}

        {/* 4. Fine Grain Vignette */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: 'radial-gradient(circle at 50% 0%, transparent 0%, rgba(6, 9, 17, 0.3) 60%, rgba(6, 9, 17, 0.85) 100%)',
          }}
        />
      </div>

      {/* ── Foreground Content Layer ─────────────────────────────── */}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
};

export default EnterpriseBackground;
