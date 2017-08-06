/**
 * Created by IvanDev on 07.07.2017.
 */
import request from 'request'

export let get = opts => {
    return new Promise((resolve, reject) => {
        request.get(opts.url, (err, res)=> {            
            resolve(JSON.parse(res.body))
        })
    });
};

export let deleteByid = opts => {
    return new Promise((resolve, reject) => {
        request.delete(opts.url,(err,res) => {
            resolve(JSON.parse(res.body))
        })
    });
};

export let updateById = ({url, employee}) => {
    return new Promise((resolve, reject) => {
        request({
            method:'PATCH',
            uri: url,
            json : employee
        },(err,res) =>{
            resolve(res)
        })
    });
};
