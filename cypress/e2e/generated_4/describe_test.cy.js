import { toList } from './gleam.mjs';
import * as $chain from './luciole/chain.mjs';
import * as $cy from './luciole/cypress.mjs';
import * as $should from './luciole/should.mjs';
describe('project', toList([it('goes to Cypress example page', () => {
        $cy.visit('https://example.cypress.io');
        $should.contain($cy.get('body'), 'Kitchen');
        let _pipe = $cy.get('body');
        $should.contain(_pipe, 'Kitchen');
        let _pipe$1 = $cy.get('body');
        $chain.contains(_pipe$1, 'Kitchen');
        $cy.contains('Kitchen');
        let _pipe$2 = $cy.get('body');
        return $should.be_visible(_pipe$2);
    })]));
