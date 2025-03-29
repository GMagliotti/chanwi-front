import { Row, Col, Spin, Divider } from 'antd';
import React, { useState } from 'react';
import AppHeader from '../AppHeader/AppHeader';

const Navbar: React.FC = () => {
    const [ username, setUsername ] = useState(localStorage.getItem('username'))

    
    return (
        <div>
            <Row
                justify="space-between"
                align="middle"
                style={{
                    padding: '15px',
                    width: '100%',
                    margin: 0,
                    backgroundColor: '#001529',
                }}
            >
                {/* {username ? username : <AppHeader/>} */}
            </Row>
            <Divider style={{ margin: 0 }} />
        </div>
)}

export default Navbar