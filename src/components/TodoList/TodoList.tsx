import React from "react"
import type { TTodoItem } from "../../types"
import useDeleteTodo from "../../hooks/useDeleteTodo"
import useUpdateTodoStatus from "../../hooks/useUpdateTodoStatus"

interface ITodoListProps {
  todos: TTodoItem[]
  setTodos: React.Dispatch<React.SetStateAction<TTodoItem[]>>
}

const TodoList: React.FC<ITodoListProps> = ({ todos, setTodos }) => {
  const { deleteTodo } = useDeleteTodo({ setTodos })
  const { updateTodoStatus } = useUpdateTodoStatus({
    setTodos,
  })

  const handleCompleteTodo = (id: number) => {
    updateTodoStatus({
      id,
      completed: todos.find((t) => t.id === id)?.completed || false,
    })
  }

  const handleDeleteTodo = (id: number) => {
    deleteTodo(id)
  }

  if (todos.length === 0) {
    return <div className="text-center p-4">No todos available.</div>
  }

  return (
    <div className="flex flex-col">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={`flex justify-between items-center border p-4 w-full ${
            todos.indexOf(todo) === todos.length - 1
              ? "border-b-1"
              : "border-b-0!"
          }`}
        >
          <div className="w-auto">
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleCompleteTodo(todo.id)}
              />
              <span className={`${todo.completed ? "line-through" : ""}`}>
                {todo.todo}
              </span>
            </div>
          </div>
          <div className="items-end flex justify-end">
            <button
              className="btn btn-danger w-20!"
              onClick={() => handleDeleteTodo(todo.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TodoList
