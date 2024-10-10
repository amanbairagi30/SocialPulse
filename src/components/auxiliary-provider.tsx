"use client"
import React, { ReactNode } from 'react'
import { useSidebarStore } from '@/store/sidebar'
import Topbar from './top-bar'

export default function AuxiliaryProvider({ children }: { children: ReactNode }) {
    const { isCollapsed } = useSidebarStore()
    return (
        <div className={`flex flex-col ${isCollapsed ? "md:w-[calc(100vw-5rem)]" : "md:w-[calc(100vw-16rem)]"} w-full transition-all duration-300`}>
            <Topbar />
            <div className='!h-[calc(100vh-4rem)] overflow-auto p-4'>
                {children}
            </div>
        </div>
    )
}