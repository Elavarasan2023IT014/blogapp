'use client'
import React, { useEffect, useState } from 'react'
import '../styles/Navbar.css'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [openOption, setOpenOption] = useState(false);
  const [role, setRole] = useState('user');

  useEffect(() => {
    let storedrole = localStorage.getItem('role');
    if (storedrole) {
      setRole(storedrole);
    }
  }, [])

  async function handleSignOut() {
    const res = await fetch('api/auth/logout', {
      method: 'POST',
    });

    const data = await res.json();

    if (data.success) {
      setRole('user');
      localStorage.setItem('role', 'user');
      router.replace('/login');
    }
  }

  return (
    <nav>
      <ul className='navbar'>
        <li><Link href='/'><h2 className='h2'>Blog App</h2></Link></li>

        <li className='nav-headers'>
          {pathname == '/' && (<h2>HOME</h2>)}
          {pathname == '/dashbord' && (<h2>Admin-Dashbord</h2>)}
          {pathname == '/login' && (<h2>Login</h2>)}
          {pathname == '/admin-login' && (<h2>Admin-Login</h2>)}
          {pathname == '/profile' && (<h2>User Profile</h2>)}
          {pathname == '/admin-profile' && (<h2>Admin-Profile</h2>)}
        </li>

      <li>
        <div>
          {!session && role == 'user' && (
            <div className='role-login-btns'>
              <Link href='/login'><button className='nav-login-btn'>Login</button></Link>
              <Link href='/admin-login'><button className='nav-admin-btn'>Admin</button></Link>
            </div>
          )}

          {session && (
            <div className='profile-container'>
              <div className='profile'>
                <button className='img-profile-btn' onClick={() => setOpenOption(!openOption)}>
                  <Image src={session.user?.image} alt='user image' height={60} width={60} className='img-profile' />
                </button>
              </div>
              {openOption && (
                <div className='drop-menu'>
                  <Link href='/'>Home</Link>
                  <Link href='/profile'>Profile</Link>
                  <button className='nav-signout' onClick={() => { signOut() }}>SignOut</button>
                </div>
              )}
            </div>
          )}

          {role == 'admin' && (
            <div className='profile-container'>
              <div className='profile'>
                <button className='img-profile-btn' onClick={() => setOpenOption(!openOption)}>
                  <Image src='/prfile.png' alt='admin profile' height={200} width={200} className='img-profile' />
                </button>
              </div>
              {openOption && (
                <div className='drop-menu'>
                  <Link href='/'>Home</Link>
                  <Link href='/admin-profile'>Profile</Link>
                  <button className='nav-signout' onClick={() => handleSignOut()}>SignOut</button>
                </div>
              )}
            </div>
          )}

        </div>
      </li>

      </ul>
    </nav>
  )
}

export default Navbar