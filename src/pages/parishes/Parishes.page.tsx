import React from 'react';
import { PageLayout } from '../../layouts/PageLayout';
import { SectionContainer } from '../../shared/SectionContainer';
import { motion } from 'framer-motion';
import { MapPin, UserCheck, Phone } from 'lucide-react';
import { MapContent } from '../../widgets/sections/mapa/mapa';
import { useParishes } from '@/shared/hooks';
import { ParishCardSkeleton } from '@/shared/ui/Skeleton';
import { SEO } from '@/shared/ui/SEO/SEO';
import { Breadcrumbs } from '@/shared/ui/Navigation/Breadcrumbs';

export const ParishesPage: React.FC = () => {
  const { parishes, isLoading } = useParishes();

  return (
    <PageLayout>
      <SEO 
        title="Nossas Paróquias" 
        description="Conheça as congregações da ITED em Munhava, Mutindire e outras localidades. Encontre a igreja mais próxima de você."
        canonical="/paroquias"
      />
      {/* Hero Banner */}
      <section className="bg-[#060911] pt-32 sm:pt-36 pb-16 relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/[0.08] rounded-full blur-3xl pointer-events-none" />
        <div className="relative container mx-auto px-5 md:px-8 lg:px-10 max-w-7xl z-10">
          <Breadcrumbs items={[{ label: 'Paróquias' }]} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-2xs uppercase tracking-[0.22em] font-bold text-accent bg-accent/10 border border-accent/25 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Nossa Expansão
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
              Nossas <span className="font-serif italic font-normal text-accent">Paróquias</span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
              Estamos presentes em diversas localidades, levando a Tenda do Encontro para mais perto de você. Conheça nossas congregações.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Parishes Grid */}
      <SectionContainer background="dark">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <ParishCardSkeleton />
            <ParishCardSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {parishes.map((parish, index) => (
            <motion.div
              key={parish._id || parish.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#0B101D] rounded-3xl overflow-hidden border border-white/[0.08] shadow-dark-card hover:shadow-glow hover:border-accent/40 transition-all duration-normal group flex flex-col"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/9] overflow-hidden bg-[#060911]">
                <img 
                  src={parish.image || 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1200&auto=format&fit=crop'} 
                  alt={parish.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060911]/95 via-[#060911]/30 to-transparent" />
                <div className="absolute bottom-5 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white tracking-tight">{parish.name}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-7 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                  {parish.description}
                </p>

                <div className="grid grid-cols-1 gap-3.5 pt-5 border-t border-white/[0.06]">
                  <div className="flex items-center gap-3 text-slate-300">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-2xs uppercase tracking-wider text-slate-400 font-bold">Liderança</span>
                      <span className="font-semibold text-white text-sm">{parish.leader}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-300">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-2xs uppercase tracking-wider text-slate-400 font-bold">Localização</span>
                      <span className="font-semibold text-white text-sm">{parish.location}</span>
                    </div>
                  </div>
                </div>

                <a 
                  href={parish.phone ? `tel:${parish.phone.replace(/\D/g,'')}` : '/#contato'} 
                  className="w-full py-3.5 bg-[#060911] hover:bg-accent/10 border border-white/10 hover:border-accent/40 rounded-xl text-white font-semibold transition-all flex items-center justify-center gap-2 mt-4 text-sm active:scale-98"
                >
                  <Phone className="text-accent w-4 h-4" />
                  <span>{parish.phone ? `Ligar: ${parish.phone}` : 'Entrar em Contato'}</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </SectionContainer>

      {/* Map Section */}
      <SectionContainer background="dark">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full text-2xs uppercase tracking-[0.22em] font-bold text-accent bg-accent/10 border border-accent/25 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Nossa Sede
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">Sede Central</h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Se você estiver na Beira, venha nos visitar em nossa sede principal. Para as outras paróquias, entre em contato para localizações detalhadas.
          </p>
        </div>
        <MapContent />
      </SectionContainer>
    </PageLayout>
  );
};

export default ParishesPage;
