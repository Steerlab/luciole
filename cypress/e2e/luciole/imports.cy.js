import { toList } from './../../../gleam/build/build/dev/javascript/luciole/gleam.mjs'
import * as $cypress from './../../../gleam/build/build/dev/javascript/luciole/luciole/cypress.mjs'
export function double_it_cy() {
  return $luciole.describe(
    'example',
    toList([
      $luciole.it('does this', () => {
        return $cypress.visit('https://example.cypress.io/commands/traversal')
      }),
      $luciole.it('does that', () => {
        return $cypress.visit('https://example.cypress.io/commands/traversal')
      }),
    ]),
  )
}
