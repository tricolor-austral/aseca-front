describe('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.wait(1000);
  });

  it('should display login form', () => {
    // Verify that the login form and its elements are visible
    cy.get('form').should('be.visible');
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible').contains('Log in');
  });

  it('should login successfully with correct credentials', () => {
    cy.intercept('POST', 'http://localhost:8888/users/login', {
      statusCode: 200,
      body: {
        token: 'mockToken'
      }
    }).as('loginRequest');

    cy.get('input[placeholder="Email"]').type('correct@example.com');
    cy.get('input[placeholder="Password"]').type('correctpassword');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');

    cy.window().its('localStorage.token').should('exist');
  });

  it('should display error message with incorrect credentials', () => {
    cy.intercept('POST', 'http://localhost:8888/users/login', {
      statusCode: 401,
      body: {
        error: 'Invalid credentials'
      }
    }).as('loginRequest');

    cy.get('input[placeholder="Email"]').type('incorrect@example.com');
    cy.get('input[placeholder="Password"]').type('incorrectpassword');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');

    cy.get('h4').contains('Invalid email or password').should('be.visible');
  });
});
