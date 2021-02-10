import * as stream from 'stream';
import { Transaction } from 'sequelize';
import { EventEmitter } from 'events';
import { Style, CellValue, Borders, AddWorksheetOptions, Cell, Alignment, Border, Font, Row } from 'exceljs';
import {
  APP_ENV,
  EXCEL_FONTS,
  FILTER_OPERATORS,
  GatewayTypes,
  InMemmoryGatewayNames,
  SCHEDULED_TASKS,
  TableDataGatewayNames,
  TASK_SCHEDULER_RULES,
  VALIDATION_SCHEMAS,
  WorkerEventAction,
  WORKER_EVENT_ENTITY_NAMES,
} from './constants';
import { WorksheetUtil } from '@src.shared/utils/excels/worksheet-utils';
import { Options } from 'amqplib';

export type TaskFunction = () => any;
export type LoggingModuleName = string;

export interface ITransaction {
  commit(): Promise<void>;
  rollback(): Promise<void>;
}

export interface IWorkerEventService {
  pushEvent(entityName: WORKER_EVENT_ENTITY_NAMES, eventName: WorkerEventAction, objectIds: any[]): Promise<void>;
}

export interface TransactionFactory<T> {
  createTransaction?(): Promise<T>;
  createTransactionBox?(callback: (tx: any) => Promise<void>, ...args: any[]): Promise<void>;
}

export interface IObjectUtil {
  groupPropertyValueOfArray(array: any[], propsName: string): any[];
}

export type ITableDataGatewayRegistry = IRegistry<[TableDataGatewayNames, GatewayTypes]>;
export type IInmemmoryGatewayRegistry = IRegistry<[InMemmoryGatewayNames, GatewayTypes]>;

export type Task = (...args: any[]) => any;

export interface Scheduler {
  wrap(task: Task): Task;
}

export type ITaskSchedulerRegistry = IRegistry<[SCHEDULED_TASKS, TASK_SCHEDULER_RULES], TaskScheduler>;

export interface TaskScheduler {
  run<T>(task: TaskFunction): Promise<T>;
}

export interface TaskSchedulerConfig {
  tasksPerSecond: number;
  maxConcurrent?: number;
}

export interface TaskRetryConfig {
  /**
   * Number of times to retry. Default is 3
   */
  retryTimes?: number;
  /**
   * Time measured in milliseconds between retires.
   */
  interval?: number;
}

export interface IPaginateResult<Entity> {
  docs: Entity[];
  total: number;
  limit: number;
  page: number;
}

export interface BulkUpdateDTO {
  criteria: ICriteria;
  data: any;
}

export interface HasId {
  id: string | number;
}

export interface Validator {
  validate(schemaName: VALIDATION_SCHEMAS, payload: any): ValidationResult;
}

export interface ValidationResult {
  valid: boolean;
  errors?: any[];
}

export type ITaskSchedulerFactory = IFactory<[TASK_SCHEDULER_RULES], TaskScheduler>;

export interface IFactory<Input extends AnyParams, Instance = any> {
  createInstance(...args: Input): Instance;
}

export interface Configuration {
  get(key: string): any;
}

export interface ConnectionAdapter<T> {
  getConnection(): T;
}

export interface IAMQPClientDecorator {
  consumeMessageFromQueue(
    queueName: string,
    callback: (msg: any) => void,
    options?: Options.Consume,
  ): void;
  sendMessageToExchange(exchangeName: string, routingKey: string, content: Buffer, options?: Options.Publish): void;
  /**
   * Set number of maximum messages pending ack before receiving new messages.
   * @param count Number of maximum pending messages not acked
   * @param channelName Channel name to apply the rule. If not supplied, applies to global.
   */
  bindQueue(queueName: string, exchangeName, key?: string): Promise<void>;
  getExchange(exchangeName: string, type: AMQPExchangeType, isDurable?: boolean): Promise<void>;
  sendMessageToExchange(exchangeName: string, routingKey: string, data: Buffer, option: object, callback: (error, ok) => void): void;
}

export type AMQPExchangeType = 'fanout' | 'direct' | 'topic' | 'headers';

export type RawQueryString = { [props: string]: string };

export interface ApiQueryString {
  select: string;
  limit: number;
  search: string;
  offset: number;
  page: number;
  filters: IFilter[];
  includes: IInclude[];
  sort: ISort;
}

export interface IParser<T = any> {
  parse(...args: any[]): T;
}

export type NewAble<T> = new () => T;

export interface IWorksheetStyleWrapper {
  setAlignment(alignment: Partial<Alignment>): IWorksheetStyleWrapper;
  apply(): Partial<ICellOptions>;
  setBorder(up?: Partial<Border>, right?: Partial<Border>, down?: Partial<Border>, left?: Partial<Border>): IWorksheetStyleWrapper;
  setCellFont(desiredFont: EXCEL_FONTS, fontOptions?: Partial<Font>): IWorksheetStyleWrapper;
}

export interface IWorksheetStyleUtil {
  formatCell(): IWorksheetStyleWrapper;
}

export interface IExcelUtil {
  addWorkSheet(workSheetName: string, options?: Partial<AddWorksheetOptions>): WorksheetUtil;
  getWorkSheet(workSheetName: string): WorksheetUtil;
  removeWorkSheet(worksheet: WorksheetUtil): void;
  loadTemplate(templatePath: string): Promise<IExcelUtil>;
  writeToStream(readStream: stream.Stream): Promise<void>;
  write(stream: stream.Stream): Promise<void>;
  writeToFile(path: string): Promise<void>;
}

