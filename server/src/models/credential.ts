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

  @Field(() => Number)
  @Column()
  strength: number;

  @Field(() => String)
  @Column()
  siteName: string;

  @Field(() => String, { nullable: true })
  @Column({
    nullable: true,
  })
  siteLogo: string;

  @Field(() => User)
  @ManyToOne(() => User, (user: User) => user.credentials)
  @JoinColumn({ name: "userID" })
  user: User;
}
