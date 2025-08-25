import { ClerkProvider } from "@clerk/clerk-react";
import { Outlet } from "react-router";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function AppLayout() {
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/preview"
      signInUrl="/login"
      signUpUrl="/signup"
      signInFallbackRedirectUrl="/preview"
      signUpFallbackRedirectUrl="/preview"
      signInForceRedirectUrl="/preview"
      afterSignInUrl="/preview"
    >
      <div className="bg-white text-black font-mono">
        <Outlet />
      </div>
    </ClerkProvider>
  );
}
