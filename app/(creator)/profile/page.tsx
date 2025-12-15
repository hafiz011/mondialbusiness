const dummyProfile = {
  name: "John Doe",
  email: "john@example.com",
  phone: "123-456-7890",
  address: "New York, USA",
  profileImage: "https://via.placeholder.com/150",
  bio: "Entrepreneur passionate about sustainability.",
  kycStatus: "Approved",
  walletBalance: 50000,
  lastLogin: "2025-12-14",
  accountCreated: "2025-01-01",
};

export default function Profile() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Creator Profile</h2>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center space-x-4 mb-4">
          <img src={dummyProfile.profileImage} alt="Profile" className="h-16 w-16 rounded-full" />
          <div>
            <h3 className="text-xl font-semibold">{dummyProfile.name}</h3>
            <p className="text-gray-600">{dummyProfile.bio}</p>
          </div>
        </div>
        <p><strong>Email:</strong> {dummyProfile.email}</p>
        <p><strong>Phone:</strong> {dummyProfile.phone}</p>
        <p><strong>Address:</strong> {dummyProfile.address}</p>
        <p><strong>KYC Status:</strong> {dummyProfile.kycStatus}</p>
        <p><strong>Wallet Balance:</strong> ${dummyProfile.walletBalance.toLocaleString()}</p>
        <p><strong>Last Login:</strong> {dummyProfile.lastLogin}</p>
        <p><strong>Account Created:</strong> {dummyProfile.accountCreated}</p>
      </div>
    </div>
  );
}