import { useState } from 'react'
import './App.css'
import { FaRegTimesCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";
function App() {
   
    const [input , setInput] = useState([]);
    const [name , setName] = useState([]);
    const [data , setData] = useState(0);
    const [edit , setEdit] = useState([])
    const [complete , setComplete] = useState(false)
    const [inputDisabled , setInputDisabled] = useState(false)

    const handleChange =(e)=>{
      const value = e.target.value;
      
      setInput(value )
    }

    const handleClick =()=>{
      if(input.trim() !==''){
        setData((prev)=> prev + 1 )
        setName([...name , {
          id : data,
          value: input
        }])
        setInput([])
        
      }
     
    }
  
    const removeClick = () =>{
        setName([])
    }
    const singleRemove = (id) =>{
     const updatedArray = (name.filter((item)=> item.id !== id))
     setName(updatedArray)
     
    }
    
    const singleEdit= (id)=>{
      const editedArray = name.find((item)=> item.id === id);
      setEdit(editedArray.id)
      setComplete(false)
      setInputDisabled(true)
      
    }
const completeEdit= (id)=>{
  setComplete(true)
  const editedArray = name.find((item)=> item.id === id);
  editedArray.value = input
  setInput([])
  setInputDisabled(false)
}

  return (
    <>
      <div>
        <div className='app'>
          <h2 className='title'>To Do App</h2>
          <div className='input-entry'>
            <input className='main-input' disabled={inputDisabled === true}  onChange={handleChange} value={inputDisabled ? null : input}  type="text" />
            <button className='main-button' onClick={handleClick}>Ekle</button>
          </div>
          <div>
            <ul className='list'>
              {
                name.map((item , index )=>(
                  <li className='list-item' key={item.id} >
                    {
                      edit === item.id  ? 
                      <div>
                        {
                          complete === false ? 
                          <div>
                            <input className='complete-input' onChange={handleChange}  type="text" />
                        <button className='complete-btn' key={index}  id={item.id} onClick={()=>completeEdit(item.id)} ><CiCircleCheck /></button>
                          </div> :
                           <div className='completeFalse'>
                           <div className='item-value'>{item.value}</div>
                     <div className='main-buttons-2'>
                     <button key={index}  id={item.id}  onClick={()=>singleRemove(item.id)} >< FaRegTimesCircle /></button>
                     <button key={item.id}  id={item.id} onClick={()=>singleEdit(item.id)}><FaEdit /></button>
                     </div>
                         </div>
                        }
                      </div> :
                      <div className='completeFalse'>
                        <div className='item-value'>{item.value}</div>
                  <div className='main-buttons'>
                  <button key={index}  id={item.id}  onClick={()=>singleRemove(item.id)} >< FaRegTimesCircle /></button>
                  <button key={item.id}  id={item.id} onClick={()=>singleEdit(item.id)}><FaEdit /></button>
                  </div>
                      </div>
                    }
                  </li>
                  
                ))
              }
            </ul>
          </div>
          <div>
            <button onClick={removeClick}>Hepsini Sil </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
