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
            title={producer.businessName}
            style={{ width: 300, textAlign: "left", marginTop: "30px" }}
            extra={producer.location}
        >
            <p style={{ margin: 0 }}>{producer.address}</p>

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