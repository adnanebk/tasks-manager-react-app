import React, { Component } from "react";
import 'rc-pagination/assets/index.css';
import Pagination from 'rc-pagination';
import TaskDataService from '../services/TaskDataService';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Table from "./common/table";
import {Checkbox} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Fab from "@material-ui/core/Fab";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class TasksTable extends Component {
    columnNames=[];
    columns = [
        {
            key: "Select",
            content: task => (
                <Checkbox onChange={(e)=>{
                    let Ids=this.state.Ids;
                    if(e.target.checked)
                        Ids.push(task.id);
                    else
                            Ids= Ids.filter(e=>e!==task.id);
                    this.setState({Ids});

                }
                }
                />

            )
        },
        {
            key: "update",
            content: task => (
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={(e) => this.handleUpdate(task,e.target)}
                >
                    Update
                </Button>
            )
        }
        ,{
            key: "delete",
            content: task => (
                <Fab size={"small"}
            color="secondary"   onClick={()=>this.handleDelete(task)} >
                    <FontAwesomeIcon icon={"trash-alt"} />

</Fab>
            )
        },
        {path: "durationInSeconds", label: "Duration in Seconds", type:"number"},
        { path: "emailErrorSent", label: "Email Error Sent",type:"checkbox" },
        { path: "endDate", label: "End Date",type:"date"},
        { path: "inProgressCopyDetected", label: "In progress copy detected",type:"checkbox" },
        { path: "message", label: "Message",type:"text" },
        { path: "nbrCheckInProgressCopy", label: "Number of Check In Progress Copy",type:"number" },
        { path: "startDate", label: "Start Date",type:"date" },
        { path: "taskConfigName", label: "Task config name",type:"text" },
        { path: "transportedFiles", label: "Transported File",type:"select" },
    ];
Initialtask={};
    currentPage= 1;
    pageSize= 5;
    size=0;
    search="";
    lastPage=0;
    sortColumn= { path: "startDate", order: "asc" };

    state = {
        Ids:[],
    editable:false,
        tasks: [],
        sortColumn: { path: "startDate", order: "asc" },
        newTask:{}
    };

    constructor(props) {
        super(props);
        TaskDataService.getColumnNames().then((res)=>{this.columnNames=[...res.data];
        });}


    componentDidMount() {
 this.getPagedData();
    }





    handleDelete =async (task) => {
        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure to remove.',
            buttons: [
                {
                    label: 'Yes',
                    onClick:async () => {try {
                        await TaskDataService.onRemoveTask(task.id);
                        this.getPagedData();
                    }catch (e) {

                    }}
                },
                {
                    label: 'No'
                }
            ]
        });

    };
    handleDataAdded= async ()=>{
        try {
            let resp= await TaskDataService.addNewTask(this.state.newTask);
            const tasks=[{...resp.data,color:'darkseagreen'},...this.state.tasks];
            this.setState({tasks});
            this.setState({newTask:this.Initialtask});
            toast.success("Your operation has been completed successfully");
        }catch (err) {

            let errors={...err.response.data};
            if(errors.global)
                toast.error(errors.global);
            this.setState({newTask:{...this.state.newTask,color:"lightcoral",errors:errors}});

        }

    };

    handleRefreshAll= ()=>{
        this.setState({isEditing:false});
        this.getPagedData();
    };

    handleRemoveAll=async ()=>{
        try {
const tasksRemoved=this.state.tasks.filter(t=>this.state.Ids.includes(t.id));
const tasks=this.state.tasks.filter(t=>!this.state.Ids.includes(t.id));
            confirmAlert({
                title: 'Confirm to Delete',
                message: 'Are you sure to remove',
                buttons: [
                    {
                        label: 'Yes',
                        onClick:async () => {try {
                            await TaskDataService.removeAllTasks(tasksRemoved);
                            this.setState({tasks})
                            this.setState({Ids:[]})
                        }catch (e) {

                        }}
                    },
                    {
                        label: 'No'
                    }
                ]
            });
}catch (e) {

        }
};
    handleUpdateAll=async ()=>{
        try {
            let resp = await TaskDataService.updateAllTasks(this.state.tasks);
            this.setState({tasks:resp.data})
            toast.success("Your operation has been completed successfully");
        }
            catch (err) {
                console.log("errrr",err.response.data);
                let data=err.response.data;
                let tasks;
                data.map(errObj=>{
                     tasks= this.state.tasks.map(t=>{
                        if(t.id===errObj.id)
                        {
                            t.errors[errObj.field]=errObj.message;
                            t={...t,color:'lightcoral'};
                        }
                        else
                            t={...t,color:'azure',errors:null};
                        return t
                    });
                });

            this.setState({tasks:[...tasks]});
        }
};
    handleUpdate = async (task,key) => {
        try {
            let resp = await TaskDataService.updateTask(task);
            const tasks=this.state.tasks.map((t)=>{
                    if(t.id===task.id)
                        t={...task,color:'darkseagreen',errors:null}
                    else
                        t={...t,color:'azure'};
                    return t;
                }
            );
            this.setState({tasks});
            toast.success("Your operation has been completed successfully");

        } catch (err) {
            const tasks=this.state.tasks.map((t)=>{
                if(t.id===task.id)
                    t={...task,color:'lightcoral',errors:err.response.data}
                else
                    t={...t,color:'azure',errors:null};
                return t;
            });
            this.setState({tasks:[...tasks]});
            this.setState({newTask:{...this.Initialtask}});
        }
    };



    handlePageChange = page => {
        this.setState({ currentPage: page });
    };

    handleSort = sortColumn => {
        this.sortColumn=sortColumn;
        this.getPagedData();
    };
    handlePaging=(currentPage,pagSize)=>{
        this.currentPage=currentPage;
        this.getPagedData();
    };

    handleColSearch= (col,s)=>{
        this.search="";
        this.currentPage=1;
        let rows=  document.getElementsByClassName("rw");
        for(var i=0; i<rows.length; i++) {
            rows[i].style.background = null;
        }
        if(s===undefined)
            s="";
        if(s.trim()!=="")
        {
            if(s.toLowerCase()==="yes")
                s="true";
            else if(s.toLowerCase()==="no")
                s="false";
            this.search=(s+"/;"+col);
        }else
            this.pageSize=5;

        this.getPagedData(true);
        try {
        }catch (e) {

        }
    };

    handleInputChange=(value,label,id) =>{
        if(value!=="")
            this.setState({isEditing:true});
        if(id===null)
        {let task=this.state.newTask;
            task[label]=value;
            this.setState({newTask:task});
        }
        else
        {
            const tasks=this.state.tasks.map((task)=>{
                        if(task.id===id)
                            task[label]=value;
                            return {...task};
                }
            );
            this.setState({tasks});
        }
    };

    async handleGlobalSearch(value) {
        if(value==="")
            this.pageSize=5;
        this.search=value;
        this.getPagedData();
    }

    getPagedData =async (isSearched) => {
          let resp =await TaskDataService.getAllTaskExecutions(this.pageSize,this.currentPage-1,this.sortColumn.path,this.sortColumn.order,this.search);
          this.size=resp.data.size;
        if((this.size>=1 && this.pageSize>this.size))
        {
            this.pageSize=this.size;
        }

        //if(this.state.tasks.length>this.size)
              //this.pageSize=5;

          this.lastPage=resp.data.lastPage;
        //const sorted = _.orderBy(resp.data.taskExecutionList, [this.state.sortColumn.path], [this.state.sortColumn.order]);
          this.Initialtask={...resp.data.newTaskExecution};
          this.setState({tasks: [...resp.data.taskExecutionList]});
          this.setState({Originaltasks: [...resp.data.taskExecutionList]});
          this.setState({newTask: this.Initialtask});
          return this.state.tasks;
    };
    render() {
        const { length: count } = this.state.tasks;
        const {tasks,newTask,editable} = this.state;

        //if (count === 0) return <p>There are no tasks in the database.</p>;

        //const  tasks = this.getPagedData();

        return (
            <div className="row">
                <div className="col">
                    <br/>
                    <br/>
                    <h3>Showing {this.size} tasks in the database.</h3>


                    <div  className={"form-inline"}>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;<b>Show</b> &nbsp;</span>
                        <span className={"md-form"}><input   type={"number"} onChange={(e) => {
                            if(e.target.value<=1)
                                this.pageSize=1;
                            else if(e.target.value>=this.size)
                                this.pageSize=this.size;
                            else
                          this.pageSize=e.target.value;
                            this.currentPage=1;
                      this.getPagedData();
                        }} className="form-control" id="numE" value={this.pageSize} style={{width: '40px'}}/></span>

                        <span>&nbsp;<b >/{this.lastPage} entries in the table &nbsp;&nbsp;  </b> </span>
                        <div className="custom-control custom-switch">
                            <input onChange={(e)=>{this.setState({editable:e.target.checked});this.getPagedData()}} type="checkbox" checked={this.state.editable} className="custom-control-input" id="customSwitches"/>
                            <label className="custom-control-label" htmlFor="customSwitches"><b>Editable mode</b></label>
                        </div>
                        &nbsp;&nbsp;&nbsp;
                        <input placeholder={"Global search"} hidden={!editable} className={"form-control"} onChange={(e)=>this.handleGlobalSearch(e.target.value)}  />

                        <button hidden={!editable} className={"btn btn-info"} disabled={!this.state.isEditing} onClick={this.handleUpdateAll} >Update All</button>
                        <button hidden={!editable} disabled={this.state.Ids.length<=0} className={"btn btn-danger"}  onClick={this.handleRemoveAll} >Remove All</button>
                        <button hidden={!editable} className={"btn btn-warning"}  onClick={this.handleRefreshAll} >Refresh All</button>
                    </div>
                    <div hidden={this.state.Ids.length<=0} className="alert alert-dark" role="alert">
                    <b ><span>{this.state.Ids.length}</span> rows selected</b>
                    </div>
                    <ToastContainer />
                    <Table
                        columns={this.columns}
                        data={tasks}
                        sortColumn={this.sortColumn}
                        onSort={this.handleSort}
                        onInputChange={this.handleInputChange}
                        newData={newTask}
                        onDataAdded={this.handleDataAdded}
                        onColSearch={this.handleColSearch}
                        editable={editable}
                        onUpdate={this.handleUpdate}
                    />
                    <Pagination  onChange={this.handlePaging} className="ant-pagination"   total={this.size} pageSize={this.pageSize} />,

                </div>
            </div>

        );
    }


}

export default TasksTable;
