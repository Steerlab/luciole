/** Used as a coercion function in Gleam, to transtype a value.
 * Because transtyping does not modify the data, `coerce` is the
 * identity function. */
export function coerce(a) {
  return a
}

/** Generates a different, unique ID each time it's called. Unique is not
 * guaranted system-wide, but guaranteed when calling that function
 * multiple times. */
export const uniqueId = (function () {
  let id = 0
  return function () {
    return id++
  }
})()
