"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const user_entity_1 = require("../auth/user.entity");
const task_entity_1 = require("../tasks/task.entity");
const config = require("config");
const typeorm_1 = require("typeorm");
const dbconfig = config.get('db');
exports.typeOrmConfig = {
    type: dbconfig.type,
    host: process.env.RDS_HOSTNAME || dbconfig.host,
    port: process.env.RDS_PORT || dbconfig.port,
    username: process.env.RDS_USERNAME || dbconfig.username,
    password: process.env.RDS_PASSWORD || dbconfig.password,
    database: process.env.RDS_DB_NAME || dbconfig.database,
    entities: [task_entity_1.Task, user_entity_1.User],
    synchronize: process.env.TYPEORM_SYNC || dbconfig.synchronize
};
const datasource = new typeorm_1.DataSource(exports.typeOrmConfig);
exports.default = datasource;
//# sourceMappingURL=typeorm.config.js.map