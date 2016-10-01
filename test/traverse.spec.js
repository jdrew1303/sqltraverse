// Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//   * Redistributions of source code must retain the above copyright
//     notice, this list of conditions and the following disclaimer.
//   * Redistributions in binary form must reproduce the above copyright
//     notice, this list of conditions and the following disclaimer in the
//     documentation and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
// DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
// ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
// THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


import Dumper from './dumper';
import checkDump from './checkDump';
import { expect } from 'chai';
import { traverse } from '..';

describe('Fallback', () => {
    it('throw unknown node type error when unknown nodes and no keys', () => {
        const tree = {
            type: 'XXXExpression',
            properties: []
        };

        expect(() =>
          traverse(tree, { enter : (node) => {} })
        ).to.throw('Unknown node type XXXExpression.');
    });

    it('will iterate through unknown keys when passed fallback = iteration option', () => {
        const tree = {
            type: 'XXXExpression',
            properties: []
        };

        return traverse(tree, {
            enter : (node) => {
              expect(node.type).to.be.equal('XXXExpression');
            },
            fallback: 'iteration'
        });
    });

    it('will accept a function to determin fallback options', () => {
      const tree = {
        type: 'TestExpression',
        argument: {
            type: 'Literal',
            value: 20
        },
        extended: true
      };

        return traverse(tree, {
            enter : (node) => {
              expect(node.type).to.not.be.equal('Literal');
            },
            fallback: (node) => {
                return Object.keys(node).filter((key) => {
                    return key !== 'argument';
                });
            }
        });
    });
});
