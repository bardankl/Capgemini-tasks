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

interface StartEditingTodoActionPayload {
  title: string
  body: string
  id: number
}

const todoFormSlice = createSlice({
  name: "todoForm",
  initialState,
  reducers: {
    startEditingTodo: (
      state,
      action: PayloadAction<StartEditingTodoActionPayload>
    ) => {
      state.newTodoTitle = action.payload.title
      state.newTodoBody = action.payload.body
      if (state.idOfTodoBeingEdited === action.payload.id) {
        state.isTodoCardBeingEdited = !state.isTodoCardBeingEdited
        if (!state.isTodoCardBeingEdited) {
          state.newTodoTitle = ""
          state.newTodoBody = ""
        }
      } else {
        state.isTodoCardBeingEdited = true
      }
      state.idOfTodoBeingEdited = action.payload.id
    },
    changeFormTitleInputValue: (state, action) => {
      state.newTodoTitle = action.payload.newInputValue
    },
    changeFormBodyInputValue: (state, action) => {
      state.newTodoBody = action.payload.newInputValue
    },
    finishEdit: (state) => {
      state.isTodoCardBeingEdited = false
      state.idOfTodoBeingEdited = null
    },
    clearInputs: (state) => {
      state.newTodoBody = ""
      state.newTodoTitle = ""
    },
  },
})

export const {
  startEditingTodo,
  changeFormTitleInputValue,
  changeFormBodyInputValue,
  finishEdit,
  clearInputs,
} = todoFormSlice.actions

export default todoFormSlice.reducer
