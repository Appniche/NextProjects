document.getElementById('loginform').addEventListener('submit', (event) =>{
	event.preventDefault();

	const name = document.getElementById('name').value;
	const email = document.getElementById('email').value;

	// const body = document.getElementById('loginform');
	try{
		const response = fetch('http://192.168.1.207:3000/api/feedback', {
			method:'POST',
			headers:{
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({name , email}),
		});

		if (!response.ok) {
			throw new Error('Login failed');
		}


	} catch (error){
		console.error('Error', error);
	}
});
