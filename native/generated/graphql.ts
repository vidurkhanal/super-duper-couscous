import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  error?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type ChangePasswordResolver = {
  __typename?: 'ChangePasswordResolver';
  error?: Maybe<Scalars['String']>;
  isChanged: Scalars['Boolean'];
};

export type Credential = {
  __typename?: 'Credential';
  createDate: Scalars['String'];
  credentialID: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  siteLogo?: Maybe<Scalars['String']>;
  siteName: Scalars['String'];
  strength: Scalars['Float'];
  updatedDate: Scalars['String'];
  user: User;
};

export type CredentialResponse = {
  __typename?: 'CredentialResponse';
  error?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type ForgotPasswordResponse = {
  __typename?: 'ForgotPasswordResponse';
  error?: Maybe<Scalars['String']>;
  isSent: Scalars['Boolean'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MasterPinResponse = {
  __typename?: 'MasterPINResponse';
  error?: Maybe<Scalars['String']>;
  isValid: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCredential: CredentialResponse;
  changeMasterPIN: MasterPinResponse;
  changePasswordInitialize: ForgotPasswordResponse;
  createMasterPIN: CreateMasterPinResponse;
  delCredentials: CredentialResponse;
  forgotPassword: ForgotPasswordResponse;
  forgotPasswordChange: ChangePasswordResolver;
  loginUser: AuthResponse;
  logoutUser: Scalars['Boolean'];
  registerUser: AuthResponse;
  resendVerifyEmail: Scalars['Boolean'];
  verifyEmail: Scalars['Boolean'];
  verifyMasterPIN: MasterPinResponse;
};


export type MutationAddCredentialArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  siteName: Scalars['String'];
};


export type MutationChangeMasterPinArgs = {
  masterPIN: Scalars['String'];
  password: Scalars['String'];
};


export type MutationChangePasswordInitializeArgs = {
  password: Scalars['String'];
};


export type MutationCreateMasterPinArgs = {
  masterPIN: Scalars['String'];
};


export type MutationDelCredentialsArgs = {
  credentialID: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationForgotPasswordChangeArgs = {
  key: Scalars['String'];
  newPassword: Scalars['String'];
  variant: Scalars['String'];
};


export type MutationLoginUserArgs = {
  loginInput: LoginInput;
};


export type MutationRegisterUserArgs = {
  registerInput: RegisterInput;
};


export type MutationVerifyEmailArgs = {
  token: Scalars['String'];
};


export type MutationVerifyMasterPinArgs = {
  masterPIN: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getAllUsers: Array<User>;
  hello: Scalars['String'];
  me?: Maybe<User>;
};


export type QueryHelloArgs = {
  name: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  fullName: Scalars['String'];
  password: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createDate: Scalars['String'];
  credentials?: Maybe<Array<Credential>>;
  email: Scalars['String'];
  fullName: Scalars['String'];
  hasMasterPIN: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  updatedDate: Scalars['String'];
  userID: Scalars['String'];
};

export type CreateMasterPinResponse = {
  __typename?: 'createMasterPINResponse';
  error?: Maybe<Scalars['String']>;
  isSuccessful: Scalars['Boolean'];
};

export type HelloQueryVariables = Exact<{
  helloName: Scalars['String'];
}>;


export type HelloQuery = { __typename?: 'Query', hello: string };


export const HelloDocument = gql`
    query Hello($helloName: String!) {
  hello(name: $helloName)
}
    `;

export function useHelloQuery(options: Omit<Urql.UseQueryArgs<HelloQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<HelloQuery>({ query: HelloDocument, ...options });
};