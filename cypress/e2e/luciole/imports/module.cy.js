import { toList } from './../../../../gleam/build/build/dev/javascript/luciole/gleam.mjs'
import * as $cypress from './../../../../gleam/build/build/dev/javascript/luciole/luciole/cypress.mjs'
import * as $should from './../../../../gleam/build/build/dev/javascript/luciole/luciole/should.mjs'
export function example_cy() {
  return $luciole.describe(
    'example',
    toList([
      $luciole.it('does this', () => {
        $cypress.visit('https://example.cypress.io')
        let _pipe = $cypress.get('h1')
        return $should.contain(_pipe, 'Kitchen Sink')
      }),
    ]),
  )
}
