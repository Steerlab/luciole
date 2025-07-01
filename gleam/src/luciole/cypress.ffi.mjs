export function contains(content) {
  return cy.contains(content)
}

export function get(selector) {
  return cy.get(selector)
}

export function location() {
  return cy.location();
}

export function visit(url) {
  return cy.visit(url)
}
