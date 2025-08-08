export function be_greater_than(prev, val) {
  return prev.should('be.greaterThan', val)
}

export function be_less_than(prev, val) {
  return prev.should('be.lessThan', val)
}

export function be_visible(prev) {
  return prev.should('be.visible')
}

export function callback(prev, next) {
  return prev.should(next)
}

export function contain(prev, text) {
  return prev.should('contain', text)
}

export function equal(prev, val) {
  return prev.should('equal', val)
}

export function have_attr(prev, attr) {
  return prev.should('have.attr', attr)
}

export function have_class(prev, class_) {
  return prev.should('have.class', class_)
}

export function have_prop(prev, prop) {
  return prev.should('have.prop', prop)
}

export function have_value(prev, val) {
  return prev.should('have.value', val)
}
