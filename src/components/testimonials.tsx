'use client'

import { useState, useEffect, useRef } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

const testimonials = [
    {
        id: 1,
        rating: 5,
        text: "This product has completely transformed my workflow. I can't imagine going back to my old methods!",
        author: "Alex Johnson",
        role: "UX Designer"
    },
    {
        id: 2,
        rating: 4,
        text: "Impressive features and intuitive interface. There's room for improvement, but overall it's a great tool.",
        author: "Sam Lee",
        role: "Software Engineer"
    },
    {
        id: 3,
        rating: 5,
        text: "The customer support is outstanding. They went above and beyond to help me with my issue.",
        author: "Emily Chen",
        role: "Project Manager"
    },
    {
        id: 4,
        rating: 5,
        text: "I've tried many similar products, but this one stands out for its reliability and performance.",
        author: "Michael Brown",
        role: "Data Analyst"
    },
    {
        id: 5,
        rating: 4,
        text: "Great value for money. It has all the features I need and some I didn't even know I wanted!",
        author: "Laura Martinez",
        role: "Marketing Specialist"
    }
]

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const sliderRef = useRef<HTMLDivElement>(null)

    const nextTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }

    const prevTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
    }

    useEffect(() => {
        const slider = sliderRef.current
        if (slider) {
            const scrollPosition = currentIndex * slider.offsetWidth
            slider.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            })
        }
    }, [currentIndex])

    useEffect(() => {
        const interval = setInterval(nextTestimonial, 5000) // Auto-slide every 5 seconds
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="w-full py-12 flex flex-col items-center gap-6 bg-background text-foreground">
            <div className='text-lg font-extrabold'>Testimonials</div>
            <div className="max-w-6xl mx-auto px-4 w-full">
                <div className="text-2xl sm:text-3xl font-bold text-center mb-8">
                    <div>We never disappoint our <span className='bg-gradient-to-tr from-yellow-500 via-yellow-500/50 to-yellow-100 dark:to-foreground bg-clip-text text-transparent'>customers</span></div>
                    <div>See what they say</div>
                </div>
                <div className="relative">
                    <div
                        ref={sliderRef}
                        className="flex overflow-x-hidden scroll-smooth"
                    >
                        {testimonials.map((testimonial) => (
                            <div
                                key={testimonial.id}
                                className="w-full md:w-1/2 flex-shrink-0 px-4"
                            >
                                <div className="border-2 flex flex-col relative text-center items-center justify-center p-6 sm:p-8 rounded-xl shadow-lg h-full">
                                    <div className="flex mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 sm:w-5 sm:h-5 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-foreground/40'}`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-sm sm:text-base mb-16">{testimonial.text}</p>
                                    <div className='rounded-b-xl bg-primary text-white dark:bg-primary/20 w-full absolute bottom-0 p-2'>
                                        <div className="font-semibold text-sm sm:text-base">{testimonial.author}</div>
                                        <div className="text-xs sm:text-sm dark:text-foreground/40">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-background hover:bg-primary shadow-lg"
                        onClick={prevTestimonial}
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-background hover:bg-primary shadow-lg"
                        onClick={nextTestimonial}
                        aria-label="Next testimonial"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}