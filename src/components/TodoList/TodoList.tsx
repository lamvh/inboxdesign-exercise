import React from "react"
import type { TTodoItem } from "../../types"
import TodoItem from "./TodoItem"

interface ITodoListProps {
  todos: TTodoItem[]
  loading: boolean
  handleDeleteTodo: (id: number) => void
  handleCompleteTodo: (id: number) => void
}

const TodoList: React.FC<ITodoListProps> = ({
  todos,
  loading,
  handleDeleteTodo,
  handleCompleteTodo,
}) => {
  if (loading) return <code>Loading...</code>

  return (
    <div className="d-flex flex-column gap-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleDeleteTodo={handleDeleteTodo}
          handleCompleteTodo={handleCompleteTodo}
        />
      ))}
    </div>
  )
}

export default TodoList
