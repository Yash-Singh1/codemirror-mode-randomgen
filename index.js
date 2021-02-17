(function (mod) {
  if (typeof exports == 'object' && typeof module == 'object')
    // CommonJS
    mod(require('../../lib/codemirror'));
  else if (typeof define == 'function' && define.amd)
    // AMD
    define(['../../lib/codemirror'], mod);
  // Plain browser env
  else mod(CodeMirror);
})(function (CodeMirror) {
  CodeMirror.defineSimpleMode('randomgen', {
    start: [
      // Settings definitions
      { regex: /(\$)(name|author|description|picture|button|seed text)( : )(.*?)$/, sol: true, token: ['bracket', 'def', null, 'string'] },
      { regex: /(\$)(picture)( : )(.*?)$/, sol: true, token: ['bracket', 'def', null, 'link'] },
      { regex: /(\$)(amount)( : )(\d+)/, sol: true, token: ['bracket', 'def', null, 'number'] },
      { regex: /(\$)(include)( .*?)$/, sol: true, token: ['bracket', 'def', 'link'] },
      { regex: /(\$)(all roots|allow duplicates|force unique|includes finalized)/, sol: true, token: ['bracket', 'def'] },

      // List defintions
      { regex: /(\$[+>]?)(.*?)$/, sol: true, token: ['bracket', 'variable'] },

      // Strings and list references and attributes and chances
      { regex: /(.*?)(\[)/, token: ['string', 'bracket'], push: 'open' },
      { regex: /(.*?)({)/, token: ['string', 'bracket'], push: 'object' },
      { regex: /.*?$/, token: 'string' },

      // Comments (Note: comments start from beginning of the line)
      { regex: /\/\/.*/, sol: true, token: 'comment' },
      { regex: /\/\*/, sol: true, token: 'comment', next: 'comment' }
    ],

    // Handling references to lists
    open: [
      { regex: /\[/, token: 'bracket', push: 'open' },
      { regex: /]/, token: 'bracket', pop: true },
      { regex: /\||,|%|#/, token: 'bracket' },
      { regex: /x?\d+-\d+/, token: 'number' },
      { regex: /first part|middle part|last part|compress|mundane|written|unique|lower|title/, token: 'keyword' },
      { regex: /(as|or)( .*?)(?=[,\]])/, token: ['keyword', 'variable-2', null] },
      { regex: /(?!%)(.*?)(?=[,\]|])/, token: ['variable', 'variable', null] }
    ],

    object: [
      { regex: /}/, token: 'bracket', pop: true },
      { regex: /,/, token: 'bracket' },
      { regex: /(.*?%)(?=})/, token: ['number', null] },
      { regex: /([^{},]*?)(:)([^{},]*?)(?=[,}])/, token: ['variable-2', null, 'string', null] },
    ],

    // The multi-line comment state.
    comment: [
      { regex: /.*?\*\//, sol: true, token: 'comment', next: 'start' },
      { regex: /.*/, token: 'comment' }
    ],

    // Data about the mode
    meta: {
      dontIndentStates: ['comment'],
      lineComment: '//'
    }
  });
});
