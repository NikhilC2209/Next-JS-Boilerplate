import { promises as fs } from 'fs';
// import data from '../../../public/dummy.json';
import data from '@/app/dummy.json';

export default async function jsonData() {
	// const file = await fs.readFile(process.cwd() + '/src/app/dummy.json', 'utf8');
	// const data = JSON.parse(file);

	// const localData = await fetch('/dummy.json',{
	// 	// cache: "force-cache",
	//   	cache: "no-cache",                // only for dev (use when updating dummy.json)
 //  });

  // const userData = await localData.json();

  console.log(data);

	//console.log(data.users);

	return (
    <div>
      <h1>{data.title}</h1>
      <div>
      {data.users.map((user) => {
      	return (
      		<div key={user.id}>
	      		<p>{user.id}</p>
	      		<p>{user.username}</p>
	      		<p>{user.password}</p>
      		</div>
      	)
      })}
      </div>
    </div>
  );
}