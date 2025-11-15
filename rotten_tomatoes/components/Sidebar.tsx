"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	FiHome,
	FiFilm,
	FiUsers,
	FiChevronLeft,
	FiChevronRight,
} from 'react-icons/fi';
import { HiOutlineSave } from 'react-icons/hi';

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
		<aside
			className={`
        mySidebar
        min-h-screen
        bg-[#f5f5f8]
        border-r border-gray-200
        p-4
        flex flex-col
        transition-all duration-200
        ${isOpen ? 'w-60' : 'w-16'}
      `}
		>
			<div className='mb-6 flex items-center justify-between'>
				{isOpen && (
					<span className='text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500'>
						Admin Menu
					</span>
				)}

				<button
					onClick={toggleSidebar}
					className='ml-auto flex h-6 w-6 items-center justify-center rounded-md bg-white text-gray-600 shadow-sm'
				>
					{isOpen ? <FiChevronLeft className='w-4 h-4' /> : <FiChevronRight className='w-4 h-4' />}
				</button>
			</div>

			<Link
				href='/admin'
				className={`mb-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
					pathname === '/admin'
						? 'bg-red-600 text-white shadow-sm'
						: 'text-gray-700 hover:bg-white hover:text-red-600'
				}`}
			>
				<FiHome className='text-lg' />
				{isOpen && <span>Dashboard</span>}
			</Link>

			{/* Movies */}
			<Link
				href='/admin/movies'
				className={`mb-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
					pathname.startsWith('/admin/movies')
						? 'bg-red-600 text-white shadow-sm'
						: 'text-gray-700 hover:bg-white hover:text-red-600'
				}`}
			>
				<FiFilm className='text-lg' />
				{isOpen && <span>Movies</span>}
			</Link>
			{/*Saved Movies */}
			<Link
				href='/admin/saved-movies'
				className={`mb-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
					pathname.startsWith('/admin/saved-movies')
						? 'bg-red-600 text-white shadow-sm'
						: 'text-gray-700 hover:bg-white hover:text-red-600'
				}`}
			>
				<HiOutlineSave className='text-lg' />
				{isOpen && <span>Saved Movies</span>}
			</Link>

			<Link
				href='/admin/users'
				className={`mb-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
					pathname.startsWith('/admin/users')
						? 'bg-red-600 text-white shadow-sm'
						: 'text-gray-700 hover:bg-white hover:text-red-600'
				}`}
			>
				<FiUsers className='text-lg' />
				{isOpen && <span>Users</span>}
			</Link>
			{/* <Link
        href="/admin/stats"
        className={`mb-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
          pathname.startsWith("/admin/stats")
            ? "bg-red-600 text-white shadow-sm"
            : "text-gray-700 hover:bg-white hover:text-red-600"
        }`}
      >
        <FiBarChart2 className="text-lg" />
        {isOpen && <span>Stats</span>}
      </Link> */}
		</aside>
	);
}
