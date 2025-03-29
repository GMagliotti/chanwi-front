import { useLocation, useNavigate } from "react-router";
import LunchBoxCard from "../../components/LunchboxCard/LunchBoxCard";
import { Button, InputNumber, InputNumberProps, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { GoBackButton } from "../../components/GoBackButton/GoBackButton";

interface ReceiverPurchasePageProps {
    // producer: Producer;
    // posts: Post[];
    // setSelectedPost: (post: Post) => void;
}

const ReceiverPurchasePage: React.FC<ReceiverPurchasePageProps> = ({ }) => {
    const { t } = useTranslation();
    const location = useLocation();
    const [useCount, setCount] = useState<any>(1);
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        // TODO
        navigate(`/orders/${1}`, { state: { useCount } })
        // hacer un post con useCount
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onChange: InputNumberProps['onChange'] = (value) => {
        setCount(value)
    };


    const post = location.state?.post;
    const producer = location.state?.producer;

    return (
        <div style={{ paddingInline: 20 }}>
            <GoBackButton />
            <h2>{producer.businessName}</h2>
            <p>{producer.description}</p>
            <LunchBoxCard post={post} />
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
                <Button type="primary" onClick={showModal}>{t("purchase")}</Button>
            </div>
            <Modal title={t("purchase_confirmation")} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>{t("purchase_confirmation_body")}</p>
                <InputNumber min={1} max={10} defaultValue={1} onChange={onChange} style={{ marginTop: 10 }} />
            </Modal>
        </div>
    );
};

export default ReceiverPurchasePage;