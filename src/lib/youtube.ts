import { google } from 'googleapis';
import prisma from './prisma'

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY
});

export async function getVideos(channelId: string) {
  // Check cache first
  const cachedVideos = await prisma.cachedVideo.findMany({
    where: { channelId },
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  if (cachedVideos.length > 0) {
    return cachedVideos;
  }

  // If not in cache, fetch from API
  const response = await youtube.search.list({
    part: ['snippet'],
    channelId,
    type: ['video'],
    order: 'date',
    maxResults: 10
  });

  // Cache the results
  const videosToCache = response.data.items?.map(item => ({
    id: item.id?.videoId,
    channelId,
    title: item.snippet?.title,
  })) || [];

  if (videosToCache.length > 0) {
    await prisma.cachedVideo.createMany({
      data: videosToCache,
      skipDuplicates: true,
    });
  }

  return response.data.items || [];
}

export async function getComments(videoId: string) {
  // Check cache first
  const cachedComments = await prisma.cachedComment.findMany({
    where: { videoId },
    orderBy: { createdAt: 'desc' },
    take: 100,
  });

  if (cachedComments.length > 0) {
    return cachedComments;
  }

  // If not in cache, fetch from API
  const response = await youtube.commentThreads.list({
    part: ['snippet'],
    videoId,
    maxResults: 100
  });

  // Cache the results
  const commentsToCache = response.data.items?.map(item => ({
    id: item.id,
    videoId,
    content: item.snippet?.topLevelComment?.snippet?.textDisplay ?? '',
  })) || [];

  if (commentsToCache.length > 0) {
    await prisma.cachedComment.createMany({
      data: commentsToCache,
      skipDuplicates: true,
    });
  }

  return response.data.items || [];
}