import { Card } from "antd"
import { useEffect, useState } from "react";
import { getDrives } from "../../services/DriveService";
import { ActiveDrive } from "../../models/ActiveEvents";
import LunchBoxCardDrive from "../LunchboxCard/LunchBoxCardDrive";

interface ProducerProps {
    receiver: Receiver;
}

const ReceiverCard: React.FC<ProducerProps> = ({ receiver }) => {
    const [drives, setDrives] = useState<ActiveDrive[]>();

    useEffect(() => {
        const fetchPosts = async () => {
            const fetchedPosts = await getDrives(receiver.id.toString());
            setDrives(fetchedPosts);
        };
        fetchPosts();
    }, [receiver]);

    return (
        <>
            <Card
                title={<div style={{ paddingBlock: '8px' }}>{receiver.organization_name}<p style={{ margin: 0, fontWeight: 'normal', fontSize: '14px' }}>{receiver.address}</p> </div>}
                style={{ width: 300, textAlign: "left", marginTop: 0, zIndex: 5 }}
                headStyle={{ backgroundColor: "rgba(34, 87, 122, 0.7)", }}
            // size="small"
            >
                {drives?.map((drive) => (
                    <div
                        key={drive.id}
                        style={{ cursor: "pointer" }}
                    >
                        <LunchBoxCardDrive drive={drive} />
                    </div>
                ))}
            </Card>
        </>
    );
};

export default ReceiverCard