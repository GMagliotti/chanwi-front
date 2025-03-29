import { useNavigate } from "react-router"
import { GoBackButton } from "../../components/GoBackButton/GoBackButton";
import DriveCreationForm from "../../components/DriveCreationForm/DriveCreationForm";

const ReceiverDrivesCreationPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <GoBackButton />
            <DriveCreationForm
                onSubmit={() => { navigate('/me-receiver') }}>
            </DriveCreationForm>
        </>

    )
}

export default ReceiverDrivesCreationPage