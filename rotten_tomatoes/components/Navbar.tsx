"use client";

import { useAuthStore } from "@/lib/useAuthStore";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type NavbarProps = {
  breadcrumb?: string;
};

export default function Navbar({ breadcrumb = "Home" }: NavbarProps) {

  const {user} = useAuthStore();
  return (
    <nav className="mySidebar sticky top-0 z-40 flex items-center border-b border-gray-200 bg-[#f5f5f8]">
      <div className="flex w-full items-center px-6 py-3">
       
        <Link href="/" className="text-sm font-medium text-gray-700">
          {breadcrumb}
        </Link>

        <div className="ml-auto flex items-center gap-4">
          <button
            type="button"
            className="p-2 rounded-full hover:bg-gray-200 transition"
            aria-label="Search"
          >
            <Search className="w-5 h-5 text-gray-700" />
          </button>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col leading-tight text-right">
              <span className="text-sm font-semibold text-gray-900">
                {user?.name || 'Admin User'}
              </span>
              <span className="text-xs text-gray-500">
                Administrator
              </span>
            </div>
            <div className="h-9 w-9 rounded-full overflow-hidden border border-gray-300">
              <Image
                src="/images/admin-avatar.jpg" 
                alt="Admin avatar"
                width={36}
                height={36}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      
    </nav>
  );
}
