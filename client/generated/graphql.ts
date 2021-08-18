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
  credentialID: Scalars['String'];
  createDate: Scalars['String'];
  updatedDate: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  strength: Scalars['Float'];
  siteName: Scalars['String'];
  user: User;
};

export type CredentialResponse = {
  __typename?: 'CredentialResponse';
  error?: Maybe<Scalars['String']>;
  credential?: Maybe<Credential>;
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

export type Mutation = {
  __typename?: 'Mutation';
  registerUser: AuthResponse;
  loginUser: AuthResponse;
  logoutUser: Scalars['Boolean'];
  forgotPassword: ForgotPasswordResponse;
  forgotPasswordChange: ChangePasswordResolver;
  addCredential: CredentialResponse;
};


export type MutationRegisterUserArgs = {
  registerInput: RegisterInput;
};


export type MutationLoginUserArgs = {
  loginInput: LoginInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationForgotPasswordChangeArgs = {
  newPassword: Scalars['String'];
  key: Scalars['String'];
};


export type MutationAddCredentialArgs = {
  siteName: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  getAllUsers: Array<User>;
  me?: Maybe<User>;
  getCredentials?: Maybe<Array<Credential>>;
};


export type QueryHelloArgs = {
  name: Scalars['String'];
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
  credentials?: Maybe<Array<Credential>>;
};

export type AddCredentialMutationVariables = Exact<{
  email: Scalars['String'];
  siteName: Scalars['String'];
  password: Scalars['String'];
}>;


export type AddCredentialMutation = (
  { __typename?: 'Mutation' }
  & { addCredential: (
    { __typename?: 'CredentialResponse' }
    & Pick<CredentialResponse, 'error'>
  ) }
);

export type ForgetPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { forgotPassword: (
    { __typename?: 'ForgotPasswordResponse' }
    & Pick<ForgotPasswordResponse, 'error' | 'isSent'>
  ) }
);

export type LoginUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginUserMutation = (
  { __typename?: 'Mutation' }
  & { loginUser: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'error'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'email'>
    )> }
  ) }
);

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logoutUser'>
);

export type RegisterUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  fullName: Scalars['String'];
}>;


export type RegisterUserMutation = (
  { __typename?: 'Mutation' }
  & { registerUser: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'error'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'email'>
    )> }
  ) }
);

export type ResetPasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  key: Scalars['String'];
}>;


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { forgotPasswordChange: (
    { __typename?: 'ChangePasswordResolver' }
    & Pick<ChangePasswordResolver, 'error' | 'isChanged'>
  ) }
);

export type GetCredentialsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCredentialsQuery = (
  { __typename?: 'Query' }
  & { getCredentials?: Maybe<Array<(
    { __typename?: 'Credential' }
    & Pick<Credential, 'credentialID' | 'email' | 'password'>
  )>> }
);

export type HelloQueryQueryVariables = Exact<{
  helloName: Scalars['String'];
}>;


export type HelloQueryQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'userID' | 'fullName'>
    & { credentials?: Maybe<Array<(
      { __typename?: 'Credential' }
      & Pick<Credential, 'email' | 'password' | 'siteName' | 'strength'>
    )>> }
  )> }
);


export const AddCredentialDocument = gql`
    mutation AddCredential($email: String!, $siteName: String!, $password: String!) {
  addCredential(email: $email, siteName: $siteName, password: $password) {
    error
  }
}
    `;

export function useAddCredentialMutation() {
  return Urql.useMutation<AddCredentialMutation, AddCredentialMutationVariables>(AddCredentialDocument);
};
export const ForgetPasswordDocument = gql`
    mutation ForgetPassword($email: String!) {
  forgotPassword(email: $email) {
    error
    isSent
  }
}
    `;

export function useForgetPasswordMutation() {
  return Urql.useMutation<ForgetPasswordMutation, ForgetPasswordMutationVariables>(ForgetPasswordDocument);
};
export const LoginUserDocument = gql`
    mutation LoginUser($email: String!, $password: String!) {
  loginUser(loginInput: {email: $email, password: $password}) {
    error
    user {
      email
    }
  }
}
    `;

export function useLoginUserMutation() {
  return Urql.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument);
};
export const LogoutUserDocument = gql`
    mutation LogoutUser {
  logoutUser
}
    `;

export function useLogoutUserMutation() {
  return Urql.useMutation<LogoutUserMutation, LogoutUserMutationVariables>(LogoutUserDocument);
};
export const RegisterUserDocument = gql`
    mutation RegisterUser($email: String!, $password: String!, $fullName: String!) {
  registerUser(
    registerInput: {fullName: $fullName, email: $email, password: $password}
  ) {
    error
    user {
      email
    }
  }
}
    `;

export function useRegisterUserMutation() {
  return Urql.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument);
};
export const ResetPasswordDocument = gql`
    mutation ResetPassword($newPassword: String!, $key: String!) {
  forgotPasswordChange(newPassword: $newPassword, key: $key) {
    error
    isChanged
  }
}
    `;

export function useResetPasswordMutation() {
  return Urql.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument);
};
export const GetCredentialsDocument = gql`
    query GetCredentials {
  getCredentials {
    credentialID
    email
    password
  }
}
    `;

export function useGetCredentialsQuery(options: Omit<Urql.UseQueryArgs<GetCredentialsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetCredentialsQuery>({ query: GetCredentialsDocument, ...options });
};
export const HelloQueryDocument = gql`
    query HelloQuery($helloName: String!) {
  hello(name: $helloName)
}
    `;

export function useHelloQueryQuery(options: Omit<Urql.UseQueryArgs<HelloQueryQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<HelloQueryQuery>({ query: HelloQueryDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    userID
    fullName
    credentials {
      email
      password
      siteName
      strength
    }
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};