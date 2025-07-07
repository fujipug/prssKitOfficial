const baseUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000'
  : 'https://prss-kit-official.vercel.app';

export const createSessionCookie = async (idToken: string) => {
  if (!idToken) {
    throw new Error("No ID token provided");
  }

  try {
    const response = await fetch(`${baseUrl}/api/set-session-cookie`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
      credentials: "include", // Important for cookies
    });

    if (!response.ok) {
      const errorData = await response?.json();
      throw new Error(errorData.error || "Failed to create session cookie");
    }

    return await response.json();
  } catch (error) {
    console.error("Cookie setting error:", error);
    throw error;
  }
};