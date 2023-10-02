import { useState, useEffect } from "react";

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            const isMobileDevice = window.innerWidth < 770;
            setIsMobile(isMobileDevice);
        };

        // Periksa status saat komponen pertama kali dimuat.
        checkIsMobile();

        // Tambahkan event listener untuk memantau perubahan ukuran layar (opsional).
        window.addEventListener("resize", checkIsMobile);

        // Bersihkan event listener saat komponen dibongkar.
        return () => {
            window.removeEventListener("resize", checkIsMobile);
        };
    }, []);

    return isMobile;
}

export default useIsMobile;
