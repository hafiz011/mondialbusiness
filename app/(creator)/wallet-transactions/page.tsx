const dummyWallet = {
  balance: 50000,
  transactions: [
    { type: "Investment", amount: 10000, status: "Completed", date: "2025-02-01" },
    { type: "Withdrawal", amount: -5000, status: "Pending", date: "2025-03-01" },
  ],
};

export default function WalletTransactions() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Wallet & Transactions</h2>
      <div className="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Wallet Balance</h3>
          <p className="text-3xl">${dummyWallet.balance.toLocaleString()}</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Withdraw</button>
      </div>
      <table className="w-full bg-white rounded-lg shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 text-left">Type</th>
            <th className="p-4 text-left">Amount</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {dummyWallet.transactions.map((tx, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-4">{tx.type}</td>
              <td className="p-4">{tx.amount > 0 ? `+$${tx.amount}` : `-$${Math.abs(tx.amount)}`}</td>
              <td className="p-4">{tx.status}</td>
              <td className="p-4">{tx.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}