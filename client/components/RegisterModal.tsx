'use client'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Button } from './Button'
import { useFormik } from 'formik';
import Link from 'next/link';
import * as yup from 'yup'
import instance from '../utils/instance';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
 
const RegisterModal = () => {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(false)

  const cancelButtonRef = useRef(null)
  
  const validationSchema = yup.object().shape({
    name: 
      yup.string()
        .required('campo obligatorio')
        .min(4, 'Mínimo 4 caracteres')
        .max(24, 'Máximo 24 caracteres'),
    email: 
      yup.string()
        .required('Campo obligatorio')
        .max(32, 'Máximo 32 caracteres')
        .email('Email inválido'),
    password: 
      yup.string()
        .min(4, 'Mínimo 4 caracteres')
        .max(25, 'Máximo 32 caracteres')
        .required('Campo obligatorio'),
    repeatPassword:
      yup.string()
        .required('Campo obligatorio')
        .min(4, 'Mínimo 4 caracteres')
        .max(25, 'Máximo 32 caracteres')
        .oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
  })

  
  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
      repeatPassword: '',
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        alert(JSON.stringify(values, null, 2));

        const res = await instance.post('/users/register', values)
        console.log(res)
        localStorage.setItem('token', res.data.access_token);
        setOpen(false)
        toast.success('Cuenta creada correctamente !', {
          position: toast.POSITION.BOTTOM_CENTER
        });
      } catch(e) {
        console.log(e)
      }
    }
  })

  const { errors, values, handleChange, handleSubmit, handleBlur, touched } = formik

  return (
    <>
      <Button theme={'primary'} onClick={() => { setOpen(true) }}>Registrarse</Button>
      <ToastContainer />
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
                          onChange={handleChange}
                          value={values.name}
                          onBlur={handleBlur}
                          placeholder="John Doe" 
                        />
                        {errors.name && touched.name && <p className='py-2 text-red-600 text-sm'>{errors.name}</p>}
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
                          onChange={handleChange}
                          value={values.email}
                          onBlur={handleBlur}
                          placeholder="john@gmail.com" />
                          {errors.email && touched.email && <p className='py-2 text-red-600 text-sm'>{errors.email}</p>}
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
                          onChange={handleChange}
                          value={values.password}
                          onBlur={handleBlur}
                          placeholder="••••••••"
                        />
                        {errors.password && touched.password && <p className='py-2 text-red-600 text-sm'>{errors.password}</p>}
                      </div>
                      <div>
                        <label
                          className="block mb-2 text-sm font-medium text-gray-900 "
                          htmlFor="repeatPassword" >
                          Repetir Contraseña
                        </label>
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required
                          type="password"
                          name="repeatPassword"
                          id="repeatPassword"
                          onChange={handleChange}
                          value={values.repeatPassword}
                          onBlur={handleBlur}
                          placeholder="••••••••"
                        />
                        {errors.repeatPassword && touched.repeatPassword && <p className='py-2 text-red-600 text-sm'>{errors.repeatPassword}</p>}
                      </div>
                      <Button
                        type={'submit'}
                        theme={'primary'}>
                        Registrarse!
                      </Button>
                      {error ? <p className='py-2 text-red-600 text-md'>Las cuenta ya existe</p> : null}
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