import { defaultFormValues } from "@/lib/form.default";
import { useFormStore } from "@/store/form.store";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useClerk,
} from "@clerk/clerk-react";
import { useEffect } from "react";

export default function Navbar() {
  const updateResumeData = useFormStore((state) => state.updateResumeData);
  const { addListener } = useClerk();

  useEffect(() => {
    const removeListener = addListener((res) => {
      if (!res.session) {
        updateResumeData(defaultFormValues);
      }
      console.log({ res });
    });

    return () => removeListener();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addListener]);

  return (
    <header className="h-[60px] bg-black text-white flex items-center px-[5%] lg:px-[2.5%] justify-between">
      <h1 className="font-mono text-lg">Resume Builder</h1>

      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: {
                  width: "36px",
                  height: "36px",
                },
              },
            }}
          />
        </SignedIn>
      </div>
    </header>
  );
}
