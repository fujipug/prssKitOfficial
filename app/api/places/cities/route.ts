import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Validate request URL
  if (!request.url) {
    return new Response("Invalid request URL", { status: 400 });
  }

  // Get input from query parameters
  const url = new URL(request.url);
  const input = url.searchParams.get('input') || '';

  if (!input) {
    return new Response("Input parameter is required", { status: 400 });
  }

  // Get API key from environment variables
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return new Response("Google Places API key not configured", { status: 500 });
  }

  try {
    // Construct Google Places API URL
    const apiUrl = new URL('https://maps.googleapis.com/maps/api/place/autocomplete/json');
    apiUrl.searchParams.append('input', input);
    apiUrl.searchParams.append('types', '(cities)');
    apiUrl.searchParams.append('key', apiKey);

    // Fetch from Google Places API
    const response = await fetch(apiUrl.toString());
    const data = await response.json();

    if (data.status !== 'OK') {
      return NextResponse.json(
        { error: data.error_message || 'Failed to fetch cities' },
        { status: 400 }
      );
    }

    // Format the response
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cities = data.predictions.map((prediction: any) => ({
      description: prediction.description,
      placeId: prediction.place_id,
      mainText: prediction.structured_formatting?.main_text,
      secondaryText: prediction.structured_formatting?.secondary_text,
    }));

    console.log('Fetched cities:', cities);
    return NextResponse.json({ cities });

  } catch (error) {
    console.error('Error fetching cities:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}