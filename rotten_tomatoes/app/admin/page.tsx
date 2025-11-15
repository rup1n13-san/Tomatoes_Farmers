/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
	Area,
	AreaChart,
	CartesianGrid,
	Pie,
	PieChart,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts';

export default function AdminDashboardPage() {
	// const [error, setError] = useState<string | null>(null);
	const [nbrUsers, setNbrUsers] = useState(null);
	const [nbrActivesUsers, setNbrActivesUsers] = useState(null);
	const [nbrMovies, setNbrMovies] = useState(null);
	const [nbrComments, setNbrComments] = useState(null);
	// const [users, setUsers] = useState(null);
	const [usersKpi, setUsersKpi] = useState([]);
	const [loading, setLoading] = useState(false);
	const [firstGet, setfirstGet] = useState(true);
	const [movies, setMovies] = useState([]);
	// const fetchMovies = async (query: string | null = null) => {
	//   try {
	//     setError(null);

	//     // setMovies(response.data.movies || []);
	//   } catch (err) {
	//     console.error(err);
	//     setError('Failed to load movies. Please try again later.');
	//   } finally {
	//   }
	// };

	useEffect(() => {
		async function fetchusers() {
			setLoading(true);

			try {
				const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/kpi`);
				setUsersKpi(response.data[0]);
				setNbrUsers(response.data[1][0].users);
				setNbrMovies(response.data[2][0].movies);
				setNbrActivesUsers(response.data[3][0].activesUsers);
				setNbrComments(response.data[4][0].comments);

				const responseMov = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/movies/kpi`);
				setMovies(responseMov.data);
			} catch (error) {
				console.error('Error fetching users:', error);
			} finally {
				setLoading(false);
				setfirstGet(false);
			}
		}

		fetchusers();
	}, [usersKpi]);

	return (
		<div className='p-6 space-y-6'>
			{/* Titre */}
			<h1 className='text-2xl font-semibold'>Dashboard</h1>
			{loading && firstGet ? (
				<div className='flex justify-center items-center py-10'>
					<div className='h-10 w-10 animate-spin rounded-full border-4 border-red-500 border-t-transparent'></div>
				</div>
			) : (
				<div>
					<div className='flex flex-wrap justify-evenly'>
						<AreaChart
							style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
							responsive
							data={usersKpi}
							margin={{
								top: 20,
								right: 0,
								left: 0,
								bottom: 0
							}}
						>
							<CartesianGrid strokeDasharray='3 3' />
							<XAxis dataKey='name' />
							<YAxis width='auto' />
							<Tooltip />
							<Area type='monotone' dataKey='nbr' stroke='#8884d8' fill='#8884d8' />
						</AreaChart>
						<div className='items-center justify-center '>
							<PieChart width={400} height={400}>
								<Pie
									activeShape={{
										fill: 'red'
									}}
									data={[
										// { name: 'All users', uv: nbrUsers },
										{ name: 'Active users', uv: nbrActivesUsers },
										{ name: 'Inactive users', uv: nbrUsers - nbrActivesUsers }
									]}
									dataKey='uv'
								/>
								<Tooltip defaultIndex={2} />
							</PieChart>
							<p className='text-center'>Active VS inactive users</p>
						</div>
					</div>

					<div className=' overflow-x-auto grid gap-4 md:grid-cols-3 xl:grid-cols-6'>
						<div className='bg-white rounded-lg shadow-sm p-4'>
							<p className='text-xs text-gray-500'>Total Users</p>
							<p className='text-2xl font-semibold'>{nbrUsers}</p>
						</div>
						<div className='bg-white rounded-lg shadow-sm p-4'>
							<p className='text-xs text-gray-500'>Active Users</p>
							<p className='text-2xl font-semibold'>{nbrActivesUsers}</p>
						</div>

						<div className='bg-white rounded-lg shadow-sm p-4'>
							<p className='text-xs text-gray-500'>Total Movie</p>
							<p className='text-2xl font-semibold'>{nbrMovies}</p>
						</div>
						<div className='bg-white rounded-lg shadow-sm p-4'>
							<p className='text-xs text-gray-500'>Total comment</p>
							<p className='text-2xl font-semibold'>{nbrComments}</p>
						</div>
					</div>

					<div className='grid gap-4 lg:grid-cols-3 mt-5'>
						<div className='bg-white rounded-lg shadow-sm p-4 lg:col-span-2'>
							<div className='flex items-center justify-between mb-3'>
								<h2 className='font-semibold'>Top 5 Rated movies</h2>
							</div>
							<table className='min-w-full text-left text-sm'>
								<thead className='bg-[#f5f5f8] text-xs font-semibold uppercase tracking-wide text-gray-500'>
									<tr>
										<th className='px-4 py-3'>Image</th>
										<th className='px-4 py-3'>Title</th>
										<th className='px-4 py-3'>Rating</th>
									</tr>
								</thead>

								<tbody className='divide-y divide-gray-100 text-gray-700'>
									{movies?.map((movie: any) => {
										return (
											// onClick={() => { handleShow(movie.overview) }}

											<tr className='hover:bg-gray-50' key={movie.id}>
												<td className='px-4 py-3'>
													<div className='h-14 w-10 overflow-hidden rounded-md bg-gray-200'>
														<img src={movie.path} alt={movie.title} />
													</div>
												</td>
												<td className='px-4 py-3 font-medium text-gray-900'>{movie.title}</td>
												<td className='px-4 py-3 font-medium text-gray-900'>{movie.raiting}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
