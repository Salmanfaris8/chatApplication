import React from 'react'

const ChatHeader = ({name}) => {
  return (
    <div className='w-100 bg-success rounded-top p-2 d-flex align-items-center' style={{minHeight:"30px"}}>
        <img width={40} className='rounded-circle ' src="https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg"  alt="" />
        <h5 className='text-white ms-2'>{name}</h5>
    </div>
  )
}

export default ChatHeader