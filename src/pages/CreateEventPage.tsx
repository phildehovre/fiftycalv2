import React from 'react'
import { useSession } from '@supabase/auth-helpers-react'
import CreateEventForm from '../components/CreateEventForm'

function CreateEventPage() {

    const session = useSession()
    return (
        <>
            <CreateEventForm />
        </>

    )
}

export default CreateEventPage