import { useNavigate, useParams } from "react-router";
import {
    PlusOutlined
} from '@ant-design/icons';
import { useTranslation } from "react-i18next";
import { GoBackButton } from "../../components/GoBackButton/GoBackButton";
import ActiveDriveReceiverInformationCard from "../../components/ActiveDriveReceiverInformationCard/ActiveDriveReceiverInformationCard";
import { Button } from "antd";
import { getDrives } from "../../services/DriveService";
import { useEffect, useState } from "react";
import { ActiveDrive } from "../../models/ActiveEvents";

const ReceiverDrivesPage: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();


    const { id } = useParams();
    const receiverId: string = id
    const receiverIdNumber: number = parseInt(receiverId || '', 10);
    const [drives, setDrives] = useState<ActiveDrive[]>([]);

    useEffect(() => {
        const fetchDrives = async () => {
            try {
                const response = await getDrives(receiverId); 
                console.log(response)
                setDrives(response);
            } catch (error) {
                console.error('Error fetching drives:', error);
            }
        };

        fetchDrives();
    }, [receiverIdNumber]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', paddingInline: '32px', paddingTop: '42px', alignItems: 'center' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <GoBackButton />
                <p style={{ position: 'fixed', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', margin: 0, fontSize: '20px' }}>{t("receiver")}</p>
                <div />
            </div>
            <ActiveDriveReceiverInformationCard posts={drives} />
            <Button block icon={<PlusOutlined />} style={{ fontSize: '26px', marginTop: '12px' }} onClick={() => navigate('/me-receiver/' + receiverId + '/create')} >{drives?.length == 0 && t("create_event")}</Button>
        </div>

    );
}

export default ReceiverDrivesPage