import { toList } from './../../../../gleam/build/build/dev/javascript/luciole/gleam.mjs'
import * as $cypress from './../../../../gleam/build/build/dev/javascript/luciole/luciole/cypress.mjs'
import {
  get as lu_get,
  visit as lu_visit,
} from './../../../../gleam/build/build/dev/javascript/luciole/luciole/cypress.mjs'
import * as $should from './../../../../gleam/build/build/dev/javascript/luciole/luciole/should.mjs'
import { contain as lu_contain } from './../../../../gleam/build/build/dev/javascript/luciole/luciole/should.mjs'
export function example_cy() {
  return lu_describe(
    'example',
    toList([
      lu_it('does this', () => {
        lu_visit('https://example.cypress.io')
        let _pipe = lu_get('h1')
        return lu_contain(_pipe, 'Kitchen Sink')
      }),
    ]),
  )
}
