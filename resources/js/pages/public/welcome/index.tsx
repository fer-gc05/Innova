import InnovationSection from '@/components/InnovationSection';
import ServicesSection from '@/components/ServicesSection';
import HeroSlider from '@/components/HeroSlider';
import ObjectivesSection from '@/components/ObjectivesSection';
import MainLayout from '@/layouts/main-layout';

export default function Welcome() {
    return (
        <MainLayout title="Red de Innovación – Nuevas oportunidades de negocios" description="Descubre nuevas oportunidades de negocio en la Red de Innovación de Córdoba">
            <HeroSlider />
            <InnovationSection />
            <ServicesSection />
            <ObjectivesSection />
        </MainLayout>
    );
}
