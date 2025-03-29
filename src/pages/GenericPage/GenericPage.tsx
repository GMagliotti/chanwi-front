import LoginForm from "../../components/LoginForm/LoginForm"
import { useTranslation } from "react-i18next";
import AppHeader from "../../components/AppHeader/AppHeader";

interface GenericPageProps {
    FormComponent: React.FC;
}

const GenericPage: React.FC<GenericPageProps> = ({ FormComponent }) => {
    const { t } = useTranslation();

    return (
        <div>
            <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <AppHeader />
                <FormComponent />

            </div>
        </div>
    )
}

export default GenericPage