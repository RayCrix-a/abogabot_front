import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import Head from 'next/head';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Página no encontrada | AbogaBot</title>
        <meta name="description" content="La página que buscas no existe" />
      </Head>
      
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-dark text-white">
        <div className="text-center max-w-lg">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-dark-lighter flex items-center justify-center">
            <img src="/images/logo.png" alt="AbogaBot Logo" className="w-16 h-16" />
          </div>
          
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-2">Página no encontrada</h2>
          <p className="text-gray-400 mb-8">
            La página que estás buscando no existe o ha sido movida a otra ubicación.
          </p>
          
          <Link href="/">
            <button className="btn-primary flex items-center gap-2 mx-auto">
              <FiArrowLeft />
              Volver al inicio
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
