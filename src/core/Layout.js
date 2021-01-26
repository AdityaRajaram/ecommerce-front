import React from 'react'
import Menu from '../core/Menu'
import '../styles.css'

const Layout = ({title='title',description='Description',className,children}) => {
    return (
        <div>
            <Menu/>
            <div className="jumbotron">
                <h2 className="m-3 text-white">{title}</h2>
                <p className="lead m-3 text-white">{description}</p>
            </div>
            <div className={className}>{children}</div>
            
            
        </div>
    )
}

export default Layout
