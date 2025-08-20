import { Head } from '@inertiajs/react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import InnovationSection from '@/components/InnovationSection';
import NetworkSection from '@/components/NetworkSection';
import ServicesSection from '@/components/ServicesSection';
import Footer from '@/components/Footer';

export default function Welcome() {
    return (
        <>
            <Head title="IN-NOVA - Red de Innovación de Córdoba">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen">
                <Header />
                <HeroSection />
                <InnovationSection />
                <NetworkSection />
                <ServicesSection />
                <Footer />
            </div>
        </>
    );
}
