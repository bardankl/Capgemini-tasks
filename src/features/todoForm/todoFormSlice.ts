import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ToDoFormState {
  newTodoTitle: string
  newTodoBody: string
  isTodoCardBeingEdited: boolean
  idOfTodoBeingEdited: number | null
}

// Define the initial state using that type
const initialState: ToDoFormState = {
  newTodoTitle: "",
  newTodoBody: "",
  isTodoCardBeingEdited: false,
  idOfTodoBeingEdited: null,
}

interface ToDoFormActionPayload {
  title: string
  body: string
  id: number
}

const todoFormSlice = createSlice({
  name: "todoForm",
  initialState,
  reducers: {
    startEditingTodo: (state, action: PayloadAction<ToDoFormActionPayload>) => {
      console.log(action)
      state.newTodoTitle = action.payload.title
      state.newTodoBody = action.payload.body
      state.isTodoCardBeingEdited = true
      state.idOfTodoBeingEdited = action.payload.id
    },
  },
})

export const { startEditingTodo } = todoFormSlice.actions

export default todoFormSlice.reducer
