import AdvantagesSection from "components/AdvantagesSection/AdvantagesSection"
import SignUpForm from "components/AuthForm/SignUpForm";
import SharedLayout from "components/SharedLayout/SharedLayout"

const SignUpPage = () => {
    return <SharedLayout>
    <SharedLayout.LeftSection>
        <SignUpForm />
    </SharedLayout.LeftSection>
    <SharedLayout.RightSection>
        <AdvantagesSection />
    </SharedLayout.RightSection>
</SharedLayout>
}

export default SignUpPage;