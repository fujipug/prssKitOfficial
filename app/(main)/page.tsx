import Features from "./_homepage-sections/features";
import TestLanding from "./_homepage-sections/test-landing";
// import Landing from "./_homepage-sections/landing";
// import Example from "./_homepage-sections/test-landing";

export default async function App() {
  return (
    <main>
      <TestLanding />
      {/* <Landing /> */}
      <Features />
    </main>
  );
}