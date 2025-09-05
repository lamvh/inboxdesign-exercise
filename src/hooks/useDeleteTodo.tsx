import { useMutation } from "@tanstack/react-query"
import React from "react"
import type { TTodoItem } from "../types"

const useDeleteTodo = ({
  setTodos,
}: {
  setTodos: React.Dispatch<React.SetStateAction<TTodoItem[]>>
}) => {
  const { mutateAsync, isPending, isError } = useMutation({
    mutationKey: ["deleteTodo"],
    mutationFn: async (id: number) => {
      const res = await fetch(`https://dummyjson.com/todos/${id}`, {
        method: "DELETE",
      })
      if (res.status !== 200) {
        throw new Error(`Error deleting todo with id ${id}`)
      }
      return res.json()
    },
    onSuccess: (data) => {
      setTodos((prev) => prev.filter((todo) => todo.id !== data.id))
    },
    onError: (error) => {
      alert(error.message)
    },
  })

  return { deleteTodo: mutateAsync, loading: isPending, error: isError }
}

export default useDeleteTodo
