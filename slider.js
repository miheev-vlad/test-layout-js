let imagesArr = ['laptop1.jpg', 'laptop2.jpg', 'laptop3.jpg', 'laptop4.jpg', 'laptop5.jpg', 'laptop6.jpg', 'laptop7.jpg', 'laptop8.jpg', 'laptop9.jpg', 'laptop10.jpg'];

let width = parseInt(getComputedStyle(document.getElementById('slider')).width.slice(0, -2));
let step;
function setStep(num) {
  step = num;
};
setStep(0);

let offset = 0;
let slider = [];

const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const sizeSel = document.getElementById('size-select');

function render(imgArr, n) {
  const items = imgArr.slice(0, n);
  for (const item of items) {
    const image = document.createElement("img");
    image.src = "slider-images/" + item;
    image.alt = item;
    image.classList.add('slide-single')
    document.querySelector('#slide').appendChild(image);
  }
  const slides = document.querySelectorAll('.slide-single');
  for (let i = 0; i < slides.length; i++) {
    slider[i] = slides[i].src;
    slides[i].remove();
  }
  drawPrev();
  draw();
  drawNext();
  renderDots(items);
} 
render(imagesArr, 10);

sizeSel.addEventListener('change', function() {
  const slideArr = document.querySelector('#slide');
  while (slideArr.firstChild) {
    slideArr.removeChild(slideArr.firstChild)
  };
  const dotsArr = document.querySelector('#slider-dots');
  while (dotsArr.firstChild) {
    dotsArr.removeChild(dotsArr.firstChild)
  };
  step = 0;
  offset = 0;
  slider = [];
  render(imagesArr, parseInt(this.value))
});

function draw() {
  offset = 0;
  let img = document.createElement('img');
  img.src = slider[step];
  img.classList.add('slide-single');
  img.style.left = offset * width + 'px';
  document.querySelector('#slide').appendChild(img);
};

function drawPrev() {
  offset = -1;
  let img = document.createElement('img');
  if (slider.length === 1) {
    img.src = slider[0];
  } else if (slider.length === 2) {
    img.src = slider[1];
  } else {
    img.src = slider[step === 0 ? slider.length - 1 : step - 1];
  }
  img.classList.add('slide-single');
  img.style.left = offset * width + 'px';
  document.querySelector('#slide').appendChild(img);
};

function drawNext() {
  offset = 1;
  let img = document.createElement('img');
  if (slider.length === 1) {
    img.src = slider[0];
  } else if (slider.length === 2) {
    img.src = slider[step === 0 ? 1 : 0];
  } else {
    img.src = slider[step === slider.length - 1 ? 0 : step + 1];
  }
  img.classList.add('slide-single');
  img.style.left = offset * width + 'px';
  document.querySelector('#slide').appendChild(img);
};

function drawBeforePrev() {
  offset = -1;
  let img = document.createElement('img');
  if (slider.length === 1) {
    img.src = slider[0];
  } else if (slider.length === 2) {
    img.src = slider[step === 0 ? 1 : 0];
  } else {
    img.src = slider[step === 0 ? slider.length - 1 : step - 1];
  }
  img.classList.add('slide-single');
  img.style.left = offset * width + 'px';
  let slideParent = document.querySelector('#slide');
  let firstChild = slideParent.firstChild;
  slideParent.insertBefore(img, firstChild);
};

function left() {
  document.querySelectorAll('.slider-dots_item').forEach(dot => dot.classList.remove("active"));
  document.querySelectorAll('.slider-dots_item').forEach(dot => dot.onclick = null);
  btnNext.onclick = null;
  btnPrev.onclick = null;
  const slides2 = document.querySelectorAll('.slide-single');
  slides2[0].remove();
  if (step === slider.length - 1) {
    step = 0;
  } else {
    step++;
  }
  let num = 0;
  const leftInt = setInterval(function() {
    if (num < width) {
      slides2[1].style.left = parseInt(slides2[1].style.left.slice(0, -2)) - 1 + 'px';
      slides2[2].style.left = parseInt(slides2[2].style.left.slice(0, -2)) - 1 + 'px';
    }
    num++;
    if (num === width) {
      clearInterval(leftInt)
      btnNext.onclick = left;
      btnPrev.onclick = right;
      document.querySelectorAll('.slider-dots_item').forEach(dot => dot.onclick = dotClick);
    }
  });
  drawNext();
  document.getElementById(`${step}`).classList.add("active");
};

