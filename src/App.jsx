import './App.css'
import { Provider } from 'react-redux'
import chatStore from './redux/chatStore'
import { useEffect, useState } from 'react'
import socket from './socket'
import ChatInput from './components/ChatInput'


function App() {

  const [isGetStarted, setIsGetStarted] = useState(false)

  useEffect(() => {
    socket.connect()

    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <>
      <Provider store={chatStore}>
        <div className="d-flex flex-column justify-content-center align-items-center main" style={{ minHeight: "90vh" }}>
          {
            isGetStarted ?
              <div  className="d-flex flex-column justify-content-center align-items-center ">
              <ChatInput />
                
              </div>
              :
              <div className="d-flex flex-column justify-content-center align-items-center">
              <h1 className="fw-bolder text-success" style={{fontFamily:"monospace"}}>CHAT APP</h1>
                <img width={500} src="https://seeklogo.net/wp-content/uploads/2020/11/google-chat-logo.png" alt="" />
                <h3 className="fw-bolder">Engage in a high-quality discussion </h3>
                <button onClick={() => setIsGetStarted(true)} className='btn btn-success mt-2 fw-bolder rounded-5 px-4'>GET STARTED</button>
              </div>
          }
        </div>

      </Provider>
    </>
  )
}

export default App
