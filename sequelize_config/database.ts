const sequelizeConfig = {
    host: process.env.SQL_DATABASE_HOST || 'localhost',
    username: process.env.SQL_DATABASE_USERNAME || '',
    password: process.env.SQL_DATABASE_PASSWORD || '',
    database: process.env.SQL_DATABASE_NAME || '',
    port: process.env.SQL_DATABASE_PORT || '5432',
    'migrations-path': './src/core/database/migrations',
    'seeders-path': './src/core/database/seeders',
    dialect: 'postgres',
    define: {
        underscored: true,
        freezeTableName: true,
        timestamps: true
    },
    logging: function(str: string) {
        console.log('sequelize: ' + str);
    }
};

export const development = { ...sequelizeConfig };

export const test = {
    ...sequelizeConfig,
    username: process.env.SQL_TEST_DATABASE_USERNAME || '',
    password: process.env.SQL_TEST_DATABASE_PASSWORD || '',
    database: process.env.SQL_TEST_DATABASE_NAME || '',
    logging: function(str: string) {
        console.log('sequelize: ' + str);
    }
};

export default { test };
export const production = { ...sequelizeConfig, logging: false };
