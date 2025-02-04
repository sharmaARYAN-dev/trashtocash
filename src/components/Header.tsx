"use client";

import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header({ session }: { session: Session | null }) {
  const router = useRouter();
  const [showDropdown, setSshowDropdown] = useState(false);

  const handleNavigation = (path: string) => {
    setSshowDropdown(false);
    router.push(path);
  };

  return (
    <header className="border-b p-4 header flex items-center justify-between h-16">
      <Link className="font-bold logoname text-2xl " href="/">
        Trash2Cash
      </Link>
      <nav className="flex items-center gap-4">
        <span className="border-r"></span>
        {!session?.user && (
          <>
            <button
              onClick={() => handleNavigation('/register')} // Navigate to Register page
              className="loginbutton text-white border-0 px-6 py-1"
            >
              Get Started
            </button>
          </>
        )}
        {session?.user && (
          <>
            <div className="relative flex items-center">
              <button onClick={() => setSshowDropdown(prev => !prev)}>
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt="avatar"
                    width={36}
                    height={36}
                    className={`rounded-full relative ${showDropdown ? 'z-50' : ''}`}
                  />
                ) : (
                  <FontAwesomeIcon icon={faUser} className="text-black" size="2x" />
                )}
              </button>
              {showDropdown && (
                <>
                  <div
                    onClick={() => setSshowDropdown(false)}
                    className="bg-black/90 fixed inset-0 z-40"
                  ></div>
                  <div className="absolute z-50 right-0 top-9 bg-white rounded w-32 border">
                    <Link
                      href={`/profile/${session.user.email}`} // Use email for navigation
                      className="p-2 block text-center w-full"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => handleNavigation('/my-ads')} // Navigate to My Ads
                      className="p-2 block text-center w-full"
                    >
                      My Ads
                    </button>
                    <button
                      className="p-2 block w-full"
                      onClick={() => {
                        setSshowDropdown(false);
                        signOut();
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
