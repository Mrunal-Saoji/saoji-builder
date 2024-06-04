import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import { getAuthUserDetails, verifyAndAcceptInvitation } from '@/lib/queries'

type Props = {}

const Page = async(props: Props) => {

    
    const agencyId = await verifyAndAcceptInvitation()

    //get user details
    const user = await getAuthUserDetails()

  return (
    <div>Agency</div>
  )
}

export default Page