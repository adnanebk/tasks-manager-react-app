import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'react-select';
import {Checkbox} from "@material-ui/core";


// columns: array
// sortColumn: object
// onSort: function

class TableHeader extends Component {
     options = [
        { value: 'file1', label: 'File1' },
        { value: 'file2', label: 'File2' },
        { value: 'file3', label: 'File3' }
    ];
    state = {
        selectedOption: null,
    };
    editStyle={
        'textAlign': 'center',
        'verticalAlign': 'middle',
        'fontSize': 'x-large',
    'backgroundColor': 'darkseagreen'
    };
    selectedOption= null;
    headStyle={minWidth:'130px',cursor:'pointer',color:'black',backgroundColor:'darkgrey',fontWeight:'bold',verticalAlign:'middle',textAlign:'center'}

  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = column => {
    const { sortColumn } = this.props;
console.log("iconnn",column);

    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc")
        return <FontAwesomeIcon icon="sort-up" />;
    return <FontAwesomeIcon icon="sort-down" />;
  };

  render() {
      const  { columns,newData,onDataAdded,onColSearch,onInputChange,editable}=this.props;
      return (
      <tfoot>
        <tr>
            { editable &&  <th style={this.editStyle} colSpan={3} ><b>Edit</b></th>}

            {this.props.columns.map(column => (
              column.type &&    <th
                style={this.headStyle}
              className="clickable"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >{column.label} {this.renderSortIcon(column)}</th>
          ))}
        </tr>
        {!editable && <tr  bgcolor="ghostwhite" >
            {
                columns.map(col=>(
                    col.type && <th  key={col.path} className="md-form mt-0">

                        <input  id={columns.indexOf(col)} onChange={
                            (e)=>{
                                    onColSearch(col.path,e.target.value);
                            }} className="form-control" type={col.type==="number"?"number":"text"} placeholder={col.type==="checkbox"? "Search (yes/no)":"Search"} aria-label="Search" />
                    </th>

                ))
            }

        </tr>}
        {editable &&  <tr bgcolor={!newData.color?'cadetblue':newData.color} >
            <th colSpan={3} style={{textAlign:"center"}}>  <button  onClick={()=>{
                onDataAdded();

            }} className="btn btn-success btn-sm" > Add </button></th>
            { columns.map(col=>(
                col.type && <th key={col.path} style={{textAlign:'center'}}>

                    { (col.type && col.type!=='checkbox' && col.type!=='select' ) &&   <input name={col.filter} onChange={(e)=>{onInputChange(e.target.value,col.path,null)}} value={newData[col.path]}
                                                                      style={{width:'auto',maxWidth:'170px'}}
                                                                      onKeyUp={(e)=>e.keyCode===13 && onDataAdded()}  className="form-control" type={!col.type?'text':col.type} />}


                    {(col.type && col.type==='select') &&
                    <Select className={"select-rc"} Style={{width:'auto',maxWidth:'140px'}}
                        isMulti={true}
                            defaultValue={this.state.selectedOption}
                        onChange={(selectedOption) => {
                           this.setState({selectedOption});
                            let value="";
                           if(selectedOption!==undefined && selectedOption!==null  && selectedOption.length>0)
                           {
                                value=selectedOption.map((s)=>s.value.toString());

                               onInputChange(value.toString(),col.path,null);
                           }
                           else
                               onInputChange("",col.path,null);


                        }}
                        options={this.options}
                            //defaultValue={[colourOptions[2], colourOptions[3]]}
                            name="Files"
                            classNamePrefix="select"
                    />}
                    {(col.type && col.type==='checkbox') &&
                   <span style={{width:'auto'}}>
                    <Checkbox color="default" onChange={(e)=>{onInputChange(e.target.value,col.path,null)}} value={newData[col.path]} />
                   </span>
                    }
                    {(newData.errors && newData.errors[col.path]) && (<span color="red" style={{color:'darkred'}}>{col.label+' '+newData.errors[col.path]}</span>)}
                </th>
            ))}
        </tr>}
      </tfoot>
    );
  }
}

export default TableHeader;
