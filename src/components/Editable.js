
import React from "react";
import MaterialTable from "material-table";

export class Editable extends React.Component {

    MyCellStyle={color: 'rgba(14,14,14,0.96)'};

    constructor(props) {
        super(props);
        this.state = {
            selectedRow:null,
            data:[],
            columns: [
                {field: "durationInSeconds", title: "Duration in Seconds", type:"numeric",cellStyle:this.MyCellStyle},
                { field: "emailErrorSent", title: "Email Error Sent",type:"boolean",cellStyle:this.MyCellStyle},
                { field: "endDate", title: "End Date",type:"date",cellStyle:this.MyCellStyle},
                { field: "inProgressCopyDetected", title: "In progress copy detected",type:"boolean",cellStyle:this.MyCellStyle},
                { field: "message", title: "Message",cellStyle:this.MyCellStyle},
                { field: "nbrCheckInProgressCopy", title: "Number of Check In Progress Copy",type:"numeric",cellStyle:this.MyCellStyle},
                { field: "startDate", title: "Start Date",type:"date",cellStyle:this.MyCellStyle},
                { field: "taskConfigName", title: "Task config name",cellStyle:this.MyCellStyle},
                { field: "transportedFiles", title: "Transported File",lookup: { file1: 'file1', file2: 'file2',file3:'file3'},cellStyle:this.MyCellStyle},

         /*       { title: 'Name',field: 'name' },
                { title: 'Surname', field: 'surname', initialEditValue: 'initial edit value' },
                { title: 'Birth Year', field: 'birthYear', type: 'boolean' },
                {
                    title: 'Birth Place',
                    field: 'birthCity',
                    lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
                },*/
            ]
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
if(this.props.data!==prevProps.data)
{
        this.setState({ data:[...this.props.data]})
/*    const columns=this.state.columns.map((col)=>{
       const colm={...col,cellStyle: {
                backgroundColor: '#d3e5e2',
                color: 'rgba(14,14,14,0.96)'
            }};
            return colm
    });*/
}
    }

    render() {
        return (
            <MaterialTable
                onRowClick={((evt, selectedRow) => this.setState({ selectedRow }))}
                options={{
                headerStyle:{backgroundColor: '#0188dc', color:'#FFF',minWidth:'160px'},
                    rowStyle: rowData => ({
                        backgroundColor: (this.state.selectedRow && this.state.selectedRow.tableData.id === rowData.tableData.id) ? '#EEE' : '#d3e5e2'
                    })
            }}
                title="Editable Preview"
                columns={this.state.columns}
                data={this.state.data}
                editable={{
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                {
                                    const data = this.state.data;
                                    data.push(newData);
                                    this.setState({ data }, () => resolve());
                                }
                                resolve()
                            }, 1000)
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                {
                                    const data = this.state.data;
                                    const index = data.indexOf(oldData);
                                    data[index] = newData;
                                    this.setState({ data }, () => resolve());
                                }
                                resolve()
                            }, 1000)
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                {
                                    let data = this.state.data;
                                    const index = data.indexOf(oldData);
                                    data.splice(index, 1);
                                    this.setState({ data }, () => resolve());
                                }
                                resolve()
                            }, 1000)
                        }),
                }}
            />
        )
    }
}
