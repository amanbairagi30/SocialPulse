'use client'

import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { X, Loader2 } from 'lucide-react'
import Hero from '@/components/Hero'
import Auth from '@/components/Auth'
import Features from '@/components/features'
import Testimonials from '@/components/testimonials'
import Footer from '@/components/footer'


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
  const [commentStatus, setCommentStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('')
  const [filterWords, setFilterWords] = useState<string[]>([])
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [newFilterWord, setNewFilterWord] = useState('');
  const [isLoadingVideos, setIsLoadingVideos] = useState(false)
  const [isLoadingTweets, setIsLoadingTweets] = useState(false)

  const controls = useAnimation()

  useEffect(() => {
    console.log('Comments state updated:', comments);
  }, [comments]);

  useEffect(() => {
    controls.start(i => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 }
    }))
  }, [controls])

  const fetchVideos = async () => {
    setIsLoadingVideos(true)
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
    } finally {
      setIsLoadingVideos(false)
    }
  };

  const fetchComments = async (videoId: string) => {
    console.log('fetchComments called with videoId:', videoId);
    try {
      const filterParam = filterWords.length > 0 ? `&filterWords=${filterWords.join(',')}` : '';
      const res = await fetch(`/api/youtube/comments?videoId=${videoId}${filterParam}`);
      if (!res.ok) {
        if (res.status === 403) {
          setCommentStatus("Comments are disabled for this video.");
        } else if (res.status === 204) {
          setCommentStatus("No comments available for this video.");
        } else {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
      } else {
        const data = await res.json();
        console.log('Fetched comments:', data);

        if (Array.isArray(data) && data.length > 0) {
          setComments(data);
          setCommentStatus(null);
        } else {
          setComments([]);
          setCommentStatus("No comments available for this video.");
        }
      }
      setSelectedVideo(videoId);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setComments([]);
      setCommentStatus("Error fetching comments. Please try again.");
    }
  };

  const fetchTweets = async () => {
    setIsLoadingTweets(true)
    try {
      const res = await fetch(`/api/twitter/tweets?username=${twitterUsername}`);
      if (!res.ok) {
        const errorData = await res.json();
        if (res.status === 429) {
          setError("Twitter rate limit exceeded. Please try again later.");
        } else if (res.status === 403) {
          setError("Authentication failed. Please check your Twitter API credentials.");
        } else {
          setError(errorData.error || "An unexpected error occurred.");
        }
        setTweets([]);
        return;
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setTweets(data);
        setError(null);
      } else {
        setTweets([]);
        setError("Unexpected data received from server.");
      }
    } catch (error) {
      console.error('Error fetching tweets:', error);
      setTweets([]);
      setError("Failed to fetch tweets. Please try again.");
    } finally {
      setIsLoadingTweets(false)
    }
  }

  const fetchReplies = async (tweetId: string) => {
    const res = await fetch(`/api/twitter/replies?tweetId=${tweetId}`)
    const data = await res.json()
    setReplies(data)
    setSelectedTweet(tweetId)
  }

  const comicBubble = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 500, damping: 30 }
    },
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  }

  const handleAddFilterWord = () => {
    if (newFilterWord.trim()) {
      const words = newFilterWord.split(',').map(word => word.trim()).filter(word => word !== '')
      setFilterWords(prevWords => [...prevWords, ...words])
      setNewFilterWord('')
    }
  }

  const removeFilterWord = (indexToRemove: number) => {
    setFilterWords(prevWords => prevWords.filter((_, index) => index !== indexToRemove))
  }

  return (
    <>
      <div className='absolute right-[50%] z-10 md:opacity-25 bottom-[0rem] md:-bottom-[0rem] size-[12rem] md:size-[40rem] rounded-full bg-gradient-to-t from-yellow-500/50 to-yellow-500 blur-[8em]'></div>

      <section className="min-h-screen relative">
        <div className='absolute left-[50%] z-10 translate-x-[-50%] md:opacity-25 top-[10rem] md:-top-[20rem] size-[12rem] md:size-[40rem] rounded-full bg-gradient-to-t from-primary/50 to-primary blur-[8em]'></div>
        <div className='absolute left-[0%] z-10 translate-x-[-50%] md:opacity-25 bottom-[10rem] md:-bottom-[20rem] size-[12rem] md:size-[40rem] rounded-full bg-gradient-to-t from-primary/50 to-primary blur-[8em]'></div>
        <div className='absolute right-[0%] z-10 md:opacity-15 bottom-[10rem] md:-bottom-[20rem] size-[12rem] md:size-[40rem] rounded-full bg-gradient-to-t from-primary/50 to-primary blur-[8em]'></div>
        <Auth />
        <Hero />
      </section>

      <div className="max-w-7xl px-4 mx-auto">
        <Features />
        <Testimonials />
      </div>

      <Footer />
      {/* <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white text-purple-800 font-comic-sans">
      <main className="container mx-auto px-4 py-8 sm:py-12">
        <motion.section 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-center mb-12 sm:mb-20"
        >
          <h1 className="text-4xl sm:text-6xl font-bold mb-4 sm:mb-6 text-purple-600" style={{ textShadow: "2px 2px 0px #FCD34D" }}>
            Social Media Superhero!
          </h1>
          <p className="text-xl sm:text-2xl text-purple-500 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Unleash your content superpowers with our amazing analysis tools!
          </p>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-12 sm:mb-20"
        >
          <Tabs defaultValue="youtube" className="w-full">
            <TabsList className="mb-4 bg-purple-200 p-2 rounded-full flex justify-center">
              <TabsTrigger 
                value="youtube" 
                className="text-purple-800 bg-white hover:bg-red-100 rounded-full px-6 py-2 mx-1 font-bold text-lg transition-colors duration-200 border-2 border-purple-400"
              >
                YouTube
              </TabsTrigger>
              <TabsTrigger 
                value="twitter" 
                className="text-purple-800 bg-white hover:bg-blue-100 rounded-full px-6 py-2 mx-1 font-bold text-lg transition-colors duration-200 border-2 border-purple-400"
              >
                Twitter
              </TabsTrigger>
            </TabsList>
            <TabsContent value="youtube">
              <motion.div 
                variants={comicBubble}
                initial="hidden"
                animate="visible"
                
                className="grid gap-4"
              >
                <Card className="bg-white border-4 border-purple-600 rounded-3xl shadow-[8px_8px_0px_0px_rgba(147,51,234,1)]">
                  <CardHeader className="bg-purple-500 text-white rounded-t-2xl">
                    <CardTitle className="text-2xl">YouTube Videos</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex gap-2 mb-4">
                      <Input 
                        placeholder="Enter Channel ID" 
                        value={channelId} 
                        onChange={(e) => setChannelId(e.target.value)}
                        className="border-2 border-purple-600 rounded-full"
                      />
                      <Button 
                        onClick={fetchVideos} 
                        className="bg-yellow-400 hover:bg-yellow-500 text-purple-800 rounded-full"
                        disabled={isLoadingVideos}
                      >
                        {isLoadingVideos ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Loading...
                          </>
                        ) : (
                          'Fetch Videos'
                        )}
                      </Button>
                    </div>
                    <div className="grid gap-2">
                      {Array.isArray(videos) && videos.map((video) => {
                        const videoId = typeof video.id === 'string' ? video.id : video.id?.videoId;
                        return (
                          <motion.div
                            key={videoId || Math.random().toString()}
                           
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button 
                              onClick={() => {
                                if (videoId) {
                                  fetchComments(videoId);
                                }
                              }}
                              variant={selectedVideo === videoId ? "secondary" : "default"}
                              className="w-full text-left bg-yellow-300 hover:bg-yellow-400 text-purple-800 border-2 border-purple-600 rounded-xl shadow-[4px_4px_0px_0px_rgba(147,51,234,1)]"
                            >
                              {video.snippet?.title || video.title || 'Untitled Video'}
                            </Button>
                          </motion.div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
                {selectedVideo && (
                  <motion.div
                    variants={comicBubble}
                    initial="hidden"
                    animate="visible"
                  >
                    <Card className="bg-white border-4 border-purple-600 rounded-3xl shadow-[8px_8px_0px_0px_rgba(147,51,234,1)]">
                      <CardHeader className="bg-purple-500 text-white rounded-t-2xl">
                        <CardTitle className="text-2xl">Comments</CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        {commentStatus ? (
                          <p className="text-lg text-center">{commentStatus}</p>
                        ) : (
                          comments.map((comment) => (
                            <motion.div 
                              key={comment.id}
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                              className="bg-blue-100 p-4 rounded-xl mb-4 border-2 border-purple-600 shadow-[4px_4px_0px_0px_rgba(147,51,234,1)]"
                            >
                              <p className="text-lg">{comment.content}</p>
                            </motion.div>
                          ))
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
                <div className="mt-4">
                  <Button onClick={() => setIsFilterModalOpen(true)} className="bg-green-400 hover:bg-green-500 text-purple-800 rounded-full">
                    Manage Filters
                  </Button>
                  {filterWords.length > 0 && (
                    <div className="mt-2">
                      <p className="font-semibold text-purple-800">Active Filters:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {filterWords.map((word, index) => (
                          <span 
                            key={index} 
                            className={`px-2 py-1 bg-purple-100 rounded-full flex items-center ${word.startsWith('-') ? 'line-through opacity-60' : ''}`}
                          >
                            {word}
                            <button 
                              onClick={() => removeFilterWord(index)} 
                              className="ml-2 text-red-500 hover:text-red-700"
                            >
                              <X size={16} />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </TabsContent>
            <TabsContent value="twitter">
              <motion.div 
                variants={comicBubble}
                initial="hidden"
                animate="visible"
              
                className="grid gap-4"
              >
                <Card className="bg-white border-4 border-purple-600 rounded-3xl shadow-[8px_8px_0px_0px_rgba(147,51,234,1)]">
                  <CardHeader className="bg-purple-500 text-white rounded-t-2xl">
                    <CardTitle className="text-2xl">Twitter Tweets</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    {error && <p className="text-red-500 mb-2">{error}</p>}
                    <div className="flex gap-2 mb-4">
                      <Input 
                        placeholder="Enter Twitter Username" 
                        value={twitterUsername} 
                        onChange={(e) => setTwitterUsername(e.target.value)}
                        className="border-2 border-purple-600 rounded-full"
                      />
                      <Button 
                        onClick={fetchTweets} 
                        className="bg-yellow-400 hover:bg-yellow-500 text-purple-800 rounded-full"
                        disabled={isLoadingTweets}
                      >
                        {isLoadingTweets ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Loading...
                          </>
                        ) : (
                          'Fetch Tweets'
                        )}
                      </Button>
                    </div>
                    <div className="grid gap-2">
                      {Array.isArray(tweets) && tweets.length > 0 ? (
                        tweets.map((tweet) => (
                          <motion.div
                            key={tweet.id}
                          
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button 
                              onClick={() => fetchReplies(tweet.id)}
                              className="w-full text-left bg-yellow-300 hover:bg-yellow-400 text-purple-800 border-2 border-purple-600 rounded-xl shadow-[4px_4px_0px_0px_rgba(147,51,234,1)]"
                            >
                              {tweet.text}
                            </Button>
                          </motion.div>
                        ))
                      ) : (
                        <p>No tweets available.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
                {selectedTweet && (
                  <motion.div
                    variants={comicBubble}
                    initial="hidden"
                    animate="visible"
                  >
                    <Card className="bg-white border-4 border-purple-600 rounded-3xl shadow-[8px_8px_0px_0px_rgba(147,51,234,1)]">
                      <CardHeader className="bg-purple-500 text-white rounded-t-2xl">
                        <CardTitle className="text-2xl">Replies</CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <ul>
                          {replies.map((reply) => (
                            <motion.li 
                              key={reply.id}
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                              className="bg-blue-100 p-4 rounded-xl mb-4 border-2 border-purple-600 shadow-[4px_4px_0px_0px_rgba(147,51,234,1)]"
                            >
                              {reply.text}
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.section>

        <motion.section 
          variants={comicBubble}
          initial="hidden"
          animate="visible"
          className="bg-white text-purple-800 rounded-3xl p-6 sm:p-12 mb-12 sm:mb-20 relative overflow-hidden border-4 border-purple-600 shadow-[8px_8px_0px_0px_rgba(147,51,234,1)]"
        >
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 20, 
              ease: "linear" 
            }}
            className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-purple-200 to-pink-300 rounded-full opacity-30"
          />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-center text-purple-600" style={{ textShadow: "2px 2px 0px #FCD34D" }}>Ready to Become a Content Hero?</h2>
            <p className="text-xl sm:text-2xl mb-6 sm:mb-8 text-center max-w-2xl mx-auto text-purple-500">
              Join our league of extraordinary content creators today!
            </p>
            <div className="flex justify-center">
              <div className="flex w-full max-w-md flex-col sm:flex-row">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-full sm:rounded-l-full sm:rounded-r-none bg-purple-100 text-purple-800 border-2 border-purple-600 mb-2 sm:mb-0"
                />
                <Button className="rounded-full sm:rounded-l-none sm:rounded-r-full bg-yellow-400 hover:bg-yellow-500 text-purple-800 border-2 border-purple-600">
                  Power Up!
                </Button>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section 
          variants={comicBubble}
          initial="hidden"
          animate="visible"
          className="text-center mb-12 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-purple-600" style={{ textShadow: "2px 2px 0px #FCD34D" }}>Our Superhero Partners</h2>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <motion.img 
                key={i} 
                src={`/placeholder.svg?height=50&width=120&text=Hero ${i}`} 
                alt={`Hero ${i}`} 
                className="h-12 sm:h-16 filter brightness-0 invert"
             
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
            ))}
          </div>
        </motion.section>
      </main>

      <footer className="bg-purple-500 py-8 sm:py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mt-4">SocialPulse</h3>
              <p className="text-gray-400">Empowering digital voices with intelligent content curation.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Case Studies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-purple-400 text-center text-white">
            © 2023 SocialPulse. All rights reserved.
          </div>
        </div>
      </footer>

      <motion.div
        className="fixed bottom-8 right-8"
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 1, duration: 0.5, type: "spring" }}
      >
      
      </motion.div>

      <Dialog open={isFilterModalOpen} onOpenChange={setIsFilterModalOpen}>
        <DialogContent className="bg-white border-4 border-purple-600 rounded-3xl shadow-[8px_8px_0px_0px_rgba(147,51,234,1)] max-w-md">
          <DialogHeader className="bg-purple-500 text-white rounded-t-2xl p-4">
            <DialogTitle className="text-2xl font-bold">Manage Filters</DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <Label htmlFor="filterWord" className="text-purple-800 font-semibold mb-2 block">
              Add New Filter
            </Label>
            <div className="flex gap-2">
              <Input
                id="filterWord"
                value={newFilterWord}
                onChange={(e) => setNewFilterWord(e.target.value)}
                className="w-full border-2 border-purple-400 rounded-xl  text-black placeholder-gray-400"
                placeholder="Enter word or phrase"
              />
              <Button onClick={handleAddFilterWord} className="bg-green-400 hover:bg-green-500 text-purple-800 font-bold rounded-xl px-4 transition-colors duration-200">
                Add
              </Button>
            </div>
            <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-4 my-4">
              <h4 className="text-yellow-800 font-bold mb-2">Pro Tip:</h4>
              <p className="text-sm text-yellow-800">
                Add a minus (-) before a word to exclude it. For example: <span className="font-mono bg-yellow-200 px-1 rounded">-bad video</span>
              </p>
            </div>
            {filterWords.length > 0 && (
              <div>
                <h4 className="text-purple-800 font-semibold mb-2">Current Filters:</h4>
                <div className="flex flex-wrap gap-2">
                  {filterWords.map((word, index) => (
                    <span 
                      key={index} 
                      className={`px-2 py-1 bg-purple-100 text-black rounded flex items-center ${word.startsWith('-') ? 'line-through opacity-60' : ''}`}
                    >
                      {word}
                      <button 
                        onClick={() => removeFilterWord(index)} 
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          <DialogFooter className="bg-purple-100 rounded-b-2xl p-4">
            <Button onClick={() => setIsFilterModalOpen(false)} className="bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-xl px-6 py-2 transition-colors duration-200">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div> */}
    </>
  )
}
