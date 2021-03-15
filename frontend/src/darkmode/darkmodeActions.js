import { TOGGLE_DARK_MODE } from './darkmodeConstants'

const toggleDarkMode = () => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_DARK_MODE,
  })
  const {
    darkMode: { darkMode },
  } = getState()

  localStorage.setItem('darkMode', darkMode)
}

export { toggleDarkMode }
