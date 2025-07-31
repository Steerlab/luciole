import { toList } from './../../../../gleam/build/build/dev/javascript/luciole/gleam.mjs'
import * as $cy from './../../../../gleam/build/build/dev/javascript/luciole/luciole/cypress.mjs'
import * as $sh from './../../../../gleam/build/build/dev/javascript/luciole/luciole/should.mjs'
export function example_cy() {
  return $lu.describe(
    'example',
    toList([
      $lu.it('does this', () => {
        $cy.visit('https://example.cypress.io')
        let _pipe = $cy.get('h1')
        return $sh.contain(_pipe, 'Kitchen Sink')
      }),
    ]),
  )
}
