import React from 'react';
import { Helmet } from 'react-helmet-async';

export const StructuredData: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Church",
    "name": "ITED — Igreja Internacional Tenda do Encontro com Deus",
    "alternateName": "ITED Church",
    "description": "Igreja Cristã focada na transformação espiritual e comunhão através da palavra de Deus.",
    "url": "https://ited-three.vercel.app",
    "logo": "https://ited-three.vercel.app/logo.png",
    "image": "https://ited-three.vercel.app/og-image.jpg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Matacuanne",
      "addressLocality": "Beira",
      "addressRegion": "Sofala",
      "addressCountry": "MZ"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-19.8242", // Coordenadas aproximadas da Beira se não tiver as exatas
      "longitude": "34.8389"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Thursday"],
        "opens": "17:00",
        "closes": "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Sunday"],
        "opens": "07:00",
        "closes": "12:00"
      }
    ],
    "sameAs": [
      "https://facebook.com/itedchurch",
      "https://instagram.com/itedchurch",
      "https://youtube.com/@itedchurch"
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};
