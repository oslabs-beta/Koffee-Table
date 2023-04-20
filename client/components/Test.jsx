import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

function Test() {
  // const socket = io('http://localhost:3001');
  // socket.on('connect', () => {
  //   console.log(`You connected with id: ${socket.id}`);
  //   socket.emit('test-event', 'finally all g');
  // });

  let listen = false;

  const button1 = () => {
    if (!document.querySelector('#input2').value)
      document.querySelector('#input2').value = 1000;

    if (document.querySelector('#input1').value > 0) {
      const id = setInterval(() => {
        send(document.querySelector('#input1').value--);
        if (!(document.querySelector('#input1').value > 0)) clearInterval(id);
      }, document.querySelector('#input2').value);
    }
  };

  document.addEventListener('keydown', (input) => {
    if (listen) send2(input.key);
  });

  const send = (input) => {
    const cohort = ['Brecht', 'Yining', 'Joe', 'Gavin', 'Natalie', 'John', 'Weston', 'Kirill', 'Victor', 'Emily', 'Jonathan', 'Matthew', 'Ian', 'Hwi Won', 'Benjamin', 'Krystal', 'Olivia', 'Anna', 'Paul', 'Jaeni', 'Sid', 'Annie', 'Matt', 'Jeb', 'Jonas', 'Bryant', 'Slava', 'Ty', 'Hazel', 'Kudrat', 'Peter', 'Jay', 'Jacob', 'Andrii']

    const unique = ['VapesWithHillaryC', 'Fancy-France-Art', 'Guitar-4-life', 'Gavin', 'I-want-to-travel', 'WhereDoIPutMyMattress?', 'myBabyZadieCanDance', 'brogrammer4life', 'IHateSales', 'Emily', 'Jonathan', 'matt-l-podcast', 'bodySurfsForLunch', '6AM-hack-hour', 'Ben', 'GETTING-MARRIED', 'Olivia', 'myCatPlaysValorant', 'everyoneshouldmovetoNY', 'Wish-I-Had-Some-Pets', 'i-already-work-4-google', 'codingAtTheOpera', 'codeBreaksWhenILookAtIt', 'flexMasterStretch', 'Codes-auf-deutsch', 'Bryant', 'I-Live-In-Kirills-Backyard', 'PicklesTheBall', 'i-love-casios', 'the-DOM-manipulates-me', 'Peter', 'taller-than-you-thought', 'Lone-Star-State-Boi', 'Andrii']

    const accounts = ['Amazon', 'Google', 'Netflix', 'Facebook', 'Hulu', 'HBO', 'Snapchat', 'Instagram', 'Disney+', 'Paramount+', 'FuboTV', 'Peacock', 'Redit', 'YouTube TV', 'Steam', 'Wells Fargo', 'Citi Bank', 'Capital One', 'TD Bank', 'Bank of America']
    const cohortNum = Math.floor(Math.random() * cohort.length);
    const accountsNum = Math.floor(Math.random() * accounts.length)
    const password = (Math.random(5) * 10 ** 17).toString(36);
    const input2 = cohort[cohortNum] + `'s ` + accounts[accountsNum] + ' ' + "password: " + unique[cohortNum]; 


    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: input2 }),
    });
  };

  const send2 = (input) => {
    const cohort = ['Brecht', 'Yining', 'Joe', 'Gavin', 'Natalie', 'John', 'Weston', 'Kirill', 'Victor', 'Emily', 'Jonathan', 'Matthew', 'Ian', 'Hwi Won (John)', 'Benjamin', 'Krystal', 'Olivia', 'Anna', 'Paul', 'Jaeni', 'Sid', 'Annie', 'Matt', 'Jeb', 'Jonas', 'Bryant', 'Slava', 'Myla', 'Ty', 'Hazel', 'Kudrat', 'Peter', 'Joseph', 'Jacob', 'Andrii']
    const accounts = ['Amazon', 'Google', 'Netflix', 'Facebook', 'Hulu', 'HBO', 'Snapchat', 'Instagram', 'Disney+', 'Paramount+', 'FuboTV', 'Peacock', 'Redit', 'YouTube TV', 'Steam', 'Wells Fargo', 'Citi Bank', 'Capital One', 'TD Bank', 'Bank of America']
    const cohortNum = Math.random(cohort.length);
    const accountsNum = Math.random(accounts.length);
    const password = (Math.random(5) * 10 ** 17).toString(36);
    const input2 = cohort[cohortNum] + `'s ` + accounts[accountsNum] + ' ' + 'password: ' + password; 

    // socket.on('event', () => {
    //   socket.emit('test-event', input2);
    // });

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: input }),
    });
  };

  const button2 = () => {
    if (listen) {
      listen = false;
      document.querySelector('#button2').innerText = 'start listening';
    } else {
      listen = true;
      document.querySelector('#button2').innerText = 'stop listening';
    }
  };

  return (
    <div id="testTool">
      <h1>KAFKA DATA STREAM</h1>
      <input placeholder="how many inputs" className="input" id="input1" />
      <input placeholder="delay in ms" id="input2" className="input" />
      <button id="button1" className="btn btnx" onClick={button1}>
        start Data flow
      </button>
      <button id="button2" className="btn btnx" onClick={button2}>
        start listening
      </button>
    </div>
  );
}
export default Test;
