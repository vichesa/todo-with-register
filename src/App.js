import "./App.css";
import AddTodo from "./components/AddTodo/AddTodo";
import TodoList from "./components/TodoList/TodoList";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import login from "./components/RegistrationForm/login";
import Dashboard from "./components/RegistrationForm/Dashboard";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import { useState } from "react";
import Header from "./components/Header/Header";
import LoginForm from "./components/LoginForm/LoginForm";
import PrivateRoute from "./utils/PrivateRoute";
import AlertComponent from "./components/AlertComponent/AlertComponent";
import Home from "./components/Home/Home";

// function App() {
//   const [title, updateTitle] = useState(null);
//   const [errorMessage, updateErrorMessage] = useState(null);
//   return (
    
//     <Router>
//     <div className="App">
//       <Header title={title}/>
//         <div className="container d-flex align-items-center flex-column">
//           <Switch>
//             <Route path="/" exact={true}>
//               <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
//             </Route>
//             <Route path="/register">
//               <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
//             </Route>
//             <Route path="/login">
//               <LoginForm showError={updateErrorMessage} updateTitle={updateTitle}/>
//             </Route>
//             <PrivateRoute path="/home">
//               <Home/>
//             </PrivateRoute>
//           </Switch>
//           <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
//         </div>
//     </div>
//     </Router>
//   );
// }

function App() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  return (
    <div className="App">
      <Router>
        <div className="home">
          <ul  style={{
          display: "flex",
          textDecoration: "none",
          fontSize: "20px",
          justifyContent: "space-around",
        }}>
              <Link style={{ textDecoration:"none", fontWeight:"900", color: "#00A170", marginTop: "20px" }} to="/login">Login</Link>
              <Link style={{ textDecoration:"none", fontWeight:"900", color: "#00A170", marginTop: "20px" }} to="/register">Register</Link>
              <Link style={{ textDecoration:"none", fontWeight:"900", color: "#00A170", marginTop: "20px" }} to="/">Add Todo</Link>
              {/* <Link style={{ textDecoration:"none", fontWeight:"900", color: "#00A170", marginTop: "20px" }} to="/dashboard">Add Todo</Link> */}
              <Link style={{ textDecoration:"none", fontWeight:"900", color: "#00A170", marginTop: "20px" }} to="/todolist">Todo List</Link>
          </ul>
          <Header title={title}/>
          <hr />

          {/* <Route exact path="/" component={AddTodo} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/register" component={RegistrationForm} />
          <Route exact path="/home" component={Home} />
          <Route path="/todolist" component={TodoList} /> */}
          {/* <Route path="/topics" component={Topics} /> */}
        </div>
      
        <div className="container d-flex align-items-center flex-column">
          <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
          <Switch>
            <Route path="/" exact={true}>
              <AddTodo showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
            <Route path="/register">
              <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
            <Route path="/todolist">
              <TodoList showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
            <Route path="/login">
              <LoginForm showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
            <PrivateRoute path="/home">
              <Home/>
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
