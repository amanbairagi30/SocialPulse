'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Video = {
  id: { videoId: string };
  snippet: { title: string };
  title?: string; 
};

type Tweet = {
  id: string;
  text: string;
};

type Reply = {
  id: string;
  text: string;
};

type Comment = {
  id: string;
  videoId: string;
  content: string;
};

export default function SocialPulse() {
  const [channelId, setChannelId] = useState('')
  const [twitterUsername, setTwitterUsername] = useState('')
  const [videos, setVideos] = useState<Video[]>([])
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [replies, setReplies] = useState<Reply[]>([])
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [selectedTweet, setSelectedTweet] = useState<string | null>(null)

  useEffect(() => {
    console.log('Comments state updated:', comments);
  }, [comments]);

  const fetchVideos = async () => {
    try {
      const res = await fetch(`/api/youtube/videos?channelId=${channelId}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log('API response:', data); 
      console.log('First video object:', data[0]); 
      
   
      const videosArray = Array.isArray(data) ? data : data.items;
      
      if (Array.isArray(videosArray)) {
        setVideos(videosArray);
      } else {
        console.error('Unexpected data structure:', data);
        setVideos([]);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
      setVideos([]);
    }
  };

  const fetchComments = async (videoId: string) => {
    console.log('fetchComments called with videoId:', videoId);  
    try {
      const res = await fetch(`/api/youtube/comments?videoId=${videoId}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log('Fetched comments:', data);
      
      if (Array.isArray(data)) {
        console.log('Setting comments:', data.length, 'comments found'); 
        setComments(data);
      } else {
        console.error('Unexpected comments data structure:', data);
        setComments([]);
      }
      setSelectedVideo(videoId);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setComments([]);
    }
  };

  const fetchTweets = async () => {
    const res = await fetch(`/api/twitter/tweets?username=${twitterUsername}`)
    const data = await res.json()
    setTweets(data)
  }

  const fetchReplies = async (tweetId: string) => {
    const res = await fetch(`/api/twitter/replies?tweetId=${tweetId}`)
    const data = await res.json()
    setReplies(data)
    setSelectedTweet(tweetId)
  }

  return (
    <Tabs defaultValue="youtube" className="w-full">
      <TabsList>
        <TabsTrigger value="youtube">YouTube</TabsTrigger>
        <TabsTrigger value="twitter">Twitter</TabsTrigger>
      </TabsList>
      <TabsContent value="youtube">
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>YouTube Videos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Input 
                  placeholder="Enter Channel ID" 
                  value={channelId} 
                  onChange={(e) => setChannelId(e.target.value)}
                />
                <Button onClick={fetchVideos}>Fetch Videos</Button>
              </div>
              <div className="grid gap-2">
                {Array.isArray(videos) && videos.map((video) => {
                 
                  const videoId = typeof video.id === 'string' ? video.id : video.id?.videoId;
                  return (
                    <Button 
                      key={videoId || Math.random().toString()}
                      onClick={() => {
                        console.log('Video clicked:', videoId);
                        if (videoId) {
                          fetchComments(videoId);
                        } else {
                          console.error('No video ID found for this video:', video);
                        }
                      }}
                      variant={selectedVideo === videoId ? "secondary" : "default"}
                    >
                      {video.snippet?.title || video.title || 'Untitled Video'}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          {selectedVideo && (
            <Card>
              <CardHeader>
                <CardTitle>Comments for selected video</CardTitle>
              </CardHeader>
              <CardContent>
                {comments.length > 0 ? (
                  <ul>
                    {comments.map((comment) => (
                      <li key={comment.id}>{comment.content}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No comments found for this video.</p>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </TabsContent>
      <TabsContent value="twitter">
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Twitter Tweets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Input 
                  placeholder="Enter Twitter Username" 
                  value={twitterUsername} 
                  onChange={(e) => setTwitterUsername(e.target.value)}
                />
                <Button onClick={fetchTweets}>Fetch Tweets</Button>
              </div>
              <div className="grid gap-2">
                {tweets.map((tweet) => (
                  <Button key={tweet.id} onClick={() => fetchReplies(tweet.id)}>
                    {tweet.text}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          {selectedTweet && (
            <Card>
              <CardHeader>
                <CardTitle>Replies for selected tweet</CardTitle>
              </CardHeader>
              <CardContent>
                <ul>
                  {replies.map((reply) => (
                    <li key={reply.id}>{reply.text}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </TabsContent>
    </Tabs>
  )
}
