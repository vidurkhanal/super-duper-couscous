import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  userID: string;

  @Field(() => String)
  @CreateDateColumn()
  createDate = Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedDate = Date;

  @Field()
  @Column()
  fullName: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
