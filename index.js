// Onload Handler 
 let div = null;

window.onload = () => {
  main();
};

// Main or boot function, this function will take care of getting all the DOM references 

function main () {
  const root = document.getElementById('root');
  const output = document.getElementById('output');
  const output2 = document.getElementById('output2');
  const changeBtn = document.getElementById('change-btn');
  const copyBtn = document.getElementById('copy-btn');
  const copyBtn2 = document.getElementById('copy-btn2');


  changeBtn.addEventListener('click', function(){
    const color = generateColorDecimal();
    const hex = generateHexDecimal();
    const rgb = generateRGBColor();

    root.style.backgroundColor = hex;
    output.value = hex.substring(1);
    output2.value = rgb;
  });

  copyBtn.addEventListener('click', function(){
    navigator.clipboard.writeText(`#${output.value}`);
    if(div !== null) {
      div.remove();
      div = null;
    }
    if(isValidHex(output.value)){
      generateToastMessage(`#${output2.value
      } copied`)
    } else{
      alert('Invalid Color Code');
    } 
  });


  copyBtn2.addEventListener('click', function() {
    navigator.clipboard.writeText(`#${output2.value} `);

    if(div !== null) {
      div.remove();
      div = null;
    }

    if(isValidHex(output.value)){
         generateToastMessage(`#${output2.value}`);
    } else {
      alert('Invalid color Code');
    }
  });

  output.addEventListener('keyup', function (e){
      
      const color = e.target.value;
      if(color) {
        output.value = color.toUpperCase();
        if(isValidHex(color)){
          root.style.backgroundColor = `#${color}`;
          output2.value = hexToRgb(color);
        }
      }
  });
}


/**
 * DOM functions
 */
 function generateToastMessage(msg){
        
  div = document.createElement('div');
  div.innerText = msg;
  div.className = 'toast-message toast-message-slide-in';

  div.addEventListener('click', function(){
    div.classList.remove('toast-message-slide-in');
    div.classList.add('toast-message-slide-out');
    
    div.addEventListener('animationend', function(){
      div.remove();
      div = null;
    });
  });

  document.body.appendChild(div);
}




/** */


function generateColorDecimal(){
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return{
    red,green,blue
  };
}


function generateHexColor(red, green, blue){
    const getTwoCode = (value) => {
      const hex = value.toString(16);
      return hex.length === 1 ? `0${hex}`: hex;
    };

    return `#${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(blue)}}`.toUpperCase();
}

function generateRGBColor({red, green, blue}){

    return `rgb(${red}, ${green}, ${blue})`;
}

function hexToRgb(hex) {

  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4), 16);

  return `rgb(${red}, ${green}, ${blue})`;
}


/**
 * Validate hex color code
 * @param {String} color 
 * @returns {boolean}
 */
function isValidHex(color){
  if(color.length !== 6) return false;

  return /^[0-9A-Fa-f]{6}$/i.test.color;
  
}




