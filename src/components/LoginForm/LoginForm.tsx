import { Card, Form, Input, Button,Select } from "antd"
import { useTranslation } from "react-i18next"
import React, { useState } from "react"
import { useNavigate } from "react-router"
const LoginForm: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [selectedUserType, setSelectedUserType] = useState("Consumer");
    const navigation = useNavigate();

    return (
        <Card title={t("login")} style={{ width: 300, margin: "auto", marginTop: "50px" }}>
            <Form layout="vertical">
            <Form.Item label={t("user_type")}>
                    <Select
                        value={selectedUserType}
                        onChange={(value) => setSelectedUserType(value)} // Correctly updates the state
                        style={{ width: "100%" }}
                    >
                        <Select.Option value="consumer">Consumidor</Select.Option>
                        <Select.Option value="producer">Producer</Select.Option>
                        <Select.Option value="receiver">Receiver</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label={t("email")} name="email" rules={[{ required: true, type: "email", message: t("enter_email") }]}>
                    <Input placeholder={t("enter_email")} />
                </Form.Item>
                <Form.Item label={t("password")} name="password" rules={[{ required: true, message: t("enter_password") }]}>
                    <Input.Password placeholder={t("enter_password")} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        {t("login_button")}
                    </Button>
                </Form.Item>
            </Form>
            <Button onClick={() => i18n.changeLanguage(i18n.language === "en" ? "es" : "en")}>
                {t("change_language")}
            </Button>
            <a onClick={()=>navigation("/register")} style={{ marginTop: "10px", display: "block", textAlign: "center", color: "blue" }}>
                {t("register_link")}
            </a>
        </Card>
    )
}

export default LoginForm