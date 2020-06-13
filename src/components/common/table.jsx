import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, sortColumn, onSort, data,onInputChange,newData,onDataAdded,onColSearch,editable,onUpdate}) => {

  return (



    <table style={{border:'2px solid skyblue'}} className="table  w-auto  table-bordered table-sm table-responsive">
      <TableHeader columns={columns}  sortColumn={sortColumn} onSort={onSort}    editable={editable} newData={newData} onColSearch={onColSearch} onInputChange={onInputChange} onDataAdded={onDataAdded}/>
      <TableBody onUpdate={onUpdate} editable={editable} columns={columns}  onInputChange={onInputChange}  data={data} />
    </table>


    /*<Editable data={data} />*/

  );
};

export default Table;
