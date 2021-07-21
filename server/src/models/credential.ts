import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user";

//Fields to be added
//Website name
//Website url
//Website favicon url

@ObjectType()
@Entity()
export class Credential extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  credentialID: string;

  @Field(() => String)
  @CreateDateColumn()
  createDate = Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedDate = Date;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column({ type: "text" })
  password: string;

  @ManyToOne(() => User, (user: User) => user.credentials)
  @JoinColumn({ name: "userID" })
  user: User;
}