btnNext.onclick = left;

function right() {
  document.querySelectorAll('.slider-dots_item').forEach(dot => dot.classList.remove("active"));
  document.querySelectorAll('.slider-dots_item').forEach(dot => dot.onclick = null);
  btnPrev.onclick = null;
  btnNext.onclick = null;
  const slides2 = document.querySelectorAll('.slide-single');
  slides2[2].remove();
  if (step === 0) {
    step = slider.length - 1;
  } else {
    step--;
  }
  let num = 0;
  const rightInt = setInterval(function() {
    if (num < width) {
      slides2[0].style.left = parseInt(slides2[0].style.left.slice(0, -2)) + 1 + 'px';
      slides2[1].style.left = parseInt(slides2[1].style.left.slice(0, -2)) + 1 + 'px';
    }
    num++;
    if (num === width) {
      clearInterval(rightInt);
      btnNext.onclick = left;
      btnPrev.onclick = right;
      document.querySelectorAll('.slider-dots_item').forEach(dot => dot.onclick = dotClick);
    }
  });
  drawBeforePrev();
  document.getElementById(`${step}`).classList.add("active");
}

btnPrev.onclick = right;

function renderDots(items) {
  for (let i = 0; i < items.length;) {
    const dot = document.createElement("span");
    dot.classList.add("slider-dots_item");
    dot.id = i;
    dot.onclick = dotClick;
    document.getElementById('slider-dots').appendChild(dot);
    i++;
  }
  document.getElementById('0').classList.add("active");
};

