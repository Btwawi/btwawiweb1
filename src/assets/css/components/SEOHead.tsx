import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export function SEOHead({ 
  title = "BTWAWI - Business The Way Allaah Wants It Initiative",
  description = "Join thousands of faith-driven entrepreneurs building halal businesses across Nigeria. Discover insights, connect with experts, and grow your business the Islamic way.",
  keywords = "halal business, islamic entrepreneurship, muslim business, nigeria, lagos, abuja, faith-driven business, shariah compliant",
  image = "/og-image.jpg",
  url = "https://btwawi.com"
}: SEOHeadProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="BTWAWI Initiative" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
