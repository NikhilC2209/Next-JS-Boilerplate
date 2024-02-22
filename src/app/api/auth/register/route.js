import { NextResponse } from 'next/server'

export async function POST(request) {

	try {
		const credentials = await request.json();
		console.log("Credentials");
		console.log(credentials);
	} catch(e) {
		console.log({ e });
	}

	return NextResponse.json({ message: 'success' });
}