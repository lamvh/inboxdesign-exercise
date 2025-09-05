import { useMutation } from "@tanstack/react-query"
import type { TTodoItem } from "../types"

const useUpdateTodoStatus = ({
  setTodos,
}: {
  setTodos: React.Dispatch<React.SetStateAction<TTodoItem[]>>
}) => {
  const { mutateAsync, isPending, error } = useMutation({
    mutationKey: ["completeTodo"],
    mutationFn: async ({
      id,
      completed,
    }: {
      id: number
      completed: boolean
    }) => {
      const res = await fetch(`https://dummyjson.com/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      })
      if (res.status !== 200) {
        throw new Error(`Error on update todo id ${id}`)
      }
      return res.json()
    },
    onSuccess: (data) => {
      setTodos((prev) => {
        const updated = prev.map((todo) =>
          todo.id === data.id ? { ...todo, completed: data.completed } : todo
        )
        return updated.sort((a, b) => Number(a.completed) - Number(b.completed))
      })
    },
    onError: (error) => {
      alert(error.message)
    },
  })

  return { updateTodoStatus: mutateAsync, loading: isPending, error }
}

export default useUpdateTodoStatus
