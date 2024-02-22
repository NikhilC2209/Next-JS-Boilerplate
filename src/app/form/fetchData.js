export async function fetchData() {

	const localData = await fetch('./dummy.json',{
		// cache: "force-cache",
	  	cache: "no-cache",                // only for dev (use when updating dummy.json)
  	});

	const userData = await localData.json();

  	return userData;
}