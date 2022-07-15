import {
  cleanup,
  fireEvent,
  getByPlaceholderText,
  render as rtlRender,
} from "@testing-library/react"
import { ReactFragment } from "react"
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"

import TodoCard from "./TodoCard"

// const render = (component: JSX.Element) =>
//   rtlRender(<Provider store={store}>{component}</Provider>)

// it("captures clicks", () => {
//   const initialState = {
//     newTodoTitle: "",
//     newTodoBody: "",
//     isTodoCardBeingEdited: false,
//     idOfTodoBeingEdited: null,
//   }
//   const mockStore = configureStore()
//   let store
//   store = mockStore(initialState)

//   const { container } = render(
//     <TodoCard
//       todo={{
//         title: "loem",
//         body: "ipsum",
//         id: 1,
//         isComplete: false,
//       }}
//     />
//   )
//   // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
//   const node = container.getElementsByClassName("edit-button")[0]
//   fireEvent.click(node)
//   expect(getByPlaceholderText())
// })

afterEach(cleanup)
