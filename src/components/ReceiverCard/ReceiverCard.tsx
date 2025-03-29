import { Card } from "antd"
import LunchBoxCard from "../LunchboxCard/LunchBoxCard";
import { useNavigate } from "react-router";

interface ProducerProps {
    producer: Producer;
    posts: Post[];
}

const ReceiverCard: React.FC<ProducerProps> = ({ producer, posts }) => {
    const navigate = useNavigate();

    return (
        <Card
            title={<div style={{ paddingBlock: '8px'}}>{producer.businessName}<p style={{ margin: 0 , fontWeight:'normal', fontSize: '14px'}}>{producer.address}</p> </div>}
            style={{ width: 300, textAlign: "left", marginTop: 0}}
            headStyle={{ backgroundColor: "rgba(34, 87, 122, 0.7)", }}
            // size="small"
        >
            {posts.map((post) => (
                <div 
                key={post.id} 
                onClick={() => navigate(`/posts/${post.id}`, { state: { post, producer } })} 
                style={{ cursor: "pointer" }}
                
            >
                <LunchBoxCard post={post} />
            </div>
            ))}
        </Card>
    );
};

export default ReceiverCard