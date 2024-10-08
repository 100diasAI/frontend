import React from "react";
import BarChart from "../../components/DashboardAdmin/graficoBarras";
import LineChart from "../../components/DashboardAdmin/graficoLineas";
import Totales from "../../components/DashboardAdmin/Totales.jsx";
import './index.css'
export default function Admin() {
    document.title = "Shopping Online - Admin";
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
    return (
        <div>
            <Totales />
            <div className="graficos">
            <LineChart />
            <BarChart />
            </div>
        </div>
    );
}