import { combineReducers } from 'redux';
import todolist from './list';
// import visibilityFilter from './visibilityFilter';

const Reducer = combineReducers({
    todolist,
});

export default Reducer;
