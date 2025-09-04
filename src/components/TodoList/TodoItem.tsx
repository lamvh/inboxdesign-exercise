import React from "react"
import type { TTodoItem } from "../../types"

interface ITodoItemProps {
  todo: TTodoItem
  handleDeleteTodo: (id: number) => void
  handleCompleteTodo: (id: number) => void
}

const TodoItem: React.FC<ITodoItemProps> = ({
  todo,
  handleDeleteTodo,
  handleCompleteTodo,
}) => {
  return (
    <div className="d-flex justify-content-between align-items-center gap-2 border-bottom pb-2">
      <div className="d-flex gap-2 p-2 w-100">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => handleCompleteTodo(todo.id)}
          placeholder="Type here to add..."
        />
        <span className={`w-100 ${todo.completed ? "completed" : ""}`}>
          {todo.todo}
        </span>
      </div>

      <button
        className="btn btn-danger w-20"
        onClick={() => handleDeleteTodo(todo.id)}
      >
        Delete
      </button>
    </div>
  )
}

export default TodoItem
