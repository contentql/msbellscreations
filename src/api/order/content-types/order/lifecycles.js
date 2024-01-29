module.exports = {
    async afterUpdate(event) {
        const { result } = event;
        console.log("strapi data", result);
        //console.log(result.status);

        if(result.status)
        {

        try {
            const productsHtml = result.product.map(product => `
                <p>Product Name: ${product.name}</p>
                <p>Product Quantity: ${product.quantity}</p>
            `).join('');

            await strapi.plugins['email'].services.email.send({
                to: 'kaparapu.akhilnaidu@gmail.com',
                from: 'akhil@contentql.io',
                cc: '36rahaman@gmail.com',
                bcc: '',
                replyTo: 'akhil@contentql.io',
                subject: 'You got a new order !',
                html: `<p>Name: ${result.firstName}</p>
                    <p>Phone number: ${result.phoneNumber}</p>
                    <p>Email: ${result.emailAddress}</p>
                    <p>Street Address: ${result.streetAddress}</p> 
                    <p>Zip code:${result.zipCode}</p>
                    <p>city :${result.city}</p>
                    <p>country:${result.country}</p>
                    <p>${productsHtml}</p>`
            });
        } catch (err) {
            console.log(err);
        }
    }
    }
};
