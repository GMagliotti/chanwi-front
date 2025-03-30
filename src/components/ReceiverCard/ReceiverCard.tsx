import { Card, InputNumber, InputNumberProps, Modal } from "antd"
import LunchBoxCard from "../LunchboxCard/LunchBoxCard";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getPosts } from "../../services/PostService";
import { createOrder } from "../../services/OrderService";

interface ProducerProps {
    producer: Producer;
}

const ReceiverCard: React.FC<ProducerProps> = ({ producer }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [usePost, setPost] = useState<Post>();

    const [useCount, setCount] = useState<any>(1);

    const [posts, setPosts] = useState<Post[]>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const consumerId: string = localStorage.getItem('consumerId');
    const consumerIdNumber: number = parseInt(consumerId || '', 10);

    const showModal = (post: Post) => {
        setIsModalOpen(true);
        setPost(post)
    };

    useEffect(() => {
        const fetchPosts = async () => {
            const fetchedPosts = await getPosts(producer.id.toString());
            setPosts(fetchedPosts);
        };
        fetchPosts();
    }, [producer]);

    const handleOk = () => {
        const order: Order = {
            post_id: usePost.id,
            consumer_id: consumerIdNumber,
            quantity: useCount,
            received: false
        }
        // TODO
        createOrder(order)        
        navigate(`/orders/${1}`, { state: { order, usePost } })
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
                {posts?.map((post) => (
                    <div
                        key={post.id}
                        // onClick={() => navigate(`/posts/${post.id}`, { state: { post, producer } })}
                        onClick={() => showModal(post)}
                        style={{ cursor: "pointer" }}

                    >
                        <LunchBoxCard post={post} />
                    </div>
                ))}
            </Card>
            <Modal title={t("purchase_confirmation")} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText={t("purchase")} cancelButtonProps={{ style: { display: 'none' } }}>
                <p>{t("purchase_confirmation_body")} {usePost?.title}?</p>
                {t("quantity")}: <InputNumber min={1} max={10} defaultValue={1} onChange={onChange} style={{ marginTop: 10 }} />
            </Modal>
        </>
    );
};

export default ReceiverCard