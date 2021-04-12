import { DB_CONNECTION_TYPES } from "@src.shared/shared/constants";
import { injectable } from "inversify";

@injectable()
export abstract class DatabaseGateway {
  protected connectionMap = new Map<string, any>();

  public getConnection<T>(dbName: string, connectionType?: DB_CONNECTION_TYPES): T {
    let hashKey: string;

    const readHashKey = this.getConnectionHashKey(dbName, DB_CONNECTION_TYPES.READ);
    if (this.connectionMap.has(readHashKey)) { hashKey = readHashKey; }

    const writeHashKey = this.getConnectionHashKey(dbName, DB_CONNECTION_TYPES.WRITE);
    if (this.connectionMap.has(writeHashKey)) { hashKey = writeHashKey; }

    const defaultHashKey = this.getConnectionHashKey(dbName, connectionType);
    if (this.connectionMap.has(defaultHashKey)) { hashKey = defaultHashKey; }

    if (hashKey) {
      const dbConnection = this.connectionMap.get(hashKey);

      return dbConnection;
    }

    throw new Error(`Connection for hash key ${dbName} not exist`);
  }

  protected registerConnection<T>(dbName: string, connection: T, connectionType?: DB_CONNECTION_TYPES) {
    const connectionHashKey = this.getConnectionHashKey(dbName, connectionType);

    this.connectionMap.set(connectionHashKey, connection);
  }

  public abstract setupDbConnections(): Promise<void>;

  protected getConnectionHashKey(dbName: string, connectionType: DB_CONNECTION_TYPES): string {
    return `${dbName}_${connectionType || 'default'}`;
  }
}