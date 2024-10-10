import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/sidebar'
import AuxiliaryProvider from '@/components/auxiliary-provider'


type Props = { children: React.ReactNode }


const Layout = async (props: Props) => {
    const session = await getServerSession(authOptions);
    console.log(session)
    if (!session || !session?.user) {
        redirect('/');
    }

    return (
        <div className="flex !h-screen w-screen">
            {/* <Sidebar /> */}
            <Sidebar />
            <AuxiliaryProvider>
                {props.children}
            </AuxiliaryProvider>
        </div>
    )
}

export default Layout
