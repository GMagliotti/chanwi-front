import { useNavigate } from "react-router";
import ProducerActivePostInformationCard from "../../components/ActivePostProducerInformationCard/ProducerActivePostInformationCard";
import {
    PlusOutlined
} from '@ant-design/icons';
import { useTranslation } from "react-i18next";
import { GoBackButton } from "../../components/GoBackButton/GoBackButton";
import { Button } from "antd";
import { getPosts } from "../../services/PostService";
import { useEffect, useState } from "react";

const ProducerPostsManagementPage: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const producerId: string = localStorage.getItem('producerId');
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
      const fetchPosts = async () => {
        const fetchedPosts = await getPosts(producerId);
        setPosts(fetchedPosts);
      };
    
      fetchPosts();
    }, [producerId]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: '32px', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingBottom: '12px' }}>
                <GoBackButton />
                <p style={{ position: 'fixed', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', margin: 0, fontSize: '20px' }}>{t("producer")}</p>
                <div />
            </div>
            {posts.map((post) => (
                <ProducerActivePostInformationCard key={post.id} post={post} />
            ))}
            <Button block icon={<PlusOutlined />} style={{ fontSize: '26px', marginTop: '12px' }} onClick={() => navigate(`/me-producer/create`)} >{posts?.length == 0 && t("create_post")}</Button>
        </div>
    );
}

export default ProducerPostsManagementPage