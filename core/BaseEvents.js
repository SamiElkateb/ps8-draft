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

export default hideOneDisplayAnother;
