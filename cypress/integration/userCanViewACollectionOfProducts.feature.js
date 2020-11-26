describe("User can see a collection of products", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001");
  });

  describe("when there are products", () => {
    before(() => {
      cy.server();
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/products",
        response: "fixture:product_data.json",
      });
    });

    it("successfully", () => {
      cy.get("#menu").within(() => {
        cy.contains("Entrecôte with chanterelle sauce and potato gratin");
        cy.contains("Raindeer tartare");
        cy.contains("Swedish pancake with lingonberries");
      });
    });
  });

  describe("when there are NO products", () => {
    before(() => {
      cy.server();
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/products",
        response: [],
      });
    });

    it("unsuccessfully", () => {
      cy.get("#menu").should("not.exist");
      cy.get("#no-menu").should("contain","There is no available menu.")
    });
  });
});
