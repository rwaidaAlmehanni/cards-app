import { useState, useRef } from 'react'
// useState => if we need to rerender component in each change & if we need change reflect immeduitley on the ui
// useRef => if we don't need the component rerender & if we need to read and access dom element
export default function Player() {
  const nameRef = useRef()
  const [name, setName] = useState()

  const clickHandler = () => { 
    setName(nameRef.current.value)
    nameRef.current.value = ''
  }

  return (
    <section id="player">
      <h2>Welcome {name? name : 'unknown entity'}</h2>
      <p>
        <input ref={ nameRef } type="text" />
        <button onClick={ clickHandler }>Set Name</button>
      </p>
    </section>
  );
}
