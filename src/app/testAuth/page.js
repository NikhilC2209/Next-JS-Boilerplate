'use client'

import { FcGoogle } from "react-icons/fc";
import { signIn } from 'next-auth/react';

export default function testAuth() {
	
	const loginwithGoogle = () => {
		signIn('google', { callbackUrl: 'http://localhost:3000/dashboard'});
	}

	return (
		<>
		<div className="my-2 flex justify-center">
			<button onClick={loginwithGoogle} className="bg-blue-500 flex flex-row items-center hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
				Login with <FcGoogle className="mx-2"/> 
			</button>
		</div>
		</>	
	)
}