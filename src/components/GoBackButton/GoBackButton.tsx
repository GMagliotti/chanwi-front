import { Button } from "antd";
import { useNavigate} from "react-router";

import {
    LeftOutlined
} from '@ant-design/icons';

export const GoBackButton = () => {
    let navigate = useNavigate();
    return (
        <>
          <Button type="primary" icon={<LeftOutlined/>} onClick={() => navigate(-1)}></Button> 
        </>
    );
};