/// <reference types="../support/index" />
/// <reference types="cypress" />
/// <reference types="@types/testing-library__cypress" />

describe('category', () => {
  beforeEach(() => {
    cy.visit('/')
      .findByLabelText(/view category "Lunch drinks"/i)
      .click({ force: true })
      .waitForRouteChange()
  })
  it('should be linked from the index page', () => {
    cy.assertRoute('/lunch-beverage')
  })
  // it('should have a category, title, description', () => {
  //   cy.findByText(/lunch_beverage/i)
  //     .findAllByText(/With good lunch always come a good drink!/i)
  //     .findByText(/Get something to drink/i)
  // })
  // it('should have images', () => {
  //   cy.findByAltText(/healthy-drinks/i)
  // })
})
