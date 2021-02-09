import { Model } from 'sequelize-typescript';
export declare class UsersTableGateway extends Model<UsersTableGateway> {
    id: number;
    email: number;
    fullName: string;
    status: number;
    userType: number;
    createdAt: Date;
    updatedAt: Date;
}
