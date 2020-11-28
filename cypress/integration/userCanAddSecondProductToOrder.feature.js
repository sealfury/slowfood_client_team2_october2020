describe("Adding a second product to an order", () => {
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
      response: "fixture:first_product_added_to_order.json",
    });
    cy.route({
      method: "PUT",
      url: "http://localhost:3000/api/orders/**",
      response: "fixture:second_product_added_to_order.json",
    });
    cy.visit("/");
    cy.get('[data-cy="register-action"]').click();
    cy.get('[data-cy="email"]').type("user@mail.com");
    cy.get('[data-cy="password"]').type("password");
    cy.get('[data-cy="password-confirmation"]').type("password");
    cy.get('[data-cy="register"]').click();
  });

  it("is expected to return a success message and increase the item count in the order", () => {
    cy.get('[data-cy="product-1"]').within(() => {
      cy.get("#button").click();
    });  
    cy.get('[data-cy="product-2"]').within(() => {
      cy.get("#button").click();  
    });

    cy.get('[data-cy="message"]').should(
      "contain",
      "Product was successfully added to your order!"
    );
    
    cy.get('[data-cy="item-count"]').should(
      "contain",
      "You have 2 items in your order"
    );
  });
});
