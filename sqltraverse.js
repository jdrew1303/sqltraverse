/*
  Copyright (C) 2016 James Drew <j.drew1303@gmail.com>

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
*/

var estraverse = require('estraverse');

estraverse.Syntax = {
  'condition' : 'condition',
  'expression' : 'expression',
  'function' : 'function',
  'identifier' : 'identifier',
  'literal' : 'literal',
  'statement' : 'statement'
};

estraverse.VisitorKeys = {
  'condition'   : ['when', 'then', 'else'],
  'expression'  : ['left', 'right', 'start', 'expression', 'condition', 'target', 'event', 'action', 'offset', 'as'],
  'function'    : ['args'],
  'identifier'  : ['columns'],
  'literal'     : [],
  'constraint'  : ['expression', 'references', 'on'],
  'on'          : ['columns', 'expression'],
  'definition'  : ['definition', 'datatype', 'columns'],
  'datatype'    : ['args'],
  'event'       : ['of'],
  'assignment'  : ['target', 'value'],
  'target'      : [],
  'result'      : ['values', 'module', 'expression'],
  'values'      : ['values'],
  'module'      : ['args'],
  'where'       : ['expression'],
  'from'        : ['source', 'map'],
  'map'         : ['map', 'join'],
  'join'        : ['source', 'constraint'],
  'compound'    : ['compound','statement'],
  'statement'   : ['result', 'from', 'where', 'limit', 'args', 'group', 'having', 'order', 'with', 'target', 'on', 'name', 'definition', 'into', 'set', 'condition', 'compound', 'statement', 'to']
};

module.exports = {
    version : require('./package.json').version,
    Syntax : estraverse.Syntax,
    traverse : estraverse.traverse,
    replace : estraverse.replace,
    attachComments : estraverse.attachComments,
    VisitorKeys : estraverse.VisitorKeys,
    VisitorOption : estraverse.VisitorOption,
    Controller : estraverse.Controller
};