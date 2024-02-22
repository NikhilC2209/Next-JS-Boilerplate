'use client'

import { useFormState, useFormStatus } from "react-dom";


export default function Form() {

	const submitData = async (prevState, formData) => {

		const response = await fetch('/api/auth/register', {
			method: 'POST',
			body: JSON.stringify({
				username: formData.get("username"),
				password: formData.get("password"),
			}),
		});

		console.log({ response });
		
	}

	const initialState = {
		message: "",
	}

	const [state, formAction] = useFormState(submitData, initialState);

	return (
		<>
			<form action={formAction}>
			  <div class="form-group">
			    <label for="exampleInputEmail1">Username</label>
			    <input type="text" name="username" className="form-control" id="username" placeholder="Enter username" />
			  </div>
			  <div class="form-group">
			    <label for="exampleInputPassword1">Password</label>
			    <input type="password" name="password" className="form-control" id="password" placeholder="Password" />
			  </div>
			  <button type="submit" className="btn btn-primary">Submit</button>
			</form>
		</>
	)
}