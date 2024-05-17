'use client'
import React from 'react'
import AdminMessages from '../../components/Adminmessage/Adminmesg'
import AdminMiddleware from '../AdminMiddleware';

function page() {
  return (
    <div>
      <AdminMessages />
    </div>
  )
}

export default AdminMiddleware(page);
