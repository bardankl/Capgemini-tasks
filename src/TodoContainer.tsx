import TodoCard from "./TodoCard"

// interface Todos {
//   children: Todo
// }

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

const TodoContainer = ({
  todos,
  startEditing,
  completeTodo,
}: TodoContainerProps) => {
  return (
    <div className='todo-container'>
      <h2>Todos:</h2>
      {todos.map((todo, index) => (
        <TodoCard
          key={index}
          todo={todo}
          startEditing={startEditing}
          completeTodo={completeTodo}
        />
      ))}
    </div>
  )
}
export default TodoContainer
