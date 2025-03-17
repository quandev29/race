let ducks = [];
let duckNames = [];
let fireworks;

function openModal() {
  document.getElementById('modal').classList.add('active');
}

function closeModal() {
  document.getElementById('modal').classList.remove('active');
}

function setDuckNames() {
  const numDucks = parseInt(document.getElementById('numDucks').value);
  const nameInputsDiv = document.getElementById('nameInputs');
  nameInputsDiv.innerHTML = '';
  duckNames = [];

  for (let i = 0; i < numDucks; i++) {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = `Tên ${i + 1}`;
    input.oninput = () => updateDuckNames(i, input.value);
    nameInputsDiv.appendChild(input);
  }
}

function updateDuckNames(index, name) {
  duckNames[index] = name || `Duck ${index + 1}`;
}

function createDucks() {
  const raceTrack = document.getElementById('raceTrack');
  raceTrack.innerHTML =
    '<div class="start-line"></div><div class="finish-line"></div><div class="road-line" id="roadLine"></div>';

  const trackHeight = raceTrack.offsetHeight;
  const duckSpacing = trackHeight / (duckNames.length + 2); // Căn chỉnh khoảng cách

  ducks = duckNames.map((name, index) => {
    const duckContainer = document.createElement('div');
    duckContainer.className = 'duck-container';
    duckContainer.style.top = `${(index + 1) * duckSpacing}px`; // Căn đều các xe

    const duckElement = document.createElement('div');
    duckElement.className = 'duck';
    duckElement.innerHTML = '🚗';
    duckElement.style.transform = 'scaleX(-1)';

    const duckNameElement = document.createElement('div');
    duckNameElement.className = 'duck-name';
    duckNameElement.innerText = name;

    duckContainer.appendChild(duckNameElement);
    duckContainer.appendChild(duckElement);
    raceTrack.appendChild(duckContainer);

    return { name, element: duckContainer, position: 0 };
  });
}

function submitDuckNames() {
  createDucks();
  closeModal();
}

function startRace() {
  const roadLine = document.getElementById('roadLine');
  roadLine.classList.add('active'); // Thêm hiệu ứng chạy đường đua
  const raceTrack = document.getElementById('raceTrack');
  const trackWidth = raceTrack.offsetWidth;
  const finishLinePosition = trackWidth - 60;

  // Gradually hide the start logo
  // document.querySelector('.start-logo').classList.add('hidden'); // Comment out or remove this line

  const raceInterval = setInterval(() => {
    ducks.forEach((duck) => {
      const progress = Math.random() * 10;
      duck.position += progress;
      duck.element.style.transform = `translateX(${duck.position}px)`;

      // Gradually show the finish logo when ducks are close to the finish line
      if (duck.position >= finishLinePosition - 100) {
        document.querySelector('.finish-logo').classList.add('visible');
      }

      if (duck.position >= finishLinePosition) {
        clearInterval(raceInterval);
        document.getElementById('winnerName').innerText = duck.name;
        document.getElementById('winnerModal').classList.add('active');
        document.getElementById('cheeringSound').play();
        document.body.classList.add('flash-bg');
        setTimeout(() => {
          document.body.classList.remove('flash-bg');
          roadLine.classList.remove('active');
        }, 2000);
      }
    });
  }, 100);
}

function resetRace() {
  ducks.forEach((duck) => {
    duck.position = 0;
    duck.element.style.transform = 'translateX(0px)';
  });

  // Show the start logo and hide the finish logo
  document.querySelector('.start-logo').classList.remove('hidden');
  document.querySelector('.finish-logo').classList.remove('visible');
}

function closeWinnerModal() {
  document.getElementById('winnerModal').classList.remove('active');
}

function toggleMusic() {
  const backgroundMusic = document.getElementById('backgroundMusic');
  if (backgroundMusic.paused) {
    backgroundMusic.play();
  } else {
    backgroundMusic.pause();
  }
}
