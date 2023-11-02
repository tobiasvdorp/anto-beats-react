import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";

const SignupForm = () => {
  return (
    <>
      <form className="w-80">
        <Label>Email</Label>
        <Input type="email" placeholder="Enter your email" className="" />
        <Label>Password</Label>
        <Input type="password" placeholder="Enter your password" />
      </form>
    </>
  );
};

export default SignupForm;
