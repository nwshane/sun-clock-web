// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('visitWithStubbedLocation', (url, options = {}) => {
  const { onBeforeLoad } = options

  cy.visit(url, {
    onBeforeLoad(pageWindow) {
      // The timezone is hardcoded to America/Santarem in the npm scripts for
      // running cypress, and these coordinates are in Santarem.
      const position = {
        coords: {
          latitude: -2.44306,
          longitude: -54.70833
        }
      }

      // stubbing getCurrentPosition to speed up test
      cy
        .stub(pageWindow.navigator.geolocation, 'getCurrentPosition')
        .callsArgWith(0, position)

      if (onBeforeLoad) onBeforeLoad(pageWindow)
    }
  })
})
