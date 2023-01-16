import React, { useImperativeHandle, useRef } from 'react'
import { User } from '../@types/user'
import { isEmpty, isValidEmail } from '../helper/validators'

type Props = {
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	userData: User
}

export type FormRefHandler = {
	getNameValue: () => string | undefined
	getEmailValue: () => string | undefined
	getPhoneValue: () => string | undefined
}

const FormInputs = React.forwardRef<FormRefHandler, Props>(({ handleInputChange, userData }: Props, ref) => {
	const nameRef = useRef<HTMLInputElement>(null)
	const phoneRef = useRef<HTMLInputElement>(null)
	const emailRef = useRef<HTMLInputElement>(null)

	useImperativeHandle(ref, () => {
		return {
			getNameValue: () => nameRef.current?.value,
			getPhoneValue: () => phoneRef.current?.value,
			getEmailValue: () => emailRef.current?.value,
		}
	})

	return (
		<>
			<div className='flex flex-col mb-2'>
				<label className='lg:text-lg text-gray-500 py-2'> Name </label>
				<input
					onChange={handleInputChange}
					ref={nameRef}
					aria-label='input-name'
					name='name'
					type='text'
					placeholder='Enter name'
					value={userData.name}
					className={`rounded w-full py-2 px-3 leading-tight text-lg lg:text-xl focus:outline-blue-500 focus:shadow ${
						isEmpty(userData.name) && 'border border-red-400 focus:outline-red-400'
					} `}
				/>
				{isEmpty(userData.name) && <p className='text-red-400 ml-2'>Name is a required field</p>}
			</div>
			<div className='flex flex-col mb-2'>
				<label className='lg:text-lg text-gray-500 py-2'> Email address </label>
				<input
					onChange={handleInputChange}
					ref={emailRef}
					name='email'
					type='text'
					placeholder='Enter email'
					value={userData.email}
					className={`rounded w-full py-2 px-3 leading-tight text-lg lg:text-xl focus:outline-blue-500 focus:shadow ${
						!isValidEmail(userData.email) && 'border border-red-400 focus:outline-red-400'
					} `}
				/>
				{!isValidEmail(userData.email) && <p className='text-red-400 ml-2'>This email is not valid</p>}
			</div>
			<div className='flex flex-col mb-2'>
				<label className='lg:text-lg text-gray-500 py-2'> Phone </label>
				<input
					onChange={handleInputChange}
					ref={phoneRef}
					name='phone'
					type='text'
					placeholder='Enter phone'
					value={userData.phone}
					className={`rounded w-full py-2 px-3 leading-tight text-lg lg:text-xl focus:outline-blue-500 focus:shadow ${
						isEmpty(userData.phone) && 'border border-red-400 focus:outline-red-400'
					} `}
				/>
				{isEmpty(userData.phone) && <p className='text-red-400 ml-2'>Phone is a required field</p>}
			</div>
			<div className='flex flex-col mb-2'>
				<label className='lg:text-lg text-gray-500 py-2'> Address </label>
				<input
					onChange={handleInputChange}
					name='address'
					type='text'
					placeholder='Enter address'
					value={userData.address}
					className='rounded w-full py-2 px-3 leading-tight text-lg lg:text-xl focus:outline-blue-500 focus:shadow'
				/>
			</div>
			<div className='flex flex-col mb-2'>
				<label className='lg:text-lg text-gray-500 py-2'> Company </label>
				<input
					onChange={handleInputChange}
					name='company'
					type='text'
					placeholder='Enter company'
					value={userData.company}
					className='rounded w-full py-2 px-3 leading-tight text-lg lg:text-xl focus:outline-blue-500 focus:shadow'
				/>
			</div>
		</>
	)
})

export default FormInputs
