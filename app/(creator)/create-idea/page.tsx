export default function CreateIdea() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Create New Idea</h2>
      <form className="bg-white p-6 rounded-lg shadow space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium">Summary</label>
          <textarea className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
        </div>
        {/* Add more form fields for Problem, Solution, etc. */}
        <div>
          <label className="block text-sm font-medium">Milestones</label>
          {/* Placeholder for adding multiple milestones */}
          <button type="button" className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">Add Milestone</button>
        </div>
        <div className="flex space-x-4">
          <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded">Save Draft</button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit for Review</button>
        </div>
      </form>
    </div>
  );
}