import React from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import "./App.css";
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAt, faSort, faSortDown, faSortUp, faTrashAlt, faUser} from '@fortawesome/free-solid-svg-icons'
//import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
import TasksTable from "./components/tasksTable";
import {Auth0Provider, useAuth0} from "./react-auth0-spa";
import loginForm from "./components/loginForm";
import registerForm from "./components/registerForm";

library.add(faSortDown, faSort,faSortUp,faUser,faAt,faTrashAlt);


function App() {

    const {loading} = useAuth0();
    if (loading) {
        return (
            <div>Loading...</div>
        );
    }
    return (
        <React.Fragment>
            <BrowserRouter>
            <NavBar/>
            <main className="container">
                <Switch>
                    <Redirect from="/" exact to="/tasks"/>
                    <Route path="/login" component={NavBar}/>
                    <Route path="/loginf" component={loginForm}/>
                    <Route path="/registerf" component={registerForm}/>
                    <Route path="/tasks" component={TasksTable}/>
                    {/*<PrivateRoute><Route path="/profile" component={Profile}/></PrivateRoute>*/}
                    <Route path="/profile" component={Profile}/>
                    <Route path="/not-found" component={NotFound}/>
                    <Redirect to="/not-found"/>
                </Switch>
            </main>
            </BrowserRouter>
            <footer id="sticky-footer" className="py-4 bg-dark text-white-50">
                <div className="container text-center">
                    <small>Copyright &copy; Adnane Benkouider</small>
                </div>
            </footer>
        </React.Fragment>
    );

}

export default App;
