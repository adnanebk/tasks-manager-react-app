
import React, {Component, Fragment} from 'react';
import TaskDataService from "../services/TaskDataService";
export  default class NewTask extends Component{


isError=false;
     InitTask= {
        creationDate:new Date().toDateInputValue(),
        durationInSeconds:0,
        emailErrorSent:false,
        endDate:new Date().toDateInputValue(),
        inProgressCopyDetected:false,
        message:"",
        nbrCheckInProgressCopy:0,
        startDate:new Date().toDateInputValue(),
        taskConfigName:"",
        transportedFiles:""
    };

    constructor(props) {
        super(props);
        this.creationDate=new Date().toDateInputValue();
        Date.prototype.toDateInputValue = (function() {
                var local = new Date(this);
                local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
                return local.toJSON().slice(0,10);
            }
        );
this.state={...this.InitTask};

    }
    Init(){
        this.setState({...this.InitTask});
    }
    componentDidMount() {
this.Init();
    }


    handleChange(val,name) {
console.log(this.props);
        this.setState({[name]:val});
    }



    render() {
        return (
            <Fragment>
                <th><input name="durationInSeconds" onChange={(e)=>{this.handleChange(e.target.value,e.target.name)}} value={this.state.durationInSeconds}style={{width:'auto'}} id="inp2" className="form-control" type="number" />
                    <span className={'err'}></span>

                </th>

                <th > <input name="emailErrorSent" onChange={(e)=>{this.handleChange(e.target.checked,e.target.name)}} checked={this.state.emailErrorSent}style={{width:'auto'}} id="inp3"  type="checkbox" /> </th>
                <th> <input name="endDate" onChange={(e)=>{this.handleChange(e.target.value,e.target.name)}} value={this.state.endDate}style={{width:'auto'}} id="inp4" className="form-control" type="date" />
                    <span className={'err'}></span>

                </th>
                <th> <input name="inProgressCopyDetected" onChange={(e)=>{this.handleChange(e.target.checked,e.target.name)}} checked={this.state.inProgressCopyDetected} style={{width:'auto'}} id="inp5"  type="checkbox" /> </th>
                <th> <input name="message" onChange={(e)=>{this.handleChange(e.target.value,e.target.name)}} value={this.state.message}style={{width:'auto'}} id="inp6" className="form-control" type="text" />
                <span className={'err'}></span>
                </th>
                <th> <input name="nbrCheckInProgressCopy" onChange={(e)=>{this.handleChange(e.target.value,e.target.name)}} value={this.state.nbrCheckInProgressCopy}style={{width:'auto'}} id="inp7" className="form-control" type="number" />
                    <span className={'err'}></span>

                </th>
                <th> <input name="startDate" onChange={(e)=>{this.handleChange(e.target.value,e.target.name)}} value={this.state.startDate}style={{width:'auto'}} id="inp8" className="form-control" type="date" /> </th>
                <th> <input name="taskConfigName" onChange={(e)=>{this.handleChange(e.target.value,e.target.name)}} value={this.state.taskConfigName}style={{width:'auto'}} id="inp9" className="form-control" type="text" />
                    <span className={'err'}></span>

                </th>
                <th> <input name="transportedFiles"  onChange={(e)=>{this.handleChange(e.target.value,e.target.name)}} value={this.state.transportedFiles}style={{width:'auto'}} id="inp10" className="form-control" type="text" />
                    <span className={'err'}></span>
                </th>
                <th colSpan={2}>  <button  onClick={()=>{
                    this.props.handleAdding(this.state);

                }} className="btn btn-success" >Add</button></th>

            </Fragment>
        )
    }


    /*    render(){
            return(
              <Fragment>
                <th><input onChange={(e)=>{this.setState({creationDate:e.target.value})}} value={this.state.creationDate} style={{width:'auto'}} id="inp1" className="form-control" type="date" /></th>
                <th> <input onChange={(e)=>{this.setState({durationInSeconds:e.target.value})}}value={this.state.durationInSeconds}style={{width:'auto'}} id="inp2" className="form-control" type="number" /> </th>
            <th> <input onChange={(e)=>{this.setState({emailErrorSent:e.target.checked})}}value={this.state.emailErrorSent}style={{width:'auto'}} id="inp3" className="form-control" type="checkbox" /> </th>
            <th> <input onChange={(e)=>{this.setState({endDate:e.target.value})}}value={this.state.endDate}style={{width:'auto'}} id="inp4" className="form-control" type="date" /> </th>
            <th> <input onChange={(e)=>{this.setState({inProgressCopyDetected:e.target.checked})}}value={this.state.inProgressCopyDetected}style={{width:'auto'}} id="inp5" className="form-control" type="checkbox" /> </th>
            <th> <input onChange={(e)=>{this.setState({message:e.target.value})}}value={this.state.message}style={{width:'auto'}} id="inp6" className="form-control" type="text" /> </th>
            <th> <input onChange={(e)=>{this.setState({nbrCheckInProgressCopy:e.target.value})}}value={this.state.nbrCheckInProgressCopy}style={{width:'auto'}} id="inp7" className="form-control" type="number" /> </th>
            <th> <input onChange={(e)=>{this.setState({startDate:e.target.value})}}value={this.state.startDate}style={{width:'auto'}} id="inp8" className="form-control" type="date" /> </th>
            <th> <input onChange={(e)=>{this.setState({taskConfigName:e.target.value})}}value={this.state.taskConfigName}style={{width:'auto'}} id="inp9" className="form-control" type="text" /> </th>
            <th> <input onChange={(e)=>{this.setState({transportedFiles:e.target.value})}}value={this.state.transportedFiles}style={{width:'auto'}} id="inp10" className="form-control" type="text" /> </th>

            </Fragment>

            );
        }*/

}
