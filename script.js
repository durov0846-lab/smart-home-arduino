// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Smart light toggle
const lightBtn = document.getElementById('lightBtn');
const lampIcon = document.getElementById('lampIcon');
const houseStatus = document.getElementById('houseStatus');
let isDark = false;
lightBtn.addEventListener('click', () => {
  isDark = !isDark;
  lightBtn.textContent = isDark ? 'Қараңғы' : 'Жарық';
  lampIcon.classList.toggle('on', isDark);
  houseStatus.textContent = isDark
    ? 'Күй: Қараңғы — шамдар автоматты қосылды'
    : 'Күй: Жарық — шамдар өшірулі';
});

// Parking demo
const rfidIcon = document.getElementById('rfidIcon');
const barrierIcon = document.getElementById('barrierIcon');
const carIcon = document.getElementById('carIcon');
const indicator = document.getElementById('indicator');
const parkStatus = document.getElementById('parkStatus');
const validBtn = document.getElementById('validCardBtn');
const invalidBtn = document.getElementById('invalidCardBtn');

function runParkingSequence(isValid) {
  validBtn.disabled = true;
  invalidBtn.disabled = true;
  rfidIcon.classList.add('moving');
  parkStatus.textContent = 'Карта оқылуда...';

  setTimeout(() => {
    if (isValid) {
      indicator.classList.remove('red');
      indicator.classList.add('green');
      parkStatus.textContent = 'Карта рұқсат етілді';
      barrierIcon.classList.add('open');

      setTimeout(() => {
        carIcon.classList.add('move');
        parkStatus.textContent = 'Автомобиль автотұраққа кіреді';
      }, 700);

      setTimeout(() => {
        barrierIcon.classList.remove('open');
        carIcon.classList.remove('move');
        indicator.classList.remove('green');
        indicator.classList.add('red');
        rfidIcon.classList.remove('moving');
        parkStatus.textContent = 'Күй: Күтуде...';
        validBtn.disabled = false;
        invalidBtn.disabled = false;
      }, 3200);
    } else {
      parkStatus.textContent = 'Карта қабылданбады';
      indicator.classList.add('red');
      setTimeout(() => {
        rfidIcon.classList.remove('moving');
        parkStatus.textContent = 'Күй: Күтуде...';
        validBtn.disabled = false;
        invalidBtn.disabled = false;
      }, 1500);
    }
  }, 900);
}

validBtn.addEventListener('click', () => runParkingSequence(true));
invalidBtn.addEventListener('click', () => runParkingSequence(false));

// Code show/copy
const codeToggle = document.getElementById('codeToggle');
const codeBlock = document.getElementById('codeBlock');
codeToggle.addEventListener('click', () => {
  codeBlock.classList.toggle('hidden');
  codeToggle.textContent = codeBlock.classList.contains('hidden') ? 'Кодты көрсету' : 'Кодты жасыру';
});

const copyBtn = document.getElementById('copyBtn');
copyBtn.addEventListener('click', () => {
  const text = document.getElementById('codeText').textContent;
  navigator.clipboard.writeText(text).then(() => {
    copyBtn.textContent = 'Көшірілді!';
    setTimeout(() => copyBtn.textContent = 'Кодты көшіру', 1500);
  });
});

// Fade-in sections on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = 1;
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.section').forEach(sec => {
  sec.style.opacity = 0;
  sec.style.transform = 'translateY(20px)';
  sec.style.transition = 'opacity .6s ease, transform .6s ease';
  observer.observe(sec);
});
