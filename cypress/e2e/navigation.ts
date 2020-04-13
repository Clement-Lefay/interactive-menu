/// <reference types="../support/index" />
/// <reference types="cypress" />
/// <reference types="@types/testing-library__cypress" />

describe('navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('link to projects works', () => {
    cy.get('nav').within(() => {
      cy.findByText(/projects/i)
        .click({ force: true })
        .waitForRouteChange()
    })
    cy.findByLabelText(/Gathering/i).assertRoute('/projects')
  })
  it('link to about works', () => {
    cy.get('nav').within(() => {
      cy.findByText(/about/i)
        .click({ force: true })
        .waitForRouteChange()
    })
    cy.findAllByText(/Hi I'm Clement/i).assertRoute('/about')
  })
  it('link to home works', () => {
    cy.get('nav').within(() => {
      cy.findByText(/about/i)
        .click({ force: true })
        .waitForRouteChange()
    })
    cy.findAllByText(/Hi I'm Clement/i)
      .assertRoute('/about')
      .findByLabelText(/LekoArts, Back to home/i)
      .click({ force: true })
      .waitForRouteChange()
      .assertRoute('/')
  })
})
