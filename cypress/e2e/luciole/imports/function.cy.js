import { toList } from './../../../../gleam/build/build/dev/javascript/luciole/gleam.mjs'
import * as $cypress from './../../../../gleam/build/build/dev/javascript/luciole/luciole/cypress.mjs'
import {
  get,
  visit,
} from './../../../../gleam/build/build/dev/javascript/luciole/luciole/cypress.mjs'
import * as $should from './../../../../gleam/build/build/dev/javascript/luciole/luciole/should.mjs'
import { contain } from './../../../../gleam/build/build/dev/javascript/luciole/luciole/should.mjs'
describe('example', function () {
  it('does this', function () {
    visit('https://example.cypress.io')
    let _pipe = get('h1')
    contain(_pipe, 'Kitchen Sink')
  })
})
