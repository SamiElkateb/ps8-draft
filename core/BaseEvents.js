const displayOrHide = (query) => {
  const element = document.querySelector(query);
  if (element.style.display === 'none') {
    element.style.display = 'initial';
  } else {
    element.style.display = 'none';
  }
};

const hideOneDisplayAnother = (queryOne, queryTwo) => {
  displayOrHide(queryOne);
  displayOrHide(queryTwo);
};

const switchDisplay = (queryOne, queryTwo) => {
  const elementOne = document.querySelector(queryOne);
  const elementTwo = document.querySelector(queryTwo);
  if (elementOne.style.display === 'none') {
    elementOne.style.display = 'initial';
    elementTwo.style.display = 'none';
  }
};
