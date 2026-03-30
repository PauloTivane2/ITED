import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaExternalLinkAlt } from 'react-icons/fa';

export const MapContent: React.FC = () => {
  const coordinates = {
    lat: -19.828316,
    lng: 34.875677,
  };
  
  const mapsUrl = "https://maps.app.goo.gl/Vn6iaZRVSL9f9Hg69";
  
  // Custom Google Maps Embed URL using Church Name + Coordinates and reduced zoom
  const embedUrl = `https://maps.google.com/maps?q=ITED - Igreja Tenda do Encontro com Deus, Matacuane, Beira@${coordinates.lat},${coordinates.lng}&t=k&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Map Container */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="lg:col-span-8 relative group"
      >
        <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-[2.5rem] opacity-0 group-hover:opacity-40 transition-opacity duration-700" />
        <div className="relative h-[250px] sm:h-[300px] md:h-[400px] w-full rounded-[2.5rem] overflow-hidden border border-muted shadow-soft bg-white p-2">
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: '2rem' }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps ITED"
            className="contrast-[1.1]"
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
        <div className="bg-surface rounded-[2.5rem] border border-muted shadow-medium p-5 sm:p-6 md:p-8 relative overflow-hidden group h-full">
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <FaMapMarkerAlt className="w-4 h-4" />
                </div>
                Nossa Sede
              </h3>
              <p className="text-secondary text-sm leading-relaxed mb-6">
                Matacuanne, Beira - Moçambique<br />
                Estamos de braços abertos para te receber.
              </p>
            </div>

            <a 
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-gradient-accent text-white text-sm font-bold py-3.5 rounded-xl shadow-glow hover:shadow-glow-lg transition-all duration-normal active:scale-95 group"
            >
              Ver no Maps
              <FaExternalLinkAlt className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const MapSection: React.FC = () => {
  return (
    <section id="localizacao" className="py-20 bg-surface relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-highlight/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-5 md:px-10 max-w-7xl relative z-10">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-4"
          >
            <FaMapMarkerAlt className="w-3 h-3" />
            Localização
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-serif font-black text-primary mb-4"
          >
            Venha nos <span className="text-gradient">Visitar</span>
          </motion.h2>
        </div>

        <MapContent />
      </div>
    </section>
  );
};
