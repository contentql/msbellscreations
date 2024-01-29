module.exports = {
  async afterUpdate(event) {
    const { result } = event;
    console.log("strapi data", result);

    // fetch(`http://localhost:1337/api/orders/${result}`)
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
      const productsHtml = data.product
        .map(
          (product) => `
          <p>Product Name: ${product.name}</p>
          <p>Product Quantity: ${product.quantity}</p>
      `
        )
        .join("");

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
        subject: "You got a new order!",
        html: `<p>Name: ${data.firstName}</p>
                    <p>Phone number: ${data.phoneNumber}</p>
                    <p>Email: ${data.emailAddress}</p>
                    <p>Street Address: ${data.streetAddress}</p> 
                    <p>Zip code:${data.zipCode}</p>
                    <p>city :${data.city}</p>
                    <p>country:${data.country}</p>
                    <p>Products:${productsHtml}</p>`,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
