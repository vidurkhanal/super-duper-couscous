import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Credential } from "./credential";

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

  @Field()
  @Column({ nullable: true })
  profilePictureUrl: string;

  @Column({ nullable: true })
  masterPIN: string;

  @Field()
  @Column({ default: false })
  hasMasterPIN: boolean;

  @Field()
  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: 0 })
  loginAttemts: number;

  @Column({ default: false })
  isFrozen: boolean;

  @Field(() => [Credential], { nullable: true })
  @OneToMany(() => Credential, (credential) => credential.user)
  credentials: Credential[];
}
