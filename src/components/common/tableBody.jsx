import React, { Component } from "react";
import _ from "lodash";
import Select from 'react-select';
import {Checkbox} from "@material-ui/core";
class TableBody extends Component {

  color="";
   options = [
    { value: 'file1', label: 'File1' },
    { value: 'file2', label: 'File2' },
    { value: 'file3', label: 'File3' }
  ];

  renderCell = (item, column) => {
    if (column.content)
      return column.content(item);
    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item.id + (column.path || column.key);
  };

  render() {
    this.color="red";
    const { data, columns,onInputChange,editable,onUpdate} = this.props;
    console.log("re render");

    return (
      <tbody>
      {data.length<=0 && <tr><td colSpan={9} style={{textAlign:'center'}}><b>No Data in the database</b></td></tr>}
        {data.map(item => (
          <tr bgcolor={item.color?item.color:'azure'} key={item.id}>

            {columns.map(column => (
                (column.content && editable)?  <td  style={{verticalAlign:'middle'}} key={this.createKey(item, column)}>{this.renderCell(item, column)}</td>

              : !column.content && ( <td style={{border:'1px solid lightblue',textAlign:'center'}}  className={column.type!=="checkbox"?"md-form":"" } key={this.createKey(item, column)}>
{editable &&
(column.type==="checkbox"? <Checkbox  color="default" onChange={(e)=>{item.color="goldenrod"; onInputChange(e.target.checked,column.path,item.id)}}
                 checked={this.renderCell(item, column)} id="checkbox1" />
        :column.type==="select"?<Select className={"ss"}
                                        onChange={(selectedOption)=>{item.color="goldenrod";
                                        let value="";
                                          if(selectedOption!==undefined && selectedOption!==null && selectedOption.length>0)
                                          {
                                             value=selectedOption.map((s)=>s.value.toString());
                                            onInputChange(value.toString(),column.path,item.id)
                                          }
                                      else
                                          onInputChange("",column.path,item.id)}}
                                          defaultValue={this.renderCell(item, column).split(",").map(e=>{return {value:e,label:e}})}
                                          options={this.options}
                                          isMulti={true}     />


        :<input className={"form-control"} onChange={(e)=>{item.color="goldenrod";onInputChange(e.target.value,column.path,item.id)}} onKeyUp={(e)=>e.keyCode===13 && onUpdate(item)}
                                        type={column.type}  value={this.renderCell(item, column)} />
            )

}
                {(!editable) &&  <b>{this.renderCell(item, column)===true?'yes':this.renderCell(item, column)===false?'No':this.renderCell(item, column)}</b> }
                {(item.errors && item.errors[column.path]) && (<b color="red" style={{color:'darkred'}}>{column.label+' '+item.errors[column.path]}</b>)}
              </td>)



              ))}
          </tr>
        ))}
      </tbody>

    );
  }
}
export default TableBody;
