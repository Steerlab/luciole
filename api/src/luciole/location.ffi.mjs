export function get() {
  return cy.location()
}

export function hash() {
  return cy.location('hash')
}

export function host() {
  return cy.location('host')
}

export function hostname() {
  return cy.location('hostname')
}

export function href() {
  return cy.location('href')
}

export function origin() {
  return cy.location('origin')
}

export function pathname() {
  return cy.location('pathname')
}

export function port() {
  return cy.location('port')
}

export function protocol() {
  return cy.location('protocol')
}

export function search() {
  return cy.location('search')
}

export function super_domain() {
  return cy.location('superDomain')
}

export function super_domain_origin() {
  return cy.location('superDomainOrigin')
}
