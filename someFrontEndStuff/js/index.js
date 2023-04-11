let listen = false;

document.querySelector('#button2').addEventListener('click', () => {
  if (listen) {
    listen = false;
    document.querySelector('#button2').innerText = 'start listening';
  } else {
    listen = true;
    document.querySelector('#button2').innerText = 'stop listening';
  }
});

document.addEventListener('keydown', (input) => {
  if (listen) send2(input.key);
});

document.querySelector('#button1').addEventListener('click', () => {
  if (!document.querySelector('#input2').value)
    document.querySelector('#input2').value = 1000;

  if(document.querySelector('#input1').value > 0){
    const id = setInterval(() => {
      send(document.querySelector('#input1').value--);
      if (!(document.querySelector('#input1').value > 0)) clearInterval(id);
    }, document.querySelector('#input2').value);
  }
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
