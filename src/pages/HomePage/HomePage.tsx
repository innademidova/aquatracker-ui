import SharedLayout from "components/SharedLayout/SharedLayout";
import WelcomeSection from "components/WelcomeSection/WelcomeSection";
import AdvantagesSection from "components/AdvantagesSection/AdvantagesSection";

const HomePage = () => {
    return <SharedLayout leftSection={<WelcomeSection />}
        rightSection={<AdvantagesSection />} />
}

export default HomePage;