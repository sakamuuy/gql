import { Presentation } from "./Home";
import { useHome } from "./useHome";

export function Home() {
  const {loading, error, data} = useHome()
  return (
    <Presentation ids={data} />
  )
}
