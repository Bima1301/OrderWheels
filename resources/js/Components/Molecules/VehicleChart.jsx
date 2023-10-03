import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

export default function VehicleChart({ monthlyUsage }) {
    console.log(monthlyUsage);
    const data = Object.entries(monthlyUsage).map(([key, value]) => {
        return {
            Bulan: key,
            Kendaraan: value,
        };
    });
    return (
        <ResponsiveContainer width="100%" height={340}>
            <BarChart
                height={400}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Bulan" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Kendaraan" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
    );
}
