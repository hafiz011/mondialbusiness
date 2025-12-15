const dummyIdeas = [
  { id: 1, title: "Eco-Friendly Packaging", stage: "MVP", status: "Approved", fundingRaised: 50000 },
  { id: 2, title: "AI Chatbot for Health", stage: "Growth", status: "Pending", fundingRaised: 70000 },
  { id: 3, title: "Sustainable Fashion App", stage: "Idea", status: "Rejected", fundingRaised: 30000 },
];

export default function MyIdeas() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Ideas</h2>
      <table className="w-full bg-white rounded-lg shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Stage</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Funding Raised</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dummyIdeas.map((idea) => (
            <tr key={idea.id} className="border-t">
              <td className="p-4">{idea.title}</td>
              <td className="p-4">{idea.stage}</td>
              <td className="p-4">{idea.status}</td>
              <td className="p-4">${idea.fundingRaised.toLocaleString()}</td>
              <td className="p-4">
                <a href={`/ideas/${idea.id}`} className="text-blue-600 hover:underline">View</a> / 
                <a href={`/edit-idea/${idea.id}`} className="text-blue-600 hover:underline ml-2">Edit</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}