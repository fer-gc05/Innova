import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
    const [isMobile, setIsMobile] = useState<boolean>(() => {
        // Inicializar con el valor actual para evitar parpadeo
        if (typeof window !== 'undefined') {
            return window.innerWidth < MOBILE_BREAKPOINT;
        }
        return false;
    });

    useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

        const onChange = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };

        mql.addEventListener('change', onChange);
        
        // Verificar si el estado inicial es correcto
        const currentIsMobile = window.innerWidth < MOBILE_BREAKPOINT;
        if (currentIsMobile !== isMobile) {
            setIsMobile(currentIsMobile);
        }

        return () => mql.removeEventListener('change', onChange);
    }, [isMobile]);

    return isMobile;
}
