import lodash from 'lodash';

import application from '../config/application';
import database from '../config/database';
import services from '../config/services';
import bus from '../config/bus';

const config = {
    application,
    database,
    services,
    bus
};

export default (configName: string): any => lodash.get(config, configName);
