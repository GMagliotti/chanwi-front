import { Card, Form, Input, Button } from "antd"
import { useTranslation } from "react-i18next"

const LoginForm: React.FC = () => {
    const { t, i18n } = useTranslation();

    return (
        <Card title={t("login")} style={{ width: 300, margin: "auto", marginTop: "50px" }}>
            <Form layout="vertical">
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
                t("change_language")
            </Button>
        </Card>
    )
}

export default LoginForm