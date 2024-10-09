import React from 'react'
import Auth from './Auth'
import { Button } from './ui/button'
import { Heart, PlayCircleIcon, Rocket } from 'lucide-react'
import { Badge } from './ui/badge';
import harkirat from "../../public/harkirat.jpg";
import hitesh from "../../public/hitesh.png";
import tanmay from "../../public/tanmay.jpg";
import Image from 'next/image';
import { InstagramLogoIcon } from '@radix-ui/react-icons';
import YouTube from './svg/youtube';
import X from './svg/x';

export default function Hero() {
    return (
        <>
            <section className="h-calc[(100vh-6.8rem)] mt-24 w-full dark:bg-black bg-white  dark:bg-grid-white/[0.25] bg-grid-black/[0.25] relative flex items-center justify-center">

                <div className='w-full absolute bottom-0 h-[50rem] bg-gradient-to-t from-background via-background/80 to-transparent z-[1]'></div>
                <div className='w-full absolute top-0 h-[60rem] bg-gradient-to-b from-background to-transparent z-[1]'></div>

                <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                <div className='h-[calc(100vh-5.25rem)] z-10 relative max-w-7xl p-4 mx-auto flex flex-col items-center'>
                    <div className='text-center w-full md:w-[70%] flex flex-col items-center gap-6 mt-10'>
                        <Badge variant={'secondary'} className='text-base font-normal dark:text-white bg-transparent dark:bg-primary/10 dark:border border-primary rounded-full px-4 py-2'>
                            Discorver what fuels your audience.<Rocket className='w-6 h-6 text-foreground ml-2' />
                        </Badge>
                        {/* <h1 className='text-6xl '>Elevate your content game with SocialPulse</h1> */}
                        {/* <h1 className='text-6xl '>Unlock Content insights instantly with SocialPulse</h1> */}
                        <h1 className='text-4xl lg:text-6xl font-extrabold'>Unleash the Power of Content Analysis for <span className='bg-gradient-to-tr from-yellow-500 via-yellow-500/50 to-yellow-100 dark:to-foreground bg-clip-text text-transparent'>Creators</span></h1>
                        <p className='text-lg w-[70%] font-normal'>Empower your content creation strategy with advanced sentiment, tone, and metric analysis, all in one place.</p>

                        <div className='flex items-center gap-4 my-2'>
                            <Button className='transition-transform duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 hover:shadow-primary'>Get Started for free</Button>
                            <Button className='transition-transform duration-300 ease-in-out hover:bg-none hover:shadow-2xl hover:-translate-y-1 hover:shadow-primary' variant={'ghost'}>
                                <PlayCircleIcon className='mr-2' />
                                Watch Demo
                            </Button>
                        </div>

                        <div className='text-sm'>Trusted by 1000+ content creators</div>

                        <div className='absolute top-[20rem] h-[20rem] group bg-gradient-to-b from-primary/20 via-primary/15 rounded-xl p-4 w-[17rem] left-[0%]'>
                            <div className='h-[70%] rounded-xl overflow-hidden '>
                                <Image className='object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105' src={harkirat} alt='harkirat' />
                            </div>
                            <div className='mt-6 flex flex-col gap-4 items-center justify-center w-full'>
                                <h4 className='font-semibold'>Harkirat Singh</h4>
                                <div className='flex items-center gap-6'>
                                    <div className='flex flex-col gap-1 items-center'><YouTube className='w-4 h-4 dark:invert' /> 466K</div>
                                    <div className='flex flex-col gap-1 items-center'><X className='w-4 h-4 dark:invert' /> 466K</div>
                                    <div className='flex flex-col gap-1 items-center'><InstagramLogoIcon className='w-4 h-4 bg-gradient-to-t from-purple-500 to-yellow-500 bg-clip-text' /> 466K</div>
                                </div>
                            </div>
                        </div>
                        <div className='absolute top-[20rem] h-[20rem] group bg-gradient-to-b from-primary/20 via-primary/15 rounded-xl p-4 w-[17rem] right-[0%]'>
                            <div className='h-[70%] rounded-xl overflow-hidden '>
                                <Image className='object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105' src={tanmay} alt='harkirat' />
                            </div>
                            <div className='mt-6 flex flex-col gap-4 items-center justify-center w-full'>
                                <h4 className='font-semibold'>Tanmay Bhaat</h4>
                                <div className='flex items-center gap-6'>
                                    <div className='flex flex-col gap-1 items-center'><YouTube className='w-4 h-4 dark:invert' /> 466K</div>
                                    <div className='flex flex-col gap-1 items-center'><X className='w-4 h-4 dark:invert' /> 466K</div>
                                    <div className='flex flex-col gap-1 items-center'><InstagramLogoIcon className='w-4 h-4' /> 466K</div>
                                </div>
                            </div>
                        </div>

                        <div className='absolute top-[32rem] h-[8rem] group flex  gap-4 items-center bg-gradient-to-b from-primary/15 rounded-xl p-4 w-[25rem] left-[50%] translate-x-[-50%]'>
                            <div className='h-full w-[6rem] rounded-xl overflow-hidden '>
                                <Image className='object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105' src={hitesh} alt='harkirat' />
                            </div>
                            <div className='my-2 flex flex-col gap-2 items-start'>
                                <h4 className='text-lg font-bold'>Hitesh Choudary</h4>
                                <div className='flex items-center gap-6'>
                                    <div className='flex  gap-1 items-center text-sm'><YouTube className='w-4 h-4 dark:invert' /> 466K</div>
                                    <div className='flex  gap-1 items-center text-sm'><X className='w-4 h-4 dark:invert' /> 466K</div>
                                    <div className='flex  gap-1 items-center text-sm'><InstagramLogoIcon className='w-4 h-4' /> 466K</div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </section>
        </>

    )
}
