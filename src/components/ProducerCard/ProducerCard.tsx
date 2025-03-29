import { Card } from "antd"
import { useTranslation } from "react-i18next"
import LunchBoxCard from "../LunchboxCard/LunchBoxCard";

interface ProducerProps {
    producer: Producer;
    posts: Post[];
}

const ProducerCard: React.FC<ProducerProps> = ({ producer, posts }) => {
    // const { t } = useTranslation();

    return (
        <Card
            title={producer.businessName}
            style={{ width: 300, textAlign: "left", marginTop: "50px" }}
            extra={producer.location}
        >
            <p style={{ margin: 0 }}>{producer.address}</p>

            {posts.map((post) => (
                <LunchBoxCard key={post.id} post={post} />
            ))}
        </Card>
    );
};

export default ProducerCard