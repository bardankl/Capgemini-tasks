import { useAppDispatch } from "../hooks"
import { startEditingTodo } from "../features/todoForm/todoFormSlice"
import { completeTodo } from "../features/todoContainer/todoContainerSlice"

type TodoObject = {
  title: string
  body: string
  id: number
  isComplete: boolean
}

type TodoCardProps = {
  todo: TodoObject
}
const TodoCard = ({ todo }: TodoCardProps) => {
  const dispatch = useAppDispatch()
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
            dispatch(startEditingTodo(todo))
          }}
          className='todo-card-button edit-button'
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            dispatch(completeTodo({ id: todo.id }))
          }}
          className='todo-card-button complete-button'
        >
          Complete
        </button>
      </div>
    </div>
  )
}
export default TodoCard
