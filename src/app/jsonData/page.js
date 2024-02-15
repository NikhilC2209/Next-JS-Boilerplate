import { promises as fs } from 'fs';

export default async function jsonData() {
	const file = await fs.readFile(process.cwd() + '/src/app/dummy.json', 'utf8');
	const data = JSON.parse(file);

	console.log(data.users);

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