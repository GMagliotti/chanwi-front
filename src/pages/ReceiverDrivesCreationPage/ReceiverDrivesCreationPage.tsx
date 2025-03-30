import { useNavigate, useParams } from "react-router"
import { GoBackButton } from "../../components/GoBackButton/GoBackButton";
import DriveCreationForm from "../../components/DriveCreationForm/DriveCreationForm";
import { useTranslation } from "react-i18next";
import { createDrive } from "../../services/DriveService";
import { ActiveDrive } from "../../models/ActiveEvents";

const ReceiverDrivesCreationPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const { id } = useParams();
    const receiverId: string = id;
    const receiverIdNumber: number = parseInt(receiverId || '', 10);

    const handleSubmit = async (values: any) => {
        console.log(values);
        console.log(receiverId)

        const activeDrive: ActiveDrive = {
            receiver_id: receiverIdNumber,
            title: values.name,
            desc: values.description,
            start_time: values.dateTimeRange[0],
            end_time: values.dateTimeRange[1],
        }

        try {
            await createDrive(receiverId, activeDrive);
            navigate('/me-receiver/' + receiverId);
        } catch (error) {
            console.error('Error creating drive:', error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: '32px', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingBottom: '12px' }}>
                <GoBackButton />
                <p style={{ position: 'fixed', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', margin: 0, fontSize: '20px' }}>{t("receiver_header")}</p>
                <div />
            </div>
            <DriveCreationForm
                onSubmit={handleSubmit}>
            </DriveCreationForm>
        </div>

    )
}

export default ReceiverDrivesCreationPage