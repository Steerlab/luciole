import luciole/leaf.{type Assertion, Assertion, Expect}

pub fn equal(actual: Int, expected: Int) {
  Expect(Assertion(actual, "equal", [expected]))
}

pub fn be_visible(actual: Int) {
  Expect(Assertion(actual, "be.visible", []))
}
