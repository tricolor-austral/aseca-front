describe('Shipping Component', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'mock');
    cy.visit('http://localhost:3000/');
  });

  it('should fetch and display orders on mount', () => {
    // Intercept the GET request to /api/orders and respond with mock data
    cy.intercept(
        'GET',
        'http://localhost:8888/shipments',
        { fixture: 'orders.json' }).as('getOrders');

    // Wait for the API request to complete and assert that the orders are displayed
    cy.wait('@getOrders');
    cy.get('.ant-collapse-item').should('have.length.gt', 0);
  });

  it('should search for orders by shipping ID', () => {
    const id = "1";
    // Intercept the GET request to /api/shipment/* and respond with mock data
    cy.intercept(
        'GET',
        `http://localhost:8888/shipments/${id}`,
        { fixture: 'order.json' }).as('getShipmentByID');

    // Type the shipping ID in the search input and click the search button
    cy.get('input[placeholder="Search by shipping ID"]').type(`${id}`);
    cy.get('button').contains('Search').click();

    // Wait for the API request to complete and assert that the order is displayed
    cy.wait('@getShipmentByID');
    cy.get('.ant-collapse-item').should('have.length', 1);
  });
});
