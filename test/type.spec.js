import { expect } from 'chai';
import { traverse } from '..';

describe('Type', () => {

  const tree = {
    "type": "statement",
    "variant": "select"
  };

  it('is attached to the `this` context of the enter function', () => {
    return traverse(tree, {
        enter(node) {
          expect(this.type()).to.be.equal('statement');
        },
        fallback: 'iteration'
    });
  });

  it('is attached to the `this` context of the leave function', () => {
    return traverse(tree, {
        leave(node) {
          expect(this.type()).to.be.equal('statement');
        },
        fallback: 'iteration'
    });
  });
});
