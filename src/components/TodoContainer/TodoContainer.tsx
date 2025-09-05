import React, { useEffect, useState, useRef } from "react"
import TodoList from "../TodoList"
import type { TTodoItem } from "../../types"
import useTodos from "../../hooks/useTodos"
import useAddTodo from "../../hooks/useAddTodo"

const TodoContainer: React.FC = () => {
  const [todos, setTodos] = useState<TTodoItem[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const { data, isLoading, error } = useTodos()

  useEffect(() => {
    if (data?.todos) {
      setTodos(data.todos)
    }
  }, [data])
  const { addTodo, loading: addLoading } = useAddTodo({ setTodos })

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault()
    const input = inputRef.current
    const newTodo = input?.value.trim()
    if (newTodo) {
      addTodo(newTodo)
      if (input) input.value = ""
    }
  }

  if (error) return <code>{JSON.stringify(error)}</code>

  return (
    <div className="flex flex-col gap-4">
      {isLoading ? (
        <code>Loading...</code>
      ) : (
        <TodoList todos={todos} setTodos={setTodos} />
      )}

      <form className="flex p-4 border gap-2" onSubmit={handleAddTodo}>
        <input
          autoFocus
          type="text"
          className="form-control flex-1 rounded-none!"
          placeholder="Type here to add..."
          id="addTodoInput"
          required
          ref={inputRef}
        />

        <button
          className="btn btn-success w-20"
          type="submit"
          disabled={addLoading}
        >
          {addLoading ? "Adding" : "Add"}
        </button>
      </form>
    </div>
  )
}

export default TodoContainer
