import { httpsCallable } from "firebase/functions";
import { clientFunctions } from "@/services/firebase-config";
import Home from "./home/page";
// import ArtistDashboard from "./artist-dashboard/page";

export default async function App() {
  httpsCallable(clientFunctions, "verifySessionCookie")()
  return (
    <main>
      {/* {isSignedIn ? (
        <ArtistDashboard />
      ) : (
        <Home />
      )} */}
      <Home />
    </main>
  );
}