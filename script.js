document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    const canvas = document.getElementById('board');
    const ctx = canvas.getContext('2d');
    const message = document.getElementById('message');
    const scoreDisplay = document.getElementById('score');
    const highestScoreDisplay = document.getElementById('highestScore');
    const box = 20;
    let snake = [{ x: 9 * box, y: 10 * box }];
    let direction = 'RIGHT';
    let food = {
        x: Math.floor(Math.random() * 19 + 1) * box,
        y: Math.floor(Math.random() * 19 + 1) * box
    };
    let score = 0;
    let highestScore = 0;
    let game;
    const backgroundImage = new Image();
    backgroundImage.src = 'background-image.jpg';
    const boxImage = new Image();
    boxImage.src = 'box-image.jpg';
    let speed = 100;
    let snakeColor = 'green';

    function resizeCanvas() {
        console.log('Resizing canvas');
        canvas.width = Math.min(window.innerWidth * 0.9, 400);
        canvas.height = canvas.width;
        adjustFoodPosition();
    }

    function adjustFoodPosition() {
        food.x = Math.floor(Math.random() * (canvas.width / box)) * box;
        food.y = Math.floor(Math.random() * (canvas.height / box)) * box;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    backgroundImage.onload = function() {
        console.log('Background image loaded');
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    };

    boxImage.onload = function() {
        console.log('Box image loaded');
    };

    document.addEventListener('keydown', setDirection);

    function setDirection(event) {
        console.log('Key pressed:', event.keyCode);
        if ([37, 38, 39, 40].includes(event.keyCode)) {
            event.preventDefault(); // Prevent page from scrolling
        }
        if (event.keyCode === 37 && direction !== 'RIGHT') direction = 'LEFT';
        else if (event.keyCode === 38 && direction !== 'DOWN') direction = 'UP';
        else if (event.keyCode === 39 && direction !== 'LEFT') direction = 'RIGHT';
        else if (event.keyCode === 40 && direction !== 'UP') direction = 'DOWN';
    }

    function draw() {
        console.log('Drawing game');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = snakeColor;
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
            ctx.strokeStyle = 'red';
            ctx.strokeRect(snake[i].x, snake[i].y, box, box);
        }

        ctx.fillStyle = 'red';
        ctx.fillRect(food.x, food.y, box, box);

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (direction === 'LEFT') snakeX -= box;
        if (direction === 'UP') snakeY -= box;
        if (direction === 'RIGHT') snakeX += box;
        if (direction === 'DOWN') snakeY += box;

        if (snakeX === food.x && snakeY === food.y) {
            score++;
            scoreDisplay.innerText = `Score: ${score}`;
            adjustFoodPosition();
        } else {
            snake.pop();
        }

        let newHead = {
            x: snakeX,
            y: snakeY
        };

        if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
            clearInterval(game);
            message.innerText = 'Game Over';
            if (score > highestScore) {
                highestScore = score;
                highestScoreDisplay.innerText = `Highest Score: ${highestScore}`;
            }
            return; // Prevent further drawing after game over
        }

        snake.unshift(newHead);
    }

    function collision(head, array) {
        for (let i = 0; i < array.length; i++) {
            if (head.x === array[i].x && head.y === array[i].y) {
                return true;
            }
        }
        return false;
    }

    function resetGame() {
        console.log('Resetting game');
        snake = [{ x: 9 * box, y: 10 * box }];
        direction = 'RIGHT';
        adjustFoodPosition();
        score = 0;
        scoreDisplay.innerText = `Score: ${score}`;
        message.innerText = '';
        clearInterval(game);
    }

    window.startGame = function() {
        console.log('Starting game');
        resetGame();
        game = setInterval(draw, speed);
    };

    window.resetGame = function() {
        console.log('Resetting game');
        resetGame();
        game = setInterval(draw, speed);
    };

    window.changeSpeed = function() {
        const speedSelect = document.getElementById('speed');
        speed = parseInt(speedSelect.value);
        clearInterval(game);
        game = setInterval(draw, speed);
    };

    window.changeColor = function() {
        const colorSelect = document.getElementById('color');
        snakeColor = colorSelect.value;
    };
});
