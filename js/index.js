const player = document.getElementById("player");
let playerPosition = 0;
let lastRenderTime = 0;
let isMovingLeft = false;
let isMovingRight = false;
let startTime = Date.now();
let score = 0;
let isPaused = false;
let lives = 2;
let bullets = [];
let enemies = [];
let bombs = [];
let pausedOverlay = document.getElementById("pauseOverlay");
let gameoverOverlay = document.getElementById("gameOverOverlay");
let playerStyle = player.style;
let gameover = false;

function handleMovement() {
  // console.log(document.getElementById("playerField").offsetWidth);
  if (!isPaused) {
    let dx = 0;
    if (isMovingLeft) {
      dx = -10;
    }
    if (isMovingRight) {
      dx = 10;
    }

    // console.log(dx);

    if (dx !== 0) {
      const newPosition = Math.max(
        0,
        Math.min(
          document.getElementById("playerField").offsetWidth - 50,
          playerPosition + dx
        )
      );
      // console.log(newPosition);
      if (newPosition !== playerPosition) {
        playerPosition = newPosition;
        playerStyle.transform = `translateX(${playerPosition}px)`; // Batch style modifications
      }
    }
  }

  if (!isPaused) {
    requestAnimationFrame(handleMovement);
  }
}

function togglePause() {
  isPaused = !isPaused;
  pausedOverlay.style.display = isPaused ? "flex" : "none";
  if (isPaused) {
    // Store the current elapsed time before pausing
    bullets.forEach((bullet) => bullet.remove());
    bullets = [];
    bombs.forEach((bomb) => bomb.remove());
    bombs = [];
    lastRenderTime = Date.now();
    cancelAnimationFrame(animationFrameHandle); // Stop animation frame loop
  } else {
    // Update startTime to account for the time spent paused
    const timePaused = Date.now() - lastRenderTime;
    startTime += timePaused;
    animationFrameHandle = requestAnimationFrame(handleMovement); // Resume animation frame loop
    requestAnimationFrame(moveBombs);
    createRandomBomb();
    update(); // Resume collision detection
  }
}

function GameOver() {
  gameoverOverlay.style.display = "flex";
  bullets.forEach((bullet) => bullet.remove());
  bullets = [];
  bombs.forEach((bomb) => bomb.remove());
  bombs = [];
  cancelAnimationFrame(animationFrameHandle);
}

function createBullet() {
  const bullet = document.createElement("div");
  bullet.classList.add("bullet");
  // Calculate the initial position of the bullet to be at the center of the player
  const playerRect = player.getBoundingClientRect();
  const bulletLeft = playerRect.left + playerRect.width / 2 - 2.5;
  const bulletTop = playerRect.top;
  bullet.style.left = `${bulletLeft}px`;
  bullet.style.top = `${bulletTop}px`; // Set the bullet's initial position to match the player's center
  document.body.appendChild(bullet);
  // Trigger transition immediately to animate the bullet's upward movement
  bullet.offsetHeight; // This forces a reflow, ensuring the transition is applied
  bullet.style.transform = `translateY(-${window.innerHeight}px)`; // Move to the top of the screen
  bullets.push(bullet);
}

function createBomb() {
  const bomb = document.createElement("div");
  bomb.classList.add("enemyBomb");
  const randomX = Math.floor(
    Math.random() * document.getElementById("playerField").offsetWidth + 80
  );
  bomb.style.left = `${randomX}px`;
  bomb.style.top = `0px`;
  document.body.appendChild(bomb);
  bombs.push(bomb);
}

function moveBombs() {
  bombs.forEach((bomb, index) => {
    const bombTop = bomb.offsetTop;
    if (bombTop >= window.innerHeight) {
      bomb.remove();
      bombs.splice(index, 1);
    } else {
      bomb.style.top = `${bombTop + 5}px`;
      const bombRect = bomb.getBoundingClientRect();
      const playerRect = player.getBoundingClientRect();
      if (
        bombRect.left < playerRect.right &&
        bombRect.right > playerRect.left &&
        bombRect.bottom > playerRect.top &&
        bombRect.top < playerRect.bottom
      ) {
        bomb.remove();
        bombs.splice(index, 1);
        lives--;
        document.getElementById("lives").innerText = `Lives Left: ${lives}`;
        if (lives === 0) {
          gameover = true;
          GameOver();
        }
      }
    }
  });
  requestAnimationFrame(moveBombs);
}

