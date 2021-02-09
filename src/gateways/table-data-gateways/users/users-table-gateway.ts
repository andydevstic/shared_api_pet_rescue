import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class UsersTableGateway extends Model<UsersTableGateway> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  public id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  public email: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    field: 'full_name',
  })
  public fullName: string;

  @Column({
    type: DataType.SMALLINT,
    allowNull: false,
    defaultValue: 0,
  })
  public status: number;

  @Column({
    type: DataType.SMALLINT,
    allowNull: false,
    field: 'user_type',
    defaultValue: 1,
  })
  public userType: number;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    field: 'created_at',
  })
  public createdAt: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    field: 'updated_at',
  })
  public updatedAt: Date;
}
