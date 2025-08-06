export function contain(content) {
  return cy.contains(content)
}

export function exec(command) {
  return cy.exec(command)
}

export function get(selector) {
  return cy.get(selector)
}

export function visit(url) {
  return cy.visit(url)
}

export function wrap(subject) {
  return cy.wrap(subject)
}
