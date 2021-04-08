import { DB_CONNECTION_TYPES } from "@src.shared/shared/constants";
export declare abstract class DatabaseGateway {
    protected connectionMap: Map<string, any>;
    getConnection<T>(dbName: string, connectionType?: DB_CONNECTION_TYPES): T;
    protected registerConnection<T>(dbName: string, connection: T, connectionType?: DB_CONNECTION_TYPES): void;
    abstract setupDbConnections(): Promise<void>;
    protected getConnectionHashKey(dbName: string, connectionType: DB_CONNECTION_TYPES): string;
}
