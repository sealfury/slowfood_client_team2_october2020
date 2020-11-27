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
      response: { message: "Product was successfully added to your order!" },
    });
    cy.visit("/");
    cy.get('[data-cy="register-action"]').click();
    cy.get('[data-cy="email"]').type("user@mail.com");
    cy.get('[data-cy="password"]').type("password");
    cy.get('[data-cy="password-confirmation"]').type("password");
    cy.get('[data-cy="register"]').click();
  });

  it("is expecting to get a confirmation message when adding a product to order", () => {
    cy.get('[data-cy="product-1"]').within(() => {
      cy.get("#button").click();
    });
    cy.get('[data-cy="message"]').should(
      "contain",
      "Product was successfully added to your order!"
    );
  });
});
