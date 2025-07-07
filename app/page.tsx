import Home from "./home/page";
// import ArtistDashboard from "./artist-dashboard/page";

export default async function App() {
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