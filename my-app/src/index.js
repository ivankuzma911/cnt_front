/**
 * Created by IvanDev on 01.07.2017.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Header from './components/Header'
import {EmployeesGrid, EmployeesList} from './components/Employees'
import Paginator from './components/Paginator'
import Search from './components/Search'

import * as employeeService from './services/employee-service'
import * as departmentService from './services/department-service'

class App extends React.Component {

    constructor(props) {
        super(props);
        this.listSubmitHandler = this.listSubmitHandler.bind(this);
        this.listCancelHandler = this.listCancelHandler.bind(this);
        this.state = {
            employees: [],
            employeesPerPage: 10,
            totalPages: 10,
            page: 1,
            totalEmployees: 0,
            employeeName: '',
            editEmployeeActive: false,
            employeeToReview: {
                emp_name: '',
                emp_department: '',
                emp_active: false
            },
            listMode: '',
            departments: []
        };

    }

    findEmployees() {        
        employeeService.findAll({page: this.state.page, employeeName: this.state.employeeName})
            .then(data => {
                let totalPages = Math.ceil(data.totalEmployees / this.state.employeesPerPage);
                this.setState({
                    page: (this.state.page >= totalPages) ? totalPages : this.state.page,
                    totalEmployees: data.totalEmployees,
                    employees: data.employees
                })
            });
        departmentService.getAll()
            .then(data =>
                this.setState({
                    departments: data
                })
            );
    }

    componentDidMount() {
        this.findEmployees()
    }

    changePage(page) {
        this.setState({
            page: page
        }, this.findEmployees);
    }

    deleteEmployee(id) {
        employeeService.deleteById(id)
            .then(()=> this.findEmployees())
    }

    listSubmitHandler(employee) {
        employeeService.updateByIds(employee)
            .then(()=> {
                this.findEmployees();
                this.setState({
                    editEmployeeActive: false,
                    employeeToReview: {}
                })
            })
    }

    listCancelHandler() {
        this.setState({
            editEmployeeActive: false,
            employeeToReview: {}
        })
    }

    findEmployeeByName(text) {
        this.setState({
                employeeName: text,
                page: 1
            }, this.findEmployees
        )
    }


    getPagination() {
        return <Paginator
            page={this.state.page}
            totalEmployees={this.state.totalEmployees}
            changePage={this.changePage.bind(this)}
            employeesPerPage={this.state.employeesPerPage}/>
    }

    previewEmployee(id, type) {
        this.setState({
                editEmployeeActive: true,
                employeeToReview: this.state.employees.filter(employee => (employee.emp_id === id))[0],
                listMode: type,
                departments: this.state.departments
            }
        )
    }

    render() {
        return (
            <div>
                <Header name="Ivan vs react"/>
                {this.getPagination()}
                <EmployeesGrid
                    employees={this.state.employees}
                    deleteEmployee={this.deleteEmployee.bind(this)}
                    previewEmployee={this.previewEmployee.bind(this)}
                />
                {this.getPagination()}
                {this.state.editEmployeeActive ?
                    <EmployeesList
                        active={this.state.editEmployeeActive}
                        employee={this.state.employeeToReview}
                        listSubmitHandler={this.listSubmitHandler}
                        listCancelHandler={this.listCancelHandler}
                        listMode={this.state.listMode}
                        departments={this.state.departments}
                    />
                    : ''
                }
                <Search searchHandler={this.findEmployeeByName.bind(this)}/>
            </div>
        )
    }
}


ReactDOM.render(
    <App/>,
    document.getElementById("main")
);

