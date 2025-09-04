import "./App.css"
import TodoContainer from "./components/TodoContainer"

function App() {
  return (
    <div className="my-4 d-flex flex-column gap-4">
      <h3>Todo List</h3>

      <TodoContainer />
    </div>
  )
}

export default App
