import MainLayout from '@/layouts/main-layout';
import { Company } from '@/types';

interface Props {
    companies: Company[];
}

export default function EmpresasPage({ companies }: Props) {
    return (
        <MainLayout title="Empresas de la Red - IN-NOVA" description="Conoce las empresas que forman parte de la Red de Innovación">
            <div className="bg-white">
                {/* Page Title */}
                <section
                    className="page-title page-title-default title-size-large title-design-centered text-white relative min-h-[200px] flex items-center"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-blue-600/40"></div>

                    {/* Content */}
                    <div className="relative z-10 container mx-auto px-6 py-12">
                        <h1 className="entry-title text-4xl lg:text-5xl font-bold text-center">Empresas de la Red</h1>
                        <p className="text-center text-white/90 mt-4">Descubre las empresas innovadoras que forman parte de nuestra red</p>
                    </div>
                </section>

                {/* Empresas Grid */}
                <section className="py-12 bg-white">
                    <div className="container mx-auto px-6">
                        {companies.length === 0 ? (
                            <div className="text-center py-12">
                                <h3 className="text-xl font-semibold text-gray-600 mb-4">No hay empresas registradas</h3>
                                <p className="text-gray-500">Aún no se han registrado empresas en la plataforma.</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {companies.map((company) => (
                                    <article key={company.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                                        <header className="relative">
                                            <a href={`/empresas/${company.id}`} className="block">
                                                {(company.logo_url || (company.images && company.images.length > 0)) ? (
                                                    <div
                                                        className="w-full h-72 bg-cover bg-center"
                                                        style={{
                                                            backgroundImage: `url(${company.logo_url || (company.images![0].image_url || `/storage/${company.images![0].image_path}`)})`
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="w-full h-72 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                                                        <div className="text-center">
                                                            <div className="text-4xl font-bold text-blue-600 mb-2">
                                                                {company.name.charAt(0).toUpperCase()}
                                                            </div>
                                                            <span className="text-blue-800 font-medium">{company.name}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </a>
                                            <div className="absolute top-4 left-4 bg-white/95 text-blue-700 rounded-md text-center shadow leading-none">
                                                <div className="px-2 py-1">
                                                    <div className="text-lg font-bold leading-none">
                                                        {new Date(company.created_at).getDate()}
                                                    </div>
                                                    <div className="text-[10px] uppercase tracking-wider">
                                                        {new Date(company.created_at).toLocaleDateString('es-ES', { month: 'short' })}
                                                    </div>
                                                </div>
                                            </div>
                                        </header>
                                        <div className="p-5">
                                            <div className="mb-3">
                                                <span className="inline-block bg-blue-50 text-blue-700 text-[11px] font-semibold px-2.5 py-1 rounded">
                                                    {company.responsible_position}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                <a href={`/empresas/${company.id}`} className="hover:text-blue-600">
                                                    {company.name}
                                                </a>
                                            </h3>
                                            <ul className="flex items-center text-xs text-gray-500 gap-3 mb-4">
                                                <li>
                                                    <time>{new Date(company.created_at).toLocaleDateString('es-ES', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}</time>
                                                </li>
                                            </ul>
                                            <p className="text-gray-600 mb-4">
                                                {company.address}
                                            </p>
                                            <a href={`/empresas/${company.id}`} className="inline-block text-blue-600 font-medium hover:underline">
                                                VER DETALLES
                                            </a>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

            </div>
        </MainLayout>
    );
}
