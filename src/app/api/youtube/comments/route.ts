import { NextResponse } from 'next/server';
import { getComments } from '@/lib/youtube';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const videoId = searchParams.get('videoId');

  if (!videoId) {
    return NextResponse.json({ error: 'Video ID is required' }, { status: 400 });
  }

  try {
    const comments = await getComments(videoId);
    if (comments === 'disabled') {
      return NextResponse.json({ message: 'Comments are disabled for this video' }, { status: 403 });
    }
    if (comments === null) {
      return NextResponse.json({ message: 'No comments available for this video' }, { status: 204 });
    }
    return NextResponse.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}