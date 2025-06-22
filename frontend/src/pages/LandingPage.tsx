import React from 'react';
import Header from '../components/landing/Header';
import Hero from '../components/landing/Hero';
import Benefits from '../components/landing/Benefits';
import Features from '../components/landing/Features';
import Testimonials from '../components/landing/Testimonials';
import CTA from '../components/landing/CTA';
import Footer from '../components/landing/Footer';

function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Features />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage; 