'use client'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Button } from './Button'
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const registerInputs = {
  email: '',
  password: '',
  name: '',
};

const RegisterModal = () => {
  const [open, setOpen] = useState(false)
  const { name, email, password, onInputChange } = useForm(registerInputs);

  const cancelButtonRef = useRef(null)

  
  const fetchRegister = async (data) => {
    const requestOptions = {
      method: 'POST',
      'mode': 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    const res = await fetch('http://localhost:3000/api/users/register', requestOptions)
    return await res.json()
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetchRegister({ name, email, password })
    console.log(res)
  }

  return (
    <>
      <Button theme={'primary'} onClick={() => { setOpen(true) }}>Registrarse</Button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="px-6 py-6 lg:px-8 ">
                    <h3 className="mb-4 text-xl font-medium text-gray-900 ">Registrarse</h3>
                    <form onSubmit={handleSubmit} className="space-y-6" action="#">
                      <div>
                        <label
                          className="block mb-2 text-sm font-medium text-gray-900 "
                          htmlFor="name" >
                          Nombre
                        </label>
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          type="text"
                          name="name"
                          id="name"
                          value={name}
                          onChange={onInputChange}
                          placeholder="John Doe" required />
                      </div>
                      <div>
                        <label
                          className="block mb-2 text-sm font-medium text-gray-900 "
                          htmlFor="email" >
                          Email
                        </label>
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          type="email"
                          name="email"
                          id="email"
                          value={email}
                          onChange={onInputChange}
                          placeholder="john@gmail.com" required />
                      </div>
                      <div>
                        <label
                          className="block mb-2 text-sm font-medium text-gray-900 "
                          htmlFor="password" >
                          Contraseña
                        </label>
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required
                          type="password"
                          name="password"
                          id="password"
                          value={password}
                          onChange={onInputChange}
                          placeholder="••••••••"
                        />
                      </div>
                      <Button
                        type={'submit'}
                        theme={'primary'}>
                        Registrarse!
                      </Button>
                      <div className="text-sm font-medium text-gray-500">
                        ¿Ya tienes una cuenta? <Link href="#" className="text-orange-700 hover:underline">Iniciar sesion!</Link>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default RegisterModal

import React from "react";
import Link from 'next/link'
import { useForm } from '../utils/form';

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
