import { Query } from "./query";
import { DateTimeResolver } from 'graphql-scalars'

export const resolvers = {
  Query,
  DateTime: DateTimeResolver
}