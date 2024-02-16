window.addEventListener('load', (event) =>{
        
        event.preventDefault();

        const form = document.getElementById('form_comp');

        form.addEventListener('submit', (event) => {

                event.preventDefault();

                const product1 = document.getElementById('selected_1').value;

                const product2 = document.getElementById('selected_2').value;

                console.log(form);

                fetch('http://localhost:3000/api/fetch/product', {
                        method: 'POST',
                        headers:
                        {
                                'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ product1, product2 })

                })
                        .then(response => {
                                if (response.ok) {
                                        return response.json();
                                }
                                else {
                                        throw new Error('Error: ' + response.statusText);
                                }
                        })
                        .then(data => {
                                console.log(data);
                                if (data.returncode === 0) {
                                        window.location = '/user/inner';
                                }
                                else {
                                        console.error(data.message);
                                        console.log(data.message);
                                }
                        })
                        .catch(error => {
                                console.error('Error', error);
                                console.log(data.message);

                        });
        })
});
























// fetch('http://localhost:3000/api/category', 
//     {
//     method: 'POST',
//     headers: 
//             {
//         'Content-Type': 'application/json'
//     },
//                 body: JSON.stringify({ "category":"Electronics" })
// })
// .then(response => 
//     {
//     if (response.ok) 
//             {
//         return response.json();
//     } 
//             else 
//             {
//         throw new Error('Error: ' + response.statusText);
//     }
// })
// .then(data => 
//     {
//     if (data.returncode === 0) 
//             {
//         window.location = '/';
//     } 
//             else 
//             {
//         console.error(data.message);
//         console.log(data.message);
//     }
// })
// .catch(error => {
//     console.error('Error', error);
//             console.log(data.message);
// });
//
