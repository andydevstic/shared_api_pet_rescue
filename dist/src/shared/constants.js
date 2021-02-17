"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomErrors = exports.CURRENCIES = exports.FILTER_OPERATORS = exports.SHARED_WORKFLOW_NAMES = exports.WORKER_EVENT_ENTITY_NAMES = exports.APP_ENV = exports.SHARED_PLACEHOLDER_NAMES = exports.SHARED_PROVIDER_NAMES = exports.APP_EVENTS = exports.WorkerEventAction = exports.GatewayTypes = exports.InMemmoryGatewayNames = exports.SORT_DIRECTIONS = exports.VALIDATION_SCHEMAS = exports.SEQUELIZE_OPERATOR_ALIASES = exports.SCHEDULED_TASKS = exports.TASK_SCHEDULER_RULES = exports.EXCEL_FONTS = exports.LOG_LEVELS = exports.SHARED_PLACEHOLDER_TYPES = exports.SHARED_PROVIDER_TYPES = void 0;
const sequelize_1 = require("sequelize");
exports.SHARED_PROVIDER_TYPES = {
    CONFIG: Symbol.for('CONFIG'),
    WORKFLOW: Symbol('WORKFLOW'),
    HELPER: Symbol('HELPER'),
    UTIL: Symbol('UTIL'),
    FACADE: Symbol('FACADE'),
    REGISTRY: Symbol('REGISTRY'),
    PARSER: Symbol('PARSER'),
    HTTP_CLIENT: Symbol('HTTP_CLIENT'),
    FACTORY: Symbol('FACTORY'),
    ADAPTER: Symbol('ADAPTER'),
    PROXY: Symbol('PROXY'),
    TASK_MANAGER: Symbol('TASK_MANAGER'),
    FAKE: Symbol('FAKE'),
    SCHEMA_VALIDATOR: Symbol('SCHEMA_VALIDATOR'),
    LOADER: Symbol('LOADER'),
    LOGGER: Symbol('SHARED_LOGGER'),
    VALIDATION_SCHEMA: Symbol('VALIDATION_SCHEMA'),
    DECORATOR: Symbol('DECORATOR'),
};
exports.SHARED_PLACEHOLDER_TYPES = {
    CONFIG: Symbol.for('CONFIG'),
};
var LOG_LEVELS;
(function (LOG_LEVELS) {
    LOG_LEVELS["WARN"] = "warn";
    LOG_LEVELS["INFO"] = "info";
    LOG_LEVELS["DEBUG"] = "debug";
    LOG_LEVELS["ERROR"] = "error";
})(LOG_LEVELS = exports.LOG_LEVELS || (exports.LOG_LEVELS = {}));
var EXCEL_FONTS;
(function (EXCEL_FONTS) {
    EXCEL_FONTS["TIMES_NEW_ROMAN"] = "Times New Roman";
    EXCEL_FONTS["COMIC_SANS_MS"] = "Comic Sans MS";
    EXCEL_FONTS["ARIAL_BLACK"] = "Arial Black";
})(EXCEL_FONTS = exports.EXCEL_FONTS || (exports.EXCEL_FONTS = {}));
var TASK_SCHEDULER_RULES;
(function (TASK_SCHEDULER_RULES) {
    TASK_SCHEDULER_RULES["MIN_3_MAX_5"] = "MIN_3_MAX_5";
    TASK_SCHEDULER_RULES["MIN_5_MAX_10"] = "MIN_5_MAX_10";
})(TASK_SCHEDULER_RULES = exports.TASK_SCHEDULER_RULES || (exports.TASK_SCHEDULER_RULES = {}));
var SCHEDULED_TASKS;
(function (SCHEDULED_TASKS) {
    SCHEDULED_TASKS["BUILD_SOMETHING"] = "BUILD_SOMETHING";
})(SCHEDULED_TASKS = exports.SCHEDULED_TASKS || (exports.SCHEDULED_TASKS = {}));
exports.SEQUELIZE_OPERATOR_ALIASES = {
    $eq: sequelize_1.Op.eq,
    $gt: sequelize_1.Op.gt,
    $gte: sequelize_1.Op.gte,
    $ne: sequelize_1.Op.ne,
    $lte: sequelize_1.Op.lte,
    $lt: sequelize_1.Op.lt,
    $not: sequelize_1.Op.not,
    $in: sequelize_1.Op.in,
    $notIn: sequelize_1.Op.notIn,
    $is: sequelize_1.Op.is,
    $like: sequelize_1.Op.like,
    $notLike: sequelize_1.Op.notLike,
    $iLike: sequelize_1.Op.iLike,
    $notILike: sequelize_1.Op.notILike,
    $regexp: sequelize_1.Op.regexp,
    $notRegexp: sequelize_1.Op.notRegexp,
    $iRegexp: sequelize_1.Op.iRegexp,
    $notIRegexp: sequelize_1.Op.notIRegexp,
    $between: sequelize_1.Op.between,
    $notBetween: sequelize_1.Op.notBetween,
    $overlap: sequelize_1.Op.overlap,
    $contains: sequelize_1.Op.contains,
    $contained: sequelize_1.Op.contained,
    $adjacent: sequelize_1.Op.adjacent,
    $strictLeft: sequelize_1.Op.strictLeft,
    $strictRight: sequelize_1.Op.strictRight,
    $noExtendRight: sequelize_1.Op.noExtendRight,
    $noExtendLeft: sequelize_1.Op.noExtendLeft,
    $and: sequelize_1.Op.and,
    $or: sequelize_1.Op.or,
    $any: sequelize_1.Op.any,
    $all: sequelize_1.Op.all,
    $values: sequelize_1.Op.values,
    $col: sequelize_1.Op.col,
};
var VALIDATION_SCHEMAS;
(function (VALIDATION_SCHEMAS) {
    VALIDATION_SCHEMAS["FIND_USERS"] = "FIND_USERS";
    VALIDATION_SCHEMAS["PAGINATE_USERS"] = "PAGINATE_USERS";
    VALIDATION_SCHEMAS["FIND_FIELDS"] = "FIND_FIELDS";
    VALIDATION_SCHEMAS["FILTER"] = "FILTER";
    VALIDATION_SCHEMAS["SORT"] = "SORT";
})(VALIDATION_SCHEMAS = exports.VALIDATION_SCHEMAS || (exports.VALIDATION_SCHEMAS = {}));
var SORT_DIRECTIONS;
(function (SORT_DIRECTIONS) {
    SORT_DIRECTIONS["ASC"] = "ascending";
    SORT_DIRECTIONS["DESC"] = "descending";
})(SORT_DIRECTIONS = exports.SORT_DIRECTIONS || (exports.SORT_DIRECTIONS = {}));
var InMemmoryGatewayNames;
(function (InMemmoryGatewayNames) {
    InMemmoryGatewayNames["AUTH_TOKEN"] = "AUTH_TOKEN";
})(InMemmoryGatewayNames = exports.InMemmoryGatewayNames || (exports.InMemmoryGatewayNames = {}));
var GatewayTypes;
(function (GatewayTypes) {
    GatewayTypes["READ"] = "READ";
    GatewayTypes["WRITE"] = "WRITE";
})(GatewayTypes = exports.GatewayTypes || (exports.GatewayTypes = {}));
var WorkerEventAction;
(function (WorkerEventAction) {
    WorkerEventAction["Created"] = "created";
    WorkerEventAction["Updated"] = "updated";
    WorkerEventAction["Deleted"] = "deleted";
})(WorkerEventAction = exports.WorkerEventAction || (exports.WorkerEventAction = {}));
var APP_EVENTS;
(function (APP_EVENTS) {
    APP_EVENTS["USER_INTERUPT"] = "USER_INTERUPT";
})(APP_EVENTS = exports.APP_EVENTS || (exports.APP_EVENTS = {}));
exports.SHARED_PROVIDER_NAMES = {
    HTTP: 'HTTP',
    OBJECT: 'OBJECT',
    RABBITMQ_CLIENT: 'RABBITMQ_CLIENT',
    TABLE_DATA_GATEWAY: 'TABLE_DATA_GATEWAY',
    INMEMMORY_GATEWAY: 'INMEMMORY_GATEWAY',
    AXIOS: 'AXIOS',
    EXCEL: 'EXCEL',
    EXCEL_STYLE: 'EXCEL_STYLE',
    NUMBER: 'NUMBER',
    LOG4JS: 'LOG4JS',
    WORKER_EVENT_SERVICE: 'WORKER_EVENT_SERVICE',
    APP_EVENT: 'APP_EVENT',
    EVENT_TRANSLATOR: 'EVENT_TRANSLATOR',
    BOTTLENECK: 'BOTTLENECK',
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
exports.SHARED_PLACEHOLDER_NAMES = {
    CONFIG: Symbol.for('CONFIG'),
};
var APP_ENV;
(function (APP_ENV) {
    APP_ENV["DEV"] = "development";
    APP_ENV["PROD"] = "production";
})(APP_ENV = exports.APP_ENV || (exports.APP_ENV = {}));
var WORKER_EVENT_ENTITY_NAMES;
(function (WORKER_EVENT_ENTITY_NAMES) {
    WORKER_EVENT_ENTITY_NAMES["MEDIA_PLAN_REPORT"] = "MEDIA_PLAN_REPORT";
    WORKER_EVENT_ENTITY_NAMES["MEDIA_PLAN"] = "MEDIA_PLAN";
    WORKER_EVENT_ENTITY_NAMES["AUDIENCE_LOOKALIKE_CONFIG"] = "AUDIENCE_LOOKALIKE_CONFIG";
})(WORKER_EVENT_ENTITY_NAMES = exports.WORKER_EVENT_ENTITY_NAMES || (exports.WORKER_EVENT_ENTITY_NAMES = {}));
exports.SHARED_WORKFLOW_NAMES = {
    FIND_USERS: 'FIND_USERS',
    FIND_FIELDS: 'FIND_FIELDS',
    PAGINATE_USERS: 'PAGINATE_USERS',
};
var FILTER_OPERATORS;
(function (FILTER_OPERATORS) {
    FILTER_OPERATORS["GREATER_THAN"] = "is_greater_than";
    FILTER_OPERATORS["SMALLER_THAN"] = "is_smaller_than";
    FILTER_OPERATORS["CONTAINS"] = "contains";
    FILTER_OPERATORS["NOT_CONTAINS"] = "does_not_contain";
    FILTER_OPERATORS["CONTAINS_SENSITIVE"] = "contains_case_insensitive";
    FILTER_OPERATORS["CONTAINS_INSENSITIVE"] = "does_not_contain_case_insensitive";
    FILTER_OPERATORS["IS"] = "is";
    FILTER_OPERATORS["IS_NOT"] = "is_not";
    FILTER_OPERATORS["IN"] = "in";
    FILTER_OPERATORS["NOT_IN"] = "not_in";
    FILTER_OPERATORS["EQUALS"] = "equals";
    FILTER_OPERATORS["NOT_EQUALS"] = "not_equals";
    FILTER_OPERATORS["STARTS_WITH"] = "starts_with";
    FILTER_OPERATORS["ENDS_WITH"] = "ends_with";
    FILTER_OPERATORS["BETWEEN"] = "between";
})(FILTER_OPERATORS = exports.FILTER_OPERATORS || (exports.FILTER_OPERATORS = {}));
var CURRENCIES;
(function (CURRENCIES) {
    CURRENCIES["USD"] = "USD";
    CURRENCIES["VND"] = "VND";
    CURRENCIES["CHY"] = "CHY";
})(CURRENCIES = exports.CURRENCIES || (exports.CURRENCIES = {}));
var CustomErrors;
(function (CustomErrors) {
    CustomErrors["BAD_REQUEST"] = "Bad request error";
    CustomErrors["NOT_FOUND"] = "Resource not found";
    CustomErrors["FORBIDDEN"] = "Forbidden error";
    CustomErrors["INTERNAL"] = "Internal server error";
    CustomErrors["UNAUTHORIZED"] = "Unauthorized error";
})(CustomErrors = exports.CustomErrors || (exports.CustomErrors = {}));
