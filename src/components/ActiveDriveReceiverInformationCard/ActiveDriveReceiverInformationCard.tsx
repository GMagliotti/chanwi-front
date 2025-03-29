import styles from '../ActivePostProducerInformationCard/ProducerActivePostInformationCard.module.css';
import { Card, Typography } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { ActiveDrive } from '../../models/ActiveEvents';

const { Title, Text } = Typography;

interface ActiveDriveReceiverInformationCardProps {
    posts: ActiveDrive[]
}

const ActiveDriveReceiverInformationCard: React.FC<ActiveDriveReceiverInformationCardProps> = ({
    posts
}) => {
    const { t } = useTranslation();

    return (
        <div className={styles.cardContainer}>
            {posts.map((post) => (
                <Card
                    key={post.start.toISOString()} // Using `start` as a unique identifier for the key
                    hoverable
                >
                    {/* Header section with title, timestamp, and values in first row */}
                    <Title level={4} className={styles.cardTitle}>{post.title}</Title>
                    <Text  className={styles.cardTimestamp}>
                        <ClockCircleOutlined className={styles.cardTimestampIcon} />
                        {t("from")} <Text type="secondary">{post.start.toLocaleString()}</Text>
                    </Text>                
                    <Text className={styles.cardTimestamp} style={{ paddingBottom: '8px'}}>
                        <ClockCircleOutlined className={styles.cardTimestampIcon}  />
                        {t("to")} <Text type="secondary">{post.start.toLocaleString()}</Text>
                    </Text>
                    <Text>{post.description}</Text>
                </Card>
            ))}
        </div>
    );
};

export default ActiveDriveReceiverInformationCard;