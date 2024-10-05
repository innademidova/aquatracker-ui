
import WaterDetailedInfo from "components/AquaTrack/WaterDetailedInfo/WaterDetailedInfo";
import WaterMainInfo from "components/AquaTrack/WaterMainInfo/WaterMainInfo";
import SharedLayout from "components/SharedLayout/SharedLayout";

const TrackerPage = () => {
    return <SharedLayout>
        <SharedLayout.LeftSection background="green">
            <WaterMainInfo />
        </SharedLayout.LeftSection>
        <SharedLayout.RightSection>
            <WaterDetailedInfo />
        </SharedLayout.RightSection>
    </SharedLayout>
}

export default TrackerPage;