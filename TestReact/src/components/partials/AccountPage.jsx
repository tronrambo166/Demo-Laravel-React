
function AccountPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-6">
          <div className="flex-shrink-0">
            <svg
              className="h-12 w-12 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 14l9-9m0 0l-9-9m9 9H3"
              ></path>
            </svg>
          </div>
          <div className="ml-4">
            <h1 className="text-2xl font-semibold text-gray-800">Account Details</h1>
            <p className="text-gray-500">Manage your account and view your balance</p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">First Name:</span>
            <span className="font-semibold text-gray-800">Daniel</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Last Name:</span>
            <span className="font-semibold text-gray-800">Levy</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Balance Available:</span>
            <span className="font-semibold text-green-600">${171931.3}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Balance Pending:</span>
            <span className="font-semibold text-red-600">${200}</span>
          </div>

          <div className="mt-6">
            <button
              className="btn-primary py-2 px-6 rounded-lg text-white focus:outline-none"
            >
              View Stripe Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
