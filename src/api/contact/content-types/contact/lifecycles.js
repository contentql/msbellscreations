module.exports = {
    async afterCreate(event) {    
        const { result } = event;

        try{
            await strapi.plugins['email'].services.email.send({
              to: 'jagadeeshm778@gmail.com',
              from: 'akhil@contentql.io', // e.g. single sender verification in SendGrid
              cc: '',
              bcc: '',
              replyTo: '',
              subject: 'Contact form',
              text: 'hello jagadeesh maripi', 
              html: `<p>Name: ${result.firstName}</p>
              <p>Phone number: ${result.phoneNumber}</p>
              <p>Email: ${result.email}</p>
              <p>Message: ${result.message}</p> `
                
            })
        } catch(err) {
            console.log(err);
        }
    }
}