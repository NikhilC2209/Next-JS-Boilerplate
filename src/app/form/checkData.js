import { redirect } from 'next/navigation'
import { z } from "zod";

export async function check(prevState, formData) {

  const localData = await fetch('./dummy.json',{
	// cache: "force-cache",
  cache: "no-cache",                // only for dev (use when updating dummy.json)
  });

  const userData = await localData.json();

  // console.log(userData);

  const username = formData.get("username");
  const password = formData.get("password");

  const schema = z.string().min(5, { message: "Must be 5 or more characters long" });

  const res = schema.safeParse(username);

  userData.users.map((user) => {
  	if(user.username==username) {
  		if(user.password==password) {
  			console.log("Found!");
  			redirect('/dashboard')
  		}
  	}
  })
}