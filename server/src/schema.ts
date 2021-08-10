import { makeExecutableSchema } from '@graphql-tools/schema'
import { resolvers } from './resolvers';

const typeDefs = `
scalar DateTime
type User {
  id: Int!
  email: String!
  firstName: String!
  lastName: String!
  social: String
  isAdmin: Boolean!
  tokens: [Token!]!
}

type Social {
  facebook: String
  twitter: String
  github: String
}

type Token {
  id: Int!
  createdAt: DateTime
  updatedAt: DateTime
  type: TokenType
  emailToken: String
  valid: Boolean
  expiration: DateTime
  userId: Int
}

type Course {
  id: Int!
  name: String!
  courseDetails: String
  members: [CourseEnrollment]
  tests: [Test]
  feedback: [CourseFeedback]
}

type CourseFeedback {
  id: Int
  feedback: String
  studentId: Int
  courseId: Int
}

type CourseEnrollment {
  createdAt: DateTime
  role: UserRole
  userId: Int
  courseId: Int
  user: User
  course: Course
}

type Test {
  id: Int
  updatedAt: DateTime
  name: String
  date: DateTime
  courseId: Int
  course: Course
  testResults: [TestResult]
}

type TestResult {
  id: Int!
  createdAt: DateTime
  result: Int
  studentId: Int
  student: User
  graderId:  Int
  gradedBy: User
  testId: Int
  test: Test
}

enum UserRole {
  STUDENT
  TEACHER
}

enum TokenType {
  EMAIL
  API
}

type Query {
  allUsers: [User!]!
  userById: User
}
`;

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs
})