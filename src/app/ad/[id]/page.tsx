"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connect } from "@/libs/helpers";
import Gallery from "@/components/Gallery";
import { Admodel } from "@/models/Ad";
import { getServerSession } from "next-auth";
import User from "@/models/User";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string };
};

export default async function SingleAdPage({ params }: Props) {
  await connect();

  const { id } = params;
  if (!id) {
    return <div className="text-center text-red-500 font-semibold">Invalid ID!</div>;
  }

  const adDoc = await Admodel.findById(id);
  const session = await getServerSession(authOptions);

  if (!adDoc) {
    return <div className="text-center text-gray-500 font-medium">Not Found!</div>;
  }

  const user = await User.findOne({ email: adDoc.userEmail });

  const contactNumber = adDoc.contact
    ? adDoc.contact.startsWith("+91")
      ? adDoc.contact
      : `+91${adDoc.contact}`
    : "Contact number not provided";

  const whatsappUrl = adDoc.contact
    ? `https://wa.me/${contactNumber}?text=Hi,%20I%20am%20interested%20in%20your%20listing%20titled%20"${adDoc.title}"`
    : null;

  return (
    <div className="flex absolute inset-0 top-16 bg-gray-100">
      {/* Image Section */}
      <div className="w-3/5 grow flex flex-col relative p-6">
        <Gallery files={adDoc.files} />
      </div>

      {/* Details Section */}
      <div className="w-2/5 p-8 bg-white shadow-lg rounded-lg overflow-y-scroll">
        <h1 className="text-2xl font-bold text-gray-800">{adDoc.title}</h1>
        
        {session && session?.user?.email === adDoc.userEmail && (
          <div className="mt-2 flex gap-2">
            {/* Edit functionality (Placeholder for now) */}
          </div>
        )}

        <div className="mt-4 space-y-3">
          <div>
            <label className="block text-sm font-semibold text-gray-600">Description</label>
            <p className="text-gray-700">{adDoc.description}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600">Category</label>
            <p className="text-gray-700">{adDoc.category}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600">Contact</label>
            <p className="text-gray-700">{contactNumber}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600">Address</label>
            <p className="text-gray-700">{adDoc.address}</p>
          </div>

          {Number(adDoc.price) > 0 && (
            <p className="font-medium text-lg text-green-600">
              Price: ₹{adDoc.price.toString()}
            </p>
          )}

          {user && (
            <p className="text-sm text-gray-500">Posted by: <span className="font-semibold text-gray-800">{user.name}</span></p>
          )}
        </div>

        {/* Contact Now Button */}
          {/* Contact Now Button */}
{whatsappUrl ? (
  <div className="mt-6">
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition duration-300 shadow-md"
    >
      {/* WhatsApp Logo */}
      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fillRule="evenodd" clipRule="evenodd" d="M20.52 3.48A11.987 11.987 0 0 0 12 0C5.373 0 0 5.373 0 12c0 2.118.551 4.097 1.593 5.855L0 24l6.396-1.572A11.932 11.932 0 0 0 12 24c6.627 0 12-5.373 12-12 0-3.194-1.243-6.184-3.48-8.52ZM12 21.5c-2.058 0-4.05-.549-5.785-1.588l-.413-.25-3.798.934.937-3.735-.267-.424A9.418 9.418 0 0 1 2.5 12c0-5.247 4.253-9.5 9.5-9.5S21.5 6.753 21.5 12 17.247 21.5 12 21.5Zm4.191-6.778c-.227-.115-1.34-.66-1.548-.735-.208-.075-.36-.115-.512.113-.152.227-.586.735-.72.885-.133.15-.265.17-.492.057-1.34-.67-2.217-1.195-3.118-2.47-.235-.32.235-.297.67-1.004.075-.113.038-.212-.019-.3-.057-.088-.512-1.232-.7-1.69-.184-.442-.37-.38-.512-.387-.133-.007-.285-.009-.438-.009a.855.855 0 0 0-.614.285c-.21.227-.799.78-.799 1.9s.818 2.197.931 2.35c.114.15 1.607 2.45 3.898 3.438 1.444.624 2.016.673 2.738.565.437-.067 1.34-.546 1.527-1.073.188-.526.188-.977.132-1.073-.057-.096-.208-.151-.437-.266Z"/>
      </svg>
      Contact Now
    </a>
  </div>
) : (
  <p className="mt-4 text-red-500 text-sm font-medium">
    Seller has not provided a contact number.
  </p>
)}

      </div>
    </div>
  );
}
