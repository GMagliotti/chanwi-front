import { Layout } from "antd"
import ChanwiHeader from "../components/ChanwiHeader"
import LoginForm from "../components/LoginForm"

const { Content } = Layout

const LoginPage: React.FC = () => {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <ChanwiHeader />
            <Content style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "50px" }}>
                <LoginForm />
            </Content>
        </Layout>
    )
}

export default LoginPage