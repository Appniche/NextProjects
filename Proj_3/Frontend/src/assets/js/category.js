fetch('http://localhost:3000/api/category', 
    {
    method: 'POST',
    headers: 
            {
        'Content-Type': 'application/json'
    },
                body: JSON.stringify({ "category":"Electronics" })
})
.then(response => 
    {
    if (response.ok) 
            {
        return response.json();
    } 
            else 
            {
        throw new Error('Error: ' + response.statusText);
    }
})
.then(data => 
    {
    if (data.returncode === 0) 
            {
        window.location = '/';
    } 
            else 
            {
        console.error(data.message);
        console.log(data.message);
    }
})
.catch(error => {
    console.error('Error', error);
            console.log(data.message);
});

