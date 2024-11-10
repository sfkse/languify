import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <SignIn />
    </div>
  );
};

export default SignInPage;

