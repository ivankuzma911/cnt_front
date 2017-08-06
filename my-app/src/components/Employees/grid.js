/**
 * Created by IvanDev on 07.07.2017.
 */
import React from 'react'

class EmployeesGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            headerFields: [
                '', '', 'empId', 'empName', 'empActive', 'empDepartment', ''
            ]
        }
    }

    render() {                     
        return (
            <div className="container">
                <table className="table table-hover">
                    <thead>
                    <tr>
                        {this.state.headerFields.map((field, i) => <td key={i}>{field}</td>)}
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.employees.map(employee =>
                        <tr key={employee.emp_id}>
                            <td>
                                <a onClick={this.props.previewEmployee.bind(null, employee.emp_id, 'view')}>View</a>
                            </td>
                            <td>
                                <a onClick={this.props.previewEmployee.bind(null, employee.emp_id, 'edit')}>Edit</a>
                            </td>
                            <td>{employee.emp_id}</td>
                            <td>{employee.emp_name}</td>
                            <td>{employee.emp_active}</td>
                            <td>{employee.dp_name}</td>
                            <td>
                                <a onClick={this.props.deleteEmployee.bind(null, employee.emp_id)}>Delete</a>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default EmployeesGrid;