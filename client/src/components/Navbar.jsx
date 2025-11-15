import React from 'react'
import useAccountStore from '../stores/store.account'
import ThemeSelect from './ThemeSelect'
import {Link} from "react-router-dom"
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  let navigate = useNavigate()
  let {authUser,isLogingOut,logOutStore} = useAccountStore()

  async function logOutHandle() {
    await logOutStore()
  }

  return (
    <nav className="navbar shadow-base-300/20 shadow-sm bg-primary-900 h-16">
  <div className="w-full md:flex md:items-center md:gap-2">
    <div className="flex items-center justify-between">
      <div className="navbar-start items-center justify-between max-md:w-full">
        <Link to={"/home"}
          className="link text-base-content link-neutral text-3xl font-bold no-underline flex items-center gap-2"
        >
          <img
            src="../mmlogo.png"
            alt=""
            className="h-15 max-w-full object-contain"
          />
          <div className="text-nowrap">Meow Media</div>
        </Link>        
        <div className="md:hidden">
          <button type="button" className="collapse-toggle btn btn-outline btn-secondary btn-sm btn-square" data-collapse="#default-navbar-collapse" aria-controls="default-navbar-collapse" aria-label="Toggle navigation" >
            <span className="icon-[tabler--menu-2] collapse-open:hidden size-4"></span>
            <span className="icon-[tabler--x] collapse-open:block hidden size-4"></span>
          </button>
        </div>
      </div>
    </div>
    <div id="default-navbar-collapse" className="md:navbar-end collapse hidden grow basis-full overflow-hidden transition-[height] duration-300 max-md:w-full" >
      {authUser? <ul className="menu md:menu-horizontal gap-3 p-0 h-16">
          <li className='rounded-none'>
            <a
              href={`/chats`}
              className="flex items-center gap-1 h-full px-2 hover:bg-primary/10 rounded-none"
            >
              <span className='icon-[fluent--chat-12-filled] text-3xl text-info'></span>
              <div className="text-neutral text-lg font-bold">Chats</div>
            </a>
          </li>

          <li className='rounded-none'>
            <a
              href={`/profile`}
              className="flex items-center gap-2 h-full px-2 hover:bg-primary/10 rounded-none"
            >
              <img className="h-8 object-contain" src={authUser.avatar} alt="" />
              <div className="text-neutral text-base font-bold">{authUser.name}</div>
            </a>
          </li>

          <li className='rounded-none'>
            <button onClick={logOutHandle}
              className="flex items-center justify-center gap-1 h-full px-2 hover:bg-primary/10 rounded-none"
            >
              <span className='icon-[material-symbols--logout-rounded] text-xl text-error/70'></span>
              <div className="text-error/70 text-lg font-bold">Log out</div>
            </button>
          </li>
        </ul>
        : ""}
    </div>
  </div>
</nav>
  )
}

export default Navbar