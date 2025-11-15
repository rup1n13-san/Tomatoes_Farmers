/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { formatDate } from '@/helpers/dateformat';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AddModal from '../component/UaddModal';
import DeleteUserModal from '../component/UDeleteModal';
import EditModal from '../component/UeditModal';

interface User {
	id: string;
	name: string;
	email: string;
	emailVerified: boolean;
	type: string;
	createdAt: string;
}

export default function UsersPage() {
	const [users, setUsers] = useState<User[]>([]);
	const [allUsers, setAllUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(false);
	const [firstGet, setfirstGet] = useState(true);
	const [userId, setUserId] = useState<string | null>(null);
	const [userName, setUserName] = useState<string | null>(null);
	const [searchTerm, setsearchTerm] = useState<string>('');
	const [userEmail, setuserEmail] = useState<string | null>(null);

	const searchUser = async () => {
		if (!searchTerm.trim()) {
			setUsers(allUsers);
			return;
		}
		const filtered = allUsers.filter(
			(u: any) =>
				u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				u.email.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setUsers(filtered);
	};

	useEffect(() => {
		searchUser();
	}, [searchTerm, allUsers]);

	async function fetchusers() {
		setLoading(true);

		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/getall`);
			// console.log(response.data)
			setUsers(response.data);
			setAllUsers(response.data);
			// console.log(users)
			//console.log(loading)
		} catch (error) {
			console.error('Error fetching users:', error);
		} finally {
			setLoading(false);
			setfirstGet(false);
		}
	}
	useEffect(() => {
		fetchusers();
	}, [users]);

	//const handleDataChange = () => setRefresh((prev) => prev + 1);
	return (
		<div className='px-6 py-6'>
			<div className='mb-4 flex items-baseline justify-between gap-3'>
				<h1 className='text-2xl font-semibold text-gray-800'>User List</h1>
				<span className='text-xs text-gray-500'>Showing {users.length} users</span>
				<div className='flex items-center gap-2'>
					<form
						action=''
						onSubmit={(e) => {
							e.preventDefault();
							searchUser();
						}}
					>
						<input
							type='text'
							id='search'
							onChange={(e) => setsearchTerm(e.currentTarget.value)}
							placeholder='Search here...'
							className='h-9 w-64 rounded-lg border border-gray-300 bg-white px-3 text-xs text-gray-700 placeholder-gray-400 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500'
						/>
					</form>
					<button
						command='show-modal'
						commandfor='dialogAdd'
						className='h-9 rounded-lg bg-red-600 px-4 text-xs font-semibold text-white hover:bg-red-500'
					>
						+ Add User
					</button>
					<AddModal />
				</div>
			</div>

			<div className='overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm'>
				<table className='min-w-full text-left text-sm'>
					<thead className='bg-[#f5f5f8] text-xs font-semibold uppercase tracking-wide text-gray-500'>
						<tr className='text-center'>
							<td className='px-4 py-3'>Name</td>
							<td className='px-4 py-3'>Email</td>
							<td className='px-4 py-3'>Status</td>
							<td className='px-4 py-3'>Type</td>
							<td className='px-4 py-3'>Join Date</td>
							<td className='px-4 py-3 '>Action</td>
						</tr>
					</thead>

					<tbody className='divide-y divide-gray-100 text-gray-700'>
						{/* User 1 */}
						{users.map((user) => (
							<tr
								key={user.id}
								className='hover:bg-gray-50 items-center justify-center text-center'
							>
								<td className='px-4 py-3 font-medium text-gray-900'>{user.name}</td>
								<td className='px-4 py-3 font-medium text-gray-900'>{user.email}</td>
								<td className='px-4 py-3 font-medium text-gray-900'>
									{user.emailVerified ? (
										<span className='inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700'>
											Active
										</span>
									) : (
										<span className='inline-flex items-center rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700'>
											Inactive
										</span>
									)}
								</td>

								<td className='px-4 py-3 font-medium text-gray-900'>{user.type}</td>
								<td className='px-4 py-3 font-medium text-gray-900'>
									{formatDate(user.createdAt)}
								</td>
								<td className='py-3 text-right text-xs flex px-3'>
									<button
										onClick={() => {
											setUserName(user.name);

											setUserId(user.id);
											setuserEmail(user.email);
										}}
										command='show-modal'
										commandfor='dialogEdit'
										className=' cursor-pointer rounded-md px-2 py-1 '
									>
										Edit
									</button>
									<EditModal
										id={userId}
										name={userName}
										email={userEmail}
										//onUserUpdated={handleDataChange}
									/>
									<button
										onClick={() => {
											setUserId(user.id);
											setUserName(user.name);
										}}
										command='show-modal'
										commandfor='dialog'
										className=' cursor-pointer rounded-md px-2 py-1 text-red-600 hover:bg-red-50'
									>
										Delete
									</button>
									<DeleteUserModal id={userId} name={userName} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{loading && firstGet ? (
					<div className='flex justify-center items-center py-10'>
						<div className='h-10 w-10 animate-spin rounded-full border-4 border-red-500 border-t-transparent'></div>
					</div>
				) : (
					<span></span>
				)}
			</div>
		</div>
	);
}
