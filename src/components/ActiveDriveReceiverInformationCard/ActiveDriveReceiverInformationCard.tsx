import styles from '../ActivePostProducerInformationCard/ProducerActivePostInformationCard.module.css';
import { Card, Typography } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { ActiveDrive } from '../../models/ActiveEvents';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

interface ActiveDriveReceiverInformationCardProps {
    posts: ActiveDrive[]
}

const ActiveDriveReceiverInformationCard: React.FC<ActiveDriveReceiverInformationCardProps> = ({
    posts
}) => {

    return (
        <>
            {posts.map((post) => (
                <Card
                    hoverable
                    style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '6px' }}
                >
                    {/* Header section with title, timestamp, and values in first row */}
                    <div style={{ marginBottom: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '240px' }}>
                        <Title level={4} className={styles.cardTitle}>{post.title}</Title>
                        <Text type="secondary">
                            <ClockCircleOutlined style={{ marginRight: 5 }} />
                            {dayjs(post.start_time).format("MMMM D, YYYY [at] h:mm A")}
                        </Text>

                        <Text type="secondary">
                            <ClockCircleOutlined style={{ marginRight: 5 }} />
                            {dayjs(post.end_time).format("MMMM D, YYYY [at] h:mm A")}
                        </Text>
                        <Text style={{ textAlign: 'center', paddingTop: '6px' }}>{post.description}</Text>
                    </div>
                </Card>
            ))}
        </>
    );
};

export default ActiveDriveReceiverInformationCard;