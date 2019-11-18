module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'prettier',
        'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:prettier/recommended' // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    plugins: ['@typescript-eslint', 'import'],
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module' // Allows for the use of imports
    },
    rules: {
        indent: 0, // enforce 4 space consistent indentation
        'comma-style': ['error', 'last'], // requires a comma after and on the same line as an array element, object property, or variable declaration
        'comma-dangle': ['error', 'never'], // disallow trailing commas
        'no-use-before-define': [
            // warns when it encounters a reference to an identifier that has not yet been declared.
            'error',
            {
                functions: true,
                classes: true,
                variables: false
            }
        ],
        'arrow-return-shorthand': 0,
        'max-len': ['error', { code: 140 }],
        semi: ['error', 'always'],

        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
    }
};
