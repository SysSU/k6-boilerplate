module.exports = {
  root: true,

  parser: '@babel/eslint-parser',

  plugins: ['import', 'json-format'],

  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
  },

  extends: [
    'plugin:prettier/recommended',
    'plugin:import/typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],

  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },

  settings: {
    'import/core-modules': ['k6', 'k6/options', 'k6/http', 'k6/execution' ],
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },

  overrides: [
    {
      files: ['**/*.ts?(x)'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },


        // typescript-eslint specific options
        warnOnUnsupportedTypeScriptVersion: true,
      },
      plugins: ['@typescript-eslint'],
      // If adding a typescript-eslint version of an existing ESLint rule,
      // make sure to disable the ESLint rule here.
      rules: {
        // TypeScript's `noFallthroughCasesInSwitch` option is more robust (#6906)
        'default-case': 'off',
        // 'tsc' already handles this (https://github.com/typescript-eslint/typescript-eslint/issues/291)
        'no-dupe-class-members': 'off',
        // 'tsc' already handles this (https://github.com/typescript-eslint/typescript-eslint/issues/477)
        'no-undef': 'off',

        // Add TypeScript specific rules (and turn off ESLint equivalents)
        'no-array-constructor': 'off',
        '@typescript-eslint/no-array-constructor': 'warn',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-vars': [
          2,
          {
            ignoreRestSiblings: true,
          },
        ],
        'no-useless-constructor': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-useless-constructor': 'warn',

        // Ported from old ruleset
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/array-type': [
          'error',
          {
            default: 'array-simple',
          },
        ],
        '@typescript-eslint/ban-types': [
          'error',
          {
            extendDefaults: true,
            types: {
              '{}': false,
              object: false,
            },
          },
        ],
        '@typescript-eslint/member-delimiter-style': [
          'off',
          {
            multiline: {
              delimiter: 'semi',
              requireLast: true,
            },
            singleline: {
              delimiter: 'semi',
              requireLast: false,
            },
          },
        ],
        '@typescript-eslint/member-ordering': 'error',
        '@typescript-eslint/no-empty-function': 'error',
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-namespace': 'error',
        '@typescript-eslint/no-parameter-properties': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/triple-slash-reference': 'error',
        '@typescript-eslint/type-annotation-spacing': 'error',
        '@typescript-eslint/unified-signatures': 'error',
        // Rules I would rather not have in
        '@typescript-eslint/consistent-type-assertions': 'error',
        '@typescript-eslint/consistent-type-definitions': 'error',
        '@typescript-eslint/explicit-member-accessibility': [
          'error',
          {
            accessibility: 'explicit',
            overrides: {
              constructors: 'off',
            },
          },
        ],
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'interface',
            format: ['PascalCase'],
            prefix: ['I'],
          },
          {
            selector: 'class',
            format: ['PascalCase'],
          },
        ],
      },
    },
    {
      files: ['**/*test.{js,jsx,ts,tsx}'],
      rules: {
        'import/no-unused-modules': 'off',
      },
    }
  ],

  ignorePatterns: 'node_modules',

  rules: {
    'no-else-return': 'off',
    'no-unexpected-multiline': 'off',
    'require-atomic-updates': 'off',
    'no-unused-expressions': 'off',
    'no-console': 'error',
    'no-unused-vars': [
      2,
      {
        ignoreRestSiblings: true,
      },
    ],

    // I believe the following rules should be on, but they conflict with
    // existing code
    'no-import-assign': 'off',
    'no-redeclare': 'off',
    'no-useless-escape': 'off',
    'no-await-in-loop': 'off',
    'no-undef': 'error',
    'no-global-assign': 'error',
    'import/no-named-as-default': 'off',
    'import/namespace': 'off',
    'import/no-unused-modules': [2, { unusedExports: true }],
  },

  globals: {
    AppConfig: false,
    google: false,
    spyOn: false,
    lightningjs: false,
  },
}
