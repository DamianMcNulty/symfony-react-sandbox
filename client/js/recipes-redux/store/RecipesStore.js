import { createStore, applyMiddleware } from 'redux'
import _ from 'lodash'

// See
// https://github.com/gaearon/redux-thunk and http://redux.js.org/docs/advanced/AsyncActions.html
import thunkMiddleware from 'redux-thunk'

import reducers from '../reducers'
import { initialStates } from '../reducers'


export default function configureStore(props) {

    // This is how we get initial props from Symfony into redux.
    const { recipes, recipe, baseUrl, location } = props
    const { recipesState } = initialStates

    // Redux expects to initialize the store using an Object
    const initialState = {
        recipesState: _.extend(recipesState, {
            recipe: recipe,
            recipes: recipes,
            baseUrl: baseUrl,
            location: location,
        }),
    }

    const store = createStore(
        reducers,
        initialState,
        applyMiddleware(thunkMiddleware),
    )
    return store
}