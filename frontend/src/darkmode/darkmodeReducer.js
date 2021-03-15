import { TOGGLE_DARK_MODE } from './darkmodeConstants'

export const darkModeReducer = (state = {}, action) => {
  switch (action.type) {
    case TOGGLE_DARK_MODE:
      return { darkMode: !state.darkMode }

    default:
      return state
  }
}
