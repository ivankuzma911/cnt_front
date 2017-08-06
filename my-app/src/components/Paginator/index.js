/**
 * Created by IvanDev on 07.07.2017.
 */
/**
 * Created by IvanDev on 07.07.2017.
 */

import React from 'react'

class Paginator extends React.Component {

    linkElement(page, mode, element = page,) {

        if (mode) {
            return <a onClick={this.props.changePage.bind(null, page)} className='enabled' key={page}>{element}</a>
        }
        return <a className='disabled'>{element}</a>
    }

    moreThatZero(value){
        return value > 0;
    }

    render() {
        let totalPages = Math.ceil(this.props.totalEmployees / this.props.employeesPerPage),
            currentPage = this.props.page,
            firstPage = this.linkElement(1, currentPage !== 1 && this.moreThatZero(currentPage), '|<'),
            lastPage = this.linkElement(totalPages, currentPage !== totalPages , '>|'),

            prevPage = this.linkElement(currentPage - 1, currentPage - 1 !== 0 && this.moreThatZero(currentPage), '<'),
            nextPage = this.linkElement(currentPage + 1, currentPage + 1 <= totalPages, '>'),

            prevPages = [],
            nextPages = [];

        let prevPagesIndex = currentPage - 5 > 1 ? currentPage - 5 : 1;
        for (let index = prevPagesIndex; index < currentPage; index++) {
            prevPages.push(this.linkElement(index, 'enabled'));
        }

        let nextPagesLimit = currentPage + 5 < totalPages ? currentPage + 5 : totalPages;
        for (let index = currentPage + 1; index <= nextPagesLimit; index++) {
            nextPages.push(this.linkElement(index, 'enabled'));
        }

        return (
            <div className="pagination">
                {firstPage}
                {prevPage}
                {prevPages}
                |{this.props.page}|
                {nextPages}
                {nextPage}
                {lastPage}
            </div>
        )
    }
}

export default Paginator;