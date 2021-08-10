import { useQuery, gql } from "@apollo/client"

const GET_ALL_USER_QUERY = gql`
query ExampleQuery {
  allUsers {
    id
  }
  userById {
    id
  }
}

`

export const useHome = () => {
  const { loading, error, data } = useQuery(GET_ALL_USER_QUERY)
  console.log(data, error)
  return {loading,error,data}
}