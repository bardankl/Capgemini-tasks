import { useRef, useEffect } from "react"
import TodoContainer from "./components/TodoContainer"
import TodoForm from "./components/TodoForm"
import { useAppDispatch, useAppSelector } from "./hooks"
import {
  createTodo,
  editTodo,
} from "./features/todoContainer/todoContainerSlice"
import { finishEdit, clearInputs } from "./features/todoForm/todoFormSlice"

const TodoApp = () => {
  const { isTodoCardBeingEdited, idOfTodoBeingEdited } = useAppSelector(
    (state) => state.todoForm
  )
  const { todos } = useAppSelector((state) => state.todoContainer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    focusTitleInput()
  }, [isTodoCardBeingEdited, idOfTodoBeingEdited, todos.length])

  const titleInputRef = useRef<HTMLInputElement>(null)

  const submitForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newTodoTitleInput = e.target[0] as HTMLInputElement
    const newTodoBodyInput = e.target[1] as HTMLInputElement
    const newTodoTitle = newTodoTitleInput.value
    const newTodoBody = newTodoBodyInput.value

    if (isTodoCardBeingEdited) {
      dispatch(editTodo({ newTodoTitle, newTodoBody, idOfTodoBeingEdited }))
      dispatch(finishEdit())
    } else {
      dispatch(createTodo({ newTodoTitle, newTodoBody }))
    }
    dispatch(clearInputs())
  }

  const focusTitleInput = () => {
    titleInputRef.current?.focus()
  }

  return (
    <>
      <TodoForm ref={titleInputRef} onSubmit={submitForm}></TodoForm>
      <TodoContainer></TodoContainer>
    </>
  )
}
export default TodoApp
