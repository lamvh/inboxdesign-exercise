import { useMutation } from "@tanstack/react-query"
import React from "react"
import type { TTodoItem } from "../types"

const useAddTodo = ({
  setTodos,
}: {
  setTodos: React.Dispatch<React.SetStateAction<TTodoItem[]>>
}) => {
  const { mutateAsync, isPending, error } = useMutation({
    mutationKey: ["addTodo"],
    mutationFn: async (newTodo: string) => {
      const res = await fetch("https://dummyjson.com/todos/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo: newTodo, userId: 100, completed: false }),
      })
      if (res.status !== 201) {
        throw new Error(`Error adding todo: ${res.statusText}`)
      }
      return res.json()
    },
    onSuccess: (data) => {
      setTodos((prev) =>
        [...prev, data].sort(
          (a, b) => Number(a.completed) - Number(b.completed)
        )
      )
    },
    onError: (error) => {
      alert(error.message)
    },
  })

  return { addTodo: mutateAsync, loading: isPending, error }
}

export default useAddTodo
