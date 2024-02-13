export function submit(e:any) {
	// event.preventDefault();
	const formData = new FormData(e.target);
	const response = fetch('http://192.168.1.207:3000/api/register', {
		method:	'POST',
		body: formData,
	});
	const data = response.json();
	console.log(data);
	return("succesfull");
}

submit();
