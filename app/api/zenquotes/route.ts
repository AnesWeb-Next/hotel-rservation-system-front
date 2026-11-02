import { NextResponse } from "next/server";
import axios from "axios";

interface ZenQuoteResponse {
  q: string; // quote text
  a: string; // author
}

interface Quote {
  quote: string;
  author: string;
}

/**
 * GET /api/zenquotes
 * Fetch quotes from ZenQuotes API (server-side)
 */
export async function GET() {
  try {
    const response = await axios.get<ZenQuoteResponse[]>(
      "https://zenquotes.io/api/quotes/",
      {
        timeout: 10_000,
      },
    );

    // Transform and take first 5
    const quotes: Quote[] = response.data.slice(0, 5).map((item) => ({
      quote: item.q,
      author: item.a,
    }));

    return NextResponse.json(quotes);
  } catch (error) {
    console.error("Failed to fetch ZenQuotes:", error);

    return NextResponse.json(
      { error: "Failed to fetch quotes" },
      { status: 500 },
    );
  }
}
