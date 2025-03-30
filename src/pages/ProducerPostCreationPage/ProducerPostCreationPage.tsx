import { useNavigate } from "react-router"
import PostCreationForm from "../../components/PostCreationForm/PostCreationForm"
import { GoBackButton } from "../../components/GoBackButton/GoBackButton";
import { useTranslation } from "react-i18next";
import { createPost } from "../../services/PostService";

const ProducerPostCreationPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const producerId: string = localStorage.getItem('producerId');
    const producerIdNumber: number = parseInt(producerId || '', 10);

    const handleSubmit = async (values: any) => {
        console.log(values);
        console.log(producerId)
        
        const post: Post = {
            producer_id: producerIdNumber,
            title: values.name,
            description: values.description,
            price: values.price,
            tag: values.tags.join(', '),
            stock: values.stock,
            start_time: values.dateTimeRange[0],
            end_time: values.dateTimeRange[1],
        }

        try {
            await createPost(producerId, post);
            navigate('/me-producer');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: '32px', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingBottom: '12px' }}>
                <GoBackButton />
                <p style={{ position: 'fixed', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', margin: 0, fontSize: '20px' }}>{t("food_provider")}</p>
                <div />
            </div>
            <PostCreationForm
                onSubmit={handleSubmit}>
            </PostCreationForm>
        </div>

    )
}

export default ProducerPostCreationPage