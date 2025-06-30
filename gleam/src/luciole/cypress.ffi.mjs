export function visit(url) {
  return cy.visit(url)
}

export function get(selector) {
  return cy.get(selector)
}

export function contains(content) {
  return cy.contains(content)
}
