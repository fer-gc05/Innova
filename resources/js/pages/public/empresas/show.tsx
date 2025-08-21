import MainLayout from '@/layouts/main-layout';
import { Company } from '@/types';

interface Props {
    company: Company;
}

export default function CompanyDetailPage({ company }: Props) {
    return (
        <MainLayout
            title={`${company.name} - IN-NOVA`}
            description={`Conoce más sobre ${company.name}, empresa de la Red de Innovación`}
        >
            <div className="bg-white">
                {/* Hero Section */}
                <section className="relative min-h-[400px] flex items-center">
                    {company.logo_url ? (
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${company.logo_url})` }}
                        >
                            <div className="absolute inset-0 bg-black/50"></div>
                        </div>
                    ) : company.images && company.images.length > 0 ? (
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${company.images[0].image_url || `/storage/${company.images[0].image_path}`})` }}
                        >
                            <div className="absolute inset-0 bg-black/50"></div>
                        </div>
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800"></div>
                    )}

                    <div className="relative z-10 container mx-auto px-6 py-12">
                        <div className="max-w-4xl">
                            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                                {company.name}
                            </h1>
                            <p className="text-xl text-white/90 mb-6">
                                Empresa de la Red de Innovación
                            </p>
                            <div className="flex flex-wrap gap-4 text-white/80">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    <span>{company.address}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                    <span>{company.responsible_email}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Company Details */}
                <section className="py-12 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto">
                            <div className="grid lg:grid-cols-3 gap-8">
                                {/* Main Content */}
                                <div className="lg:col-span-2">
                                    <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Información de la Empresa</h2>

                                        <div className="space-y-6">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Datos Generales</h3>
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-600 mb-1">NIT</label>
                                                        <p className="text-gray-900">{company.nit}</p>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-600 mb-1">Dirección</label>
                                                        <p className="text-gray-900">{company.address}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Información de Contacto</h3>
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-600 mb-1">Responsable</label>
                                                        <p className="text-gray-900">{company.responsible_name}</p>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-600 mb-1">Cargo</label>
                                                        <p className="text-gray-900">{company.responsible_position}</p>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                                                        <a href={`mailto:${company.responsible_email}`} className="text-blue-600 hover:underline">
                                                            {company.responsible_email}
                                                        </a>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-600 mb-1">Teléfono</label>
                                                        <a href={`tel:${company.responsible_phone}`} className="text-blue-600 hover:underline">
                                                            {company.responsible_phone}
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Fecha de Registro</h3>
                                                <p className="text-gray-900">
                                                    {new Date(company.created_at).toLocaleDateString('es-ES', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Company Images */}
                                    {company.images && company.images.length > 0 && (
                                        <div className="bg-white rounded-lg shadow-sm p-8">
                                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Galería de Imágenes</h2>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                {company.images.map((image) => (
                                                    <div key={image.id} className="rounded-lg overflow-hidden">
                                                        <img
                                                            src={image.image_url || `/storage/${image.image_path}`}
                                                            alt={image.title || `Imagen de ${company.name}`}
                                                            className="w-full h-64 object-cover"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Sidebar */}
                                <div className="lg:col-span-1">
                                    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Rápida</h3>

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between py-2 border-b border-gray-200">
                                                <span className="text-sm text-gray-600">Empresa</span>
                                                <span className="text-sm font-medium text-gray-900">{company.name}</span>
                                            </div>

                                            <div className="flex items-center justify-between py-2 border-b border-gray-200">
                                                <span className="text-sm text-gray-600">NIT</span>
                                                <span className="text-sm font-medium text-gray-900">{company.nit}</span>
                                            </div>

                                            <div className="flex items-center justify-between py-2 border-b border-gray-200">
                                                <span className="text-sm text-gray-600">Responsable</span>
                                                <span className="text-sm font-medium text-gray-900">{company.responsible_name}</span>
                                            </div>

                                            <div className="flex items-center justify-between py-2 border-b border-gray-200">
                                                <span className="text-sm text-gray-600">Cargo</span>
                                                <span className="text-sm font-medium text-gray-900">{company.responsible_position}</span>
                                            </div>
                                        </div>

                                        <div className="mt-6 pt-6 border-t border-gray-200">
                                            <a
                                                href={`mailto:${company.responsible_email}`}
                                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center block"
                                            >
                                                Contactar Empresa
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
}
