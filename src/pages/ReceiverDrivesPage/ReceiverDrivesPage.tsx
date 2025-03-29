import { useNavigate } from "react-router";
import {
    PlusCircleTwoTone,
    PlusOutlined
} from '@ant-design/icons';
import { useTranslation } from "react-i18next";
import { GoBackButton } from "../../components/GoBackButton/GoBackButton";
import { dummyDrive } from "../../dummies";
import ActiveDriveReceiverInformationCard from "../../components/ActiveDriveReceiverInformationCard/ActiveDriveReceiverInformationCard";
import { Button, Space } from "antd";

const ReceiverDrivesPage: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', paddingInline: '32px', paddingTop:'42px' , alignItems:'center' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <GoBackButton />
                <p style={{ position: 'fixed', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', margin: 0,fontSize: '20px' }}>{t("receiver")}</p>
                <div />
            </div>
            <ActiveDriveReceiverInformationCard
                posts={[dummyDrive]}
            />
            <Button block icon={<PlusOutlined/>} style={{ fontSize: '26px', marginTop: '12px' }} onClick={() => navigate(`/me-producer/create`)} />
            </div>

    );
}

export default ReceiverDrivesPage