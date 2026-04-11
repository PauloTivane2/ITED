import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  twitterHandle?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = '/og-image.jpg', // Valor padrão se existir
  ogType = 'website',
  twitterHandle = '@ited_church',
}) => {
  const siteName = 'ITED — Tenda do Encontro com Deus';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const siteDescription = description || 'Igreja Internacional Tenda do Encontro com Deus — fé, comunhão e transformação espiritual através da palavra de Deus.';
  const siteKeywords = keywords || 'ITED, Igreja, Tenda do Encontro com Deus, Fé, Jesus Cristo, Matacuanne, Beira, Moçambique';
  const siteUrl = 'https://ited-three.vercel.app';
  const currentUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;

  return (
    <Helmet>
      {/* Basic */}
      <title>{fullTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />
      <link rel="canonical" href={currentUrl} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />

      {/* Mobile Meta */}
      <meta name="theme-color" content="#0f172a" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    </Helmet>
  );
};
