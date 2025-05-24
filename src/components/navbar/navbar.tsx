import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";

export default function Navbar() {
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
