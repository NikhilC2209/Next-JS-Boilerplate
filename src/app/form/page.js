'use client'

import '../globals.css'
import 'bootstrap/dist/css/bootstrap.css'

import { z } from "zod";

import React, { useState, useEffect, useRef } from 'react'; 
import { useFormState, useFormStatus } from "react-dom";
import { check } from './checkData.js'
import { signIn } from 'next-auth/react';

import { FcGoogle } from "react-icons/fc";
import { AiFillGoogleCircle } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";


const initialState = {
	message: "",
}


export default function Form() {

	const loginwithGoogle = () => {
		signIn('google', { callbackUrl: 'http://localhost:3000/dashboard'});
	}

	const [state, formAction] = useFormState(check, initialState);
	
	const [validUser, isUserValid] = useState(false);
	const [validPass, isPassValid] = useState(false);

	const [userMessage, setUserMessage] = useState("");
	const [passMessage, setPassMessage] = useState("");

	const setValue = (event) => {

		console.log(event.target.value);

		if(event.target.name=="username") {
			checkSchema(event.target.name, event.target.value);
		}
		else {
			checkSchema(event.target.name, event.target.value);
		}
		
	}

	const checkSchema = (field, value) => {
		
		const userSchema = z.string()
					   		.min(5, { message: "Must be 5 or more characters long" });

		const passSchema = z.string()
							.min(8, { message: "Must be 8 or more characters long" })
							.regex(new RegExp(".*[A-Z].*"), { message: "Must conatain one uppercase character" })
							.regex(new RegExp(".*\\d.*"), { message: "Must contains one number" })
							.regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"), {message: "Must contain one special character"});

		let res;

		if(field=="username") {
			res = userSchema.safeParse(value);
		}
		else {
			res = passSchema.safeParse(value);
		}

		if(res.error!=undefined) {
			var obj = JSON.parse(res.error);

			console.log(value);

			if(field=="username") {
				isUserValid(false);
				setUserMessage(obj[0].message);
			}
			else {
				isPassValid(false);
				setPassMessage(obj[0].message);
			}
		}
		else {
			if(field=="username") {
				isUserValid(true);
				setUserMessage("");
			}
			else {
				isPassValid(true);
				setPassMessage("");			
			}
		}

	}

	return(
		<body className="bg-scroll bg-[url('../../public/images/mountains.jpg')] bg-cover">
		<div>
			<div className="form-className backdrop-blur-md h-[80vh] w-[70vw] w-[60vw] flex flex-col my-[10vh] mx-[15vw] items-center shadow-2xl">
			<h1 className="text-white font-['Helvetica']">Sample Login Form</h1>
			<form className="w-1/3 pt-3" action={formAction}>
			<div className="">
			  <div className={`form-group my-3 flex flex-row h-1/6 items-center border-b-2 ${validUser ? "" : "border-b-red-600" } `}>
			    <input type="text" onChange={setValue} name="username" className="w-5/6 placeholder-white text-white bg-transparent p-2 focus:outline-none" id="formGroupExampleInput" placeholder="Username" />
				<FaUserCircle className="w-1/6 text-white w-6 h-6" />

				{
					(() => {
					if(!validUser) {
						return (
							<>
							<ImCross className="text-red-600 mx-3 w-6 h-6"/>
							</>
						)
					}
					else {
						return (
							<FaCheck className="text-green-600 mx-3 w-6 h-6"/>
						)
					}
					})()
				}

			  </div>
			  <div className="">
			  	<span className="text-sm text-red-600 font-mono font-bold">{userMessage}</span>
			  </div>
			  <div className={`form-group my-3 flex flex-row h-1/6 items-center border-b-2 ${validPass ? "" : "border-b-red-600" } `}>
			    <input type="password" onChange={setValue} name="password" className="w-5/6 placeholder-white text-white bg-transparent p-2 focus:outline-none" id="formGroupExampleInput2" placeholder="Password" />
				<FaLock className="w-1/6 text-white w-6 h-6" />

				{
					(() => {
					if(!validPass) {
						return (
							<ImCross className="text-red-600 mx-3 w-6 h-6"/>
						)
					}
					else {
						return (
							<FaCheck className="text-green-600 mx-3 w-6 h-6"/>
						)
					}
					})()
				}

			  </div>
			  <div className="">
			  	<span className="text-sm text-red-600 font-mono font-bold">{passMessage}</span>
			  </div>
			  <div className="form-group my-4 flex flex-row items-center">
			  	<button className="bg-emerald-600 w-full flex flex-row justify-center items-center hover:bg-emerald-500 text-white font-bold py-2 px-4 border-b-4 border-emerald-800 hover:border-emerald-600 rounded">
					<span className="text-center mx-2 text-lg">Login
					</span>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-8 h-8">
					  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
					</svg>
				</button>
			  </div>
			</div>

			  <div className="my-2 flex flex-row items-center justify-between">
				  <div className="mx-2">
				  	<span className="text-white">Not a User?</span>
				  	<button className="bg-red-500 flex flex-row items-center hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
					  Sign Up
					</button>
				  </div>
				  <div className="mx-2">
				  	<span className="text-white">Forgot Password?</span>
				  	<button className="bg-red-500 flex flex-row items-center hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
					  Reset Password
					</button>
				  </div>
			  </div>
			  	<div className="section-break flex flex-row items-center my-4">
				  	<div className="flex-grow border-b-2"></div>
				  	<div className="mx-2 font-serif text-white">OR</div>
				  	<div className="flex-grow border-b-2"></div>
			  	</div>
			  </form>

			  <div className="grid grid-cols-4 gap-2 w-2/3 mt-2">
				<div className="my-2 flex justify-center">
				  	<button onClick={loginwithGoogle} className="bg-blue-500 flex flex-row items-center hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
					  Login with 
					  <FcGoogle className="mx-2"/> 
					</button>
			    </div>
				<div className="my-2 flex justify-center">
				  	<button className="bg-blue-500 flex flex-row items-center hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
					  Login with 
					  <FaFacebook className="mx-2"/>
					</button>
			    </div>
				<div className="my-2 flex justify-center">
				  	<button className="bg-blue-500 flex flex-row items-center hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
					  Login with 
					  <FaGithub className="mx-2"/>
					</button>
			  	</div>				  
			    <div className="my-2 flex justify-center">
				  	<button className="bg-blue-500 flex flex-row items-center hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
					  Login with 
					  <FaTwitter className="mx-2"/>
					</button>
			  	</div>
			  </div>  			  
			</div>
		</div>
		</body>
	)
} 