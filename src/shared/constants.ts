import { Op } from 'sequelize';

export const SHARED_PROVIDER_TYPES = {
  CONFIG: Symbol.for('CONFIG'),
  WORKFLOW: Symbol.for('WORKFLOW'),
  HELPER: Symbol.for('HELPER'),
  UTIL: Symbol.for('UTIL'),
  FACADE: Symbol.for('FACADE'),
  REGISTRY: Symbol.for('REGISTRY'),
  PARSER: Symbol.for('PARSER'),
  CONTAINER: Symbol.for('CONTAINER'),
  HTTP_CLIENT: Symbol.for('HTTP_CLIENT'),
  FACTORY: Symbol.for('FACTORY'),
  ADAPTER: Symbol.for('ADAPTER'),
  PROXY: Symbol.for('PROXY'),
  TASK_MANAGER: Symbol.for('TASK_MANAGER'),
  CONSTRUCTOR: Symbol.for('CONSTRUCTOR'),
  FAKE: Symbol.for('FAKE'),
  SCHEMA_VALIDATOR: Symbol.for('SCHEMA_VALIDATOR'),
  LOADER: Symbol.for('LOADER'),
  LOGGER: Symbol.for('LOGGER'),
  VALIDATION_SCHEMA: Symbol.for('VALIDATION_SCHEMA'),
  DECORATOR: Symbol.for('DECORATOR'),
};

export const SHARED_PLACEHOLDER_TYPES = {
  CONFIG: Symbol.for('CONFIG'),
};

export enum LOG_LEVELS {
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
  ERROR = 'error',
}

export enum EXCEL_FONTS {
  TIMES_NEW_ROMAN = 'Times New Roman',
  COMIC_SANS_MS = 'Comic Sans MS',
  ARIAL_BLACK = 'Arial Black',
}

export enum TASK_SCHEDULER_RULES {
  MIN_3_MAX_5 = 'MIN_3_MAX_5', // minimum 3 requests executing at the same time, but not more than 5.
  MIN_5_MAX_10 = 'MIN_5_MAX_10',
}

export enum SCHEDULED_TASKS {
  BUILD_SOMETHING = 'BUILD_SOMETHING', // delete if you want.
}

export const SEQUELIZE_OPERATOR_ALIASES = {
  $eq: Op.eq,
  $gt: Op.gt,
  $gte: Op.gte,
  $ne: Op.ne,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col,
};

export enum VALIDATION_SCHEMAS {
  FIND_USERS = 'FIND_USERS',
  PAGINATE_USERS = 'PAGINATE_USERS',
  FIND_FIELDS = 'FIND_FIELDS',
  FILTER = 'FILTER',
  SORT = 'SORT',
}

export enum SORT_DIRECTIONS {
  ASC = 'ascending',
  DESC = 'descending',
}

export enum InMemmoryGatewayNames {
  AUTH_TOKEN = 'AUTH_TOKEN',
}

export enum GatewayTypes {
  READ = 'READ',
  WRITE = 'WRITE',
}

export enum WorkerEventAction {
  Created = 'created',
  Updated = 'updated',
  Deleted = 'deleted'
}

export enum APP_EVENTS {
  USER_INTERUPT = 'USER_INTERUPT',
}

export enum DB_CONNECTION_TYPES {
  READ = 'READ',
  WRITE = 'WRITE',
}

export const SHARED_PROVIDER_NAMES = {
  HTTP: 'HTTP',
  OBJECT: 'OBJECT',
  RABBITMQ_CLIENT: 'RABBITMQ_CLIENT',
  TABLE_DATA_GATEWAY: 'TABLE_DATA_GATEWAY',
  INMEMMORY_GATEWAY: 'INMEMMORY_GATEWAY',
  AXIOS: 'AXIOS',
  EXCEL: 'EXCEL',
  MONGO_OPTIONS: 'MONGO_OPTIONS',
  EXCEL_STYLE: 'EXCEL_STYLE',
  NUMBER: 'NUMBER',
  LOG4JS: 'LOG4JS',
  WORKER_EVENT_SERVICE: 'WORKER_EVENT_SERVICE',
  APP_EVENT: 'APP_EVENT',
  FNV_HASH: 'FNV_HASH',
  EVENT_TRANSLATOR: 'EVENT_TRANSLATOR',
  BOTTLENECK: 'BOTTLENECK',
  ERROR_MESSAGE: 'ERROR_MESSAGE',
  LRU_CACHE: 'LRU_CACHE',
  POSTGRES_READ: 'POSTGRES_READ',
  POSTGRES_WRITE: 'POSTGRES_WRITE',
  REDIS_READ: 'REDIS_READ',
  SCHEDULED_TASK: 'SCHEDULED_TASK',
  TASK_SCHEDULER: 'TASK_SCHEDULER',
  RETRY: 'RETRY',
  REDIS_WRITE: 'REDIS_WRITE',
  WINSTON: 'WINSTON',
  SEQUELIZE_OPTIONS: 'SEQUELIZE_OPTIONS',
  API_QUERY_STRING: 'API_QUERY_STRING',
  AUTH_QUERY_STRING: 'AUTH_QUERY_STRING',
};

export const SHARED_PLACEHOLDER_NAMES = {
  CONFIG: Symbol.for('CONFIG'),
};

export enum APP_ENV {
  DEV = 'development',
  PROD = 'production',
}

export enum WORKER_EVENT_ENTITY_NAMES {
  MEDIA_PLAN_REPORT = 'MEDIA_PLAN_REPORT',
  MEDIA_PLAN = 'MEDIA_PLAN',
  AUDIENCE_LOOKALIKE_CONFIG = 'AUDIENCE_LOOKALIKE_CONFIG',
}

export const SHARED_WORKFLOW_NAMES = {
  FIND_USERS: 'FIND_USERS',
  FIND_FIELDS: 'FIND_FIELDS',
  PAGINATE_USERS: 'PAGINATE_USERS',
};

export enum FILTER_OPERATORS {
  GREATER_THAN = 'is_greater_than',
  SMALLER_THAN = 'is_smaller_than',
  CONTAINS = 'contains',
  NOT_CONTAINS = 'does_not_contain',
  CONTAINS_SENSITIVE = 'contains_case_insensitive',
  CONTAINS_INSENSITIVE = 'does_not_contain_case_insensitive',
  IS = 'is',
  IS_NOT = 'is_not',
  IN = 'in',
  NOT_IN = 'not_in',
  EQUALS = 'equals',
  NOT_EQUALS = 'not_equals',
  STARTS_WITH = 'starts_with',
  ENDS_WITH = 'ends_with',
  BETWEEN = 'between',
}

export enum CURRENCIES {
  USD = 'USD',
  VND = 'VND',
  CHY = 'CHY',
}

export enum CustomErrors {
  BAD_REQUEST = 'Bad request error',
  NOT_FOUND = 'Resource not found',
  FORBIDDEN = 'Forbidden error',
  INTERNAL = 'Internal server error',
  UNAUTHORIZED = 'Unauthorized error',
}
