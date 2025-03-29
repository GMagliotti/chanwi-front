import LoginForm from "../../components/LoginForm/LoginForm"
import { useTranslation } from "react-i18next";
import AppHeader from "../../components/AppHeader/AppHeader";

interface GenericPageProps {
    FormComponent: React.FC;
}

const GenericPage: React.FC<GenericPageProps> = ({ FormComponent }) => {
    const { t } = useTranslation();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', paddingInline: '32px', paddingTop:'42px' , alignItems:'center' }}>
            <AppHeader />
            <FormComponent />
        </div>
    )
}

export default GenericPage