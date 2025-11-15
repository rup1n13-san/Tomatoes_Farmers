/* eslint-disable @next/next/no-img-element */
interface ShowMoviesModalProps {
	description: string;
	imagePath?: string;
	title: string;
	date: string;
	rating: string;
}

export default function ShowMoviesModal(props: ShowMoviesModalProps) {
	const description = props.description;

	return (
		<div>
			<div>
				<el-dialog>
					<dialog
						id='dialogShow'
						aria-labelledby='dialog-title'
						className='fixed inset-0 size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-transparent'
					>
						<el-dialog-backdrop className='fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in'></el-dialog-backdrop>

						<div
							tabIndex={0}
							className='flex min-h-full items-end justify-center p-4 text-center focus:outline-none sm:items-center sm:p-0'
						>
							<el-dialog-panel className='relative transform overflow-hidden rounded-lg text-left  transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95'>
								<div className='flex items-center justify-center  bg-none py-20'>
									<div className=' mx-auto bg-white rounded-3xl shadow-xl'>
										<div className='rounded-3xl max-w-[300px] shadow-sm '>
											<img
												src={props.imagePath || '/placeholder.jpg'}
												className='rounded-t-3xl justify-center h-56  grid object-cover'
												width='300'
												alt='movie'
											/>

											<div className='group px-5 py-3 grid z-10'>
												<a
													href='#'
													className='group-hover:text-cyan-700 font-bold md:text-2xl line-clamp-2'
												>
													{props.title}
												</a>
												<span className='text-slate-400 pt-2 font-semibold'>({props.date})</span>
												<div
													className='
                                                        max-h-24
                                                        overflow-y-auto
                                                        scrollbar-thin
                                                        scrollbar-thumb-transparent
                                                        scrollbar-track-transparent
                                                        text-sm font-light leading-relaxed
                                                        py-2 px-1
                                                        transition-all duration-300
                                                        hover:max-h-60
                                                    '
												>
													<p className='line-clamp-3 hover:line-clamp-none text-gray-700'>
														{description}
													</p>
												</div>
												<div className=' grid-cols-2 flex group justify-between'>
													<div className='font-black flex flex-col'>
														<span className='text-3xl flex gap-x-1 items-center group-hover:text-yellow-600'>
															{props.rating}
															<svg
																width='24px'
																height='24px'
																viewBox='0 0 24 24'
																fill='none'
																xmlns='http://www.w3.org/2000/svg'
															>
																<g id='SVGRepo_bgCarrier' strokeWidth='0' />

																<g
																	id='SVGRepo_tracerCarrier'
																	strokeLinecap='round'
																	strokeLinejoin='round'
																/>

																<g id='SVGRepo_iconCarrier'>
																	{' '}
																	<path
																		d='M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z'
																		fill='#eab308'
																	/>{' '}
																</g>
															</svg>
														</span>
													</div>
												</div>
											</div>
											<button
												type='button'
												command='close'
												commandfor='dialogShow'
												className=' justify-right  m-3 inline-flex justify-center  rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 w-auto'
											>
												Close
											</button>
										</div>
									</div>
								</div>
							</el-dialog-panel>
						</div>
					</dialog>
				</el-dialog>
			</div>
		</div>
	);
}
