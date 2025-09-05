import { useQuery } from "@tanstack/react-query"

const useTodos = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await fetch("https://dummyjson.com/todos/user/100")
      if (res.status !== 200) {
        throw new Error("Network response was not ok")
      }
      return res.json()
    },
  })
  return { data, isLoading, error }
}

export default useTodos
