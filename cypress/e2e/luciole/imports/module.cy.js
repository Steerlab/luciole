import { toList } from './../../../../api/build/dev/javascript/luciole/gleam.mjs'
import * as $cypress from './../../../../api/build/dev/javascript/luciole/luciole/cypress.mjs'
import * as $should from './../../../../api/build/dev/javascript/luciole/luciole/should.mjs'

describe('example', function () {
  it('does this', function () {
    $cypress.visit('https://example.cypress.io')
    let _pipe = $cypress.get('h1')
    $should.contain(_pipe, 'Kitchen Sink')
  })
})
