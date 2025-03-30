import { Card, Typography } from "antd";
import { ActiveDrive } from "../../models/ActiveEvents";

interface LunchBoxProps {
    drive: ActiveDrive;
}

const { Text } = Typography;

const LunchBoxCardDrive: React.FC<LunchBoxProps> = ({ drive }) => {
    return (
        <Card
            title={drive.title}
            style={{ textAlign: "left" }}
            type="inner"
            headStyle={{ backgroundColor: "rgba(56, 163, 165, 0.5)", }}
        >
            <Text type="secondary">{drive.description}</Text>
        </Card>
    );
};

export default LunchBoxCardDrive;
