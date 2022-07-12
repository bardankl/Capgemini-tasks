import React, { FormEventHandler } from "react"
import { useAppDispatch, useAppSelector } from "../hooks"
import {
  changeFormTitleInputValue,
  changeFormBodyInputValue,
} from "../features/todoForm/todoFormSlice"

type FormInputProps = {
  onSubmit: FormEventHandler<HTMLFormElement>
}

const config = [
  {
    placeholderName: "Title",
    propName: "newTodoTitle",
    label: "Todo Title",
    classNameSuffix: "title",
    reduxAction: changeFormTitleInputValue,
  },
  {
    placeholderName: "Body",
    propName: "newTodoBody",
    label: "Todo Body",
    classNameSuffix: "body",
    reduxAction: changeFormBodyInputValue,
  },
]

const TodoForm = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ onSubmit }, ref) => {
    const dispatch = useAppDispatch()
    const { newTodoTitle, newTodoBody, isTodoCardBeingEdited } = useAppSelector(
      (state) => state.todoForm
    )
    const newTodoValues = { newTodoTitle, newTodoBody }
    return (
      <header>
        <form action='' className='create-todo-form' onSubmit={onSubmit}>
          {config.map(
            (
              input,
              index // mapping over "config" object
            ) => (
              <div key={index}>
                <label htmlFor={`todo-${input.classNameSuffix}`}>
                  {input.label}
                </label>
                <input
                  type='text'
                  name={`todo-${input.classNameSuffix}`}
                  id={`todo-${input.classNameSuffix}`}
                  value={
                    newTodoValues[input.propName as keyof typeof newTodoValues]
                  }
                  onChange={(e) => {
                    const newInputValue = e.target.value
                    dispatch(input.reduxAction({ newInputValue }))
                  }}
                  placeholder={input.placeholderName}
                  {...(input.propName === "newTodoTitle" && {
                    ref: ref, // ref for focusing on title input, forwarded from the "TodoApp" component
                  })}
                  required
                />
              </div>
            )
          )}
          <button>{isTodoCardBeingEdited ? "Save todo" : "Create todo"}</button>
        </form>
      </header>
    )
  }
)
export default TodoForm
