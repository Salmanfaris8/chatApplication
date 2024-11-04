import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import socket from '../socket'
import { addMessage } from '../redux/chatSlice'
import ScrollableFeed from 'react-scrollable-feed'



const ChatMessages = ({ name }) => {

  const [message, setMessage] = useState('');
  const {messages} = useSelector(state => state.chatReducer)
  // console.log(messages);

  const dispatch = useDispatch()



  useEffect(() => {
    //  listen for 'chat message' event from server
    socket.on('chat message', (message) => {
      // Add the received message to the Redux store
      dispatch(addMessage(message))


    })

    return () => {
      socket.off('chat message')
    }


  }, [dispatch])
  const sendMessage = () => {
    if (message) {
      const newMessage = {
        id: Date.now(),
        text: message,
        user: name,
        userId: socket.id
      };

      socket.emit('chat message', newMessage);

      setMessage('');
    }
  };


  return (
    <div className='d-flex flex-column rounded-bottom justify-content-between py-3 px-2 ' style={{ backgroundColor: "#e9ecef",height:"25rem"}}>
        <ScrollableFeed>

      <ul style={{}}>

          {
            messages?.map((msg, index) => (
              <li key={index}>
                {
                  socket.id == msg.userId ?
                    <>
                      <h6 style={{ float:"right"}}>You : {msg.text}</h6>
                      <br />
                    </>
                    :
                    <>
                      <h6>{msg.user} : {msg.text}</h6>
                    </>
                }
              </li>
            ))}

      </ul>
              </ScrollableFeed>
      <div className='d-flex'>
        <input
          className='w-75'
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.code === 'Enter' ? sendMessage() : null}
        />
        <button onClick={sendMessage} className='btn btn-success rounded shadow ms-3'>send</button>
      </div>
    </div>
  )
}

export default ChatMessages