describe('Add To Order Button Visibility', () => {

  beforeEach(() => {
    cy.server()
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/api/auth',
      response: "fixture:successful_sign_up.json",
      headers: {
        uid: 'user@mail.com',
        access_token: 'token',
        client: '12345',
        token_type: "Bearer",
        expiry: 1000000
      }
    })
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/products',
      response: 'fixture:product_data.json',
    }) 
    cy.visit('/')
  });

  describe('when user is not authenticated/registered', () => {
    it('is expected to be hidden', () => {
      cy.get('[data-cy="product-1"]').within(() => {
        cy.get('button').should('not.be.visible')
      })
    });
  })

  describe('when user is authenticated', () => {
    beforeEach(() => {
      cy.get('[data-cy="register-action"]').click()
      cy.get('[data-cy="email"]').type('user@mail.com')
      cy.get('[data-cy="password"]').type('password')
      cy.get('[data-cy="password-confirmation"]').type('password')
      cy.get('[data-cy="register"]').click()
    });

    it('is expected to be visible', () => {
      cy.get('[data-cy="product-1"]').within(() => {
        cy.get('button').should('be.visible')
      })
    });
  })
})