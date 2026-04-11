import React, { useState, useEffect } from 'react';
import { PageLayout } from '../../layouts/PageLayout';
import { SectionContainer } from '../../shared/SectionContainer';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaUserTie, FaPhoneAlt } from 'react-icons/fa';
import { MapContent } from '../../widgets/sections/mapa/mapa';
import { sanityClient, queries } from '../../cms/sanity/client';
import { SEO } from '@/shared/ui/SEO/SEO';

const fallbackParishes = [
  {
    _id: "p1",
    name: 'ITED Munhava',
    leader: 'Pastor Winn Pombo',
    location: 'Bairro da Munhava, Beira',
    phone: '',
    image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1200&auto=format&fit=crop',
    description: 'Uma das nossas congregações mais vibrantes, focada no crescimento espiritual e social da comunidade da Munhava.'
  },
  {
    _id: "p2",
    name: 'ITED Mutindire',
    leader: 'Liderança Local iTED',
    location: 'Mutindire, Manica',
    phone: '',
    image: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=1200&auto=format&fit=crop',
    description: 'Dedicada a levar a mensagem do evangelho a todas as regiões, construindo pontes de fé e esperança em Mutindire.'
  }
];

export const ParishesPage: React.FC = () => {
  const [data, setData] = useState<any[]>(fallbackParishes);

  useEffect(() => {
    const fetchParishes = async () => {
      try {
        const result = await sanityClient.fetch(queries.parishes);
        if (result && result.length > 0) {
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching parishes:", error);
      }
    };
    fetchParishes();
  }, []);

  return (
    <PageLayout>
      <SEO 
        title="Nossas Paróquias" 
        description="Conheça as congregações da ITED em Munhava, Mutindire e outras localidades. Encontre a igreja mais próxima de você."
        canonical="/paroquias"
      />
      {/* Hero Banner */}
      <section className="relative bg-gradient-hero pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-p" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-p)" />
          </svg>
        </div>
        <div className="relative container mx-auto px-5 md:px-8 lg:px-10 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-accent font-semibold text-sm tracking-widest uppercase mb-4">Nossa Expansão</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-5">
              Nossas <span className="font-serif italic font-medium text-accent">Paróquias</span>
            </h1>
            <p className="text-white/60 text-lg max-w-xl leading-relaxed">
              Estamos presentes em diversas localidades, levando a Tenda do Encontro para mais perto de você. Conheça nossas congregações.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Parishes Grid */}
      <SectionContainer background="surface">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {data.map((parish, index) => (
            <motion.div
              key={parish._id || parish.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <img 
                  src={parish.image || 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1200&auto=format&fit=crop'} 
                  alt={parish.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <h3 className="text-2xl font-bold text-white tracking-tight">{parish.name}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-6">
                <p className="text-secondary/80 text-lg leading-relaxed">
                  {parish.description}
                </p>

                <div className="grid grid-cols-1 gap-4 pt-4 border-t border-muted/30">
                  <div className="flex items-center gap-3 text-secondary">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                      <FaUserTie />
                    </div>
                    <div>
                      <span className="block text-xs uppercase tracking-wider text-muted-foreground font-bold">Liderança</span>
                      <span className="font-semibold">{parish.leader}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-secondary">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <span className="block text-xs uppercase tracking-wider text-muted-foreground font-bold">Localização</span>
                      <span className="font-semibold">{parish.location}</span>
                    </div>
                  </div>
                </div>

                <a 
                  href={parish.phone ? `tel:${parish.phone.replace(/\D/g,'')}` : '#'} 
                  className="w-full py-4 bg-surface hover:bg-muted/30 border border-muted/40 rounded-xl text-primary font-bold transition-colors flex items-center justify-center gap-2 mt-6"
                >
                  <FaPhoneAlt className="text-accent text-sm" />
                  {parish.phone ? `Ligar: ${parish.phone}` : 'Entrar em Contato'}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionContainer>

      {/* Map Section */}
      <SectionContainer background="white">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Nossa Sede Central</h2>
          <p className="text-secondary text-lg leading-relaxed">
            Se você estiver na Beira, venha nos visitar em nossa sede principal. Para as outras paróquias, entre em contato para localizações detalhadas.
          </p>
        </div>
        <MapContent />
      </SectionContainer>
    </PageLayout>
  );
};

export default ParishesPage;
