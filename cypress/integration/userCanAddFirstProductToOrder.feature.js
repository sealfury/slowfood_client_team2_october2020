describe("Add To Order Button Visibility", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/auth",
      response: "fixture:successful_sign_up.json",
      headers: {
        uid: "user@mail.com",
        access_token: "token",
        client: "12345",
        token_type: "Bearer",
        expiry: 1000000,
      },
    });

    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/products",
      response: "fixture:product_data.json",
    });

    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/orders",
      response: { message: "A product has been added to your order" },
    });
    cy.visit("/");
  });

  it("is expecting to get a confirmation message when adding a product to order", () => {
    
    cy.get('[data-cy="product-1"]').within(() => {
      cy.get("#button").contains("Add To Order").click();
    });
    cy.contains("A product has been added to your order");
  });
});
