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
      { regex: /(\$)(all roots)/, sol: true, token: ['bracket', 'def'] },

      // List defintions
      { regex: /(\$[+>]?)(.*?)$/, sol: true, token: ['bracket', 'variable'] },

      // Strings and list references
      { regex: /(.*?)([\[])/, token: ['string', 'bracket'], push: 'open' },
      { regex: /(.*?$)/, token: 'string' }
    ],

    // Handling references to lists
    open: [
      { regex: /\[/, token: 'bracket', push: 'open' },
      { regex: /]/, token: 'bracket', pop: true },
      { regex: /\||,|%/, token: 'bracket' },
      { regex: /x?\d+-\d+/, token: 'number' },
      { regex: /first part|middle part|last part|Abc|abc|ABC|compress|mundane|lower|title/, token: 'keyword' },
      { regex: /(?!%)(.*?)(?=[,\]|])/, token: ['variable', 'variable', null] }
    ]
  });
});
