// Character to number mapping
const charToNumberMapping = {
  'A': 1, 'I': 1, 'J': 1, 'Q': 1, 'Y': 1,
  'B': 2, 'K': 2, 'R': 2,
  'C': 3, 'G': 3, 'L': 3, 'S': 3,
  'D': 4, 'M': 4, 'T': 4,
  'E': 5, 'N': 5, 'X': 5,
  'U': 6, 'V': 6, 'W': 6,
  'O': 7, 'Z': 7,
  'F': 8, 'P': 8
};

    const migaathirstam= [19,23,37,41,45];
    const athirstam = [1,3,5,6,9,10,14,15,16,18,21,23,24,27,32,33,36,42,46,50,51];
    const thuraathirstam= [7,8,11,13,17,22,28,31,40,49,58];
    const aathiryaialipathu=[20,55];
    const sothanai=[25,34,43,47];
    const sumar=[2,12,30,38,39,48,54,56,57];
    const aapathu=[20,26,29,35,44,53];
    const aamatram=[52];


    function getCategory(number) {
      if (migaathirstam.includes(number)) return 'மிக மிக அதிர்ஸ்டம்';
      if (athirstam.includes(number)) return 'அதிர்ஸ்டம்';
      if (thuraathirstam.includes(number)) return 'துரஅதிர்ஸ்டம்';
      if (aathiryaialipathu.includes(number)) return 'எதிரியை அழிப்பது';
      if (sothanai.includes(number)) return 'சோதனை மிக்கது';
      if (sumar.includes(number)) return 'சுமார்';
      if (aapathu.includes(number)) return 'ஆபத்து';
      if (aamatram.includes(number)) return 'ஏமாற்றம்';
      return 'unknown';
  }
  
 


// Function to move focus to the next input field
function moveFocus(currentInput, nextInput) {
  if (currentInput.value.length === currentInput.maxLength) {
      nextInput.focus();
  }
}

// Function to validate input fields based on pattern
function validateInput(inputElement, pattern) {
  if (!inputElement.value.match(pattern)) {
      inputElement.classList.add('error-input');
  } else {
      inputElement.classList.remove('error-input');
  }
}

// Function to convert a string to its numeric equivalent based on charToNumberMapping
function calculateNumericValue(inputString) {
  let total = 0;
  for (let char of inputString.toUpperCase()) {
    if (char >= '0' && char <= '9') {
      // If the character is a number, add its numeric value directly
      total += parseInt(char);
    } else if (char in charToNumberMapping) {
      // If the character is a letter mapped in charToNumberMapping, add its mapped value
      total += charToNumberMapping[char];
    }
  }
  return total;
}


// Function to update table content with form values
function updateTableContent() {
  var box1Value = document.getElementById('box1').value;
  var box2Value = document.getElementById('box2').value;
  var box3Value = document.getElementById('box3').value;
  var box4Value = document.getElementById('box4').value;

  // Calculate numeric values based on the mapping
  var numericBox1 = calculateNumericValue(box1Value);
  var numericBox2 = calculateNumericValue(box2Value);
  var numericBox3 = calculateNumericValue(box3Value);
  var numericBox4 = calculateNumericValue(box4Value);

  // Prepare strings for Column 1
  var column1Row1 = `${box1Value}-${box2Value}-${box3Value}`;
  var column1Row2 = box4Value;
  var column1Row3 = `${box1Value}-${box2Value}-${box3Value}-${box4Value}`;

  // Calculate sums for Column 2
  var sumRow1 = numericBox1 + numericBox2 + numericBox3;
  var sumRow2 = numericBox4;
  var sumRow3 = numericBox1 + numericBox2 + numericBox3 + numericBox4;


  function reducesingle(num) {
    while (num > 9) {
      num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return num;
  }

  var sumRow12 = reducesingle(sumRow1);
  var sumRow22 = reducesingle(sumRow2);
  var sumRow32 = reducesingle(sumRow3);


  // Update table content
  document.getElementById('content1').textContent = column1Row1;

  document.getElementById('second1').textContent = sumRow1;


  document.getElementById('content2').textContent = column1Row2;

  document.getElementById('second2').textContent = sumRow2;
  document.getElementById('third2').textContent=getCategory(sumRow2);

  document.getElementById('second22').textContent = sumRow22;
  document.getElementById('third22').textContent=getCategory(sumRow22);

  document.getElementById('content3').textContent = column1Row3;

  document.getElementById('second3').textContent = sumRow3;
  document.getElementById('third3').textContent=getCategory(sumRow3);

  document.getElementById('second32').textContent = sumRow32;
  document.getElementById('third32').textContent=getCategory(sumRow32);
}

// Add event listeners to move focus between inputs
document.getElementById('box1').addEventListener('input', function() {
  moveFocus(this, document.getElementById('box2'));
});

document.getElementById('box2').addEventListener('input', function() {
  validateInput(this, /^[0-9]{1,2}$/);
  moveFocus(this, document.getElementById('box3'));
});

document.getElementById('box3').addEventListener('input', function() {
  validateInput(this, /^[A-Za-z]{0,2}$/);
  moveFocus(this, document.getElementById('box4'));
});

document.getElementById('box4').addEventListener('input', function() {
  validateInput(this, /^[0-9]{4}$/);
  moveFocus(this, document.getElementById('submit'));
});

// Add event listener to form submit
document.getElementById('myForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Validate all input fields before updating table content
  validateInput(document.getElementById('box2'), /^[0-9]{1,2}$/);
  validateInput(document.getElementById('box3'), /^[A-Za-z]{0,2}$/);
  validateInput(document.getElementById('box4'), /^[0-9]{4}$/);

  // Update table content if all inputs are valid
  if (!document.querySelectorAll('.error-input').length) {
      updateTableContent();   // Update table content with form values
  }
});

// Initialize tooltips
$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();
});