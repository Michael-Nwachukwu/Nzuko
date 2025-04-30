"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
// If that doesn't work, you might need to create this component
import { DashboardIcon } from "@radix-ui/react-icons"
import { Menu, X } from "lucide-react"
import CustomConnectButton from "./ConnectButton"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <header className="flex justify-between items-center px-2 sm:px-4 py-2">
        <Link href="/" className="">
          <Image src="/logo.png" alt="logo" width={50} height={50} />
        </Link>
        <nav className="flex items-center">
          <div className="flex items-center gap-2 sm:gap-5 text-stone-300/70 text-sm font-semibold">
            {/* Time - visible on all screens */}
            <p className="block uppercase">
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}{" "}
              GMT +1
            </p>

            {/* Navigation links - hidden on mobile */}
            <div className="hidden sm:flex items-center gap-5">
              <Link
                href="/manage-event"
                className="inline-flex items-center gap-1.5 hover:text-stone-200 text-sm sm:text-base"
              >
                Manage Events
                <DashboardIcon />
              </Link>
              <Link href="/events" className="inline-flex items-center gap-2 hover:text-stone-200 text-sm sm:text-base">
                Explore Events
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-3.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </Link>
            </div>

            {/* Connect button - visible on all screens */}
            {/* <CustomConnectButton /> */}
            {/* Temporary placeholder for the connect button */}
            <CustomConnectButton />

            {/* Hamburger menu - only visible on mobile */}
            <button
              onClick={toggleMenu}
              className="ml-2 sm:hidden text-stone-300/70 hover:text-stone-200"
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
              </svg>

              {/* <Menu size={24} /> */}
            </button>
          </div>
        </nav>
      </header>

      {/* Off-screen menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black/95 z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full p-5">
          <div className="flex justify-end mb-6">
            <button onClick={toggleMenu} className="text-stone-300/70 hover:text-stone-200" aria-label="Close menu">
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col gap-6 text-stone-300/70 font-semibold">
            <Link
              href="/manage-event"
              className="inline-flex items-center gap-1.5 hover:text-stone-200 text-base"
              onClick={toggleMenu}
            >
              Manage Events
              <DashboardIcon />
            </Link>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 hover:text-stone-200 text-base"
              onClick={toggleMenu}
            >
              Explore Events
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-3.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay when menu is open */}
      {isMenuOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={toggleMenu} aria-hidden="true" />}
    </>
  )
}

export default Navbar