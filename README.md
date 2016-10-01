## Documentation

### Installation

This can be installed using NPM by using the option to [install from a url](https://docs.npmjs.com/files/package.json#urls-as-dependencies).

### Example Usage

For a comprehensive example of usage please refer to the unit tests. These document all major usages of the API.

### Running tests

You will need to install all devDependencies of the repo by running `npm i` in the root of the repo.

Once this is done you can run `npm run test` to have it run linting and the unit tests.

!['running tests'](docs/soql_ast_walker.gif)

### Issues

*__Notes on the traverser and issues with the parser__:*
There are some issues with the current output from the SOQL parser that means that iteration isn't as smooth as would be expected.

- Because there is a top level `statement` with no type.

  ``` javascript
  {
    "statement": []
  }
  ```

  We cannot have the traverser know how to handle it in a generic fashion. To get around this we must specify a `fallback : 'iteration'` option to the traverser.

  ``` javascript
  traverse(tree, {
      enter(node) {
          console.log(`enter -- ${node.type}`);
          if (node.type === 'statement') {
              expect(this.type()).to.be.equal('statement');
          }
      },
      fallback: 'iteration' // we need this because the main node is not properly formed.
  });
  ```
- `Order` and `List` types should have their own node type. This will be a major issue when using the traverser/walker as it will have to be known as an edge case by the developer and handled appropriately.

- For expression should probably be contained in the `Limit` node

- `group by` should probably have its own node type. (see `select-group-by-cube.sql`
  and `select-group-by-cube.json` for an example of how hard it will be to generate
  code from) args seems to be part of the select statement and not of the group
  by cube.

- - `group by rollup` has a different signature from cube. Cube should be changed
  to rollup node type (see above).

### License

Copyright (C) 2012-2016 [Yusuke Suzuki](http://github.com/Constellation)
 (twitter: [@Constellation](http://twitter.com/Constellation)) and other contributors.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright
    notice, this list of conditions and the following disclaimer.

  * Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in the
    documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
