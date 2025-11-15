
import Navbar from '@/components/Navbar';
import type { ReactNode } from "react";
import Sidebar from '@/components/Sidebar';
import { Toaster } from 'react-hot-toast';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
		<>
			<div className='bg-[#f5f5f8] text-[#111827]'>
				<div className='flex min-h-screen'>
					<Sidebar />
					<div className='flex-1 flex flex-col'>
						<Navbar />
						<Toaster position='top-right' />
						<main className='p-6'>{children}</main>
					</div>
				</div>
			</div>
		</>
	);
}