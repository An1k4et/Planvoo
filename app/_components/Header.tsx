"use client";

import { Button } from '@/components/ui/button';
import { Plane } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'
import { AuthModal } from './AuthModal';
import { useUser } from '../hooks/useUser';
import { usePathname, useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const menuOption = [
  {
    id: "home",
    name: "Home",
    url: "/",
  },
  {
    id: "plan-trip",
    name: "Plan Trip",
    url: "#MostVisitedCity",
  },
  {
    id: "contact-us",
    name: "Contact Us",
    url: "#contact",
  },
];

function Header() {

  const { user, loading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const supabase = createSupabaseBrowserClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-slate-950/95 dark:border-slate-800">
      <div className="container flex h-16 items-center justify-between px-4 md:px-0 mx-auto">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Plane className="h-6 w-6 text-slate-900 dark:text-slate-50" />
          <span className="text-slate-900 dark:text-slate-50">Planvoo</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {menuOption.map((menu, index) => (
            <Link
              key={menu.id}
              href={menu.url}
              className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
            >
              {menu.name}
            </Link>
          ))}

        </nav>
        <div className="flex items-center gap-4">
          {/* <AuthModal>
            <Button variant="ghost" size="sm">
              Log In
            </Button>
          </AuthModal> */}
          {!loading && !user && (
            <AuthModal>
              <Button size="sm">Get Started</Button>
            </AuthModal>
          )}


          {!loading && user && (
            <>
              <div className="flex items-center gap-3">
                {pathname !== "/create-new-trip" && (
                  <Button
                    size="sm"
                    onClick={() => router.push("/create-new-trip")}
                  >
                    Create Trip
                  </Button>
                )}

                {pathname === "/create-new-trip" && (


                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => router.push("/my-trips")}
                  >
                    My Trips
                  </Button>

                )}
                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setOpen((prev) => !prev)}
                    className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden border"
                  >
                    {/* <img
                      src={user?.user_metadata?.avatar_url || "/public/avatar.png"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    /> */}
                    <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                      {user?.email?.charAt(0).toUpperCase()}
                    </div>
                  </button>

                  {open && (
                    <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-md border z-50">
                      {/* <div className="px-4 py-2 text-sm border-b">
                        {user?.email}
                      </div> */}

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header
