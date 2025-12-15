"use client";

import dynamic from "next/dynamic";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Pie = dynamic(
  () => import("react-chartjs-2").then((m) => m.Pie),
  { ssr: false }
);

export default function DashboardChart() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-semibold mb-4">Funding Progress</h3>
      <Pie
        data={{
          labels: ["Idea A", "Idea B", "Idea C"],
          datasets: [
            {
              data: [40, 35, 25],
              backgroundColor: ["#3b82f6", "#10b981", "#ef4444"],
            },
          ],
        }}
      />
    </div>
  );
}
