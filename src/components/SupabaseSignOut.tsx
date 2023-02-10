import React from 'react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'




function SupabaseLogin() {

    const session = useSession(); //tokens, when session exists, we have a user
    const supabase = useSupabaseClient(); // talk to supabase

    async function signOut() {
        await supabase.auth.signOut()
    }

    return (
        <button
            onClick={() => { signOut() }}>
            Sign out
        </button>
    )
}

export default SupabaseLogin