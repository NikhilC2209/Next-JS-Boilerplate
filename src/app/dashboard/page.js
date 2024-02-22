import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
// import { useSession } from "next-auth/react"

import Logout from '../logout.js';


export default async function Dashboard() {

	const session = await getServerSession();

	// const { data: session, status } = useSession();

	console.log(session);

	if(!session) {
		redirect("/form");
	}

	return (
		<>
			<h1>Welcome {session.user.name}!</h1>
			<Logout />
		</>		
	)	
}