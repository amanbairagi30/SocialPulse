'use client'

import { sideBarOptions } from '@/data/data'
import { ChevronLeft, ChevronRight, PanelRightOpen, SidebarClose, SidebarOpen } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useSidebarStore } from '@/store/sidebar'

export default function Sidebar() {
    const pathName = usePathname()
    const [activeIndex, setActiveIndex] = useState<number | null>(() => {
        return pathName === '/dashboard' ? 0 : null
    })
    const router = useRouter()
    const session = useSession()
    const user = session?.data?.user

    const { sidebarVisibility, isCollapsed, toggleSidebarVisibility, toggleCollapsed } = useSidebarStore()

    useEffect(() => {
        const currentPathName = pathName
        const newActive = sideBarOptions.general.findIndex((option: any) => option.href === currentPathName)
        setActiveIndex(newActive)
    }, [pathName])

    return (
        <>
            <div
                className={`fixed inset-y-0 left-0 z-40 bg-background transition-all duration-300 ease-in-out
          ${sidebarVisibility ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 md:relative
          flex flex-col border-accent
          ${isCollapsed ? 'md:w-20' : 'w-full sm:w-[80%] md:w-64'}`}
            >
                <div className={`dark:border-2 rounded-xl dark:border-accent shadow-md flex ${!isCollapsed ? "justify-between" : "justify-center"}  items-center px-4 h-16`}>
                    {!isCollapsed && (
                        <div>
                            <p className="text-xl font-semibold font-secondary">
                                Social<span className="text-primary">Pulse.</span>
                            </p>
                        </div>
                    )}
                    <button onClick={toggleCollapsed} className="hidden md:block">
                        {isCollapsed ? <SidebarOpen className='w-4 h-4' /> : <SidebarClose className='w-4 h-4' />}
                    </button>
                    <button onClick={() => toggleSidebarVisibility(false)} className="md:hidden">
                        <SidebarClose className='w-4 h-4' />
                    </button>
                </div>

                <div className="flex font-semibold bg-gradient-to-b from-primary/15 rounded-xl px-3 mt-4 mb-2 justify-between flex-1 flex-col">
                    <div className="flex gap-4 h-fit flex-col mt-4">
                        {sideBarOptions.general.map((x, idx) => (
                            <TooltipProvider key={idx}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link
                                            href={`${x.href}`}
                                            onClick={() => {
                                                setActiveIndex(idx)
                                                if (window.innerWidth < 768) {
                                                    toggleSidebarVisibility(false)
                                                }
                                            }}
                                        >
                                            <div
                                                className={`flex items-center text-base cursor-pointer
                          ${activeIndex === idx ? 'bg-primary text-white' : 'hover:bg-accent/40 dark:text-white'}
                          rounded-md px-2 py-2 h-fit ${isCollapsed ? 'justify-center' : 'gap-2'}`}
                                            >
                                                <x.icon className="w-4 h-4" />
                                                {!isCollapsed && <p>{x.name}</p>}
                                            </div>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side="right" sideOffset={10}>
                                        {x.name}
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ))}
                    </div>
                    <div className={`flex items-center z-10 rounded-xl ${isCollapsed ? "justify-center" : "py-3 px-2  ring-1 mb-4 ring-white/10"}`}>
                        <div className={`${isCollapsed ? "w-full" : "w-[20%]"}`}>
                            <Image
                                className="w-8 h-8 rounded-full"
                                src={user?.image ?? ''}
                                height={32}
                                width={32}
                                alt="user_avatar"
                            />
                        </div>
                        {!isCollapsed && (
                            <div className="w-[80%] font-normal text-start flex flex-col">
                                <div className="text-xs text-gray-400">{user?.email}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {sidebarVisibility && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={() => toggleSidebarVisibility(false)}
                ></div>
            )}
        </>
    )
}