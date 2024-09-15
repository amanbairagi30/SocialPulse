import { google } from 'googleapis';
import prisma from './prisma'

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY
});

export async function getVideos(channelId: string) {

  const cachedVideos = await prisma.cachedVideo.findMany({
    where: { channelId },
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  if (cachedVideos.length > 0) {
    return cachedVideos;
  }


  const response = await youtube.search.list({
    part: ['snippet'],
    channelId,
    type: ['video'],
    order: 'date',
    maxResults: 10
  });


  const videosToCache = response.data.items?.map(item => ({
    id: item.id?.videoId ?? '',
    channelId,
    title: item.snippet?.title ?? '',
  })) || [];

  if (videosToCache.length > 0) {
    await prisma.cachedVideo.createMany({
      data: videosToCache,
      skipDuplicates: true,
    });
  }

  return response.data.items || [];
}

export async function getComments(videoId: string, filterWords: string[] = []) {
  const cachedComments = await prisma.cachedComment.findMany({
    where: { videoId },
    orderBy: { createdAt: 'desc' },
    take: 100,
  });

  let filteredComments = cachedComments;

  if (filterWords.length > 0) {
    filteredComments = cachedComments.filter(comment =>
      filterWords.some(word => 
        comment.content.toLowerCase().includes(word.toLowerCase())
      )
    );
  }

  if (filteredComments.length > 0) {
    return filteredComments;
  }

  try {
    const response = await youtube.commentThreads.list({
      part: ['snippet'],
      videoId,
      maxResults: 100
    });

    let commentsToCache = response.data.items?.map(item => ({
      id: item.id ?? '', 
      videoId,
      content: item.snippet?.topLevelComment?.snippet?.textDisplay ?? '',
    })) || [];

    if (filterWords.length > 0) {
      commentsToCache = commentsToCache.filter(comment =>
        filterWords.some(word => 
          comment.content.toLowerCase().includes(word.toLowerCase())
        )
      );
    }

    if (commentsToCache.length > 0) {
      await prisma.cachedComment.createMany({
        data: commentsToCache,
        skipDuplicates: true,
      });
    }

    return commentsToCache.length > 0 ? commentsToCache : null;
  } catch (error: unknown) {
    const youtubeError = error as YouTubeAPIError;
    if (youtubeError.response && youtubeError.response.status === 403) {
      return 'disabled';
    }
    throw error;
  }
}

interface YouTubeAPIError extends Error {
  response?: { status: number };
}