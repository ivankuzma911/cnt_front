/**
 * Created by IvanDev on 07.07.2017.
 */

import React from 'react'

class Header extends React.Component {

    render() {
        return (
            <div>
                {this.props.name}
            </div>
        )
    }
}

export default Header;