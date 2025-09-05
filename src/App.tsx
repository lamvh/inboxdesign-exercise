import "./App.css"
import TodoContainer from "./components/TodoContainer"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="my-4 flex flex-col gap-4">
        <h3>Todo List</h3>

        <TodoContainer />
      </div>
    </QueryClientProvider>
  )
}

export default App
