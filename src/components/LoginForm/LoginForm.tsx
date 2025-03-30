import { Card, Form, Input, Button, Select, message } from "antd"
import { useTranslation } from "react-i18next"
import React, { useState } from "react"
import { useNavigate } from "react-router"
import { postLogin } from "../../services/LoginService"

const LoginForm: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [selectedUserType, setSelectedUserType] = useState("consumer");
    const [loading, setLoading] = useState(false);
    const navigation = useNavigate();
    localStorage.clear();
    const [messageApi, contextHolder] = message.useMessage();

    const showErrorMessage = () => {
        messageApi.open({
          type: 'error',
          content: t("invalid_credentials"),
        });
      };

    const onFinish = async (values: any) => { 
        setLoading(true);
    
        try {
            const login: Login = {
                password: values.password,
                role: selectedUserType,
                email: values.email
            };
    
            const loginResponse: Login = await postLogin(login);
            console.log(login, loginResponse)
            localStorage.setItem("name", values.email);

            if (selectedUserType === "consumer") navigation('/producers');
            if (selectedUserType === "producer") navigation('/me-producer');
            if (selectedUserType === "receiver") navigation('/me-receiver');
        } catch (error) {
            console.error("Login failed", error);
            showErrorMessage()
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title={t("login")} style={{ width: 300, margin: "auto" }}>
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item label={t("user_type")} style={{ marginBottom: '8px' }}>
                    <Select
                        value={selectedUserType}
                        onChange={(value) => setSelectedUserType(value)}
                        style={{ width: "100%" }}
                    >
                        <Select.Option value="consumer">{t("consumer")}</Select.Option>
                        <Select.Option value="producer">{t("producer")}</Select.Option>
                        <Select.Option value="receiver">{t("receiver")}</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label={t("email")} name="email" rules={[{ required: true, type: "email", message: t("enter_email") }]} style={{ marginBottom: '8px' }}>
                    <Input placeholder={t("enter_email")} />
                </Form.Item>
                <Form.Item label={t("password")} name="password" rules={[{ required: true, message: t("enter_password") }]}>
                    <Input.Password placeholder={t("enter_password")} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                        {t("login_button")}
                    </Button>
                </Form.Item>
            </Form>
            <div style={{ textAlign: "center", marginTop: "10px", marginBottom: '8px' }}>
                <Button onClick={() => i18n.changeLanguage(i18n.language === "en" ? "es" : "en")}>
                    {t("change_language")}
                </Button>
            </div>
            <a onClick={() => navigation("/register")} style={{ marginTop: "20px", display: "block", textAlign: "center", color: "blue" }}>
                {t("register_link")}
            </a>
            {contextHolder}

        </Card>
    )
}

export default LoginForm;
