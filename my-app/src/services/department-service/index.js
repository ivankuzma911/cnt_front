/**
 * Created by IvanDev on 05.08.2017.
 */
import {get} from '../request';
let baseUrl = 'http://localhost:8080';

export let getAll = (values) => {
    return get({url: baseUrl + "/departments"})
        .then((response)=> JSON.parse(response));
};