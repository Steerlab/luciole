import luciole/leaf.{Assert, One, Should}
import luciole/unsafe/unsafe

pub fn equal(actual: a, expected: a) {
  One(
    Assert(
      Should(actual: unsafe.coerce(actual), name: "equal", args: [
        unsafe.coerce(expected),
      ]),
    ),
  )
}

pub fn be_visible(actual: a) {
  One(
    Assert(Should(actual: unsafe.coerce(actual), name: "be.visible", args: [])),
  )
}
