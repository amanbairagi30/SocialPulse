'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Video = {
  id: { videoId: string };
  snippet: { title: string };
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
  snippet: {
    topLevelComment: {
      snippet: {
        textDisplay: string;
      };
    };
  };
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

  const fetchVideos = async () => {
    const res = await fetch(`/api/youtube/videos?channelId=${channelId}`)
    const data = await res.json()
    setVideos(data)
  }

  const fetchComments = async (videoId: string) => {
    const res = await fetch(`/api/youtube/comments?videoId=${videoId}`)
    const data = await res.json()
    setComments(data)
    setSelectedVideo(videoId)
  }

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
                {videos.map((video) => (
                  <Button key={video.id.videoId} onClick={() => fetchComments(video.id.videoId)}>
                    {video.snippet.title}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          {selectedVideo && (
            <Card>
              <CardHeader>
                <CardTitle>Comments for selected video</CardTitle>
              </CardHeader>
              <CardContent>
                <ul>
                  {comments.map((comment) => (
                    <li key={comment.id}>{comment.snippet.topLevelComment.snippet.textDisplay}</li>
                  ))}
                </ul>
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
