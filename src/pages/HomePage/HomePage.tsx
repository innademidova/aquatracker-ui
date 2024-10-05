import SharedLayout from "components/SharedLayout/SharedLayout";
import WelcomeSection from "components/WelcomeSection/WelcomeSection";
import AdvantagesSection from "components/AdvantagesSection/AdvantagesSection";

const HomePage = () => {
    return <SharedLayout>
        <SharedLayout.LeftSection>
            <WelcomeSection />
        </SharedLayout.LeftSection>
        <SharedLayout.RightSection>
            <AdvantagesSection />
        </SharedLayout.RightSection>
    </SharedLayout>
}

export default HomePage;