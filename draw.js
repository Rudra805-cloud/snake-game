document.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.getElementById('board');
    const ctx = canvas.getContext('2d');

    function drawBoard() {
        // Draw the board grid
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                ctx.strokeRect(i * 60, j * 60, 60, 60);
            }
        }
    }

    function drawDice(number) {
        // Clear previous dice
        ctx.clearRect(0, 0, 60, 60);
        ctx.strokeRect(0, 0, 60, 60);
        // Draw dice number
        ctx.font = '40px Arial';
        ctx.fillText(number, 20, 40);
    }

    drawBoard();

    window.rollDice = function() {
        const diceNumber = Math.floor(Math.random() * 6) + 1;
        drawDice(diceNumber);
        document.getElementById('dice').innerText = `Dice: ${diceNumber}`;
    };
});
