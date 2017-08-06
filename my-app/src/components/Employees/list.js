/**
 * Created by IvanDev on 07.07.2017.
 */
import React from 'react'

class EmployeesList extends React.Component {

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.listCancelHandler = this.listCancelHandler.bind(this);

        this.state = {
            activeCheckBox: this.props.employee.emp_active === 'yes',
            empName: this.props.employee.emp_name,
            dpName: this.props.employee.dp_name,
            emp_id: this.props.employee.emp_id,
            listMode: this.props.listMode,
            departments: this.props.departments,
            selectedDepartment: this.props.employee.dp_name
        };

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    componentWillReceiveProps(nextProps) {
        this.state = {
            activeCheckBox: nextProps.employee.emp_active,
            empName: nextProps.employee.emp_name,
            dpName: nextProps.employee.dp_name,
            listMode: nextProps.listMode,
            emp_id: nextProps.employee.emp_id,
            departments: nextProps.departments,
            selectedDepartment: nextProps.employee.dp_name
        }
    }

    submitHandler(e) {
        e.preventDefault();
        this.props.listSubmitHandler(this.state);
    }

    listCancelHandler(e) {
        e.preventDefault();
        this.props.listCancelHandler();
    }


    render() {
        console.log(this.state, 'LISTTTTTTTTT');
        return (
            <div className={this.props.active ? 'edit-form-active' : 'edit-form-inactive'}>
                <p>Edit form:</p>
                <form onSubmit={this.submitHandler}>
                    <p>
                        <label>
                            Emp Name:
                            <input type="text"
                                   name="empName"
                                   onChange={this.handleInputChange}
                                   value={this.state.empName}
                                   disabled={this.state.listMode === 'view' ? 'diabled' : ''}/>
                        </label>
                    </p>
                    <p>
                        <label>
                            Emp active
                            <input type="checkbox"
                                   onChange={this.handleInputChange}
                                   name="activeCheckBox"
                                   checked={this.state.activeCheckBox}
                                   disabled={this.state.listMode === 'view' ? 'diabled' : ''}
                            />
                        </label>
                    </p>
                    <p>
                        <label>
                            Emp department
                            <select onChange={this.handleInputChange}
                                    disabled={this.state.listMode === 'view' ? 'diabled' : ''}
                                    name="selectedDepartment"
                                    value={this.state.selectedDepartment}
                            >
                                {this.state.departments.map((department, key)=>
                                    <option key={key} selected>
                                        {department.dp_name}
                                    </option>
                                )}
                            </select>
                        </label>
                    </p>
                    {this.state.listMode === 'edit' ?
                        <input type="submit" value="Submit"/>
                        : ''
                    }
                    <input type="button" onClick={this.listCancelHandler} value="Cancel"/>
                </form>
            </div>
        )
    }
}

export default EmployeesList;