const dummyFunding = {
  totalRaised: 150000,
  investors: [
    { name: "Investor A", idea: "Idea 1", round: "Seed", amount: 20000, equity: 2, date: "2025-02-01" },
  ],
  equityDistribution: "60% Creator, 40% Investors",
};

export default function FundingInvestors() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Funding & Investors</h2>
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <h3 className="text-lg font-semibold">Total Raised</h3>
        <p className="text-3xl">${dummyFunding.totalRaised.toLocaleString()}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <h3 className="text-lg font-semibold">Equity Distribution</h3>
        <p>{dummyFunding.equityDistribution}</p>
      </div>
      <table className="w-full bg-white rounded-lg shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 text-left">Investor Name</th>
            <th className="p-4 text-left">Idea Name</th>
            <th className="p-4 text-left">Round Name</th>
            <th className="p-4 text-left">Amount</th>
            <th className="p-4 text-left">Equity %</th>
            <th className="p-4 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {dummyFunding.investors.map((investor, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-4">{investor.name}</td>
              <td className="p-4">{investor.idea}</td>
              <td className="p-4">{investor.round}</td>
              <td className="p-4">${investor.amount.toLocaleString()}</td>
              <td className="p-4">{investor.equity}%</td>
              <td className="p-4">{investor.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}