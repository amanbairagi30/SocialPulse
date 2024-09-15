import { TwitterApi, ApiResponseError, TweetV2 } from 'twitter-api-v2';

const client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN!);
const readOnlyClient = client.readOnly;

const cache = new Map<string, { tweets: TweetV2[], timestamp: number }>();
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes
const MAX_RETRIES = 3;

export async function getTweets(username: string, retryCount = 0): Promise<TweetV2[]> {
  console.log(`Bearer token (first 10 chars): ${process.env.TWITTER_BEARER_TOKEN?.slice(0, 10)}...`);
  console.log(`Attempting to fetch tweets for ${username} (Retry: ${retryCount})`);

  // Check cache first
  const cachedData = cache.get(username);
  if (cachedData && Date.now() - cachedData.timestamp < CACHE_TTL) {
    console.log(`Returning cached tweets for ${username}`);
    return cachedData.tweets;
  }

  try {
    const user = await readOnlyClient.v2.userByUsername(username);
    if (!user.data) {
      throw new Error(`User ${username} not found`);
    }
    const tweets = await readOnlyClient.v2.userTimeline(user.data.id, {
      exclude: ['retweets', 'replies'],
      max_results: 10,
      'tweet.fields': ['created_at', 'public_metrics'],
    });
    
    // Update cache
    cache.set(username, { tweets: tweets.data.data, timestamp: Date.now() });
    console.log(`Successfully fetched tweets for ${username}`);
    
    return tweets.data.data;
  } catch (error) {
    if (error instanceof ApiResponseError && error.rateLimitError && error.rateLimit) {
      console.log(`Rate limit error for ${username}. Remaining: ${error.rateLimit.remaining}, Reset: ${new Date(error.rateLimit.reset * 1000)}`);
      if (retryCount >= MAX_RETRIES) {
        throw new RateLimitError('Rate limit exceeded after multiple retries');
      }
      const delay = Math.pow(2, retryCount + 1) * 10000; // Longer exponential backoff
      console.log(`Retrying in ${delay / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return getTweets(username, retryCount + 1);
    }
    console.error('Error fetching tweets:', error);
    throw error;
  }
}

export async function getReplies(tweetId: string) {
  try {
    const replies = await readOnlyClient.v2.search(`conversation_id:${tweetId}`, {
      max_results: 100,
      'tweet.fields': ['in_reply_to_user_id', 'author_id', 'created_at', 'conversation_id'],
    });
    return replies.data.data;
  } catch (error) {
    console.error('Error fetching replies:', error);
    throw error;
  }
}

export class RateLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RateLimitError';
  }
}