export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type Course = {
  __typename?: 'Course';
  id: Scalars['Int'];
  name: Scalars['String'];
  courseDetails?: Maybe<Scalars['String']>;
  members?: Maybe<Array<Maybe<CourseEnrollment>>>;
  tests?: Maybe<Array<Maybe<Test>>>;
  feedback?: Maybe<Array<Maybe<CourseFeedback>>>;
};

export type CourseEnrollment = {
  __typename?: 'CourseEnrollment';
  createdAt?: Maybe<Scalars['DateTime']>;
  role?: Maybe<UserRole>;
  userId?: Maybe<Scalars['Int']>;
  courseId?: Maybe<Scalars['Int']>;
  user?: Maybe<User>;
  course?: Maybe<Course>;
};

export type CourseFeedback = {
  __typename?: 'CourseFeedback';
  id?: Maybe<Scalars['Int']>;
  feedback?: Maybe<Scalars['String']>;
  studentId?: Maybe<Scalars['Int']>;
  courseId?: Maybe<Scalars['Int']>;
};


export type Query = {
  __typename?: 'Query';
  allUsers: Array<User>;
  userById?: Maybe<User>;
};

export type Social = {
  __typename?: 'Social';
  facebook?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  github?: Maybe<Scalars['String']>;
};

export type Test = {
  __typename?: 'Test';
  id?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['DateTime']>;
  courseId?: Maybe<Scalars['Int']>;
  course?: Maybe<Course>;
  testResults?: Maybe<Array<Maybe<TestResult>>>;
};

export type TestResult = {
  __typename?: 'TestResult';
  id: Scalars['Int'];
  createdAt?: Maybe<Scalars['DateTime']>;
  result?: Maybe<Scalars['Int']>;
  studentId?: Maybe<Scalars['Int']>;
  student?: Maybe<User>;
  graderId?: Maybe<Scalars['Int']>;
  gradedBy?: Maybe<User>;
  testId?: Maybe<Scalars['Int']>;
  test?: Maybe<Test>;
};

export type Token = {
  __typename?: 'Token';
  id: Scalars['Int'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  type?: Maybe<TokenType>;
  emailToken?: Maybe<Scalars['String']>;
  valid?: Maybe<Scalars['Boolean']>;
  expiration?: Maybe<Scalars['DateTime']>;
  userId?: Maybe<Scalars['Int']>;
};

export enum TokenType {
  Email = 'EMAIL',
  Api = 'API'
}

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  social?: Maybe<Scalars['String']>;
  isAdmin: Scalars['Boolean'];
  tokens: Array<Token>;
};

export enum UserRole {
  Student = 'STUDENT',
  Teacher = 'TEACHER'
}
