import { useNavigate } from "react-router";
import ProducerActivePostInformationCard from "../../components/ActivePostProducerInformationCard/ProducerActivePostInformationCard";
import {
    PlusCircleTwoTone,
    PlusOutlined
} from '@ant-design/icons';
import { useTranslation } from "react-i18next";
import { GoBackButton } from "../../components/GoBackButton/GoBackButton";
import { dummyPost } from "../../dummies";
import { Button } from "antd";

const ProducerPostsManagementPage: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: '32px', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingBottom: '12px' }}>
                <GoBackButton />
                <p style={{ position: 'fixed', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', margin: 0, fontSize: '20px' }}>{t("producer")}</p>
                <div />
            </div>
            <ProducerActivePostInformationCard
                post={dummyPost}
            />
            <Button block icon={<PlusOutlined/>} style={{ fontSize: '26px', marginTop: '12px' }} onClick={() => navigate(`/me-producer/create`)} />
        </div>
    );
}

export default ProducerPostsManagementPage