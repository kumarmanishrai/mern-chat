import './App.css';
import React, {useState, useEffect} from 'react';
import io from 'socket.io-client'

const socket = io();

function App() {
	const [isConnected, setIsConnected] = useState(socket.connected);
	const [msg, setMsg] = useState([]);
	useEffect(()=>{
		socket.on('connect', ()=>{
			setIsConnected(true)
		})

		socket.on('disconnect', ()=> {
			setIsConnected(false)
		})
		
	},[])

	

  return (
    <div className="App">
	  <p>Connected: { '' + isConnected }</p>
      <div className='chats'>
		
	  </div>
	  <form id="form" action="/">
	  	<input id="input" value={msg} autocomplete="off" 
	  		onChange={(e)=>{
			setMsg(e.target.value)}
			}
	  		onKeyDown= {(e)=>{
				if(e.key == "Enter"){
					socket.emit("msg", msg)
					setMsg("")
				}
			}}
	  />
	  </form>
		</div>
	  );
	}

	export default App;
