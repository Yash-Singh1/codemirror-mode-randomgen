(function (mod) {
  if (typeof exports == 'object' && typeof module == 'object')
    // CommonJS
    mod(require('codemirror'));
  else if (typeof define == 'function' && define.amd)
    // AMD
    define(['codemirror'], mod);
  // Plain browser env
  else mod(CodeMirror);
})(function (CodeMirror) {
  CodeMirror.defineMode('randomgen', (config) => {
    function giveMode(baseMode) {
      if (CodeMirror.getMode(config, 'xml').name !== 'null' && typeof CodeMirror.overlayMode === 'function') {
        return CodeMirror.overlayMode(baseMode, CodeMirror.getMode(config, 'xml'));
      }
      return baseMode;
    }
    return giveMode(
      CodeMirror.simpleMode('randomgen', {
        start: [
          // Comments (Note: comments start from beginning of the line)
          { regex: /\/\/[^]*$/, sol: true, token: 'comment' },
          { regex: /\/\*/, sol: true, token: 'comment', next: 'comment' },

          // Settings definitions
          { regex: /(\$)(name|author|description|picture|button|seed text)( : )(.*?)$/, sol: true, token: ['bracket', 'def', null, 'string'] },
          { regex: /(\$)(picture)( : )(.*?)$/, sol: true, token: ['bracket', 'def', null, 'link'] },
          { regex: /(\$)(amount)( : )(\d+)/, sol: true, token: ['bracket', 'def', null, 'number'] },
          { regex: /(\$)(include)( )(.*?)$/, sol: true, token: ['bracket', 'def', null, 'link'] },
          { regex: /(\$)(all roots|allow duplicates|force unique|includes finalized)/, sol: true, token: ['bracket', 'def'] },

          // List defintions
          { regex: /(\$(?:\+>|>\+|\+|>)?)(.*?)$/, sol: true, token: ['bracket', 'variable'] },

          // Strings and list references and attributes and chances
          { regex: /([^{\r\n]*?)(\[)/, token: ['string', 'bracket'], push: 'open' },
          { regex: /(.*?)({)/, token: ['string', 'bracket'], push: 'object' },
          { regex: /.*?$/, token: 'string' }
        ],

        // Handling references to lists
        open: [
          { regex: /\[/, token: 'bracket', push: 'open' },
          { regex: /]/, token: 'bracket', pop: true },
          { regex: /(,)(as|or)( .*?)(?=[,\]])/, token: ['bracket', 'keyword', 'variable-2'] },
          { regex: /\||,|%|#/, token: 'bracket' },
          { regex: /\d+-\d+(?=[\],])/, token: 'number' },
          { regex: /x\d+(-\d+)?(?=[,\]])/, token: 'number' },
          { regex: /(first part|middle part|last part|compress|mundane|written|hidden|unique|lower|title)(?=[,\]])/, token: 'keyword' },
          { regex: /(?!%)(.*?)(?=[,\[\]|])/, token: 'variable' }
        ],

        object: [
          { regex: /}/, token: 'bracket', pop: true },
          { regex: /\[/, token: 'bracket', push: 'open' },
          { regex: /^(\d+(\.\d*)?%)(?=})/, token: 'number' },
          { regex: /^(.*?)(:)(.*?)(?=[\[}])/, token: ['variable-2', 'bracket', 'string'] },
          { regex: /^([^[\s]*?)(?=[[}])/, token: 'string' }
        ],

        // The multi-line comment state.
        comment: [
          { regex: /.*?\*\//, sol: true, token: 'comment', next: 'start' },
          { regex: /.*/, token: 'comment' }
        ],

        // Data about the mode
        meta: {
          dontIndentStates: ['comment'],
          lineComment: '//',
          blockCommentStart: '/*',
          blockCommentEnd: '*/',
          closeBrackets: '[]{}'
        }
      })
    );
  });
});