function createRandomBomb() {
  if (!isPaused && !gameover) {
    createBomb();
    setTimeout(createRandomBomb, Math.random() * 2000 + 1000); // Random interval between 1 and 6 seconds
  }
}

function moveBullets() {
  bullets.forEach((bullet, index) => {
    const bulletTop = bullet.offsetTop;
    if (bulletTop <= 0) {
      // If bullet is out of the screen, remove it from the DOM and bullets array
      bullet.remove();
      bullets.splice(index, 1);
    }
  });
  requestAnimationFrame(moveBullets);
}

function checkCollision(bulletRect, enemyRect) {
  return !(
    bulletRect.right < enemyRect.left ||
    bulletRect.left > enemyRect.right ||
    bulletRect.bottom < enemyRect.top ||
    bulletRect.top > enemyRect.bottom
  );
}

// Function to handle collisions
function handleCollisions() {
  bullets.forEach((bullet) => {
    const bulletRect = bullet.getBoundingClientRect();

    enemies.forEach((enemy) => {
      const enemyRect = enemy.getBoundingClientRect();

      if (
        checkCollision(bulletRect, enemyRect) &&
        enemy.querySelector("img").style.visibility !== "hidden"
      ) {
        // Remove bullet from DOM
        bullet.remove();

        // Hide the image of the enemy
        const enemyImage = enemy.querySelector("img");
        enemyImage.style.visibility = "hidden";

        // Increment score
        score += 100;
        document.getElementById("score").innerText = `Score: ${score}xp`;

        // Exit the loop since we've found a collision
        return;
      }
    });
  });

  if (
    enemies.every(
      (enemy) => enemy.querySelector("img").style.visibility === "hidden"
    )
  ) {
    // All enemies are killed off, so rerender them
    renderEnemies();
  }
}

function renderEnemies() {
  const enemyField = document.getElementById("enemyField");
  enemyField.innerHTML = ""; // Clear existing enemies

  // Number of enemies to generate
  const numEnemies = 30; // Adjust as needed

  // Generate enemies
  for (let i = 0; i < numEnemies; i++) {
    const enemy = document.createElement("div");
    enemy.classList.add("enemy");
    enemy.id = i;
    enemy.innerHTML = `<img src="assets/enemy.svg" alt="enemy" id=${i}/>`;
    enemyField.appendChild(enemy);
    enemies.push(enemy);
  }
}

// Update function called at 60fps
function update() {
  if (!isPaused) {
    handleCollisions();
    // Call update function recursively for smooth animation
    requestAnimationFrame(update);
  }
}

// BEGIN EVENT LOOP

document.addEventListener("DOMContentLoaded", () => {
  // update timer
  setInterval(function () {
    try {
      if (!isPaused && !gameover && startTime && score !== undefined) {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Time elapsed in seconds
        // console.log(elapsedTime);
        const minutes = Math.floor(elapsedTime / 60);
        const seconds = elapsedTime % 60;
        document.getElementById("timeValue").innerText = `${
          minutes < 10 ? "0" : ""
        }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        // Update score
        document.getElementById("score").innerText = `Score: ${score}xp`;
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }, 1000);

  document.addEventListener("keydown", function (e) {
    if (e.key === "a") {
      isMovingLeft = true;
    } else if (e.key === "d") {
      isMovingRight = true;
    } else if (e.key === "Escape") {
      togglePause();
    } else if (e.key === " ") {
      createBullet();
    }
  });

  document.addEventListener("keyup", function (e) {
    if (e.key === "a") {
      isMovingLeft = false;
    } else if (e.key === "d") {
      isMovingRight = false;
    }
  });

  document.getElementById("continueBtn").addEventListener("click", function () {
    togglePause();
  });

  document.getElementById("restartBtn").addEventListener("click", () => {
    window.location.reload();
  });

  document.getElementById("restartBtn2").addEventListener("click", () => {
    window.location.reload();
  });

  renderEnemies();

  animationFrameHandle = requestAnimationFrame(handleMovement);
  requestAnimationFrame(moveBombs);
  requestAnimationFrame(moveBullets);
  createRandomBomb();
  update();
});
