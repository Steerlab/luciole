import { toList } from '../../../build/dev/javascript/luciole/gleam.mjs'
import * as $cy from '../../../build/dev/javascript/luciole/luciole/cypress.mjs'
describe('outer describe', [
  describe(
    'inner describe',
    toList([
      it('visits the kitchen', function () {
        $cy.visit('https://example.cypress.io')
        $cy.contains('Kitchen')
      }),
    ]),
  ),
])
