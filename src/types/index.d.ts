export type TTodoItem = {
  id: number
  todo: string
  completed: boolean
  userId: number
}

export type TTodoList = TTodoItem[]

export type TGetTodosResponse = {
  todos: TTodoList
  limit: number
  skip: number
  total: number
}
