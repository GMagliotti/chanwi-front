import { useLocation } from "react-router";
import { Card, Typography, Divider } from "antd";
import React, { useEffect, useState } from "react";
import { getProducer } from "../../services/ProducerService";

const { Title, Text } = Typography;

const ReceiptCard: React.FC = () => {
    const location = useLocation();
    const { order, usePost } = location.state || {}; // Ensure safe access

    // const name = localStorage.getItem("name");
    const [producer, setProducer] = useState<Producer | null>(null);

    useEffect(() => {
        const fetchProducer = async () => {
            if (!usePost) return; 
            const fetchedProducer = await getProducer(usePost.producer_id);
            setProducer(fetchedProducer);
        };
        fetchProducer();
    }, [usePost]); 

    if (!order) {
        return <Text type="danger">Error: No order details found.</Text>;
    }

    return (
        <div style={{
            display: 'flex', flexDirection: 'column', paddingInline: '32px', paddingTop: '42px', alignItems: 'center', height: '100vh', // Full viewport height
            width: '100vw'
        }}>

            <Card
                bordered={false}
                style={{
                    maxWidth: 400,
                    margin: "auto",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                    padding: "20px",
                    textAlign: "left"
                }}
            >
                <Title level={4} style={{ textAlign: "center" }}>Thank You for Your Order!</Title>
                <Divider />

                <Text><strong>Order ID:</strong> {Math.floor(Math.random() * 10000) + 1}</Text>
                <br />
                <Text><strong>Product:</strong> {usePost.title}</Text>
                <br />
                <Text><strong>Quantity:</strong> {order.quantity}</Text>
                <br />                
                <Text><strong>Producer Name:</strong> {producer?.business_name}</Text>
                <br />
                <Text><strong>Location:</strong> {producer?.address}</Text>
                <br />
                <Text><strong>Received:</strong> {order.received ? "✅ Yes" : "❌ No"}</Text>

                <Divider />

                <Text type="secondary" style={{ fontSize: "12px" }}>
                    If you have any questions, please contact the producer directly.
                </Text>
            </Card>
        </div>
    );
};

export default ReceiptCard;
