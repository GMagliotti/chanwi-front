import { useNavigate} from "react-router";

import {
    LeftOutlined
} from '@ant-design/icons';

export const GoBackButton = () => {
    let navigate = useNavigate();
    return (
        <>
          <LeftOutlined type="primary" style={{ padding: '10px', fontSize: '20px'}} onClick={() => navigate(-1)}></LeftOutlined> 
        </>
    );
};