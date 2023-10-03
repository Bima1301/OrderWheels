import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Transition from "@/Components/Atoms/Transition";
import Sidebar from "@/Components/Molecules/Sidebar";
import Topbar from "@/Components/Molecules/Topbar";
import useIsMobile from "@/Components/Hooks/useIsMobile";
import { usePage } from "@inertiajs/react";

export default function MainLayout({ children, category }) {
    const [showNav, setShowNav] = useState(true);

    const { auth } = usePage().props;
    const isMobile = useIsMobile();
    useEffect(() => {
        if (isMobile) {
            setShowNav(false);
        } else {
            setShowNav(true);
        }
    }, [isMobile]);

    return (
        <section className="bg-indigo-100 min-h-screen">
            <Toaster toastOptions={{ style: { backgroundColor: "#f1f5f9" } }} />
            <Topbar
                showNav={showNav}
                setShowNav={setShowNav}
                name={auth?.user?.name}
            />
            <Transition show={showNav}>
                <Sidebar
                    setShowNav={setShowNav}
                    category={category}
                    userRole={auth?.user?.role?.name}
                />
            </Transition>
            <div className={`pt-24 ${showNav && !isMobile ? "pl-64" : ""}`}>
                <main className="bg-transparent overflow-hidden rounded-sm md:p-12 p-7">
                    {children}
                </main>
            </div>
        </section>
    );
}
