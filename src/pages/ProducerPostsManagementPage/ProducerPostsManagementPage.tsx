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
        <>
            <GoBackButton />
            <ProducerActivePostInformationCard
                post={dummyPost}
            />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <PlusCircleTwoTone style={{ fontSize: '32px' }} onClick={() => navigate(`/me-producer/create`)} />
            </div>
        </>
    );
}

export default ProducerPostsManagementPage