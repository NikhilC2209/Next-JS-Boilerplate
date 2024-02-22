'use client'

import './globals.css'
import 'bootstrap/dist/css/bootstrap.css'

import { signOut } from "next-auth/react"

export default function Logout() {

	return (
		<>
		<button onClick={() => {
			console.log("Clicked!");
			signOut();
		}}
			class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
		>
		  Logout
		</button>
		</>
	)
}