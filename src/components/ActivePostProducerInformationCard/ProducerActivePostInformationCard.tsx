import styles from './ProducerActivePostInformationCard.module.css';
import { Card, Typography, Space, List } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface ProducerActivePostInformationCardProps {
  title: string;
  timestamp: string;
  valueOne: string | number;
  valueTwo: string | number;
  listItems?: string[];
  valueOneLabel?: string;
  valueTwoLabel?: string;
}

const ProducerActivePostInformationCard: React.FC<ProducerActivePostInformationCardProps> = ({
  title,
  timestamp,
  valueOne,
  valueTwo,
  listItems = [],
  valueOneLabel = "Value One",
  valueTwoLabel = "Value Two"
}) => {
  return (
    <div className={styles.cardContainer}>
      <Card
        hoverable
        className={styles.card}
      >
        {/* Header section with title, timestamp, and values in first row */}
        <div style={{ marginBottom: '8px' }}>
          <div className={styles.cardHeader}>
            <div>
              <Title level={4} className = {styles.cardTitle}>{title}</Title>
              <Text type="secondary" className={styles.cardTimestamp}>
                <ClockCircleOutlined className={styles.cardTimestampIcon}/>
                {timestamp}
              </Text>
            </div>

            <Space size="large">
              <div>
                <Text type="secondary">{valueOneLabel}</Text>
                <div>
                  <Text strong>{valueOne}</Text>
                </div>
              </div>

              <div>
                <Text type="secondary">{valueTwoLabel}</Text>
                <div>
                  <Text strong>{valueTwo}</Text>
                </div>
              </div>
            </Space>
          </div>
        </div>

        {/* Tags section */}
        {/* List section */}
        <List
          size="small"
          dataSource={listItems}
          renderItem={(item) => (
            <List.Item>
              <Text>{item}</Text>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default ProducerActivePostInformationCard;