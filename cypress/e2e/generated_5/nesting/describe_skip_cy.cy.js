import { toList } from './../../../build/dev/javascript/luciole/gleam.mjs'
import * as $cy from './../../../build/dev/javascript/luciole/luciole/cypress.mjs'
describe('outer describe', [
  describe.only(
    'inner describe 1 (only)',
    toList([
      it('check the kitchen 1', function () {
        $cy.visit('https://example.cypress.io')
        $cy.contains('Kitchen')
      }),
    ]),
  ),
  describe(
    'inner describe 2',
    toList([
      it('check the kitchen 2', function () {
        $cy.visit('https://example.cypress.io')
        $cy.contains('Kitchen')
      }),
    ]),
  ),
])
