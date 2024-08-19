import React, { useState } from "react";

function AddMilestone() {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    time_type: "Days",
    n_o_days: "01",
    file: null,
    business_id: "",
  });

  const [fileAlert, setFileAlert] = useState("");
  const [milestones, setMilestones] = useState([
    { id: 1, title: "Milestone 1", business: "Business 1", amount: 1000, status: "In Progress" },
    // Add more sample data if needed
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, file: e.target.files[0] });
    setFileAlert("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.file) {
      setFileAlert("No files selected!");
      return;
    }
    // Handle form submission logic here
  };

  const handleStatusChange = (e, id) => {
    const updatedMilestones = milestones.map((milestone) =>
      milestone.id === id ? { ...milestone, status: e.target.value } : milestone
    );
    setMilestones(updatedMilestones);
  };

  return (
    <div className="container mx-auto p-6">
      <h3 className="text-left text-lg font-semibold mb-6">Add Business Milestones</h3>
      <form onSubmit={handleSubmit} className="flex text-sm gap-4 items-center mb-8 overflow-hidden">
  <input
    name="title"
    type="text"
    placeholder="Milestone Name"
    className="w-1/5 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    value={form.title}
    onChange={handleInputChange}
    required
  />
  <input
    name="amount"
    type="number"
    placeholder="Amount"
    className="w-1/5 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    value={form.amount}
    onChange={handleInputChange}
    required
  />
  <div className="flex gap-2 w-1/4">
    <select
      name="time_type"
      className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={form.time_type}
      onChange={handleInputChange}
      required
    >
      <option value="Days">Days</option>
      <option value="Weeks">Weeks</option>
      <option value="Months">Months</option>
    </select>
    <select
      name="n_o_days"
      className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={form.n_o_days}
      onChange={handleInputChange}
      required
    >
      {[...Array(30).keys()].map((num) => (
        <option key={num} value={String(num + 1).padStart(2, "0")}>
          {String(num + 1).padStart(2, "0")}
        </option>
      ))}
    </select>
  </div>

  <label className="w-1/5 border bg-green text-white rounded-lg p-2 text-center cursor-pointer hover:bg-gray-800 transition-colors whitespace-nowrap">
    Upload Documentation
    <input
      id="file-upload"
      type="file"
      className="hidden"
      onChange={handleFileChange}
      required
    />
  </label>

  <select
    name="business_id"
    className="w-1/5 border rounded-lg p-2 focus:outline-none "
    value={form.business_id}
    onChange={handleInputChange}
    required
  >
    <option value="" hidden>
      Select Business
    </option>
    <option value="1">Business 1</option>
    <option value="2">Business 2</option>
  </select>

  <button
    type="submit"
    className="w-1/5 bg-green text-white py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400"
    disabled={!form.business_id || !form.title || !form.amount}
  >
    Add Milestone
  </button>
</form>


      <div className="mt-8">
        <h5 className="text-xl text-gray-700 font-semibold mb-4">Recently Added Milestones</h5>
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 border-b">
              <tr className="text-gray-400">
                <th className="text-left py-3 px-4 uppercase font-semibold text-[12px]">Milestone Name</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-[12px]">Business</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-[12px]">Amount</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-[12px]">Status</th>
                <th className="text-center py-3 px-4 uppercase font-semibold text-[12px]">Action</th>
              </tr>
            </thead>
            <tbody>
              {milestones.map((milestone) => (
                <tr key={milestone.id} className="text-gray-500 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 border-b">{milestone.title}</td>
                  <td className="py-3 px-4 border-b">{milestone.business}</td>
                  <td className="py-3 px-4 border-b">${milestone.amount}</td>
                  <td className="py-3 px-4 border-b">
                    <select
                      value={milestone.status}
                      onChange={(e) => handleStatusChange(e, milestone.id)}
                      className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    <button className="border border-black rounded-xl text-black px-4 py-2 hover:text-red-600 transition-colors">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AddMilestone;
