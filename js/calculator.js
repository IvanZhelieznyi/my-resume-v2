const websiteTypeSelect = document.querySelector('#calculator-form-website-type');
const technologiesSelect = document.querySelector('#calculator-form-technologies');

const technologiesMultiSelect = new Choices(technologiesSelect, {
  allowSearch: false,
  silent: false,
  renderChoiceLimit: -1,
  maxItemCount: -1,
  removeItems: true,
  removeItemButton: true,
  editItems: false,
  duplicateItemsAllowed: false,
  delimiter: ",",
  paste: true,
  searchEnabled: false,
  searchChoices: true,
  searchResultLimit: -1,
  position: "auto",
  resetScrollPosition: true,
  shouldSort: true,
  shouldSortItems: false,
  placeholder: true,
  noChoicesText: "No available options",
  itemSelectText: "Click to select",
  classNames: {
    containerInner: "choices__inner tech-input-container",
    input: "choices__input",
  },
});

totalRenderSum();
  
const calculatorform = document.querySelector('.calculator-form');
// console.log(calculatorform);
calculatorform.addEventListener('submit', function(event) {
  event.preventDefault();
  totalRenderSum();
});

function totalRenderSum() {
  //Selectors
  const websiteCartSelect = document.querySelector('#calculator-form-input-radio-cart input:checked');
  const websiteReceptionSelect = document.querySelector('#calculator-form-input-radio-reception input:checked');
  //Value
  const websiteTypeValue = extractPriceFromValue(websiteTypeSelect.value);
  const technologiesMultiValue = getTotalSum(technologiesMultiSelect.getValue());
  const websiteCartValue = convertCartOptionToPrice(websiteCartSelect.value);
  const websiteReceptionValue = convertReceptionOptionToPrice(websiteReceptionSelect.value);
  //Console
  console.log(websiteTypeValue);
  console.log(technologiesMultiValue);
  console.log(websiteCartSelect);
  console.log(websiteReceptionSelect);
  console.log(websiteCartValue);
  console.log(websiteReceptionValue);

  renderSum(websiteTypeValue + technologiesMultiValue + websiteCartValue + websiteReceptionValue);

}

function renderSum(sum) {
  const costElement = document.querySelector(".calculator-form-total-cost");
  let Calculating = 'Calculating';
  costElement.textContent = Calculating;
  let delayInterval = 400;
  let numberPoint = 7
  let timerId = setTimeout(function request() {
    Calculating += '.';
    numberPoint -= 1;
    costElement.textContent = Calculating;
    if (numberPoint >= 1) {
      timerId = setTimeout(request, delayInterval);
    }
    else {
      costElement.textContent = sum + "$";
    }
  }, delayInterval);
}



function convertCartOptionToPrice(option) {
  if (option == 'yes') {
    return 300;
  }
  return 0;
}

function convertReceptionOptionToPrice(option) {
  if (option == 'yes') {
    return 600;
  }
  return 0;
}

function getTotalSum(arr1) {
  let totalSum = 0;

  arr1.forEach(function (tech) {
    totalSum += extractPriceFromValue(tech.value);
  });
  return totalSum;
}

function extractPriceFromValue(str) {
  const price = str.match(/:\d+/);

  if (price) {
    return Number(price[0].slice(1)) || 0;
  }

  return 0;
}