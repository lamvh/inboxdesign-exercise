import React, { useEffect, useState, useCallback, useRef } from "react"
import TodoList from "../TodoList"
import useAxios from "../../hooks/useAxios"
import type { TTodoItem } from "../../types"

const RootContainer: React.FC = () => {
  const [todos, setTodos] = useState<TTodoItem[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const { response, error, loading } = useAxios({
    url: "user/100",
    method: "get",
  })

  useEffect(() => {
    if (response?.todos) {
      setTodos(response.todos)
    }
  }, [response])

  const handleCompleteTodo = useCallback(
    (id: number) => {
      setTodos((prevTodos) => {
        const updated = prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
        return updated.sort((a, b) => Number(a.completed) - Number(b.completed))
      })
    },
    [setTodos]
  )

  const handleAddTodo = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      const input = inputRef.current
      const newTodo = input?.value.trim()
      if (newTodo) {
        setTodos((prevTodos) => {
          const updated = [
            ...prevTodos,
            { id: Date.now(), todo: newTodo, completed: false, userId: 100 },
          ]
          return updated.sort(
            (a, b) => Number(a.completed) - Number(b.completed)
          )
        })
        if (input) input.value = ""
      }
    },
    [setTodos]
  )

  const handleDeleteTodo = useCallback(
    (id: number) => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
    },
    [setTodos]
  )

  if (error) return <code>{JSON.stringify(error)}</code>

  return (
    <div className="d-flex flex-column">
      <form className="d-flex mb-4" onSubmit={handleAddTodo}>
        <input
          autoFocus
          type="text"
          className="form-control"
          placeholder="Add a new todo..."
          id="addTodoInput"
          required
          ref={inputRef}
        />

        <button className="btn btn-success ms-2" type="submit">
          Add
        </button>
      </form>

      <TodoList
        loading={loading}
        todos={todos}
        handleDeleteTodo={handleDeleteTodo}
        handleCompleteTodo={handleCompleteTodo}
      />
    </div>
  )
}

export default RootContainer
