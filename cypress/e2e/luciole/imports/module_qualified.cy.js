import { toList } from './../../../../gleam/build/build/dev/javascript/luciole/gleam.mjs'
import * as $cy from './../../../../gleam/build/build/dev/javascript/luciole/luciole/cypress.mjs'
import * as $sh from './../../../../gleam/build/build/dev/javascript/luciole/luciole/should.mjs'
describe('example', function () {
  it('does this', function () {
    $cy.visit('https://example.cypress.io')
    let _pipe = $cy.get('h1')
    $sh.contain(_pipe, 'Kitchen Sink')
  })
})
