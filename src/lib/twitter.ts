import { TwitterApi, ApiResponseError, TweetV2 } from 'twitter-api-v2';
import needle from 'needle';

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

// Define a type for the tweet object
interface Tweet {
  id: string;
  text: string;
  created_at: string;
  author_id: string;
  // Add other fields as needed
}

// New function to fetch user tweets using needle
export async function getUserTweets(userId: string): Promise<Tweet[]> {
  const bearerToken = process.env.TWITTER_BEARER_TOKEN;

  if (!bearerToken) {
    throw new Error('BEARER_TOKEN environment variable is not set');
  }

  const userTweets = [];
  const params = { // Changed from let to const
    "max_results": 100,
    "tweet.fields": "created_at",
    "expansions": "author_id"
  };

  const options = {
    headers: {
      "User-Agent": "v2UserTweetsJS",
      "authorization": `Bearer ${bearerToken}`
    }
  };

  let hasNextPage = true;
  let nextToken = null;
  let userName;
  console.log("Retrieving Tweets...");

  while (hasNextPage) {
    const getPage = async (params: Record<string, string | number>, options: { headers: Record<string, string> }, nextToken: string | null) => {
      const url = `https://api.twitter.com/2/users/${userId}/tweets`; // Moved here
      if (nextToken) {
        params.pagination_token = nextToken;
      }

      try {
        const resp = await needle('get', url, params, options);

        if (resp.statusCode !== 200) {
          console.log(`${resp.statusCode} ${resp.statusMessage}:\n${resp.body}`);
          return;
        }
        return resp.body;
      } catch (err) {
        throw new Error(`Request failed: ${err}`);
      }
    }

    const resp = await getPage(params, options, nextToken);
    if (resp && resp.meta && resp.meta.result_count && resp.meta.result_count > 0) {
      if (resp.includes && resp.includes.users && resp.includes.users.length > 0) {
        userName = resp.includes.users[0].username;
      }
      if (resp.data) {
        userTweets.push(...resp.data);
      }
      if (resp.meta.next_token) {
        nextToken = resp.meta.next_token;
      } else {
        hasNextPage = false;
      }
    } else {
      hasNextPage = false;
    }
  }

  console.dir(userTweets, { depth: null });
  console.log(`Got ${userTweets.length} Tweets from ${userName || 'unknown user'} (user ID ${userId})!`);
  return userTweets;
}