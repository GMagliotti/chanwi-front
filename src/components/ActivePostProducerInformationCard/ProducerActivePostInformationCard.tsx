import styles from './ProducerActivePostInformationCard.module.css';
import { Card, Typography, List, Button, message } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { ActivePost } from '../../models/ActiveEvents';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { getOrders, createOrder, fulfillOrder } from '../../services/OrderService';

const { Title, Text } = Typography;

interface ProducerActivePostInformationCardProps {
  post: ActivePost;
}

const ProducerActivePostInformationCard: React.FC<ProducerActivePostInformationCardProps> = ({ post }) => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState<Order[]>([]);

  // Fetch orders for this post
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getOrders(post.id.toString());
        setOrders(fetchedOrders.filter(order => order.post_id === post.id));
      } catch (error) {
        console.error('Error fetching orders:', error);
        message.error(t('error_loading_orders'));
      }
    };

    fetchOrders();
  }, [post.id]);

  // Handle order fulfillment
  const handleFulfillOrder = async (orderId: number) => {
    try {
      await fulfillOrder(orderId);
      message.success(t('order_fulfilled_successfully'));

      // Update order list after fulfillment
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, received: true } : order
      ));
    } catch (error) {
      console.error('Error fulfilling order:', error);
      message.error(t('error_fulfilling_order'));
    }
  };

  return (
    <Card
      hoverable
      style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {/* Header Section */}
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
      </div>

      {/* Stock & Price */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '8px' }}>
        <div>
          <Text type="secondary">{t("stock")}:</Text>
          <Text strong> {post.stock}</Text>
        </div>
        <div>
          <Text type="secondary">{t("price")}:</Text>
          <Text strong> ${post.price}</Text>
        </div>
      </div>

      {/* Orders List */}
      <List
        size="small"
        dataSource={orders}
        style={{ width: '100%', marginTop: '12px' }}
        renderItem={(order) => (
          <List.Item
            actions={[
              <Button
                key={order.id}
                type="primary"
                onClick={() => handleFulfillOrder(order.id!)}
                disabled={!order.received}
              >
                {order.received ? t("fulfilled") : t("fulfill_order")}
              </Button>
            ]}
          >
            <Text>{t("order_id")}: {order.id} - {t("consumer")}: {order.consumer_id} - {t("quantity")}: {order.quantity}</Text>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default ProducerActivePostInformationCard;
