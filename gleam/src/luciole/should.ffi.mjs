export function contain(prev, content) {
  return prev.should('contain', content);
}

export function be_visible(prev) {
  return prev.should('be.visible');
}

export function be_less_than(prev, val) {
  return prev.should('be.lessThan', val);
}

export function be_greater_than(prev, val) {
  return prev.should('be.greaterThan', val);
}

export function equal(prev, val) {
  return prev.should('equal', val);
}
