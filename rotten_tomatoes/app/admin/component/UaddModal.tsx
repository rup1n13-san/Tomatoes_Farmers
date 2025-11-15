import axios from 'axios';
export default function AddModal() {
	const realAdd = async () => {
		// const email = document.getElementById("email")?.value
		// const name = document.getElementById("name")?.value
		// const password = document.getElementById("password")?.value
		// const confirmPassword = document.getElementById("confirmPassword")?.value

		let email, name, password, confirmPassword;
		const emailreq = document.getElementById('email');
		if (emailreq) {
			email = (emailreq as HTMLInputElement).value;
		}
		const namereq = document.getElementById('name');
		if (namereq) {
			name = (namereq as HTMLInputElement).value;
		}
		const passwordreq = document.getElementById('password');
		if (passwordreq) {
			password = (passwordreq as HTMLInputElement).value;
		}
		const confirmPasswordreq = document.getElementById('confirmPassword');
		if (confirmPasswordreq) {
			confirmPassword = (confirmPasswordreq as HTMLInputElement).value;
		}

		await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/account/register`, {
			name: name,
			email: email,
			password: password,
			confirmPassword: confirmPassword
		});
		//alert(email)
	};
	const handleAdd = async () => {
		//alert()
		await realAdd();
	};
	// const {user}=props.user

	return (
		<div>
			<el-dialog>
				<dialog
					id='dialogAdd'
					aria-labelledby='dialog-title'
					className='fixed inset-0 size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-transparent'
				>
					<el-dialog-backdrop className='fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in'></el-dialog-backdrop>

					<div
						tabIndex='0'
						className='flex min-h-full items-end justify-center p-4 text-center focus:outline-none sm:items-center sm:p-0'
					>
						<el-dialog-panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95'>
							<div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
								<div className='sm:flex sm:items-start'>
									<div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
										<h3 id='dialog-title' className='text-base font-semibold text-gray-900'>
											Add
										</h3>
										{/* <h3 id="dialog-title" className="text-base font-semibold text-gray-900">Remove {props.name}</h3> */}
										<div className='mt-2'>
											<form
												className='w-full mx-auto justify-center'
												onSubmit={(e) => {
													e.preventDefault();
													handleAdd();
												}}
											>
												<div className='mb-5 inline w-full'>
													<label className='flex gap-3 mb-2 text-sm font-medium text-gray-900 dark:text-white'>
														Name
													</label>
													<input
														type='text'
														id='name'
														className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
														required
														placeholder='enter new name'
													/>
												</div>
												<div className='mb-5 inline w-full'>
													<label className='flex gap-3 mb-2 text-sm font-medium text-gray-900 dark:text-white'>
														Email<p className='text-gray-500'></p>
													</label>
													<input
														type='email'
														id='email'
														className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
														required
														placeholder='enter new email'
													/>
												</div>

												<div className='mb-5 inline w-full'>
													<label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
														Password
													</label>
													<input
														type='password'
														id='password'
														className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
														placeholder='********'
														required
													/>
												</div>
												<div className='mb-5 inline w-full'>
													<label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
														Confirm password
													</label>
													<input
														type='password'
														id='confirmPassword'
														className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
														placeholder='********'
														required
													/>
												</div>

												<div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
													<button
														type='submit'
														commandfor='dialogAdd'
														class='inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 sm:ml-3 sm:w-auto'
													>
														ADD
													</button>
													<button
														type='button'
														command='close'
														commandfor='dialogAdd'
														class='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
													>
														Cancel
													</button>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</el-dialog-panel>
					</div>
				</dialog>
			</el-dialog>
		</div>
	);
}
