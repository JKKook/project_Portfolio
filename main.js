"use strict";

// 자바스크립트 이벤트 효과 등은 키워드 단위로 검색!
//Make navbar transparent when it is on the top
const navbar = document.querySelector("#navbar"); // (#은 전체)navbar에서 정보들을 받아 옴!(qurreySeclector)
const navbarHeight = navbar.getBoundingClientRect().height; // getBoundingClienRect은 윈도우에서 정해진 좌표값임!
document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

// document.addEventListener("scroll", () => {
//   const testimonalImage = getBoundingClientRect(".testimonial__avatar");
//   const testimonalSpeech = getBoundingClientRect(".testimonial__speech-bubble");

//   if (testimonalImage <= testimonalSpeech) {
//     [testimonalImage, testimonalSpeech] = [testimonalSpeech, testimonalImage];
//   }
//   return Math.max(testimonalImage, testimonalSpeech);
// });

//Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link; // work btn click -> #work(id)
  //dataset은 MAP속성으로 등록되며, DOM 프로퍼티 접근 방식으로 HTML태그 속성으로 추가 됨!
  if (link == null) {
    return;
  }
  navbarMenu.classList.remove("open");
  scrollIntoView(link);
});

// Toggle-btn active for small screen
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
});

// Handle click on "contact me" button on home
const homeContactBtn = document.querySelector(".home__contact");
homeContactBtn.addEventListener("click", () => {
  scrollIntoView("#contact");
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}

// Make home slowly fade to transparent as the window scrools down
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Show arrow-up button when scrolling down
const arrowUp = document.querySelector(".arrow-up");
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add("visible");
  } else {
    arrowUp.classList.remove("visible");
  }
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}

// Handle click on the arrow up btn
arrowUp.addEventListener("click", () => {
  scrollIntoView("#home");
});

// projects
const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project"); // array 형태로 받아 옴!
// when it is clicked(btn) , pop
workBtnContainer.addEventListener("click", (e) => {
  // 여기서 e는 eventlistener의 약자임!
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter; //btn안에 span이 있기 때문에, 부모노드 또한 필터링 시켜줌
  // 디버깅 -> breakPoint -> Watch -> e.target : span.category__count / e.target.parentNode : category__btn.active (아하 부모 노드는 버튼이었구나) / e.target.parentNode.dataset.fliter의 값은 "*"임을 도출!
  if (filter == null) {
    return;
  }

  // Remove selection from the previous item and select the new one
  const active = document.querySelector(".category__btn.selected");
  active.classList.remove("selected");
  const target =
    e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
  e.target.classList.add("selected");

  projectContainer.classList.add("anim-out");
  //setTimeOut f안에 projects의 이미지를 넣은 이유는 - 기존에 필터되는 부분과 셋타임아웃의 애니메이션이 겹쳐짐으로서 애니메이션 중복 효과가 일어남을 방지하기 위해!
  setTimeout(() => {
    projects.forEach((project) => {
      console.log(project.dataset.type);
      if (filter === "*" || filter === project.dataset.type) {
        // 조건에 맞는 경우만 보여지게 할 경우! 평소에는 보여지지 않는 형태
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });
    projectContainer.classList.remove("anim-out");
  }, 300);
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}
