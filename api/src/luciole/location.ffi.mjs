export function loc_get() {
  return cy.location()
}

export function loc_get_key(key) {
  return cy.location(key)
}
