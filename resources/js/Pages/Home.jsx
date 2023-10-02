import MediaCard from "@/Components/Molecules/MediaCard";
import MainLayout from "@/Layouts/MainLayout";
import { Head, usePage } from "@inertiajs/react";
import React from "react";

export default function Home() {
    const data = usePage().props;

    return (
        <MainLayout>
            <Head title="Home" />
            <div>
                <p></p>
            </div>
            <div className=" py-10 px-12">
                <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <MediaCard />
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}
