export declare const SHARED_PROVIDER_TYPES: {
    CONFIG: symbol;
    WORKFLOW: symbol;
    HELPER: symbol;
    UTIL: symbol;
    FACADE: symbol;
    REGISTRY: symbol;
    PARSER: symbol;
    CONTAINER: symbol;
    HTTP_CLIENT: symbol;
    FACTORY: symbol;
    ADAPTER: symbol;
    PROXY: symbol;
    TASK_MANAGER: symbol;
    CONSTRUCTOR: symbol;
    FAKE: symbol;
    SCHEMA_VALIDATOR: symbol;
    LOADER: symbol;
    LOGGER: symbol;
    VALIDATION_SCHEMA: symbol;
    DECORATOR: symbol;
};
export declare const SHARED_PLACEHOLDER_TYPES: {
    CONFIG: symbol;
};
export declare enum LOG_LEVELS {
    WARN = "warn",
    INFO = "info",
    DEBUG = "debug",
    ERROR = "error"
}
export declare enum EXCEL_FONTS {
    TIMES_NEW_ROMAN = "Times New Roman",
    COMIC_SANS_MS = "Comic Sans MS",
    ARIAL_BLACK = "Arial Black"
}
export declare enum TASK_SCHEDULER_RULES {
    MIN_3_MAX_5 = "MIN_3_MAX_5",
    MIN_5_MAX_10 = "MIN_5_MAX_10"
}
export declare enum SCHEDULED_TASKS {
    BUILD_SOMETHING = "BUILD_SOMETHING"
}
export declare const SEQUELIZE_OPERATOR_ALIASES: {
    $eq: symbol;
    $gt: symbol;
    $gte: symbol;
    $ne: symbol;
    $lte: symbol;
    $lt: symbol;
    $not: symbol;
    $in: symbol;
    $notIn: symbol;
    $is: symbol;
    $like: symbol;
    $notLike: symbol;
    $iLike: symbol;
    $notILike: symbol;
    $regexp: symbol;
    $notRegexp: symbol;
    $iRegexp: symbol;
    $notIRegexp: symbol;
    $between: symbol;
    $notBetween: symbol;
    $overlap: symbol;
    $contains: symbol;
    $contained: symbol;
    $adjacent: symbol;
    $strictLeft: symbol;
    $strictRight: symbol;
    $noExtendRight: symbol;
    $noExtendLeft: symbol;
    $and: symbol;
    $or: symbol;
    $any: symbol;
    $all: symbol;
    $values: symbol;
    $col: symbol;
};
export declare enum SORT_DIRECTIONS {
    ASC = "ascending",
    DESC = "descending"
}
export declare enum InMemmoryGatewayNames {
    AUTH_TOKEN = "AUTH_TOKEN"
}
export declare enum GatewayTypes {
    READ = "READ",
    WRITE = "WRITE"
}
export declare enum WorkerEventAction {
    Created = "created",
    Updated = "updated",
    Deleted = "deleted"
}
export declare enum APP_EVENTS {
    USER_INTERUPT = "USER_INTERUPT"
}
export declare enum DB_CONNECTION_TYPES {
    READ = "READ",
    WRITE = "WRITE"
}
export declare const SHARED_PROVIDER_NAMES: {
    HTTP: string;
    OBJECT: string;
    RABBITMQ_CLIENT: string;
    RANDOM_STRING_GENERATOR: string;
    TABLE_DATA_GATEWAY: string;
    INMEMMORY_GATEWAY: string;
    AXIOS: string;
    JWT: string;
    EXCEL: string;
    BCRYPT: string;
    MONGO_OPTIONS: string;
    EXCEL_STYLE: string;
    HTTP_REQUEST: string;
    NUMBER: string;
    LOG4JS: string;
    WORKER_EVENT_SERVICE: string;
    APP_EVENT: string;
    FNV_HASH: string;
    EVENT_TRANSLATOR: string;
    BOTTLENECK: string;
    ERROR_MESSAGE: string;
    LRU_CACHE: string;
    POSTGRES_READ: string;
    POSTGRES_WRITE: string;
    REDIS_READ: string;
    SCHEDULED_TASK: string;
    TASK_SCHEDULER: string;
    RETRY: string;
    REDIS_WRITE: string;
    WINSTON: string;
    SEQUELIZE_OPTIONS: string;
    API_QUERY_STRING: string;
    AUTH_QUERY_STRING: string;
};
export declare const SHARED_PLACEHOLDER_NAMES: {
    CONFIG: symbol;
};
export declare enum APP_ENV {
    DEV = "development",
    PROD = "production"
}
export declare enum WORKER_EVENT_ENTITY_NAMES {
    MEDIA_PLAN_REPORT = "MEDIA_PLAN_REPORT",
    MEDIA_PLAN = "MEDIA_PLAN",
    AUDIENCE_LOOKALIKE_CONFIG = "AUDIENCE_LOOKALIKE_CONFIG"
}
export declare const SHARED_WORKFLOW_NAMES: {
    FIND_USERS: string;
    FIND_FIELDS: string;
    PAGINATE_USERS: string;
};
export declare enum FILTER_OPERATORS {
    GREATER_THAN = "is_greater_than",
    SMALLER_THAN = "is_smaller_than",
    CONTAINS = "contains",
    NOT_CONTAINS = "does_not_contain",
    CONTAINS_SENSITIVE = "contains_case_insensitive",
    CONTAINS_INSENSITIVE = "does_not_contain_case_insensitive",
    IS = "is",
    IS_NOT = "is_not",
    IN = "in",
    NOT_IN = "not_in",
    EQUALS = "equals",
    NOT_EQUALS = "not_equals",
    STARTS_WITH = "starts_with",
    ENDS_WITH = "ends_with",
    BETWEEN = "between"
}
export declare enum CURRENCIES {
    USD = "USD",
    VND = "VND",
    CHY = "CHY"
}
export declare enum CustomErrors {
    BAD_REQUEST = "Bad request error",
    NOT_FOUND = "Resource not found",
    FORBIDDEN = "Forbidden error",
    INTERNAL = "Internal server error",
    UNAUTHORIZED = "Unauthorized error"
}
