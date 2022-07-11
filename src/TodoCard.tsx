const TodoCard = ({ todo, startEditing, completeTodo }) => {
  return (
    <div
      className={"todo-card " + (todo.isComplete && "todo-card--complete")}
      key={todo.id}
    >
      <div className='todo-card-text'>
        <div className='todo-card-title'>{todo.title}</div>
        <div className='todo-card-body'>{todo.body}</div>
      </div>
      <div className='todo-card-buttons'>
        <button
          onClick={(e) => {
            startEditing(todo)
          }}
          className='todo-card-button edit-button'
        >
          Edit
        </button>
        <button
          className='todo-card-button complete-button'
          onClick={(e) => completeTodo(todo.id)}
        >
          Complete
        </button>
      </div>
    </div>
  )
}
export default TodoCard
