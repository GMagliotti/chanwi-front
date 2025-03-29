import { useNavigate } from "react-router";
import ProducerActivePostInformationCard from "../../components/ActivePostProducerInformationCard/ProducerActivePostInformationCard";
import {
    PlusCircleTwoTone
} from '@ant-design/icons';
import { useTranslation } from "react-i18next";
import { GoBackButton } from "../../components/GoBackButton/GoBackButton";
import { dummyPost } from "../../dummies";

const ProducerPostsManagementPage: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', paddingInline: '32px', paddingTop: '42px', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <GoBackButton />
                <p style={{ position: 'fixed', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', margin: 0, fontSize: '20px' }}>{t("producer")}</p>
                <div />
            </div>
            <ProducerActivePostInformationCard
                post={dummyPost}
            />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <PlusCircleTwoTone style={{ fontSize: '32px' }} onClick={() => navigate(`/me-producer/create`)} />
            </div>
        </div>
    );
}

export default ProducerPostsManagementPage