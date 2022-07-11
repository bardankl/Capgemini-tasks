import TodoCard from "./TodoCard"
const TodoContainer = ({ todos, startEditing, completeTodo }) => {
  return (
    <div className='todo-container'>
      <h2>Todos:</h2>
      {todos.map((todo) => (
        <TodoCard
          todo={todo}
          startEditing={startEditing}
          completeTodo={completeTodo}
        />
      ))}
    </div>
  )
}
export default TodoContainer
