import {API_URL} from "../../src/utils/constants";
const url = `${API_URL}/shipments`;

describe('Shipping Component', () => {
    beforeEach(() => {
        localStorage.setItem('token', 'mock');
        cy.visit('http://localhost:3000/');
    });

    it('should fetch and display orders on mount', () => {
        cy.intercept('GET', url).as('getOrders');

        cy.wait('@getOrders');

        cy.get('.ant-collapse-item').should('have.length.gt', 0);
    });

    it('should search for orders by shipping ID', () => {
        const id = "6ae10030-b648-4006-b170-b2cef5460309";

        cy.intercept('GET', `${url}/${id}`).as('getShipmentByID');

        cy.get('input[placeholder="Search by shipping ID"]').type(`${id}`);
        cy.get('button').contains('Search').click();

        cy.wait('@getShipmentByID');

        cy.get('.ant-collapse-item').should('have.length', 1);
    });

    it('should search for orders by shipping and not find any', () => {
        const id = "1";

        cy.intercept('GET', `${url}/${id}`).as('getShipmentByID');

        cy.get('input[placeholder="Search by shipping ID"]').type(`${id}`);
        cy.get('button').contains('Search').click();

        cy.wait('@getShipmentByID');

        cy.get('.ant-collapse-item').should('have.length', 0);
    });

    it('should update the shipment status from New to Progress', () => {
        const id = "6ae10030-b648-4006-b170-b2cef5460309";
        const order = "Order #order1";
        const newStatus = 'Progress';

        cy.intercept('POST', `${url}/${id}/change-status`).as('updateStatus');

        cy.get('.ant-collapse-header-text').contains(order).click();
        cy.get(`#${id}`).should('exist').and('be.visible');
        cy.get(`#${id}`).find('.ant-select-selector').click();
        cy.get('.ant-select-dropdown').find('.ant-select-item-option').contains(newStatus).click();

        cy.wait('@updateStatus');

        cy.get(`#${id}`).find('.ant-select-selection-item').should('contain', newStatus.toUpperCase());

        cy.request('POST', `${url}/${id}/change-status`, { status: 'NEW' });

        cy.reload();

        cy.get('.ant-collapse-header-text').contains(order).click();
        cy.get(`#${id}`).find('.ant-select-selection-item').should('contain', 'NEW');
    });
});
