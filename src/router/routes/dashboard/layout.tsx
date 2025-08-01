import { Navbar } from "@/components/navbar";
import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  useAuth,
} from "@clerk/clerk-react";
import { LoaderCircle } from "lucide-react";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  const { isLoaded } = useAuth();

  return (
    <div>
      <SignedIn>
        <Navbar />
        {!isLoaded && (
          <div className="w-full h-full min-h-screen flex justify-center items-center">
            <LoaderCircle size={28} color="blue" className="animate-spin" />
          </div>
        )}

        {isLoaded && <Outlet />}
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}
