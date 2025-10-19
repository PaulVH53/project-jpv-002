import React from 'react';
import { Helmet } from 'react-helmet';
import Hero from '@/components/Hero';
import AboutUs from '@/components/AboutUs';
import Process from '@/components/Process';
import SuccessStories from '@/components/SuccessStories';
import Testimonials from '@/components/Testimonials';

const LandingPage = () => {
  return (
    <>
      <Helmet>
        <title>Latam Executive Search - Conectamos el mejor talento con las mejores oportunidades</title>
        <meta name="description" content="Plataforma líder de headhunting en Latinoamérica. Conectamos profesionales excepcionales con empresas de alto nivel a través de nuestro proceso especializado de reclutamiento ejecutivo." />
      </Helmet>
      <Hero />
      <AboutUs />
      <Process />
      <SuccessStories />
      <Testimonials />
    </>
  );
};

export default LandingPage;