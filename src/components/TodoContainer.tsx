import TodoCard from "./TodoCard"
import { useAppSelector } from "../hooks"
import { Key } from "react"

type TodoObject = {
  title: string
  body: string
  id: number
  isComplete: boolean
}

type TodoContainerProps = {
  todos: Array<TodoObject>
  startEditing: Function
  completeTodo: Function
}

const TodoContainer = (/*{
  todos,
  startEditing,
  completeTodo,
}: TodoContainerProps*/) => {
  const { todos } = useAppSelector((state) => state.todoContainer)
  return (
    <div className='todo-container'>
      <h2>Todos:</h2>
      {todos.map(
        (
          todo: {
            title: string
            body: string
            id: number
            isComplete: boolean
          },
          index: Key | null | undefined
        ) => (
          <TodoCard
            key={index}
            todo={todo}
            // startEditing={startEditing}
            // completeTodo={completeTodo}
          />
        )
      )}
    </div>
  )
}
export default TodoContainer
