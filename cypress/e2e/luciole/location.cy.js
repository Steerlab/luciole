import { toList } from './../../../api/build/dev/javascript/luciole/gleam.mjs'
import * as $cy from './../../../api/build/dev/javascript/luciole/luciole/cypress.mjs'
import * as $loc from './../../../api/build/dev/javascript/luciole/luciole/location.mjs'
import * as $should from './../../../api/build/dev/javascript/luciole/luciole/should.mjs'
describe("let's test the location", function () {
  beforeEach('visit the page', function () {
    return $cy.visit('https://example.cypress.io/commands/traversal')
  })
  it('tests the location.get function', function () {
    let _pipe = $loc.get()
    $should.callback(_pipe, (_) => {
      return true
    })
  })
  it('tests the other location functions', function () {
    let _pipe = $loc.hash()
    $should.equal(_pipe, '')
    let _pipe$1 = $loc.host()
    $should.equal(_pipe$1, 'example.cypress.io')
    let _pipe$2 = $loc.hostname()
    $should.equal(_pipe$2, 'example.cypress.io')
    let _pipe$3 = $loc.href()
    $should.equal(_pipe$3, 'https://example.cypress.io/commands/traversal')
    let _pipe$4 = $loc.origin()
    $should.equal(_pipe$4, 'https://example.cypress.io')
    let _pipe$5 = $loc.pathname()
    $should.equal(_pipe$5, '/commands/traversal')
    let _pipe$6 = $loc.port()
    $should.equal(_pipe$6, '')
    let _pipe$7 = $loc.protocol()
    $should.equal(_pipe$7, 'https:')
    let _pipe$8 = $loc.search()
    $should.equal(_pipe$8, '')
    let _pipe$9 = $loc.super_domain()
    $should.equal(_pipe$9, 'cypress.io')
    let _pipe$10 = $loc.super_domain_origin()
    $should.equal(_pipe$10, 'https://cypress.io')
  })
})
