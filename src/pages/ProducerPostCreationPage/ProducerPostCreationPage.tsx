import { useNavigate } from "react-router"
import PostCreationForm from "../../components/PostCreationForm/PostCreationForm"
import { GoBackButton } from "../../components/GoBackButton/GoBackButton";
import { useTranslation } from "react-i18next";

const ProducerPostCreationPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: '32px', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingBottom: '12px' }}>
                <GoBackButton />
                <p style={{ position: 'fixed', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', margin: 0, fontSize: '20px' }}>{t("food_provider")}</p>
                <div />
            </div>
            <PostCreationForm
                onSubmit={() => { navigate('/me-producer') }}>
            </PostCreationForm>
        </div>

    )
}

export default ProducerPostCreationPage