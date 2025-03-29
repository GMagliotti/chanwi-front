import { Card, Form, Input, Button, Select } from "antd"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"

const RegisterForm: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [selectedUserType, setSelectedUserType] = useState("Consumer");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [address, setAddress] = useState("");
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [bussiness,setBussiness]=useState("");
    const [organizationName,setOrganizationName]=useState("");

    const conditionalFields = () => {
        switch (selectedUserType) {
            case "Consumer":
                return (
                    <>
                        <Form.Item label={t("first_name")} name="firstName" rules={[{ required: true, message: t("enter_first_name") }]}>
                            <Input
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder={t("enter_first_name")}
                            />
                        </Form.Item>
                        <Form.Item label={t("last_name")} name="lastName" rules={[{ required: true, message: t("enter_last_name") }]}>
                            <Input
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder={t("enter_last_name")}
                            />
                        </Form.Item>
                    </>
                );
            case "Producer":
                return (
                    <>
                        <Form.Item label={t("bussiness")} name="bussiness" rules={[{ required: true, message: t("enter_bussiness") }]}>
                            <Input
                                value={bussiness}
                                onChange={(e) => setBussiness(e.target.value)}
                                placeholder={t("enter_bussiness")}
                            />
                        </Form.Item>
                        <Form.Item label={t("address")} name="address" rules={[{ required: true, message: t("enter_address") }]}>
                            <Input
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder={t("enter_address")}
                            />
                        </Form.Item>
                    </>
                );
            case "Receiver":
                return (
                    <>
                        <Form.Item label={t("organization")} name="organizationName" rules={[{ required: true, message: t("enter_organization_name") }]}>
                            <Input
                                value={organizationName}
                                onChange={(e) => setOrganizationName(e.target.value)}
                                placeholder={t("enter_organization_name")}
                            />
                        </Form.Item>
                        <Form.Item label={t("address")} name="address" rules={[{ required: true, message: t("enter_address") }]}>
                            <Input
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder={t("enter_address")}
                            />
                        </Form.Item>
                    </>
                );
            default:
                return null;
        }
    }
    return (
        <Card title="Register" style={{ width: 300, margin: "auto", marginTop: "50px" }}>
            <Form layout="vertical">
                <Form.Item label={t("user_type")}>
                    <Select
                        value={selectedUserType}
                        onChange={(value) => setSelectedUserType(value)} // Correctly updates the state
                        style={{ width: "100%" }}
                    >
                        <Select.Option value="Consumer">Consumidor</Select.Option>
                        <Select.Option value="Producer">Producer</Select.Option>
                        <Select.Option value="Receiver">Receiver</Select.Option>
                    </Select>
                </Form.Item>
                
                <Form.Item label={t("email")} name="email" rules={[{ required: true, type: "email", message: t("enter_email") }]}>
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Extracts value from the event object
                        placeholder={t("enter_email")}
                    />
                </Form.Item>
                <Form.Item label={t("password")} name="password" rules={[{ required: true, message: t("enter_password") }]}>
                    <Input.Password
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Extracts value from the event object
                        placeholder={t("enter_password")}
                    />
                </Form.Item>
                <Form.Item label={t("confirm_password")} name="confirmPassword" rules={[{ required: true, message: t("confirm_password") }]}>
                    <Input.Password
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} // Extracts value from the event object
                        placeholder={t("confirm_password")}
                    />
                </Form.Item>
                {conditionalFields()}
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Register
                    </Button>
                </Form.Item>
            </Form>
            <Button onClick={() => i18n.changeLanguage(i18n.language === "en" ? "es" : "en")}>
                🌍 Switch Language
            </Button>
            <a href="/" style={{ marginTop: "10px", display: "block", textAlign: "center", color: "blue" }}>
                Already have an account? Login
            </a>
        </Card>
    )
}

export default RegisterForm