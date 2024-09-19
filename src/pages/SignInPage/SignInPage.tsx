import AdvantagesSection from "components/AdvantagesSection/AdvantagesSection"
import SignInForm from "components/AuthForm/SignInForm"
import SharedLayout from "components/SharedLayout/SharedLayout"

const SignInPage = () => {
    return <SharedLayout leftSection={<SignInForm />}
    rightSection={<AdvantagesSection />} />
}

export default SignInPage;