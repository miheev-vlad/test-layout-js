/* cookie banner start */
(function () {
  const cookieContainer = document.querySelector('.cookie-container');
  const cookieBBtnOk = document.querySelector('.cookie-container__button');
  cookieBBtnOk.addEventListener('click', () => {
    cookieContainer.classList.remove('cookie-container_active');
    localStorage.setItem('cookieBannerDisplayed', 'true');
  });
  if (!localStorage.getItem('cookieBannerDisplayed')) {
    cookieContainer.classList.add('cookie-container_active');
  }
}());
/* cookie banner end */

/* header scroll start */
(function () {
  const header = document.querySelector('.header');
  window.onscroll = () => {
    if (window.pageYOffset > 50) {
      header.classList.add('header_active');
    } else {
      header.classList.remove('header_active');
    }
  }
}());
/* header scroll end */

/* form validation start */
const form  = document.querySelector('.send-form');
const userName = document.getElementById('user-name');
const venueName = document.getElementById('user-venue-name');
const venueCity = document.getElementById('user-venue-city');
const stateCity = document.getElementById('user-state-city');
const email = document.getElementById('user-email');
const subject = document.getElementById('user-subject');
const message = document.getElementById('user-message');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (userName.value === '' || userName.value == null) {
    userName.classList.add('send-form__field_invalid');
  }
  if (venueName.value === '' || venueName.value == null) {
    venueName.classList.add('send-form__field_invalid');
  }
  if (venueCity.value === '' || venueCity.value == null) {
    venueCity.classList.add('send-form__field_invalid');
  }if (stateCity.value === '' || stateCity.value == null) {
    stateCity.classList.add('send-form__field_invalid');
  }if (email.value === '' || email.value == null) {
    email.classList.add('send-form__field_invalid');
  }if (subject.value === '' || nasubjectme.value == null) {
    subject.classList.add('send-form__field_invalid');
  }if (message.value === '' || message.value == null) {
    message.classList.add('send-form__textarea_invalid');
  }
});

userName.addEventListener('input', () => {
  if (userName.value !== '' || userName.value != null) {
    userName.classList.remove('send-form__field_invalid');
  }
});
venueName.addEventListener('input', () => {
  if (venueName.value !== '' || venueName.value != null) {
    venueName.classList.remove('send-form__field_invalid');
  }
});
venueCity.addEventListener('input', () => {
  if (venueCity.value !== '' || venueCity.value != null) {
    venueCity.classList.remove('send-form__field_invalid');
  }
});
stateCity.addEventListener('input', () => {
  if (stateCity.value !== '' || stateCity.value != null) {
    stateCity.classList.remove('send-form__field_invalid');
  }
});
email.addEventListener('input', () => {
  if (email.value !== '' || email.value != null) {
    email.classList.remove('send-form__field_invalid');
  }
});
subject.addEventListener('input', () => {
  if (subject.value !== '' || subject.value != null) {
    subject.classList.remove('send-form__field_invalid');
  }
});
message.addEventListener('input', () => {
  if (message.value !== '' || message.value != null) {
    message.classList.remove('send-form__textarea_invalid');
  }
});
/* form validation end */

/* mission aninmation start */
function onEntry(entry) {
  entry.forEach(change => {
    if (change.isIntersecting) {
     change.target.classList.add('mission-pic__moving');
    } else {
      change.target.classList.remove('mission-pic__moving');
    }
  });
};
let options = {
  threshold: [0.2] };
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.element-animation');
for (let elm of elements) {
  observer.observe(elm);
};
function onEntry1(entry) {
  entry.forEach(change => {
    if (change.isIntersecting) {
     change.target.classList.add('mission-vision__delete1');
    } else {
      change.target.classList.remove('mission-vision__delete1');
    }
  });
};
let options1 = {
  threshold: [0.5] };
let observer1 = new IntersectionObserver(onEntry1, options1);
let elements1 = document.querySelectorAll('.element-animation1');
for (let elm1 of elements1) {
  observer1.observe(elm1);
};
/* mission aninmation end */

/* smooth scrolling start */
(function () {
  const smoothScroll = function (targetEl, duration) {
    const headerElHeight =  document.querySelector('.header').clientHeight;
    let target = document.querySelector(targetEl);
    let targetPosition = target.getBoundingClientRect().top - headerElHeight;
    let startPosition = window.pageYOffset;
    let startTime = null;
    const ease = function(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };
    const animation = function(currentTime){
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, targetPosition, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };
    requestAnimationFrame(animation);
  };
  const scrollTo = function () {
    const links = document.querySelectorAll('.js-scroll');
    links.forEach(each => {
      each.addEventListener('click', function () {
        const currentTarget = this.getAttribute('href');
        smoothScroll(currentTarget, 2000);
      });
    });
  };
  scrollTo();
}());
/* smooth scrolling end */