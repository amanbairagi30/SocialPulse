import { ChartNoAxesCombined, Save, ScanSearch, Telescope } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

export default function Features() {
    return (
        <section className='flex flex-col p-4 items-center min-h-screen max-h-fit mt-24'>
            <div className='flex flex-col text-center items-center gap-4'>
                <div className='text-xl'>Features</div>
                <div className='font-extrabold'>
                    <div className='text-4xl'>Transform Your Content Strategy </div>
                    <div className='text-4xl'>with Cutting-Edge Features</div>
                </div>
            </div>


            <div className='grid grid-cols-1 md:grid-cols-2 w-full my-16 lg:grid-cols-3 gap-4'>
                <div className='border-2 flex flex-col text-center rounded-xl py-4 px-5 items-center justify-center h-[20rem]'>
                    <ScanSearch className='w-12 h-12' />
                    <h1 className='text-xl mt-12 font-extrabold'>Content Filtering</h1>
                    <div className='text-sm mt-4'>
                        Easily filter content based on keywords, topics, and other criteria that matter most to you.
                    </div>
                </div>
                <div className='border-2 flex flex-col text-center rounded-xl py-4 px-5 items-center justify-center h-[20rem]'>
                    <ChartNoAxesCombined className='w-12 h-12' />
                    <h1 className='text-xl mt-12 font-extrabold'>Advanced Analysis</h1>
                    <div className='text-sm mt-4'>
                        Analyze content using sentiment, tone, and performance metrics, helping you understand audience reactions.
                    </div>
                </div>
                <div className='border-2 flex flex-col text-center rounded-xl py-4 px-5 items-center justify-center h-[20rem]'>
                    <Save className='w-12 h-12' />
                    <h1 className='text-xl mt-12 font-extrabold'>Save & Export</h1>
                    <div className='text-sm mt-4'>
                        Keep track of your filtered content by saving and exporting insights for further use.
                    </div>
                </div>
            </div>

            <div className='mt-4'>
                <Button variant={'default'}>Explore More Features <Telescope className='ml-2' /></Button>
            </div>
        </section>
    )
}
