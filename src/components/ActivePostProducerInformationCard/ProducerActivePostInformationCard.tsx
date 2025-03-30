import styles from './ProducerActivePostInformationCard.module.css';
import { Card, Typography, List } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { ActivePost } from '../../models/ActiveEvents';

const { Title, Text } = Typography;

interface ProducerActivePostInformationCardProps {
  post: ActivePost
}

const ProducerActivePostInformationCard: React.FC<ProducerActivePostInformationCardProps> = ({
  post
}) => {
  const { t } = useTranslation();

  return (
    <Card
      hoverable
      style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {/* Header section with title, timestamp, and values in first row */}
      <div style={{ marginBottom: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '240px' }}>
        <Title level={4} className={styles.cardTitle}>{post.title}</Title>
        <Text type="secondary" >
          <ClockCircleOutlined />
          {post.start_time.toLocaleString()}
        </Text>
        <Text type="secondary" >
          <ClockCircleOutlined />
          {post.end_time.toLocaleString()}
        </Text>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Text type="secondary">{t("stock")}:</Text>
          <Text strong> {post.stock}</Text>
        </div>
        <div>
          <Text type="secondary">{t("price")}:</Text>
          <Text strong> ${post.price}</Text>
        </div>
      </div>

      {/* Tags section */}
      {/* List section */}
      <List
        size="small"
        dataSource={['sus 1', 'sus 2', 'sus 3']}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        renderItem={(item) => (
          <List.Item>
            <Text>{item}</Text>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default ProducerActivePostInformationCard;