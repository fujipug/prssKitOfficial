// import { isUserSignedIn } from "@/lib/auth";
// import { verifyFirebaseSessionCookie } from "@/network/firebase";
import Home from "./home/page";
// import ArtistDashboard from "./artist-dashboard/page";

export default async function App() {
  // const result = await verifyFirebaseSessionCookie();

  // console.log('Session cookie verification result:', result);

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