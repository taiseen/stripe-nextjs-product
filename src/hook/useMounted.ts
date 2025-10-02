import { useState, useEffect } from 'react';

export function useMounted() {
    const [mounted, setMounted] = useState(false);

    // Wait until client-side to avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    return mounted;
}