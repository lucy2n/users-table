import LoginForm from "../../features/authentication/login/ui/LoginForm";

const SignIn = () => {
    return (
        <div className="container-sm p-5 my-5 border">
            <h2 className="text-primary pb-4"> 
                Вход
            </h2>
            <LoginForm />
        </div>
    )
}

export default SignIn;