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

function renderDots(items) {
  for (let i = 0; i < items.length;) {
    const dot = document.createElement("span");
    dot.classList.add("slider-dots_item");
    dot.id = i;
    dot.onclick = function() {
      document.querySelectorAll('.slider-dots_item').forEach(dot => dot.classList.remove("active"));
      const slides2 = document.querySelector('#slide');
      while (slides2.firstChild) {
        slides2.removeChild(slides2.firstChild)
      };
      setStep(i - 1);
      document.getElementById(`${step}`).classList.add("active");
      offset = -1;
      const img1 = document.createElement('img');
      if (slider.length === 1) {
        img1.src = slider[0];
      } else if (slider.length === 2) {
        img1.src = slider[step === 0 ? 1 : 0];
      } else {
        img1.src = slider[step === 0 ? slider.length - 1 : step - 1];
      }
      img1.classList.add('slide-single');
      img1.style.left = offset * width + 'px';
      document.querySelector('#slide').appendChild(img1);
      offset = 0;
      const img2 = document.createElement('img');
      img2.src = slider[step];
      img2.classList.add('slide-single');
      img2.style.left = offset * width + 'px';
      document.querySelector('#slide').appendChild(img2);
      offset = 1;
      const img3 = document.createElement('img');
      if (slider.length === 1) {
        img3.src = slider[0];
      } else if (slider.length === 2) {
        img3.src = slider[step === 0 ? 1 : 0];
      } else {
        img3.src = slider[step === slider.length - 1 ? 0 : step + 1];
      }
      img3.classList.add('slide-single');
      img3.style.left = offset * width + 'px';
      document.querySelector('#slide').appendChild(img3);
    };
    document.getElementById('slider-dots').appendChild(dot);
    i++
  }
  document.getElementById('0').classList.add("active");
};

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
  setInterval(() => {
    if (num < width) {
      slides2[1].style.left = parseInt(slides2[1].style.left.slice(0, -2)) - 1 + 'px';
      slides2[2].style.left = parseInt(slides2[2].style.left.slice(0, -2)) - 1 + 'px';
    }
    num++;
    if (num === width) {
      btnNext.onclick = left;
      btnPrev.onclick = right;
    }
  });
  drawNext();
  document.getElementById(`${step}`).classList.add("active");
};

btnNext.onclick = left;

function right() {
  document.querySelectorAll('.slider-dots_item').forEach(dot => dot.classList.remove("active"));
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
  setInterval(() => {
    if (num < width) {
      slides2[0].style.left = parseInt(slides2[0].style.left.slice(0, -2)) + 1 + 'px';
      slides2[1].style.left = parseInt(slides2[1].style.left.slice(0, -2)) + 1 + 'px';
    }
    num++;
    if (num === width) {
      btnNext.onclick = left;
      btnPrev.onclick = right;
    }
  });
  drawBeforePrev();
  document.getElementById(`${step}`).classList.add("active");
}

btnPrev.onclick = right;
