import React from 'react'
import Loading from '../components/Loading'

type Props = {
	isLoading: boolean
	isEdited: boolean
	isDisabled: boolean
	handleSave: (e: React.SyntheticEvent) => void
	handleCancel: () => void
}

const FormButtons = ({ isLoading, isEdited, isDisabled, handleSave, handleCancel }: Props) => {
	return (
		<div className='flex absolute lg:bottom-10 bottom-5 right-5  gap-2'>
			<button
				onClick={handleCancel}
				type='button'
				aria-label='cancel-button'
				className={`${
					!isEdited && 'hidden'
				} py-3 px-4 bg-[var(--cancel-btn-bg)] min-w-[70px] rounded-md text-center text-lg lg:text-xl text-gray-600 hover:scale-105 hover:shadow-lg transition `}
			>
				Cancel
			</button>
			<button
				onClick={handleSave}
				type='submit'
				disabled={isDisabled}
				className={`${
					!isEdited && 'opacity-70'
				} py-3 px-4 bg-[var(--save-btn-bg)] rounded-md text-white text-lg lg:text-xl enabled:hover:scale-105 enabled:hover:shadow-lg transition`}
			>
				{isLoading ? (
					<div className='ml-3'>
						<Loading width={'6'} height={'6'} />
					</div>
				) : (
					'Save'
				)}
			</button>
		</div>
	)
}

export default FormButtons
