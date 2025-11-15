/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
export default function EditModal(props: any) {
	const realEdit = async (id: string) => {
		// const email = document.getElementById("email")?.value
		// const name = document.getElementById("name")?.value
		// const password = document.getElementById("password")?.value
		// const oldpassword = document.getElementById("oldpassword")?.value
		// const type = document.getElementById("type")?.value
		// const status = document.getElementById("status")?.value

		let email, name, type, password, oldpassword, status;
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
		const oldpasswordreq = document.getElementById('oldpassword');
		if (oldpasswordreq) {
			oldpassword = (oldpasswordreq as HTMLInputElement).value;
		}
		const typereq = document.getElementById('type');
		if (typereq) {
			type = (typereq as HTMLInputElement).value;
		}
		const statusreq = document.getElementById('status');
		if (statusreq) {
			status = (statusreq as HTMLInputElement).value;
		}

		await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/users/account/update`, {
			id: id,
			name: name,
			email: email,
			status: status,
			type: type,
			old_password: oldpassword,
			new_password: password
		});
	};
	const handleEdit = async (id) => {
		//alert(id)
		await realEdit(id);
	};
	// const {user}=props.user

	return (
		<div>
			<el-dialog>
				<dialog
					id='dialogEdit'
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
											Edit {props.name}
										</h3>
										{/* <h3 id="dialog-title" className="text-base font-semibold text-gray-900">Remove {props.name}</h3> */}
										<div className='mt-2'>
											<form className='w-full mx-auto justify-center'>
												<div className='mb-5 inline w-full'>
													<label className='flex gap-3 mb-2 text-sm font-medium text-gray-900 dark:text-white'>
														Your name:<p className='text-gray-500'>{props.name}</p>
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
														Your email:<p className='text-gray-500'>{props.email}</p>
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
														Old password
													</label>
													<input
														type='password'
														id='oldpassword'
														className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
														placeholder='********'
														required
													/>
												</div>
												<div className='mb-5 inline w-full'>
													<label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
														New password
													</label>
													<input
														type='password'
														id='password'
														className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
														placeholder='********'
														required
													/>
												</div>
												<div className='mb-5  w-full flex space-x-5 mt-3'>
													<label className='inline mb-2 text-sm font-medium text-gray-900 dark:text-white'>
														Type
													</label>
													<select name='type' id='type' className='inline'>
														<option value='' disabled selected className='text-sm'>
															Promote/Unpromote
														</option>
														<option value='user' className='text-sm'>
															User
														</option>
														<option value='admin' className='text-sm'>
															Admin
														</option>
													</select>
												</div>
												<div className='mb-5  w-full flex space-x-5 mt-3'>
													<label className='inline mb-2 text-sm font-medium text-gray-900 dark:text-white'>
														Status
													</label>
													<select name='status' id='status' className='inline'>
														<option value='' disabled selected className='text-sm'>
															Activate/Desactivate
														</option>
														<option value='true' className='text-sm'>
															Activate
														</option>
														<option value='false' className='text-sm'>
															Desactivate
														</option>
													</select>
												</div>
												<div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
													<button
														type='submit'
														onClick={() => handleEdit(props.id)}
														commandfor='dialogEdit'
														class='inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 sm:ml-3 sm:w-auto'
													>
														Edit
													</button>
													<button
														type='button'
														command='close'
														commandfor='dialogEdit'
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
