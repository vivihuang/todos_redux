let nextTodoId = 0

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: nextTodoId++,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_TODO':
      return state.id === action.id ? Object.assign({}, state, {completed: !state.completed}) : state
    default:
      return state
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, todo({}, action)]
    case 'TOGGLE_TODO':
      return state.map(s => todo(s, action))
    default:
      return state
  }
}

export default todos
