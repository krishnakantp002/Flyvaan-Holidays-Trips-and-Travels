import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Tours from '../pages/Tours'
import TourDetails from '../pages/TourDetails'
import SearchResultList from '../pages/SearchResultList'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Booked from '../pages/Booked'
import MyAccount from '../Dashboard/UserAccount/MyAccount'
import Bookings from '../Dashboard/AdminPanel/Bookings'
import AdminTours from '../Dashboard/AdminPanel/AdminTours'
import CreateTours from '../Dashboard/AdminPanel/CreateTours'
import UpdateTours from '../Dashboard/AdminPanel/UpdateTour'
import Payment from '../pages/Payment'
import AdminContacts from '../Dashboard/AdminPanel/AdminContacts'
import AdminRequests from '../Dashboard/AdminPanel/AdminRequests'
import AdminGallery from '../Dashboard/AdminPanel/AdminGallery'
import { AuthContext } from '../context/AuthContext'

const Router = () => {
  const { role } = useContext(AuthContext);

  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' />} />
      <Route path='/home' element={<Home />} />
      <Route path='/my-account' element={<MyAccount />} />
      <Route path='/all-booking' element={role === 'admin' ? <Bookings /> : <Navigate to='/home' />} />
      <Route path='/all-tours' element={role === 'admin' ? <AdminTours /> : <Navigate to='/home' />} />
      <Route path='/update-tour/:id' element={role === 'admin' ? <UpdateTours /> : <Navigate to='/home' />} />
      <Route path='/create' element={role === 'admin' ? <CreateTours /> : <Navigate to='/home' />} />
      <Route path='/all-contacts' element={role === 'admin' ? <AdminContacts /> : <Navigate to='/home' />} />
      <Route path='/admin-requests' element={role === 'admin' ? <AdminRequests /> : <Navigate to='/home' />} />
      <Route path='/admin-gallery' element={role === 'admin' ? <AdminGallery /> : <Navigate to='/home' />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/tours' element={<Tours />} />
      <Route path='/tours/:id' element={<TourDetails />} />
      <Route path='/pay/:id' element={<Payment />} />
      <Route path='/about' element={<About />} />
      <Route path='/booked' element={<Booked />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/tours/search' element={<SearchResultList />} />
    </Routes>
  )
}

export default Router
