import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { client } from '@/sanity/client';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 503 });
    }

    const openai = new OpenAI({ apiKey });
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    // Step 1: Use OpenAI to parse the natural language query into search parameters
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant for a travel agency. Extract search filters from the user's query.
          Respond in JSON format with the following optional keys: 
          - country (string, the name of the country they want to visit)
          - maxPrice (number, the maximum price they want to pay)
          - keywords (array of strings, e.g., ["romantic", "couple", "adventure", "cheap"])`
        },
        {
          role: "user",
          content: query
        }
      ],
      response_format: { type: "json_object" }
    });

    const parsedQuery = JSON.parse(completion.choices[0].message.content || '{}');

    // Step 2: Build the Sanity GROQ query based on parsed parameters
    let groqQuery = '*[_type == "package"';
    const params: Record<string, any> = {};

    if (parsedQuery.country) {
      groqQuery += ' && country match $country';
      params.country = `*${parsedQuery.country}*`;
    }
    
    if (parsedQuery.maxPrice) {
      groqQuery += ' && pricing <= $maxPrice';
      params.maxPrice = parsedQuery.maxPrice;
    }

    groqQuery += ']';

    // Execute Sanity Query
    const packages = await client.fetch(groqQuery, params);

    // Filter by keywords if any (simple text matching on the JS side or could be done in GROQ)
    let filteredPackages = packages;
    if (parsedQuery.keywords && Array.isArray(parsedQuery.keywords) && parsedQuery.keywords.length > 0) {
      filteredPackages = packages.filter((pkg: any) => {
        const searchText = `${pkg.title} ${pkg.description}`.toLowerCase();
        return parsedQuery.keywords.some((kw: string) => searchText.includes(kw.toLowerCase()));
      });
    }

    return NextResponse.json({ results: filteredPackages, parsedFilters: parsedQuery });

  } catch (error: any) {
    console.error('Search error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
