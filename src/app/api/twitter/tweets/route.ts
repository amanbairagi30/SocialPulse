import { NextResponse } from 'next/server';
import { getTweets, RateLimitError } from '@/lib/twitter';
import { ApiResponseError } from 'twitter-api-v2';

const MAX_CALLS_PER_SESSION = 5;
const callCounts = new Map<string, number>();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  // Limit calls per session
  const callCount = (callCounts.get(username) || 0) + 1;
  if (callCount > MAX_CALLS_PER_SESSION) {
    return NextResponse.json({ error: 'Too many requests for this session' }, { status: 429 });
  }
  callCounts.set(username, callCount);

  try {
    const tweets = await getTweets(username);
    return NextResponse.json(tweets);
  } catch (error) {
    console.error('Detailed error in API route:', error);
    if (error instanceof RateLimitError) {
      return NextResponse.json({ 
        error: 'Rate limit exceeded. Please try again later.',
        details: error.message
      }, { status: 429 });
    }
    if (error instanceof ApiResponseError && error.code === 403) {
      return NextResponse.json({ 
        error: 'Authentication failed. Please check your Twitter API credentials.',
        details: error.data?.detail || error.message
      }, { status: 403 });
    }
    return NextResponse.json({ 
      error: 'Failed to fetch tweets', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}