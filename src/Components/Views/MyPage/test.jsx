import { useState } from "react";
import axios from "axios";

export default function Test() {
  const [name, setName] = useState('');
  const [pwd, setPwd] = useState('');

  async function submit(e) {
    e.preventDefault();

    try {
      const res = await axios.post('url', {
        displayName: name,
        newPassword: pwd
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
    }catch(err){
      console.log(err)
    }
  }

  return (
    <form onSubmit={submit}>
      <input 
        type="text" 
        name='display'
        value={name}
        onChange={(e)=>{setName(e.target.value)}}
      />
      <input 
        type="text" 
        name='password'
        value={pwd}
        onChange={(e)=>{setPwd(e.target.value)}}/>
      <input type="submit" />

    </form>
  )
}