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
        // for demo purpose, we add 'isLocal' property to identify
        // new todo from API does not have 'isLocal' property and id has different with 255 (always returned id:255 from api)
        [...prev, { ...data, isLocal: true, id: Math.random() }].sort(
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
