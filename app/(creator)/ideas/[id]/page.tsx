"use client";

import { useState } from "react";
import { Tab } from "@headlessui/react";

const dummyIdea = {
  title: "Eco-Friendly Packaging",
  summary: "Sustainable packaging solutions for e-commerce.",
  problem: "Plastic waste",
  solution: "Biodegradable materials",
  marketSize: "10B",
  revenueModel: "Subscription",
  fundingRequired: 100000,
  equityOffered: 10,
  stage: "MVP",
  status: "Approved",
  createdDate: "2025-01-01",
  milestones: [
    { title: "Prototype Development", description: "Build initial prototype", targetDate: "2025-03-01", status: "Completed" },
  ],
  investmentRounds: [
    { name: "Seed", targetAmount: 50000, minInvestment: 1000, maxInvestment: 10000, openDate: "2025-01-15", closeDate: "2025-04-15", status: "Closed" },
  ],
  investors: [
    { name: "Investor A", amount: 20000, equity: 2, date: "2025-02-01" },
  ],
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function IdeaDetails({ params }: { params: { id: string } }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Idea Details: {dummyIdea.title}</h2>
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1">
          <Tab className={({ selected }) => classNames("w-full rounded-lg py-2.5 text-sm font-medium leading-5", selected ? "bg-white shadow" : "text-gray-700")}>Overview</Tab>
          <Tab className={({ selected }) => classNames("w-full rounded-lg py-2.5 text-sm font-medium leading-5", selected ? "bg-white shadow" : "text-gray-700")}>Milestones</Tab>
          <Tab className={({ selected }) => classNames("w-full rounded-lg py-2.5 text-sm font-medium leading-5", selected ? "bg-white shadow" : "text-gray-700")}>Investment Rounds</Tab>
          <Tab className={({ selected }) => classNames("w-full rounded-lg py-2.5 text-sm font-medium leading-5", selected ? "bg-white shadow" : "text-gray-700")}>Investors</Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel className="bg-white rounded-lg p-4 shadow">
            <p><strong>Summary:</strong> {dummyIdea.summary}</p>
            <p><strong>Problem:</strong> {dummyIdea.problem}</p>
            <p><strong>Solution:</strong> {dummyIdea.solution}</p>
            {/* Add more fields */}
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "50%" }}></div>
              </div>
              <p>Funding Progress: 50%</p>
            </div>
            <p>Equity Offered vs Sold: {dummyIdea.equityOffered}% vs 5%</p>
          </Tab.Panel>
          <Tab.Panel className="bg-white rounded-lg p-4 shadow">
            <ul>
              {dummyIdea.milestones.map((milestone, idx) => (
                <li key={idx}>
                  <strong>{milestone.title}:</strong> {milestone.description} - {milestone.status}
                </li>
              ))}
            </ul>
          </Tab.Panel>
          <Tab.Panel className="bg-white rounded-lg p-4 shadow">
            <ul>
              {dummyIdea.investmentRounds.map((round, idx) => (
                <li key={idx}>
                  <strong>{round.name}:</strong> Target ${round.targetAmount} - {round.status}
                </li>
              ))}
            </ul>
          </Tab.Panel>
          <Tab.Panel className="bg-white rounded-lg p-4 shadow">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Equity</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {dummyIdea.investors.map((investor, idx) => (
                  <tr key={idx}>
                    <td>{investor.name}</td>
                    <td>${investor.amount}</td>
                    <td>{investor.equity}%</td>
                    <td>{investor.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}