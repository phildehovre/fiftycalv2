import React from 'react'
import SupabaseLogin from './SupabaseLogin'
import SupabaseSignOut from './SupabaseSignOut'
import { Link } from 'react-router-dom'
import './Nav.scss'
import { Session, useSession } from '@supabase/auth-helpers-react'
import CreateTemplatePage from '../pages/CreateTemplatePage'



function Nav() {

    const session: Session | null = useSession()

    return (
        <div className='nav-ctn'>
            <div className='logo'>FC</div>
            <div className='links-ctn'>
                <Link to='/'>Home</Link>

                {session
                    ? <>
                        <Link to='/template'>New template</Link>
                        <Link to='/event'>New event</Link>
                        <SupabaseSignOut />
                        <div className='user-icon'>
                            {
                                //@ts-ignore
                                session?.user.email[0].toUpperCase()
                            }</div>
                    </>
                    : <SupabaseLogin />
                }
            </div>
        </div>
    )
}

export default Nav