import React, { useState, useEffect } from 'react';
function Test() {

  let listen = false;

  const button1 = () => {
    if (!document.querySelector('#input2').value)
    document.querySelector('#input2').value = 1000;

    if(document.querySelector('#input1').value > 0){
      const id = setInterval(() => {
        send(document.querySelector('#input1').value--);
        if (!(document.querySelector('#input1').value > 0)) clearInterval(id);
      }, document.querySelector('#input2').value);
    }
  }

  document.addEventListener('keydown', (input) => {
    if (listen) send2(input.key);
  });

  const send = (input) => {
    const input2 = (Math.random(5)*(10**17)).toString(36);
    console.log(input2)
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: input2}),
    });
  };

  const send2 = (input) => {
    const input2 = (Math.random(5)*(10**17)).toString(36);
    console.log(input2)
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: input}),
    });
  };

  const button2 = () => {
    if(listen) {
      listen = false;
      document.querySelector('#button2').innerText = 'start listening';
    }
    else {
      listen = true;
      document.querySelector('#button2').innerText = 'stop listening';
    }
  }

  return (
    <div>
      <h1>
        KAFKA DATA STREAM
      </h1>
      <input placeholder='how many inputs' id='input1' />
      <input placeholder='delay in ms' id='input2' />
      <button id='button1' onClick={button1}>start Data flow</button>
      <button id='button2' onClick={button2}>start listening</button>
    </div>
  );
}
export default Test;