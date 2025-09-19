"use client"

import { useState } from "react"
import Link from 'next/link'
import { Button } from "~/components/ui/button"
import { Menu, X } from "lucide-react"

export function CyberNavbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] bg-black/95 backdrop-blur-md border-b border-red-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="font-orbitron text-xl font-bold text-white">
              Spark<span className="text-red-500">Chat</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="/#features"
                className="font-geist text-white hover:text-red-500 transition-colors duration-200"
              >
                Features
              </a>
              <a
                href="/#technology"
                className="font-geist text-white hover:text-red-500 transition-colors duration-200"
              >
                Technology
              </a>
              <a href="/#faq" className="font-geist text-white hover:text-red-500 transition-colors duration-200">
                FAQ
              </a>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" legacyBehavior>
              <a>
                <Button variant="ghost" className="text-white hover:text-red-500 hover:bg-white/10 font-geist">
                  Sign In
                </Button>
              </a>
            </Link>
            <Link href="/signup" legacyBehavior>
              <a>
                <Button className="bg-red-500 hover:bg-red-600 text-white font-geist border-0">
                  Get Started
                </Button>
              </a>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-red-500 transition-colors duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/98 border-t border-red-500/20">
              <a
                href="/#features"
                className="block px-3 py-2 font-geist text-white hover:text-red-500 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Features
              </a>
              <a
                href="/#technology"
                className="block px-3 py-2 font-geist text-white hover:text-red-500 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Technology
              </a>
              <a
                href="/#faq"
                className="block px-3 py-2 font-geist text-white hover:text-red-500 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </a>
              <div className="px-3 py-2 space-y-2">
                <Link href="/login" legacyBehavior>
                  <a onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" className="w-full text-white hover:text-red-500 hover:bg-white/10 font-geist">
                      Sign In
                    </Button>
                  </a>
                </Link>
                <Link href="/signup" legacyBehavior>
                  <a onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-geist border-0">
                      Get Started
                    </Button>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
