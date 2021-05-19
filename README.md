# REDUX based CRUD App

### Simple CRUD app to demonstrate REDUX to manage the state of the app

## Higlights

- the Store receive only one reducer composed for all the reducers with redux-thunk
- use a Json Web Server to allow in memory a simple but funcional API of products, as database db.json file was created with a list of products, supports all the REST verbs, the API is requested whit Axios
- useSelector hook to acces states of both reducers in the global Store, and useDispatch hook to call the CRUD action of reducers
- Two separates Reducers, the product and alert reducer both whit their own components, types, actions dispatchers and mostly important, separates states
- include SweetAlert library to show very nice styled alerts windows
