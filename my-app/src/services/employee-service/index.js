/**
 * Created by IvanDev on 07.07.2017.
 */
import {get, deleteByid, updateById} from '../request';

let baseUrl = 'http://localhost:8080';

export let findAll = (values) => {
    let query = '';

    if(values){
        query = Object.keys(values).map(key => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(values[key]);
        }).join("&");
        query = "?" + query;
    }

    return get({url: baseUrl + "/employees" + query})
        .then((response)=> JSON.parse(response));
};

export let deleteById = (id) => {
    return deleteByid({url: baseUrl + "/employees/" + id})
        .then((response)=> response);       
};

export let updateByIds = (employee) => {    
    return updateById({url: baseUrl + "/employees/" + employee.emp_id, employee: employee})
        .then((response)=> response);
};

