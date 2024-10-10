"use server";
import { google } from 'googleapis';
import prisma from './prisma'

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY
});

export async function getAllVideos(channelId: string) {
  if (!channelId) {
    console.error("Channel ID is missing");
    return [];
  }

  try {
    const response = await youtube.search.list({
      part: ['snippet'],
      channelId,
      type: ['video'],
      order: 'date',
      maxResults: 10
    });

    return response.data.items || [];
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return [];
  }
}

export async function getComments(videoId: string) {
  try {
    const response = await youtube.commentThreads.list({
      part: ["snippet"],
      videoId,
      maxResults: 300,
    });
    return response.data.items || [];
  } catch (error) {
    console.error("Error fetching YouTube comments:", error);
    return [];
  }
}