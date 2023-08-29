import { User } from "src/auth/user.entity";
import { Task } from "src/tasks/task.entity";
import { DataSource, DataSourceOptions } from "typeorm";

export const typeOrmConfig: DataSourceOptions  = {
    type: 'postgres',
    host:'localhost',
    port: 5432,
    username:'postgres',
    password:'postgres',
    database:'taskmanagement',
    entities: [Task, User],
    synchronize: true
}

const datasource = new DataSource(typeOrmConfig);

export default datasource;

