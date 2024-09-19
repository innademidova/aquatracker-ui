
import WaterDetailedInfo from "components/AquaTrack/WaterDetailedInfo/WaterDetailedInfo";
import WaterMainInfo from "components/AquaTrack/WaterMainInfo/WaterMainInfo";
import SharedLayout from "components/SharedLayout/SharedLayout";

const TrackerPage = () => {
    return <SharedLayout leftSection={<WaterMainInfo />} rightSection={<WaterDetailedInfo />} />
}

export default TrackerPage;