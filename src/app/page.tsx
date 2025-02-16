"use client";

import AdItem from "@/components/AdItem";
import { Ad } from "@/models/Ad";
import { useEffect, useState } from "react";
import { FiTag, FiGrid, FiBell, FiUserPlus, FiLayout, FiBookmark, FiUsers, FiFolder, FiStar, FiSettings } from "react-icons/fi";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

export default function Home() {
  const [allAds, setAllAds] = useState<Ad[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true); // Sidebar toggle state
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    async function checkSession() {
      const userSession = await getSession();
      setSession(userSession);
    }
    checkSession();
  }, []);

  useEffect(() => {
    if (session) {
      fetchAds();
    }
  }, [session]);

  function fetchAds(params?: URLSearchParams) {
    const url = `/api/ads?${params?.toString() || ""}`;
    fetch(url)
      .then((response) => response.json())
      .then((adsDocs) => {
        setAllAds(adsDocs);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching ads:", error);
        setIsLoading(false);
      });
  }

  const handleNavigation = (path: string) => {
    window.location.href = path;
  };

  function handleSearch(formData: FormData) {
    const params = new URLSearchParams();

    formData.forEach((value, key) => {
      if (typeof value === "string") {
        params.set(key, value);
      }
    });

    fetchAds(params);
  }

  if (session === undefined) {
    return <p>Loading...</p>;
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold text-gray-700">
        Login to get started with Trash 2 Cash
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-200 text-black ${
          isExpanded ? "w-64" : "w-16"
        } flex flex-col p-4 transition-all duration-300`}
      >
        {/* Search Bar */}
        <form action={handleSearch} className="mb-6">
          <input
            name="phrase"
            type="text"
            placeholder="Search Trash2Cash"
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </form>

        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mb-6 text-black focus:outline-none p-2 rounded-xl flex items-center justify-between w-full transition-all duration-200 hover:bg-gray-300"
        >
          {isExpanded && (
            <span className="text-lg font-semibold text-black">Menu</span>
          )}
          <FiLayout size={24} className="text-black hover:bg-gray-300 rounded" />
        </button>

        {/* Menu Items */}
        <ul className="space-y-4">
          {/* Sell */}
          <li
            className="flex items-center space-x-4 hover:bg-gray-400 rounded-xl p-2 cursor-pointer"
            title={isExpanded ? "" : "Sell"}
            onClick={() => handleNavigation("/postItem")}
          >
            <FiTag size={20} />
            {isExpanded && <span>Sell</span>}
          </li>

          {/* Browse All */}
          <li
            className="flex items-center space-x-4 hover:bg-gray-400 rounded-xl p-2 cursor-pointer"
            title={isExpanded ? "" : "Browse All"}
          >
            <FiGrid size={20} />
            {isExpanded && <span>Browse All</span>}
          </li>

          {/* Notification */}
          <li
            className="flex items-center space-x-4 hover:bg-gray-400 rounded-xl p-2 cursor-pointer"
            title={isExpanded ? "" : "Notification"}
          >
            <FiBell size={20} />
            {isExpanded && <span>Notification</span>}
          </li>

          {/* Become a Collector */}
          <li
            className="flex items-center space-x-4 hover:bg-gray-400 rounded-xl p-2 cursor-pointer"
            title={isExpanded ? "" : "Become a Collector"}
            onClick={() => handleNavigation("/collector")}
          >
            <FiUserPlus size={20} />
            {isExpanded && <span>Become a Collector</span>}
          </li>

          {/* Categories Section */}
          <li className="mt-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">
              {isExpanded ? "Categories" : ""}
            </h3>
            <ul className="space-y-2">
              <li
                className="flex items-center space-x-4 hover:bg-gray-400 rounded-xl p-2 cursor-pointer"
                title={isExpanded ? "" : "Custom Feeds"}
              >
                <FiBookmark size={20} />
                {isExpanded && <span>Custom Feeds</span>}
              </li>
              <li
                className="flex items-center space-x-4 hover:bg-gray-400 rounded-xl p-2 cursor-pointer"
                title={isExpanded ? "" : "Network"}
              >
                <FiUsers size={20} />
                {isExpanded && <span>Network</span>}
              </li>
              <li
                className="flex items-center space-x-4 hover:bg-gray-400 rounded-xl p-2 cursor-pointer"
                title={isExpanded ? "" : "Bookmarks"}
              >
                <FiFolder size={20} />
                {isExpanded && <span>Bookmarks</span>}
              </li>
              <li
                className="flex items-center space-x-4 hover:bg-gray-400 rounded-xl p-2 cursor-pointer"
                title={isExpanded ? "" : "Discover"}
              >
                <FiStar size={20} />
                {isExpanded && <span>Discover</span>}
              </li>
            </ul>
          </li>

          {/* Settings */}
          <li
            className="flex items-center space-x-4 hover:bg-gray-400 rounded-xl p-2 cursor-pointer"
            title={isExpanded ? "" : "Settings"}
            onClick={() => handleNavigation("/settings")}
          >
            <FiSettings size={20} />
            {isExpanded && <span>Settings</span>}
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="content-scrollable grow p-6 bg-gray-100">
        <h2 className="text-xl font-bold mb-4">Latest Products</h2>
        {isLoading ? (
          <p>Loading products...</p>
        ) : allAds.length === 0 ? (
          <p className="text-gray-500">
            No products found. Please check back later.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 h-42">
            {allAds.map((ad) => (
              <AdItem ad={ad} key={ad._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}