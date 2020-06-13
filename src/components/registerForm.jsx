import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import {Redirect} from "react-router-dom";
import ReactImageUploadComponent from "react-images-upload";
// First way to import

// Another way to import. This is recommended to reduce bundle size
import ClipLoader from 'react-spinners/ClipLoader';
class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", email: ""},picture:{},pictures:[],
    errors: {},
    fileText: "",
      loadingS: false
  };

  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    username: Joi.string()
      .required()
      .label("User Name")
  };

  doSubmit = async () => {
    try {
      console.log(this.props);
      const formData = new FormData();
      formData.append('file', this.state.picture[0]);
      const response = await auth.register({...this.state.data,photo:this.imageId});
      console.log("the login user",response.data);
      if(response.data)
      {
        await auth.login(this.state.data.username,this.state.data.password);
        const { state } = this.props.location;
        window.location = state ? state.pathname : "/";
        //auth.loginWithJwt(response.headers["x-auth-token"]);
      }

    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data.message;
        this.setState({ errors });
      }
    }
  };
    imageId="";
   onDrop(picture) {
    if(picture){
      this.setState({loadingS:true});
      //this.setState({pictures: this.state.pictures.concat(picture),});
      this.setState({fileText:picture[0].name});
      this.setState({picture:picture});
      const formData = new FormData();
      formData.append('file', picture[0]);
       auth.uploading(formData).then((resp)=>{
         resp.data &&  this.setState({loadingS:false});
         this.imageId=resp.data;
       });

console.log(this.imageId);
    }
  }

  render() {
    if(auth.getCurrentUser())
      return <Redirect to="/" />

    return (

        <div className="container my-3">

          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card rounded shadow align-middle shadow-sm">
              <div className="card-header">
                <h3 className="mb-0">Register</h3>
              </div>
              <div className="card-body card">
        <form  onSubmit={(e)=>{
          e.preventDefault();
          console.log(this.state.picture);
          this.handleSubmit() && this.doSubmit();
        }}>
          {this.renderInput("email", "Email")}
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          <label className={"mr-3"}>Photo</label>
          <span>{this.state.fileText}</span>
          <ClipLoader
              sizeUnit={"px"}
              size={30}
              color={'#123abc'}
              loading={this.state.loadingS}
          />
          <ReactImageUploadComponent
              name={"photo"}
              withIcon={false}
              buttonText='Choose a photo'
              onChange={(p)=>this.onDrop(p)}
              imgExtension={['.jpg', '.gif', '.png']}
              maxFileSize={5242880}
          />

          {this.renderButton("Register",this.state.loadingS)}
        </form>
              </div></div></div>
          </div></div>
    );
  }
}

export default RegisterForm;
