"use client";

export function Signin() {
	return (
		<div className='h-screen flex justify-center items-center'>
			<div className='max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100'>
				<div className='px-10'>
					<div className='text-3xl font-extrabold'>Sign in</div>
				</div>
				<div className='pt-2'>
					<LabelledInput
						label='Username'
						placeholder='Enter your username'
					/>
					<LabelledInput
						label='Password'
						type='password'
						placeholder='Enter your password'
					/>
					<button
						onClick={() => {
							console.log("Sign in");
						}}
						type='button'
						className='mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5'>
						Sign in
					</button>
				</div>
			</div>
		</div>
	);
}

interface LabelledInputType {
	label: string;
	placeholder: string;
	type?: string;
}

function LabelledInput({ label, placeholder, type }: LabelledInputType) {
	return (
		<div>
			<label
				htmlFor={label}
				className='block mb-2 text-sm text-black font-semibold pt-4'>
				{label}
			</label>
			<input
				type={type || "text"}
				id={label}
				className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
				placeholder={placeholder}
				required
			/>
		</div>
	);
}