export interface IWorksheetUtil {
  markRemoved(): void;
  rename(newName: string): void;
  setRowHeight(rowNumber: number, height: number): void;
  setColumnSize(columnName: string, width: number): void;
  writeCellByAddress(cellAddress: string, cellData: Partial<ICellData>): Cell;
  writeRow(rowNumber: number, startColumnNumber: number, writeData: any[]): Row;
  getRow(rowNumber1Based: number): Row;
  duplicateRow(rowNumber: number, amount?: number, insert?: boolean): void;
  mergeCells(startCellName: string, endCellName: string, ignoreStyle?: boolean): void;
  commit(): void;
}

export interface ICellOptions {
  style?: Partial<Style>;
  border?: Partial<Borders>;
}

export interface ICellData {
  value: CellValue;
  options?: ICellOptions;
}

export interface IRegistry<Input extends AnyParams, Instance = any> {
  getClass(...args: Input): Instance;
}

export interface GoogleCampaign {
  id: number;
  startDate: Date;
  endDate: Date;
}

export interface INumberParser {
  tryParseOrZero(rawData: any): number;
  tryParsePercentageOrZero(rawPercentage: string): number;
}

export type rdsParamId = string | number;
export type rdsParamUpdateData = any;
export type rdsParamCreateData = any;
export type rdsParamCriteria = ICriteria;
export type rdsParamTransaction = Transaction;

export type IRdsFindWorkflow<Entity> = IWorkflow<[rdsParamCriteria], Promise<Entity[]>>;
export type IRdsFindByIdWorkflow<Entity> = IWorkflow<[rdsParamId, rdsParamCriteria?], Promise<Entity>>;
export type IRdsDeleteByIdWorkflow = IWorkflow<[rdsParamId, rdsParamTransaction?], Promise<void>>;
export type IRdsCreateWorkflow<Entity> = IWorkflow<[rdsParamCreateData, rdsParamTransaction?], Promise<Entity>>;
export type IRdsBulkSoftDeleteWorkflow = IWorkflow<[rdsParamId[], rdsParamTransaction?], Promise<void>>;
export type IRdsBulkCreateWorkflow<Entity> = IWorkflow<[rdsParamCreateData[], rdsParamTransaction?], Promise<Entity[]>>;
export type IRdsPaginateWorkflow<Entity> = IWorkflow<[rdsParamCriteria], Promise<IPaginateResult<Entity>>>;
export type IRdsSoftDeleteByIdWorkflow = IWorkflow<[rdsParamId, rdsParamTransaction?], Promise<void>>;
export type IRdsUpdateByIdWorkflow<Entity> = IWorkflow<[rdsParamId, rdsParamUpdateData, rdsParamTransaction?], Promise<Entity>>;

export type AnyParams = any[];

export interface IWorkflow<Input extends AnyParams, Result> {
  execute(...args: Input): Result;
}

export interface RdsTransaction {
  rollback(): Promise<void>;
  commit(): Promise<void>;
}

export interface RedisGateway {
  getKey(key: string): string;
}

export interface IEventEmitter {
  on: EventEmitter['on'];
  emit: EventEmitter['emit'];
  removeListener: EventEmitter['removeListener'];
}

export interface IAppEventProxy {
  emitEvent(eventName: APP_ENV, payload: any): void;
  subscribeToEvent(eventName: APP_ENV, handler: any): Subscription;
}

export interface RedisReadGateway extends RedisGateway {
  get(key: string): Promise<string>;
  getHash(hashKey: string, field: string): Promise<string>;
}

export interface IEventTranslator {
  translate(childEvent: APP_ENV): APP_ENV[];
}

export interface RedisWriteGateway extends RedisGateway {
  set(key: string, data: string, ttl?: number): Promise<void>;
  setHash(hashKey: string, field: string, value: string): Promise<void>;
}

export interface Subscription {
  unsubscribe(): void;
}

export interface ILogger {
  info(message: string, ...args: any): void;
  error(message: string, ...args: any): void;
  warn?(message: string, ...args: any): void;
}

export interface HttpClient {
  initialize(options: HttpClientOptions): void;
  get(url: string, options?: HttpRequestOptions): Promise<any>;
  post(url: string, body: any, options?: HttpRequestOptions): Promise<any>;
  put(url: string, body: any, options?: HttpRequestOptions): Promise<any>;
  delete(url: string, options?: HttpRequestOptions): Promise<any>;
}

export interface HttpClientOptions {
  timeout?: number;
  pool?: {
    max?: number;
    min?: number;
    acquire?: number;
    idle?: number;
  };
}

export interface HttpRequestOptions {
  headers?: { [headerName: string]: string };
  params?: { [parameterName: string]: any };
}

export interface ISort {
  column?: string;
  dimension?: string;
  direction?: 'ASC' | 'DESC';
}

export interface PaginateResult<T> {
  docs: T[];
  totalCount: number;
}

export interface ICriteria {
  select?: any;
  filters?: IFilter[];
  sort?: ISort;
  page?: number;
  transaction?: any;
  limit?: number;
  includes?: IInclude[];
  offset?: number;
  search?: string;
  groupBy?: string[];
}

export interface IInclude {
  field: string;
  select?: string[];
  where?: any;
  required?: boolean;
  includes?: IInclude[];
  filters?: IFilter[];
}

export interface IFilter {
  code: string;
  operator: FILTER_OPERATORS;
  value: any;
}

export interface IRetryUtil {
  retryIfFail<T = any>(task: any, config?: TaskRetryConfig): Promise<T>;
  retryConstantly<T>(task: any, interval: number): Promise<T>;
}

export interface TaskRetryConfig {
  /**
   * The number of times to retry the task. Default is 3.
   */
  retryTimes?: number;
  /**
   * The number of milliseconds to wait between reties. Default 0.
   */
  delayBetweenEach?: number;
}
