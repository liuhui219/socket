const todolist = (state = '', action) => {
  switch (action.type) {
    case 'INCREMENT':
      return action.text
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}
export default todolist;
