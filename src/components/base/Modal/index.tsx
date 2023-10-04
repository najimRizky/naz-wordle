"use client"

import { useEffect, useState } from 'react'
import IModal from './interface'
import CloseIcon from '@/components/icons/CloseIcon'
import { AnimatePresence, motion } from 'framer-motion'
import { modalVariant } from './variant'

const Modal = ({ children, size = "md", onClose, isOpen, title }: IModal) => {

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto'
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={modalVariant}
          initial="hidden"
          animate="visible"
          exit="hidden"
          style={{
            animationFillMode: 'forwards',
          }}
          className={`
            duration-300 fixed z-50 inset-0 overflow-y-auto
          `}
        >
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <BgOverLay />
            <CenterModal />
            <div
              className={`
              inline-block align-middle rounded text-left bg-white overflow-hidden shadow-xl transform my-16 w-full
              ${size === 'sm' ? 'sm:max-w-[24rem]'
                  : size === 'md' ? 'sm:max-w-[32rem]'
                    : size === 'lg' ? 'sm:max-w-[40rem]'
                      : size === 'xl' ? 'sm:max-w-[48rem]'
                        : 'sm:max-w-full'
                } 
            `}>
              <div className="px-8 pt-8 flex justify-between gap-x-4;">
                {title && <h1 className="text-2xl font-bold">{title}</h1>}
                <div
                  onClick={onClose}
                  className={`
                  cursor-pointer
                  ${!title ? 'ml-auto' : ''}
                `}

                >
                  <CloseIcon />
                </div>
              </div>
              <div className="p-8">
                {children}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal

const BgOverLay = () => (
  <div className="fixed inset-0" aria-hidden="true">
    <div className="absolute inset-0 bg-[rgba(0,0,0,0.8)] opacity-75"></div>
  </div>
)

const CenterModal = () => (
  <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
)