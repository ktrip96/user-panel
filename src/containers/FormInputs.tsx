import React from 'react'
import { User } from '../@types/user'

type Props = {
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    userData: User
}

const FormInputs = ({ handleInputChange, userData }: Props) => {
    const tailwindInputClass = "rounded w-full py-2 px-3 leading-tight text-lg lg:text-xl focus:outline-blue-500 focus:shadow"
    const tailwindLabelClass = "lg:text-lg text-gray-500 py-2"

    return (
        <>
            <div className='flex flex-col mb-2'>
                <label className={tailwindLabelClass}> Name </label>
                <input
                    onChange={handleInputChange}
                    name='name'
                    type="text"
                    placeholder="Enter name"
                    value={userData.name}
                    className={tailwindInputClass} />
            </div>
            <div className='flex flex-col mb-2'>
                <label className={tailwindLabelClass}> Email address </label>
                <input
                    onChange={handleInputChange}
                    name='email'
                    type="email"
                    placeholder="Enter email"
                    value={userData.email}
                    className={tailwindInputClass} />
            </div>
            <div className='flex flex-col mb-2'>
                <label className={tailwindLabelClass}> Phone </label>
                <input
                    onChange={handleInputChange}
                    name='phone'
                    type="text"
                    placeholder="Enter phone"
                    value={userData.phone}
                    className={tailwindInputClass} />
            </div>
            <div className='flex flex-col mb-2'>
                <label className={tailwindLabelClass}> Address </label>
                <input
                    onChange={handleInputChange}
                    name='address'
                    type="text"
                    placeholder="Enter address"
                    value={userData.address}
                    className={tailwindInputClass} />
            </div>
            <div className='flex flex-col mb-2'>
                <label className={tailwindLabelClass}> Company </label>
                <input
                    onChange={handleInputChange}
                    name='company'
                    type="text"
                    placeholder="Enter company"
                    value={userData.company}
                    className={tailwindInputClass} />
            </div>


        </>
    )
}

export default FormInputs