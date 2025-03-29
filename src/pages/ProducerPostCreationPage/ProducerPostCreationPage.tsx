import { useNavigate } from "react-router"
import PostCreationForm from "../../components/PostCreationForm/PostCreationForm"
import { GoBackButton } from "../../components/GoBackButton/GoBackButton";

const ProducerPostCreationPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <GoBackButton />
            <PostCreationForm
                onSubmit={() => { navigate('/me-producer') }}>
            </PostCreationForm>
        </>

    )
}

export default ProducerPostCreationPage