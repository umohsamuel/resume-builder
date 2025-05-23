import { SignUp, useSignUp } from "@clerk/clerk-react";
import { LoaderCircle } from "lucide-react";

export default function Signup() {
  const { isLoaded } = useSignUp();

  return (
    <div className="w-full h-full min-h-screen flex justify-center items-center">
      {!isLoaded && (
        <LoaderCircle size={28} color="blue" className="animate-spin" />
      )}

      <SignUp routing="path" path="/signup" />
    </div>
  );
}
