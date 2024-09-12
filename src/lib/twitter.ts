import { TwitterApi } from 'twitter-api-v2';
import prisma from './prisma'

if (!process.env.TWITTER_BEARER_TOKEN) {
  throw new Error('TWITTER_BEARER_TOKEN is not defined');
}

const client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);

export async function getTweets(username: string) {
  // Check cache first
  const cachedTweets = await prisma.cachedTweet.findMany({
    where: { username },
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  if (cachedTweets.length > 0) {
    return cachedTweets;
  }

  // If not in cache, fetch from API
  const user = await client.v2.userByUsername(username);
  const tweets = await client.v2.userTimeline(user.data.id, {
    max_results: 10,
    exclude: ['retweets', 'replies'],
  });

  // Cache the results
  const tweetsToCache = tweets.data.data.map(tweet => ({
    id: tweet.id,
    username,
    content: tweet.text,
  }));

  await prisma.cachedTweet.createMany({
    data: tweetsToCache,
    skipDuplicates: true,
  });

  return tweets.data.data;
}

export async function getReplies(tweetId: string) {
  // Check cache first
  const cachedReplies = await prisma.cachedReply.findMany({
    where: { tweetId },
    orderBy: { createdAt: 'desc' },
    take: 100,
  });

  if (cachedReplies.length > 0) {
    return cachedReplies;
  }

  // If not in cache, fetch from API
  const replies = await client.v2.search(`conversation_id:${tweetId}`, {
    max_results: 100,
    'tweet.fields': ['in_reply_to_user_id', 'author_id', 'created_at', 'conversation_id'],
  });

  // Cache the results
  const repliesToCache = replies.data.data.map(reply => ({
    id: reply.id,
    tweetId,
    content: reply.text,
  }));

  await prisma.cachedReply.createMany({
    data: repliesToCache,
    skipDuplicates: true,
  });

  return replies.data.data;
}