// import { isUserSignedIn } from "@/lib/auth";
// import { verifyFirebaseSessionCookie } from "@/network/firebase";
import Home from "./home/page";
// import ArtistDashboard from "./artist-dashboard/page";

export default async function App() {
  const baseUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://prsskit.com';

  const verifySessionCookie = async () => {
    const response = await fetch(`${baseUrl}/api/verify-session-cookie`, {
      method: "GET",
      credentials: "include", // Required for cookies
    });

    if (!response.ok) {
      throw new Error("Failed to verify session cookie");
    }

    const data = await response.json();
    return data;
  };

  verifySessionCookie().then((result) => {
    console.log('Session cookie verified:', result);
  }).catch((error) => {
    console.error('Error verifying session cookie:', error);
  });

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