function dotClick(e) {
  const prevDotId = step;
  const currDotId = parseInt(e.target.id);
  document.querySelectorAll('.slider-dots_item').forEach(dot => dot.classList.remove("active"));
  document.querySelectorAll('.slider-dots_item').forEach(dot => dot.onclick = null);
  btnPrev.onclick = null;
  btnNext.onclick = null;
  if (Math.abs(prevDotId - currDotId) === 1 && currDotId > prevDotId) {
    const slides2 = document.querySelectorAll('.slide-single');
    slides2[0].remove();
    if (step === slider.length - 1) {
      step = 0;
    } else {
      step++;
    };
    let num = 0;
    const leftInt = setInterval(function() {
      if (num < width) {
        slides2[1].style.left = parseInt(slides2[1].style.left.slice(0, -2)) - 5 + 'px';
        slides2[2].style.left = parseInt(slides2[2].style.left.slice(0, -2)) - 5 + 'px';
      }
      num += 5;
      if (num === width) {
        clearInterval(leftInt)
        btnNext.onclick = left;
        btnPrev.onclick = right;
        document.querySelectorAll('.slider-dots_item').forEach(dot => dot.onclick = dotClick);
      }
    });
    drawNext();
    document.getElementById(`${step}`).classList.add("active");
  } else if (Math.abs(prevDotId - currDotId) === 1 && currDotId < prevDotId) {
      const slides2 = document.querySelectorAll('.slide-single');
      slides2[2].remove();
      if (step === 0) {
        step = slider.length - 1;
      } else {
        step--;
      }
      let num = 0;
      const rightInt = setInterval(function() {
        if (num < width) {
          slides2[0].style.left = parseInt(slides2[0].style.left.slice(0, -2)) + 5 + 'px';
          slides2[1].style.left = parseInt(slides2[1].style.left.slice(0, -2)) + 5 + 'px';
        }
        num += 5;
        if (num === width) {
          clearInterval(rightInt);
          btnNext.onclick = left;
          btnPrev.onclick = right;
          document.querySelectorAll('.slider-dots_item').forEach(dot => dot.onclick = dotClick);
        }
      });
      drawBeforePrev();
      document.getElementById(`${step}`).classList.add("active");
    };
    if (Math.abs(prevDotId - currDotId) > 1 && currDotId > prevDotId) {
      const numLeft = Math.abs(prevDotId - currDotId);
      let countLeft = 2;
      offset = 2;
      do {
        let img = document.createElement('img');
        img.src = slider[step === slider.length - offset ? 0 : step + offset];
        img.classList.add('slide-single');
        img.style.left = offset * width + 'px';
        document.querySelector('#slide').appendChild(img);
        offset++;
        countLeft++;
      } while (countLeft <= numLeft);
      setStep(parseInt(e.target.id));
      document.getElementById(`${step}`).classList.add("active");
      const slides3 = document.querySelectorAll('.slide-single');
      slides3[0].remove();
      let num = 0;
      const leftInt = setInterval(function() {
        if (num < width * numLeft) {
          slides3.forEach(item => {
            item.style.left = parseInt(item.style.left.slice(0, -2)) - 5 + 'px';
          });
        };
        if (num === width * numLeft) {
          clearInterval(leftInt);
          btnNext.onclick = left;
          btnPrev.onclick = right;
          document.querySelectorAll('.slider-dots_item').forEach(dot => dot.onclick = dotClick);
          while (document.querySelector('#slide').children.length > 2) {
            document.querySelector('#slide').removeChild(document.querySelector('#slide').firstChild)
          };
          let img = document.createElement('img');
          if (slider.length === 1) {
            img.src = slider[0];
          } else if (slider.length === 2) {
            img.src = slider[step === 0 ? 1 : 0];
          } else {
            img.src = slider[step === slider.length - 1 ? 0 : step + 1];
          };
          img.classList.add('slide-single');
          img.style.left = "750px";
          document.querySelector('#slide').appendChild(img);
        };
        num += 5;
      });
    } else if (Math.abs(prevDotId - currDotId) > 1 && currDotId < prevDotId) {
      const numRight = Math.abs(prevDotId - currDotId);
      let countRight = 2;
      offset = -2;
      do {
        let img = document.createElement('img');
        img.src = slider[step - countRight];
        img.classList.add('slide-single');
        img.style.left = offset * width + 'px';
        let slideParent = document.querySelector('#slide');
        let firstChild = slideParent.firstChild;
        slideParent.insertBefore(img, firstChild);
        offset--;
        countRight++;
      } while (countRight <= numRight);
      setStep(parseInt(e.target.id));
      document.getElementById(`${step}`).classList.add("active");
      const slides3 = document.querySelectorAll('.slide-single');
      slides3[slides3.length - 1].remove();
      let num = 0;
      const rightInt = setInterval(function() {
        if (num < width * numRight) {
          slides3.forEach(item => {
            item.style.left = parseInt(item.style.left.slice(0, -2)) + 5 + 'px';
          });
        };
        if (num === width * numRight) {
          clearInterval(rightInt);
          btnNext.onclick = left;
          btnPrev.onclick = right;
          document.querySelectorAll('.slider-dots_item').forEach(dot => dot.onclick = dotClick);
          while (document.querySelector('#slide').children.length > 2) {
            document.querySelector('#slide').removeChild(document.querySelector('#slide').lastChild)
          };
          let img = document.createElement('img');
          if (slider.length === 1) {
          img.src = slider[0];
          } else if (slider.length === 2) {
          img.src = slider[step === 0 ? 1 : 0];
          } else {
          img.src = slider[step === 0 ? slider.length - 1 : step - 1];
          };
          img.classList.add('slide-single');
          img.style.left = "-750px";
          let slideParent = document.querySelector('#slide');
          let firstChild = slideParent.firstChild;
          slideParent.insertBefore(img, firstChild);
        };
        num += 5;
      });
    };
};
