import AdvantagesSection from "components/AdvantagesSection/AdvantagesSection"
import SignInForm from "components/AuthForm/SignInForm"
import SharedLayout from "components/SharedLayout/SharedLayout"

const SignInPage = () => {
    return <SharedLayout>
    <SharedLayout.LeftSection>
        <SignInForm />
    </SharedLayout.LeftSection>
    <SharedLayout.RightSection>
        <AdvantagesSection />
    </SharedLayout.RightSection>
</SharedLayout>
}

export default SignInPage;