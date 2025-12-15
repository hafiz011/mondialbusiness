"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const dummyData = {
  totalIdeas: 3,
  totalFundRaised: 150000,
  activeInvestors: 12,
  walletBalance: 50000,
  fundingProgress: {
    labels: ["Idea 1", "Idea 2", "Idea 3"],
    datasets: [{ data: [50000, 70000, 30000], backgroundColor: ["#3b82f6", "#10b981", "#ef4444"] }],
  },
  recentActivities: [
    "New investment in Idea 1: $10,000",
    "Milestone completed for Idea 2",
    "Idea 3 submitted for review",
  ],
};

export default function Home() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard Home</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Ideas</h3>
          <p className="text-3xl">{dummyData.totalIdeas}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Fund Raised</h3>
          <p className="text-3xl">${dummyData.totalFundRaised.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Active Investors</h3>
          <p className="text-3xl">{dummyData.activeInvestors}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Wallet Balance</h3>
          <p className="text-3xl">${dummyData.walletBalance.toLocaleString()}</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow mb-8">
        <h3 className="text-lg font-semibold mb-4">Funding Progress</h3>
        <Pie data={dummyData.fundingProgress} />
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
        <ul className="space-y-2">
          {dummyData.recentActivities.map((activity, index) => (
            <li key={index} className="text-gray-600">{activity}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}