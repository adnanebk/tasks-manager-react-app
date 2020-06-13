import axios from 'axios'
import {apiUrl} from '../config'

const Base_URL = apiUrl;

class TaskDataService {

    getAllTaskExecutions(numEntries,page,col,sort,searched) {

        if(sort===undefined)
            sort="";
        if(col===undefined)
            col="";

        return axios.get(`${Base_URL}/taskExecution?numEntries=`+numEntries+`&page=`+page+`&col=`+col+`&sort=`+sort+`&searched=`+searched);

    }
    onRemoveTask(id){
        return axios.delete(`${Base_URL}/deleteTaskExecution/`+id);

    }
    addNewTask(task){
        console.log("newww",task);

        return axios.post(`${Base_URL}/createTask`,task);

    }
    /*    getNextTaskExecutions() {
        return axios.get(`${Base_URL}/api/nextTasks`);
    }
    getPrevTaskExecutions() {
        return axios.get(`${Base_URL}/api/previousTasks`);
    }*/


    updateTask(task) {
        return axios.put(`${Base_URL}/updateTask`,task);

    }

    getColumnNames() {
        return axios.get(`${Base_URL}/ColumnsNames`);

    }

    async updateAllTasks(tasks) {
        return axios.put(`${Base_URL}/updateAllTasks`,tasks);
    }

    async removeAllTasks(tasks) {
        return axios.delete(`${Base_URL}/deleteAllTasks`,{ data:tasks
            });

    }
}

export default new TaskDataService()

