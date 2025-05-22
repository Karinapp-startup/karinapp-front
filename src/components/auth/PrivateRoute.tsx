"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { Spinner } from '@/components/common/spinner';

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PUBLIC_PATHS = [
    '/complaints/channel',
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password'
];

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const [isChecking, setIsChecking] = useState(true);
    const { isAuthenticated, tokens = { accessToken: null } } = useAppSelector((state) => state.auth);

    console.log('PrivateRoute - Current State:', {
        pathname,
        isAuthenticated,
        accessToken: tokens?.accessToken,
        isChecking
    });

    useEffect(() => {
        const checkAuth = async () => {
            const isPublicRoute = PUBLIC_PATHS.some(path => pathname?.startsWith(path));

            if (!isPublicRoute && (!isAuthenticated || !tokens?.accessToken)) {
                console.log('Redirecting to login - Not authenticated or no token');
                await router.replace('/auth/login');
            } else if (isAuthenticated && tokens?.accessToken && pathname?.startsWith('/auth')) {
                console.log('Redirecting to home - Already authenticated');
                await router.replace('/');
            }

            setIsChecking(false);
        };

        checkAuth();
    }, [isAuthenticated, tokens?.accessToken, pathname, router]);

    // Mientras se verifica la autenticación, mostrar spinner
    if (isChecking) {
        console.log('Showing spinner - Still checking');
        return (
            <div className="fixed inset-0 flex items-center justify-center">
                <Spinner size="xl" />
            </div>
        );
    }

    // Si es una ruta pública, permitir acceso
    if (PUBLIC_PATHS.some(path => pathname?.startsWith(path))) {
        console.log('Allowing access - Public route');
        return <>{children}</>;
    }

    // Si no está autenticado, no mostrar nada
    if (!isAuthenticated || !tokens?.accessToken) {
        console.log('Not showing content - Not authenticated');
        return null;
    }

    console.log('Showing content - Authenticated user');
    return <>{children}</>;
}; 