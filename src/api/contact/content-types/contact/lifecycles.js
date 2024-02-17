module.exports = {
  async afterCreate(event) {
    const { result } = event;

    try {
      await strapi.plugins["email"].services.email.send({
        to: "msbell@msbellscreations.com",
        from: "akhil@contentql.io",
        cc: "",
        bcc: "",
        subject: "New contact form submission",
        html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Contact Form Submission</title>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 20px;
                    }

                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #fff;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        padding: 20px;
                    }

                    h1 {
                        color: #333;
                    }

                    p {
                        color: #555;
                        margin-bottom: 20px;
                    }

                    .user-info {
                        border-top: 1px solid #ccc;
                        padding-top: 20px;
                        margin-top: 20px;
                    }

                    .footer {
                        text-align: center;
                        margin-top: 20px;
                        color: #777;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Contact Form Submission</h1>
                    <p>You have received a new request with the following details:</p>

                    <div class="user-info">
                        <p><strong>Name:</strong>${result.firstName} <span> ${result.lastName}</span></p>
                        <p><strong>Email:</strong> ${result.email}</p>
                        <p><strong>Phone number:</strong> ${result?.phoneNumber}</p>
                       <p><strong>Subject:</strong> ${result?.subject}</p>
                        <p><strong>Message:</strong> ${result.message}</p> 
                    </div>
                </div>
            </body>
            </html>
`,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
