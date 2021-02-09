"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paginate_users_schema_1 = require("../users/paginate-users-schema");
const find_users_schema_1 = require("./find-users-schema");
exports.default = [
    find_users_schema_1.default,
    paginate_users_schema_1.default,
];
