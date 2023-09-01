import { User } from "src/auth/user.entity";
import { Task } from "src/tasks/task.entity";
import * as config from 'config'
import { DataSource, DataSourceOptions } from "typeorm";

const dbconfig = config.get('db')

export const typeOrmConfig: DataSourceOptions  = {

    type: dbconfig.type,
    host: process.env.RDS_HOSTNAME || dbconfig.host,
    port: process.env.RDS_PORT || dbconfig.port,
    username: process.env.RDS_USERNAME || dbconfig.username,
    password: process.env.RDS_PASSWORD || dbconfig.password,
    database: process.env.RDS_DB_NAME || dbconfig.database,
    entities: [Task, User],
    synchronize: process.env.TYPEORM_SYNC || dbconfig.synchronize

}

const datasource = new DataSource(typeOrmConfig);

export default datasource;

