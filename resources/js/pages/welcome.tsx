import { Head } from '@inertiajs/react';
import Header from '@/components/Header';
import InnovationSection from '@/components/InnovationSection';
import ServicesSection from '@/components/ServicesSection';
import Footer from '@/components/Footer';
import HeroSlider from '@/components/HeroSlider';
import ObjectivesSection from '@/components/ObjectivesSection';


export default function Welcome() {
    return (
        <>
            <Head title="Red de Innovación – Nuevas oportunidades de negocios">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Quicksand:wght@400;500;600;700&family=Poppins:wght@400;500;600&family=Lato:wght@400;700&display=swap" rel="stylesheet" />
            </Head>
            <div className="min-h-screen">
                <Header />
                <HeroSlider />
                <InnovationSection />
                <ServicesSection />
                <ObjectivesSection />
                {/* White spacer between section and footer */}
                <div className="h-10 md:h-12 bg-white" />
                <Footer />
            </div>
        </>
    );
}
