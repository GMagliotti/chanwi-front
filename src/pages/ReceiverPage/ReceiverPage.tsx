import MapBox from "../../components/MapBox/MapBox"
import ReceiverCard from "../../components/ReceiverCard/ReceiverCard"
import { dummyPosts, dummyProducers } from "../../dummies"


const ReceiverPage: React.FC = () => {
    return (
        <MapBox />
        // <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        //     <ReceiverCard producer={dummyProducers[0]} posts={dummyPosts} />
        // </div>
    )
}

export default ReceiverPage