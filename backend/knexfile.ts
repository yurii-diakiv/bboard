import { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection';
import { AppEnvironment, ENV, TableName } from './src/common/enums/enums';

const DEFAULT_ENV_CONFIG: Knex.Config = {
  client: ENV.DB.DIALECT,
  connection: {
    user: ENV.DB.USER,
    password: ENV.DB.PASSWORD,
    database: ENV.DB.DATABASE,
    host: ENV.DB.HOST,
    port: ENV.DB.PORT,
  },
  pool: {
    min: ENV.DB.POOL_MIN,
    max: ENV.DB.POOL_MIN,
  },
  migrations: {
    directory: './src/data/migrations',
    tableName: TableName.MIGRATIONS,
  },
  debug: false,
  ...knexSnakeCaseMappers({ underscoreBetweenUppercaseLetters: true }),
};

const knexConfig: Record<AppEnvironment, Knex.Config> = {
  [AppEnvironment.DEVELOPMENT]: DEFAULT_ENV_CONFIG,
  [AppEnvironment.PRODUCTION]: DEFAULT_ENV_CONFIG,
};

export default knexConfig;
