import { Layout, Menu, Button } from "antd"
import { useTranslation } from "react-i18next"

const { Header } = Layout

const ChanwiHeader: React.FC = () => {
    const { t, i18n } = useTranslation()

    return (
        <Header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 20px", background: "#001529" }}>
            <div style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>
                MyApp
            </div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]} style={{ flex: 1, minWidth: 200 }}>
                <Menu.Item key="1">{t("home")}</Menu.Item>
                <Menu.Item key="2">{t("about")}</Menu.Item>
                <Menu.Item key="3">{t("contact")}</Menu.Item>
            </Menu>
            <div style={{ display: "flex", gap: "10px" }}>
                <Button type="default" onClick={() => i18n.changeLanguage(i18n.language === "en" ? "es" : "en")}>
                    {t("change_language")}
                </Button>
                <Button type="primary">{t("login")}</Button>
            </div>
        </Header>
    )
}

export default ChanwiHeader