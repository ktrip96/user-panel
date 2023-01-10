import React, { ReactNode } from 'react'

type Props = {
	children: ReactNode
}

const Layout: React.FC<Props> = ({ children }: Props) => {
	return (
		<div className='border w-full h-screen m-auto max-w-[1400px] absolute inset-0 md:w-3/4 md:h-[80vh] shadow-xl rounded-md flex overflow-hidden'>
			{children}
		</div>
	)
}

export default Layout
