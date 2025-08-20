import React from 'react';
import HeroSection from '../components/HeroSection';
import InnovationSection from '../components/InnovationSection';
import NetworkSection from '../components/NetworkSection';
import ServicesSection from '../components/ServicesSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <InnovationSection />
      <NetworkSection />
      <ServicesSection />
    </>
  );
}