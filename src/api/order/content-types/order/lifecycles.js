module.exports = {
  async afterUpdate(event) {
    const { result } = event;
    console.log("strapi data", result);

    const data = await strapi.db.query("api::order.order").findOne({
      where: {
        id: result.id,
      },
      populate: {
        // @ts-ignore
        product: true,
      },
    });

    console.log(data);

    if (!result.status) return;

    try {
      await strapi.plugins["email"].services.email.send({
        to: [
          "kaparapu.akhilnaidu@gmail.com",
          "jgarrison@ezhadvisoryservices.com",
          data.emailAddress,
        ],
        from: "akhil@contentql.io",
        cc: "",
        bcc: "",
        replyTo: "akhil@contentql.io",
        subject: "🎉 Got a new order!",
        html: `<!DOCTYPE html>
                <html lang="en">

                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Order Placed</title>
                    <style>
                        body {
                            font-family: 'Arial', sans-serif;
                            margin: 0;
                            padding: 0;
                            background-color: #f4f4f4;
                        }

                        table {
                            width: 100%;
                            max-width: 600px;
                            margin: 20px auto;
                            background-color: #fff;
                            border-radius: 5px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }

                        h1 {
                            color: #fff;
                            margin: 10px 0 10px 10px;
                        }

                        th,
                        td {
                            padding: 15px;
                            border-bottom: 1px solid #eee;
                        }

                        th {
                            background-color: #333;
                            color: #fff;
                        }

                        tr:nth-child(odd) {
                            background-color: #dddddd;
                        }

                        p {
                            margin: 0 0 15px;
                            line-height: 1.6;
                        }

                        .header {
                            background-color: #131921;
                            color: #fff;
                            text-align: center;
                            border-top-left-radius: 5px;
                            border-top-right-radius: 5px;
                        }

                        .content {
                            padding: 20px;
                        }

                        .thank-you {
                            font-size: 18px;
                            font-weight: bold;
                            color: #111;
                            margin-bottom: 20px;
                        }

                        .total-amount {
                            font-size: 20px;
                            font-weight: bold;
                            color: #111;
                            margin-top: 20px;
                        }

                        .signature {
                            font-style: italic;
                            color: #555;
                            margin-top: 30px;
                        }

                        .footer {
                            background-color: #131921;
                            color: #fff;
                            padding: 15px;
                            text-align: center;
                            border-bottom-left-radius: 5px;
                            border-bottom-right-radius: 5px;
                        }

                        .address {
                            margin-top: 20px;
                        }

                        .address h2 {
                            margin-bottom: 10px;
                        }

                        .address-row {
                            display: flex;
                            justify-content: space-between;
                            flex-wrap: wrap;
                        }

                        .address-col {
                            flex-basis: 48%;
                            box-sizing: border-box;
                            margin-bottom: 15px;
                        }

                        .tick-icon {
                            color: #4caf50; /* Green color for tick mark */
                            display: inline-block;
                            font-size: 24px;
                            margin-right: 5px;
                        }

                        @media screen and (max-width: 600px) {
                            table {
                                width: 100%;
                            }

                            .content {
                                padding: 10px;
                            }

                            .header img {
                                width: 80%;
                                margin: 0 auto;
                            }

                            .address-col {
                                flex-basis: 100%;
                            }
                        }
                    </style>
                </head>

                <body>

                    <table>
                        <tr>
                            <td class="header">
                               <h1>Ms. Bells Creations</b>
                                <h2><span class="tick-icon">&#10004;</span> Order Placed</h2>
                            </td>
                        </tr>
                        <tr>
                            <td class="content">
                                <p>Dear ${
                                  data.firstName + " " + data.lastName
                                },</p>

                                <p class="thank-you">Thank you for placing an order with Ms. Bells Creations Store! Your order details
                                    are as follows:</p>

                                <table>
                                    <tr>
                                        <th>S. No.</th>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                    </tr>

                                    ${data.product
                                      .map(
                                        (product, index) =>
                                          `<tr>
                                            <td>${index + 1}</td>
                                            <td>${product.name}</td>
                                            <td>${product.quantity}</td>
                                        </tr>`
                                      )
                                      .join("")}

                                </table>

                                <p class="total-amount"><strong>Total Amount: $${
                                  data.totalPrice
                                }</strong></p>

                                <p>Your order is confirmed and will be processed shortly. <strong>Thank you for choosing Ms. Bells
                                        Creations Store!</strong></p>

                                <table class="address-table">
                                    <tr>
                                        <th>Billing Address</th>
                                        <th>Shipping Address</th>
                                    </tr>
                                    <tr>
                                        <td>
                                            ${data.streetAddress},<br>
                                            ${data.city},<br>
                                            ${data.zipCode},<br>
                                            ${data.country}
                                        </td>
                                        <td>
                                            ${data.ShippingstreetAddress},<br>
                                            ${data.Shippingcity},<br>
                                            ${data.ShippingzipCode},<br>
                                            ${data.Shippingcountry}
                                        </td>
                                    </tr>
                                </table>

                                <p class="signature">Best regards,<br>Ms. Bells Creations</p>
                            </td>
                        </tr>
                        <tr>
                            <td class="footer">
                                &copy; 2024 Ms. Bells Creations. All rights reserved.
                            </td>
                        </tr>
                    </table>

                </body>

                </html>`,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
