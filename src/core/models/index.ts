/* eslint-disable @typescript-eslint/no-var-requires */

import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';

import * as sequelizeConfig from '../../../sequelize_config/database';

// eslint-disable-next-line no-undef
const basename = path.basename(__filename);
const db: any = {};

const environment = process.env.NODE_ENV || 'development';

const config = sequelizeConfig[environment];

const { database, username, password, ...otherConfig } = config;

const sequelize = new Sequelize(database, username, password, otherConfig);

// eslint-disable-next-line no-undef
fs.readdirSync(__dirname)
    .filter((file: any): any => file.indexOf('.') !== 0 && file !== basename && (file.slice(-3) === '.js' || file.slice(-3) === '.ts'))
    .forEach((file: any): any => {
        // eslint-disable-next-line no-undef
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName: any): any => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
