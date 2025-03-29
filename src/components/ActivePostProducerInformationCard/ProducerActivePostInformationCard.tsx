import styles from './ProducerActivePostInformationCard.module.css';
import { Card, Typography, Space, List } from 'antd';
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
    <>
      <Card
        hoverable
      >
        {/* Header section with title, timestamp, and values in first row */}
        <div style={{ marginBottom: '8px' }}>
          <div className={styles.cardHeader}>
            <div>
              <Title level={4} className = {styles.cardTitle}>{post.title}</Title>
              <Text type="secondary" className={styles.cardTimestamp}>
                <ClockCircleOutlined className={styles.cardTimestampIcon}/>
                {post.start.getDate()}
              </Text>
            </div>

            <Space size="large">
              <div>
                <Text type="secondary">{t("stock")}</Text>
                <div>
                  <Text strong>{post.stock}</Text>
                </div>
              </div>

              <div>
                <Text type="secondary">{t("price")}</Text>
                <div>
                  <Text strong>{post.price}</Text>
                </div>
              </div>
            </Space>
          </div>
        </div>

        {/* Tags section */}
        {/* List section */}
        <List
          size="small"
          dataSource={['sus 1', 'sus 2', 'sus 3']}
          renderItem={(item) => (
            <List.Item>
              <Text>{item}</Text>
            </List.Item>
          )}
        />
      </Card>
    </>
  );
};

export default ProducerActivePostInformationCard;