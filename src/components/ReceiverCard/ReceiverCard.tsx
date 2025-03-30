import { Card, InputNumber, InputNumberProps, Modal } from "antd"
import LunchBoxCard from "../LunchboxCard/LunchBoxCard";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";

interface ProducerProps {
    producer: Producer;
    posts: Post[];
}

const ReceiverCard: React.FC<ProducerProps> = ({ producer, posts }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [useTitle, setTitle] = useState<string>("");

    const [useCount, setCount] = useState<any>(1);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = (title: string) => {
        setIsModalOpen(true);
        setTitle(title)
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

    return (
        <>
            <Card
                title={<div style={{ paddingBlock: '8px' }}>{producer.business_name}<p style={{ margin: 0, fontWeight: 'normal', fontSize: '14px' }}>{producer.address}</p> </div>}
                style={{ width: 300, textAlign: "left", marginTop: 0, zIndex: 5 }}
                headStyle={{ backgroundColor: "rgba(34, 87, 122, 0.7)", }}
            // size="small"
            >
                {posts.map((post) => (
                    <div
                        key={post.id}
                        // onClick={() => navigate(`/posts/${post.id}`, { state: { post, producer } })} 
                        onClick={() => showModal(post.title)} 
                        style={{ cursor: "pointer" }}

                    >
                        <LunchBoxCard post={post} />
                    </div>
                ))}
            </Card>
            <Modal title={t("purchase_confirmation")} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText={t("purchase")}   cancelButtonProps={{ style: { display: 'none'} }}>
                <p>{t("purchase_confirmation_body")} {useTitle}?</p>
                {t("quantity")}: <InputNumber min={1} max={10} defaultValue={1} onChange={onChange} style={{ marginTop: 10 }} />
            </Modal>
        </>
    );
};

export default ReceiverCard