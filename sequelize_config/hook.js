const register = require('@babel/register').default;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');

register({ extensions: ['.ts', '.tsx', '.js', '.jsx'] });

dotenv.config();

module.exports = require('./database.ts');
