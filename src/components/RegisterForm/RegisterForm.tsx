import { Card, Form, Input, Button, Select, message } from "antd"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"
import { createProducer } from "../../services/ProducerService"
import { createConsumer } from "../../services/ConsumerService"
import { MapboxGeocoder } from "../../utils"
import { createReceiver } from "../../services/ReceiverService"

const RegisterForm: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [selectedUserType, setSelectedUserType] = useState("consumer");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState("");
    const [address, setAddress] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bussiness, setBussiness] = useState("");
    const [description, setDescription] = useState("");
    const [organizationName, setOrganizationName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigation = useNavigate();
    const geocoder = new MapboxGeocoder();

    const onFinish = async (values: any) => {
        try {
            setIsSubmitting(true);
            if (selectedUserType === "consumer") {
                const consumer: Consumer = {
                    email: values.email,
                    name: values.firstName,
                    surname: values.lastName,
                    password: values.password
                }
                try {
                    const createdConsumer: Consumer = await createConsumer(consumer);
                    localStorage.setItem("consumerId", createdConsumer.id.toString());
                    localStorage.setItem("name", values.name + ' ' + values.surname);
                    navigation('/producers');
                } catch (error) {
                    console.error("Error creating consumer:", error);
                }
            }
            else if (selectedUserType === "producer") {
                // Get coordinates from the address using Mapbox
                let longitude = 0;
                let latitude = 0;
                try {
                    // Let the user know we're geocoding their address
                    message.loading({ content: t("geocoding_address"), key: "geocoding" });
                    // Get coordinates from Mapbox
                    const coordinates = await geocoder.getCoordinates(values.address);
                    longitude = coordinates[0];
                    latitude = coordinates[1];
                    message.success({ content: t("address_geocoded_successfully"), key: "geocoding" });
                } catch (error) {
                    console.error("Error geocoding address:", error);
                    message.error({
                        content: t("geocoding_failed_using_default"),
                        key: "geocoding"
                    });
                    // Continue with default coordinates (0,0)
                }
                const producer: Producer = {
                    email: values.email,
                    business_name: values.bussiness,
                    password: values.password,
                    address: values.address,
                    description: values.description,
                    longitude: longitude,
                    latitude: latitude,
                    rating: 0
                }
                const createdProducer = await createProducer(producer);
                localStorage.setItem("producerId", createdProducer.id.toString());
                navigation('/me-producer/' + createdProducer.id)
            }
            else if (selectedUserType === "receiver") {
                // Get coordinates from the address using Mapbox
                let longitude = 0;
                let latitude = 0;
                try {
                    // Let the user know we're geocoding their address
                    message.loading({ content: t("geocoding_address"), key: "geocoding" });
                    // Get coordinates from Mapbox
                    const coordinates = await geocoder.getCoordinates(values.address);
                    longitude = coordinates[0];
                    latitude = coordinates[1];
                    message.success({ content: t("address_geocoded_successfully"), key: "geocoding" });

                    const receiver: Receiver = {
                        email: values.email,
                        organization_name: values.organizationName,
                        password: values.password,
                        address: values.address,
                        longitude: longitude,
                        latitude: latitude,
                    }
                    const createdReceiver = await createReceiver(receiver);
                    localStorage.setItem("receiverId", createdReceiver.id.toString());
                    navigation('/me-receiver/' + createdReceiver.id)
                } catch (error) {
                    console.error("Error geocoding address:", error);
                    message.error({
                        content: t("geocoding_failed_using_default"),
                        key: "geocoding"
                    });
                    // Continue with default coordinates (0,0)
                }
            }
        } catch (error) {
            console.error("Error during registration:", error);
            message.error(t("registration_error"));
        } finally {
            setIsSubmitting(false);
        }
    };

    const conditionalFields = () => {
        switch (selectedUserType) {
            case "producer":
                return (
                    <>
                        <Form.Item label={t("bussiness")} name="bussiness" rules={[{ required: true, message: t("enter_bussiness") }]} style={{ marginBottom: '8px' }}>
                            <Input
                                value={bussiness}
                                onChange={(e) => setBussiness(e.target.value)}
                                placeholder={t("enter_bussiness")}
                            />
                        </Form.Item>
                        <Form.Item label={t("description")} name="description" rules={[{ required: true, message: t("enter_description") }]} style={{ marginBottom: '8px' }}>
                            <Input
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder={t("enter_description")}
                            />
                        </Form.Item>
                        <Form.Item label={t("address")} name="address" rules={[{ required: true, message: t("enter_address") }]} >
                            <Input
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder={t("enter_address")}
                            />
                        </Form.Item>
                    </>
                );
            case "receiver":
                return (
                    <>
                        <Form.Item label={t("organization")} name="organizationName" rules={[{ required: true, message: t("enter_organization_name") }]} style={{ marginBottom: '8px' }}>
                            <Input
                                value={organizationName}
                                onChange={(e) => setOrganizationName(e.target.value)}
                                placeholder={t("enter_organization_name")}
                            />
                        </Form.Item>
                        <Form.Item label={t("address")} name="address" rules={[{ required: true, message: t("enter_address") }]} >
                            <Input
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder={t("enter_address")}
                            />
                        </Form.Item>
                    </>
                );
            default:
                return (
                    <>
                        <Form.Item label={t("first_name")} name="firstName" rules={[{ required: true, message: t("enter_first_name") }]} style={{ marginBottom: '8px' }}>
                            <Input
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder={t("enter_first_name")}
                            />
                        </Form.Item>
                        <Form.Item label={t("last_name")} name="lastName" rules={[{ required: true, message: t("enter_last_name") }]} >
                            <Input
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder={t("enter_last_name")}
                            />
                        </Form.Item>
                    </>
                );

        }
    }

    return (
        <Card title={t("register")} style={{ width: 300, margin: "auto" }}>
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item label={t("user_type")} style={{ marginBottom: '8px' }}>
                    <Select
                        value={selectedUserType}
                        onChange={(value) => setSelectedUserType(value)} // Correctly updates the state
                        style={{ width: "100%" }}
                    >
                        <Select.Option value="consumer">{t("consumer")}</Select.Option>
                        <Select.Option value="producer">{t("producer")}</Select.Option>
                        <Select.Option value="receiver">{t("receiver")}</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label={t("email")} name="email" rules={[{ required: true, type: "email", message: t("enter_email") }]} style={{ marginBottom: '8px' }}>
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Extracts value from the event object
                        placeholder={t("enter_email")}
                    />
                </Form.Item>
                <Form.Item label={t("password")} name="password" rules={[{ required: true, message: t("enter_password") }]} style={{ marginBottom: '8px' }}>
                    <Input.Password
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Extracts value from the event object
                        placeholder={t("enter_password")}
                    />
                </Form.Item>
                {/* <Form.Item label={t("confirm_password")} name="confirmPassword" rules={[{ required: true, message: t("confirm_password") }]} style={{ marginBottom: '8px' }}>
                    <Input.Password
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} // Extracts value from the event object
                        placeholder={t("enter_confirm_password")}
                    />
                </Form.Item> */}
                {conditionalFields()}
                <Form.Item style={{ marginBottom: '8px' }}>
                    <Button type="primary" htmlType="submit" block loading={isSubmitting}>
                        {t("register")}
                    </Button>
                </Form.Item>
            </Form>
            <div style={{ textAlign: "center", marginTop: "10px", marginBottom: '8px' }} >
                <Button onClick={() => i18n.changeLanguage(i18n.language === "en" ? "es" : "en")}>
                    {t("change_language")}
                </Button>
            </div>
            <a onClick={() => navigation("/")} style={{ marginTop: "20px", display: "block", textAlign: "center", color: "blue" }}>
                {t("login_link")}
            </a>
        </Card>
    )
}

export default RegisterForm