import React from "react";
import {Link, Redirect} from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

    constructor(props, context) {
        super(props, context);
    }

    schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };


  doSubmit = async () => {
      try {
        const { data } = this.state;
      await auth.login(data.username, data.password);
      const { state } = this.props.location;
        window.location = state ? state.pathname : "/";
      //return <Redirect to={ state ? state.from.pathname : "/"}/>
    } catch (ex) {
      if (ex.response && ex.response.status<500) {
          console.log("errr",ex.response.data);

          const errors = { ...this.state.errors };
        errors.username = ex.response.data.message;
        this.setState({ errors });
      }
    }
  };

  render() {
      const { state } = this.props.location;
    if (auth.getCurrentUser())
        return <Redirect to="/" />;
    return (
        <React.Fragment>
        <div className="container my-3">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div className="card rounded shadow align-middle shadow-sm" >
              <div className="card-header">
                  <h3 className="mb-0">Login</h3>
              </div>
              <div className="card-body">
        <form onSubmit={(e)=>{
            //this.props.history.goBack();
            e.preventDefault();
          this.handleSubmit() && this.doSubmit();
        }}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
            <a>  <Link to={{pathname:"/registerf",state:{pathname:state?state.pathname:'/'}}}>
             Create a new account
          </Link></a>
        </form>
              </div>
      </div>
                </div></div></div>
        </React.Fragment>
    );
  }
}

export default LoginForm;
