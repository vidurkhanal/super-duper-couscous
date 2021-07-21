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

export type Credential = {
  __typename?: 'Credential';
  credentialID: Scalars['String'];
  createDate: Scalars['String'];
  updatedDate: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  registerUser: AuthResponse;
  loginUser: AuthResponse;
  addCredential: Credential;
};


export type MutationRegisterUserArgs = {
  registerInput: RegisterInput;
};


export type MutationLoginUserArgs = {
  loginInput: LoginInput;
};


export type MutationAddCredentialArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  getAllUsers: Array<User>;
  getCredentials?: Maybe<Array<Credential>>;
};


export type QueryHelloArgs = {
  name: Scalars['String'];
};


export type QueryGetCredentialsArgs = {
  userID: Scalars['String'];
};

export type RegisterInput = {
  fullName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  userID: Scalars['String'];
  createDate: Scalars['String'];
  updatedDate: Scalars['String'];
  fullName: Scalars['String'];
  email: Scalars['String'];
};

export type GetCredentialsQueryVariables = Exact<{
  userID: Scalars['String'];
}>;


export type GetCredentialsQuery = (
  { __typename?: 'Query' }
  & { getCredentials?: Maybe<Array<(
    { __typename?: 'Credential' }
    & Pick<Credential, 'email' | 'password'>
  )>> }
);

export type LoginUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginUserMutation = (
  { __typename?: 'Mutation' }
  & { loginUser: (
    { __typename?: 'AuthResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'email'>
    )> }
  ) }
);


export const GetCredentialsDocument = gql`
    query GetCredentials($userID: String!) {
  getCredentials(userID: $userID) {
    email
    password
  }
}
    `;

export function useGetCredentialsQuery(options: Omit<Urql.UseQueryArgs<GetCredentialsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetCredentialsQuery>({ query: GetCredentialsDocument, ...options });
};
export const LoginUserDocument = gql`
    mutation LoginUser($email: String!, $password: String!) {
  loginUser(loginInput: {email: $email, password: $password}) {
    user {
      email
    }
  }
}
    `;

export function useLoginUserMutation() {
  return Urql.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument);
};