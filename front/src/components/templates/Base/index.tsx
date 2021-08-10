import { ApolloProvider } from "@apollo/client";
import { ReactNode } from "react";
import { client } from "../../../apolloClient";

export function Base({ children }: { children: ReactNode }) {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}