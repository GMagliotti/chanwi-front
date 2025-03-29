import { Consumer } from "react";
import React, { useState } from "react";

interface OrderProps {
    order: Order;
}

const ReceiptCard: React.FC<OrderProps> = ({ order }) => {

    return (
        <div className="receipt-card">
            <h2>Receipt</h2>
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Producer Name:</strong> {order.producer.businessName}</p>
            <p><strong>Consumer Name:</strong> {order.consumer.firstName}</p>
            <p><strong>Quantity:</strong> {order.quantity}</p>
            <p><strong>Received:</strong> {order.received ? "Yes" : "No"}</p>
        </div>)

}

export default ReceiptCard;