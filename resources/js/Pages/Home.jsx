import Card from "@/Components/Atoms/Card";
import MediaCard from "@/Components/Molecules/MediaCard";
import VehicleChart from "@/Components/Molecules/VehicleChart";
import MainLayout from "@/Layouts/MainLayout";
import { Head, usePage } from "@inertiajs/react";
import React from "react";

export default function Home(props) {
    return (
        <MainLayout>
            <Head title="Home" />
            <Card headerText="Grafik Pemakaian Kendaraan Tiap Bulan">
                <VehicleChart monthlyUsage={props?.monthlyUsage} />
            </Card>
        </MainLayout>
    );
}
