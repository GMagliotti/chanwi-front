import { Avatar } from "antd"
import { useTranslation } from "react-i18next"

const AppHeader: React.FC = () => {
    const { t } = useTranslation()

    return (
        <div style={{ display: 'flex', alignItems: 'center', marginBlock: '20px', zIndex: 100 }}>
            <Avatar src={'./chanwi.svg'} />
            <span style={{ marginLeft: '10px', fontSize:'32px'}}>{t("chanwi")}</span>
        </div>
    )
}

export default AppHeader