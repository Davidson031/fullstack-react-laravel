import { Fragment, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from '../axios'

export default function Toast() {

    const { toast  } = useStateContext();

    return (

        <>
            {toast.show &&
                <div className='w-[300px] py-2 px-3 text-white rounded bg-emerald-500 fixed right-4 bottom-4 z-50'>
                    { toast.message }
                </div>
            }
        </>
    )
}