import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import Link from 'next/link';

export default function Login() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <>
      <Head>
        <title>Iniciar Sesión | AbogaBot</title>
        <meta name="description" content="Accede a tu cuenta de AbogaBot, tu asistente legal con IA" />
      </Head>
      
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <LoginForm />

        <footer className="mt-8 text-center text-gray-500 text-sm">
          <div className="space-x-3">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
          <p className="mt-2">© 2024 LegalAI Suite. All rights reserved. v1.0.0</p>
        </footer>
      </div>
    </>
  );
}
