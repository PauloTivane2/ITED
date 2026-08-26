import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ExternalLink } from 'lucide-react';

export const MapContent: React.FC = () => {
  const coordinates = {
    lat: -19.828316,
    lng: 34.875677,
  };
  
  const mapsUrl = "https://maps.app.goo.gl/Vn6iaZRVSL9f9Hg69";
  
  // Custom Google Maps Embed URL using Church Name + Coordinates and reduced zoom
  const churchName = "ITED - Igreja Tenda do Encontro com Deus";
  const embedUrl = `https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}+(${encodeURIComponent(churchName)})&t=k&z=17&ie=UTF8&iwloc=A&output=embed`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Map Container */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="lg:col-span-8 relative group"
      >
        <div className="relative h-[250px] sm:h-[300px] md:h-[400px] w-full rounded-3xl overflow-hidden border border-white/[0.08] shadow-dark-card bg-[#0B101D] p-2">
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: '1.25rem' }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps ITED"
            className="contrast-[1.05]"
          />
        </div>
      </motion.div>

      {/* Info Card - Simplified for integration */}
      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="lg:col-span-4 flex flex-col justify-center"
      >
        <div className="bg-[#0B101D] rounded-3xl border border-white/[0.08] shadow-dark-card p-6 md:p-8 relative overflow-hidden group h-full">
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <MapPin className="w-4 h-4" />
                </div>
                Nossa Sede
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Matacuane, Beira — Moçambique<br />
                Estamos de braços abertos para acolher a sua família.
              </p>
            </div>

            <a 
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-gradient-accent text-white text-sm font-semibold py-3.5 rounded-xl shadow-glow hover:shadow-glow-lg transition-all duration-normal active:scale-95 group"
            >
              <span>Abrir no Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const MapSection: React.FC = () => {
  return (
    <section id="localizacao" className="py-20 bg-[#060911] relative overflow-hidden text-slate-200">
      <div className="container mx-auto px-5 md:px-10 max-w-7xl relative z-10">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-bold uppercase tracking-widest mb-4"
          >
            <MapPin className="w-3 h-3" />
            Localização
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight"
          >
            Venha nos <span className="text-gradient">Visitar</span>
          </motion.h2>
        </div>

        <MapContent />
      </div>
    </section>
  );
};
