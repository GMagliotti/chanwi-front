import ProducerActivePostInformationCard from "../../components/ActivePostProducerInformationCard/ProducerActivePostInformationCard";

const ProducerPostsManagementPage: React.FC = () => {
    return (
        <ProducerActivePostInformationCard
            title="Active Post"
            timestamp="2023-10-01 12:00:00"
            valueOne={100}
            valueTwo={200}
            listItems={["Item 1", "Item 2", "Item 3"]}
            valueOneLabel="Value One"
            valueTwoLabel="Value Two"
            />
    );
}

export default ProducerPostsManagementPage