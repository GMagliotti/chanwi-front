import { Row, Col, Spin, Divider } from 'antd';
import React, { useState } from 'react';

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
                <Col 
                    sm={4} 
                    xs={4} 
                    md={7} 
                    lg={7}
                >
                    <Spin size="large" style={{ margin: '0 auto' }} />
                </Col>
                {username}
            </Row>
            <Divider style={{ margin: 0 }} />
        </div>
)}

export default Navbar