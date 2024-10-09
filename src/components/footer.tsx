import React from 'react'
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react'
import X from './svg/x'

export default function Footer() {
    return (
        <footer className="border-t-2 py-16 mt-48">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="text-foreground text-3xl md:text-4xl font-extrabold">
                            <span>Social</span>
                            <span className="text-primary">Pulse.</span>
                        </div>
                        <p className="text-gray-400 mb-4">Empowering digital voices with intelligent content curation.</p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                                <X className='dark:invert w-6 h-6' />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                                <Facebook size={24} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                                <Instagram size={24} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                                <Linkedin size={24} />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Product</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Features</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Pricing</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Case Studies</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Company</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">About Us</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Careers</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Contact</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-700 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm mb-4 md:mb-0">
                        © 2023 SocialPulse. All rights reserved.
                    </p>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">Privacy Policy</a>
                        <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">Terms of Service</a>
                    </div>
                </div>

                <div className='flex items-center justify-center gap-0 mt-10'>
                    {['S', 'o', 'c', 'i', 'a', 'l', 'P', 'u', 'l', 's', 'e'].map((item, index, arr) => {

                        return (
                            <span
                                key={`item-${index}`}
                                className={`text-5xl md:text-8xl font-bold ${index + 1 <= arr.length / 2 ? 'hover:-rotate-12' : 'hover:rotate-12'}  cursor-pointer transition-all duration-700 ease-out hover:bg-primary hover:scale-110 bg-gradient-to-b from-black/20 dark:from-white/20 bg-clip-text text-transparent`}
                            >
                                {item}
                            </span>
                        )
                    })}
                </div>
            </div>
        </footer>
    )
}