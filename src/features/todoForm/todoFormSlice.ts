import { createSlice } from "@reduxjs/toolkit"

interface ToDoFormState { // please store your types in separated fyle in same folder (if they refer to the same entity). If it reusable type, add it to shared/types
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

const todoFormSlice = createSlice({
  name: "todoForm",
  initialState,
  reducers: {
    startEditingTodo: (state, action) => {
      state.newTodoTitle = action.payload.title // setting form title input's value to the todo's title
      state.newTodoBody = action.payload.body // setting form body input's value to the todo's body
      if (state.idOfTodoBeingEdited === action.payload.id) {
        // if we click on "edit" button on the same todo as last time
        state.isTodoCardBeingEdited = !state.isTodoCardBeingEdited // then we switch between editing and creating-a-todo mode
        if (!state.isTodoCardBeingEdited) {
          // if in fact we happen to switch to creating mode (abandoning the editing of a todo), then we also set input values back to empty strings
          state.newTodoTitle = ""
          state.newTodoBody = ""
        }
      } else {
        // but if we click on the "edit" button of a todo that is not being currently edited, then we go into edit-mode
        state.isTodoCardBeingEdited = true
      }
      state.idOfTodoBeingEdited = action.payload.id // we set "idOfTodoBeingEdited" to the todo's id
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
