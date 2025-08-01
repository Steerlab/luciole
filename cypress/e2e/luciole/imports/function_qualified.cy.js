import { toList } from './../../../../api/build/build/dev/javascript/luciole/gleam.mjs'
import * as $cypress from './../../../../api/build/build/dev/javascript/luciole/luciole/cypress.mjs'
import {
  get as lu_get,
  visit as lu_visit,
} from './../../../../api/build/build/dev/javascript/luciole/luciole/cypress.mjs'
import * as $should from './../../../../api/build/build/dev/javascript/luciole/luciole/should.mjs'
import { contain as lu_contain } from './../../../../api/build/build/dev/javascript/luciole/luciole/should.mjs'
describe('example', function () {
  it('does this', function () {
    lu_visit('https://example.cypress.io')
    let _pipe = lu_get('h1')
    lu_contain(_pipe, 'Kitchen Sink')
  })
})
