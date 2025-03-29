import { useNavigate } from "react-router";
import ProducerActivePostInformationCard from "../../components/ActivePostProducerInformationCard/ProducerActivePostInformationCard";
import {
    PlusCircleTwoTone
} from '@ant-design/icons';
import { useTranslation } from "react-i18next";
import { GoBackButton } from "../../components/GoBackButton/GoBackButton";

const ProducerPostsManagementPage: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <>
            <GoBackButton />
            <ProducerActivePostInformationCard
                title="Active Post"
                timestamp="2023-10-01 12:00:00"
                valueOne={100}
                valueTwo={200}
                listItems={["Item 1", "Item 2", "Item 3"]}
                valueOneLabel="Date1"
                valueTwoLabel="Date2"
            />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <PlusCircleTwoTone style={{ fontSize: '32px' }} onClick={() => navigate(`/me-producer/create`)} />
            </div>
        </>
    );
}

export default ProducerPostsManagementPage