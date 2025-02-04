'use server';

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connect } from "@/libs/helpers";
import { Admodel } from "@/models/Ad";
import User from "@/models/User"; // Importing the User model
import { getServerSession } from "next-auth";

type Props = {
  params: { email: string };
};

export default async function ProfilePage({ params }: Props) {
  await connect();

  const { email } = params;

  if (!email) {
    return <div>Invalid Email!</div>;
  }

  // Fetch the user details using email
  const user = await User.findOne({ email });
  if (!user) {
    return <div>User not found!</div>;
  }

  // Fetch ads posted by the user
  const ads = await Admodel.find({ userEmail: email });

  // Get the current session
  const session = await getServerSession(authOptions);

  const isCurrentUser = session?.user?.email === email;

  return (
    <div className="p-8 text-gray-800">
      {/* User Details */}
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h1 className="text-2xl font-bold">Profile: {user.name || "User"}</h1>
        <p className="mt-2">
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Contact:</strong> {user.contactNo || "Not Provided"}
        </p>
        <p>
          <strong>Address:</strong> {user.homeAddress || "Not Provided"}
        </p>
        <p>
          <strong>Joined on:</strong> {new Date(user.createdAt).toLocaleDateString()}
        </p>
        {isCurrentUser && (
          <p className="mt-2 text-green-500 font-medium">
            This is your profile.
          </p>
        )}
      </div>

      {/* User Ads */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Listings by {user.name || "User"}</h2>
        {ads.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ads.map((ad) => (
              <div
                key={ad._id}
                className="bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition"
              >
                <h3 className="text-lg font-bold">{ad.title}</h3>
                <p className="text-sm">{ad.category}</p>
                <p className="text-sm text-gray-600">{ad.address}</p>
                {Number(ad.price) > 0 && (
                  <p className="mt-2 text-green-600 font-medium">
                    Price: ₹{ad.price.toString()}
                  </p>
                )}
                <a
                  href={`/ad/${ad._id}`}
                  className="mt-2 inline-block text-blue-500 hover:underline"
                >
                  View Details
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p>No ads posted by this user yet.</p>
        )}
      </div>
    </div>
  );
}
