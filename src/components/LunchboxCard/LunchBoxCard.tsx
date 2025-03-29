import { Card, Typography } from "antd";
import { useTranslation } from "react-i18next";

interface LunchBoxProps {
    post: Post;
}

const { Text } = Typography;

const LunchBoxCard: React.FC<LunchBoxProps> = ({ post }) => {
    const { t } = useTranslation();

    return (
        <Card
            title={post.title}
            style={{ textAlign: "left" }}
            type="inner"
            extra={`$${post.price.toFixed(2)}`}
            headStyle={{ backgroundColor: "rgba(56, 163, 165, 0.5)", }}
        >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text>{post.tag}</Text>
                <Text>{post.stock} {t("stock_left")}</Text>
            </div>
            <Text type="secondary">{post.description}</Text>
        </Card>
    );
};

export default LunchBoxCard;
