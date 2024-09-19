import AdvantagesSection from "components/AdvantagesSection/AdvantagesSection"
import SignUpForm from "components/AuthForm/SignUpForm";
import SharedLayout from "components/SharedLayout/SharedLayout"

const SignUpPage = () => {
    return <SharedLayout leftSection={<SignUpForm />}
        rightSection={<AdvantagesSection />} />
}

export default SignUpPage;