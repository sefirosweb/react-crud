import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers_index'
import reduxThunk from 'redux-thunk'

const store = createStore(
    reducers, // Todos los reducers
    {}, // Estado inicial
    applyMiddleware(reduxThunk)
)

export default store;