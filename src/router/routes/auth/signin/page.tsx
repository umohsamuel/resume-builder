import { SignIn, useSignIn } from "@clerk/clerk-react";
import { LoaderCircle } from "lucide-react";

export default function Signin() {
  const { isLoaded } = useSignIn();

  return (
    <div className="w-full h-full min-h-screen flex justify-center items-center">
      {!isLoaded && (
        <LoaderCircle size={28} color="blue" className="animate-spin" />
      )}
      <SignIn routing="path" path="/login" />
    </div>
  );
}
