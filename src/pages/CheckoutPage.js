import { useForm } from "react-hook-form";
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom';
import Navbar from '../features/navbar/Navbar';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { discountedPrice } from "../app/data";
import {
  
  deleteItemFromCartAsync,
  increment,
  
  incrementAsync,
  updateCartAsync,
  
} from '../features/cart/CartSlice'

import { createOrderAsync } from "../features/order/OrderSlice";
import { updateUserAsync } from "../features/user/userSlice";



 
 
 
 export default function CheckoutPage(){
  const user=useSelector((state)=>state.user.userInfo);
  const x=useSelector((state)=>state.user.userInfo.addresses);
  const [selectedAddress,setSelectedAddress]=useState(null);
const [PaymentMethod,setPaymentMethod]=useState('cash');
const currentOrder=useSelector((state)=>state.order.currentOrder);
console.log(PaymentMethod);
const handleAddress=(e)=>{
    setSelectedAddress(user.addresses[e.target.value]);
    console.log(user.addresses[e.target.value]);

}
const handlePayment=(e)=>{
  setPaymentMethod(e.target.value);
  console.log(e.target.value);
}
console.log(user);
const handleOrder=(e)=>{
  // setPaymentMethod(e.target.value);
  // todo:redirect to order success page
  // todo:clear cart after order
  // todo:on server change the stock number
  const order={items,totalAmount,totalItems,user,PaymentMethod,selectedAddress,
    status:'pending'  
    // other status can be delievered or received;
  }
  dispatch(createOrderAsync(order));
 
}


  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  
  
  const items=useSelector((state)=>state.cart.items);
  const totalAmount=items.reduce((amount,item)=>discountedPrice(item)*item.quantity+amount,0);
  const totalItems=items.reduce((total,item)=>item.quantity+total,0);
  const dispatch=useDispatch();
  const handleQuantity=(e,item)=>{
    dispatch(updateCartAsync({...item,quantity:+e.target.value}));
    
  }
  const handleRemove=(e,id)=>{
    dispatch(deleteItemFromCartAsync(id));
  }
    const [open, setOpen] = useState(true)
    return (

        <>
          {!items.length && <Navigate to='/' replace={true}></Navigate>}
          {currentOrder && <Navigate to={`/order-success/${currentOrder.id}`}></Navigate>}

        <Navbar></Navbar>
         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
         <form className="bg-white px-5 mt-12 py-12 " noValidate onSubmit={handleSubmit((data)=>{
            console.log(data);
            dispatch(updateUserAsync({...user,addresses:[...user.addresses,data]}));
            reset();
            
         })}>
         <div className="space-y-12">
       
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-2xl font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Full name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('name',{required:' name is required'})}
                 
                  id="name"

                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
                
            </div>

         

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                {...register('email',{required:'email is required'})}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Phone
              </label>
              <div className="mt-2">
              <input
                  id="Phone"
                  {...register('phone',{required:'phone is required'})}
                  type="tel"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
               
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                {...register('street',{required:' street is required'})}
                  type="text"
                 
                  id="street"
                  
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('City',{required:' City is required'})}
                  id="city"
                  
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('state',{required:' state is required'})}
                  id="state"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('pinCode',{required:' pinCode is required'})}
                  id="pinCode"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add address
        </button>
      </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Existing Adress</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Choose from existing address
          </p>
          <ul role="list" className="divide-y divide-gray-100">
      {  user.addresses && user.addresses.map((person,index) => (
        <li key={index} className="flex justify-between gap-x-6 py-5 px-5 border-solid border-2 border-gray-200">
          <div className="flex min-w-0 gap-x-4 ">
          <input
                  onChange={(e)=>{
                    handleAddress(e);
                  }}
                 
                  
                  value={index}
                    name="address"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
           
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.street}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.pinCode}</p>
            </div>
           
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">{person.phone}</p>
            <p className="text-sm leading-6 text-gray-900">{person.City}</p>
            </div>
          
        </li>
      ))}
    </ul>

          <div className="mt-10 space-y-10">
           
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">Payment Methods</legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">Choose One</p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                   onChange={(e)=>{
                    handlePayment(e);
                   }}
                    id="Cash"
                    name="Payments"
                    type="radio"
                    value="cash"
                    checked={PaymentMethod==="cash"}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="Cash" className="block text-sm font-medium leading-6 text-gray-900">
                    Cash
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                   onChange={(e)=>{
                    handlePayment(e);
                   }}
                    id="Card"
                    name="Payments"
                    value="card"
                    checked={PaymentMethod==="card"}
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                    Card
                  </label>
                </div>
               
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      
    </form>
    
    </div>
    <div className="lg:col-span-2">
    < div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white mt-12">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">Cart</h1>
          <div className="border-t border-gray-200 px-0 py-6 sm:px-0">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {items.map((product) => (
                              <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href={product.href}>{product.name}</a>
                                      </h3>
                                      <p className="ml-4">{discountedPrice(product)}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">

                                    <div className="text-gray-500">
                                    <label htmlFor="quantity" className="inline mr-5 text-sm font-medium leading-6 text-gray-900">
                                    Qty
                                         </label>
                                     

                                       <select onChange={(e)=>{
                                        handleQuantity(e,product)
                                       }}>
                                        <option value="1">
                                          1

                                        </option>
                                        <option value="2">
                                          2

                                        </option>
                                        <option value="3">
                                          3

                                        </option>
                                        <option value="4">
                                          4

                                        </option>
                                        <option value="4">
                                          5

                                        </option>
                                        <option value="4">
                                          6

                                        </option>

                                       </select>
                                    </div>

                                    <div className="flex">
                                      <button
                                        onClick={(e)=>{
                                          handleRemove(e,product.id);
                                        }}
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
          </div>
           <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900 my-2">
                        <p>Subtotal</p>
                        <p>{totalAmount}</p>
                      </div>
                      <div className="flex justify-between text-base font-medium text-gray-900 my-2">
                        <p>Total Items in Cart</p>
                        <p>{totalItems} items</p>
                      </div>



                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div>
                      <div className="mt-6">
                        <div
                        onClick={(e)=>{
                          handleOrder(e);
                        }}
                          className="flex  cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Order Now
                        </div>
                      </div>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <Link to='/'>
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                          </Link>
                        </p>
                      </div>
            </div>
                    

                   
       
    
     </div>
   
    </div>
    
    </div>
    </div>
   </>

    );
}