import MainLayout from '@/layouts/main-layout';

export default function TestPage() {
    return (
        <MainLayout title="Test Page" description="Página de prueba">
            <div className="bg-white p-8">
                <h1 className="text-3xl font-bold text-red-600 mb-4">
                    🎉 ¡PÁGINA DE PRUEBA FUNCIONANDO!
                </h1>
                <p className="text-lg text-gray-700 mb-4">
                    Si puedes ver este mensaje, el problema no está en el layout básico.
                </p>
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    <strong>✅ Éxito:</strong> La página se está renderizando correctamente.
                </div>
            </div>
        </MainLayout>
    );
}
