'use client'
import { Bell, LogOut } from 'lucide-react'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { useSidebarStore } from '@/store/sidebar'
import { usePathname } from 'next/navigation'
import { ModeToggle } from './ModeToggle'

export default function Topbar() {
    const [openDialog, setOpenDialog] = useState(false);
    const { sidebarVisibility, isCollapsed, toggleSidebarVisibility } = useSidebarStore();

    const capitalizeFirstLetter = (str: string) => {
        return str?.charAt(1).toUpperCase() + str.slice(2).toLowerCase();
    };

    const pathName = usePathname();
    return (
        <div className='dark:border-2 dark:border-shadow shadow-md rounded-xl flex px-4 items-center border-accent min-h-[4rem]'>
            <HamburgerMenuIcon onClick={() => toggleSidebarVisibility(true)} className='mr-4 cursor-pointer block md:hidden' />
            <div className="w-full">
                <span className="text md:text-lg relative">
                    {capitalizeFirstLetter(pathName)}
                </span>
            </div>
            <div className='flex items-center gap-4'>
                <ModeToggle />
                <Bell className='cursor-pointer' size={18} />
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogTitle onClick={() => setOpenDialog(true)}>
                        <LogOut className='hover:text-red-400 cursor-pointer' size={18} />
                    </DialogTitle>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Do you want to logout ?</DialogTitle>
                        </DialogHeader>
                        <div className='flex flex-col w-full mt-6 gap-4'>
                            <Button variant={'destructive'} className='w-full' onClick={async () => await signOut()}>Yes, please</Button>
                            <Button variant={'outline'} className='border-2 w-full border-accent' onClick={() => setOpenDialog(false)}>No , thanks</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}