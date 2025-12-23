import { Snake } from './Snake';
import { Food } from './Food';
import { ObstacleManager } from './ObstacleManager';
import { Collision } from './Collision';
import { GAME_CONFIG, GAME_STATE, SCORE_VALUES } from '../utils/constants';

export class GameEngine {
    /**
     * @param {HTMLCanvasElement} canvas 
     * @param {object} managers { inputManager, stateManager, scoreManager, audioManager }
     */
    constructor(canvas, managers = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;

        // Managers
        this.inputManager = managers.inputManager;
        this.stateManager = managers.stateManager;
        this.scoreManager = managers.scoreManager;
        this.audioManager = managers.audioManager;

        // Time accumulator
        this.timeSinceLastMove = 0;

        this.bindEvents();
        this.init();
    }

    bindEvents() {
        if (this.inputManager) {
            this.inputManager.onDirection((dir) => {
                if (this.stateManager && this.stateManager.currentState === GAME_STATE.PLAYING) {
                    this.snake.setDirection(dir);
                }
            });
        }

        // Subscribe to state changes if needed
        if (this.stateManager) {
            this.stateManager.subscribe((newState) => {
                // specific logic on state change if needed
            });
        }
    }

    init() {
        this.snake = new Snake(this.width / 2, this.height / 2, GAME_CONFIG.INITIAL_SNAKE_LENGTH);
        this.food = new Food(this.width, this.height, GAME_CONFIG.GRID_SIZE);
        this.obstacleManager = new ObstacleManager(this.width, this.height, GAME_CONFIG.GRID_SIZE);

        this.level = 1;
        this.timeSinceLastMove = 0;
        this.difficultyMultiplier = this.difficultyMultiplier || 1.0; // Default to Normal

        // Use ScoreManager reset
        if (this.scoreManager) {
            this.scoreManager.reset();
        }

        // Apply Difficulty
        this.snake.speed = Math.floor(this.snake.speed * this.difficultyMultiplier);

        // Initial spawning
        this.obstacleManager.generate(this.level);
        this.food.spawn(this.snake.body, this.obstacleManager.getObstacles());

        // Sync State
        if (this.stateManager) {
            this.stateManager.setState(GAME_STATE.IDLE);
        }
    }

    /**
     * @param {number} multiplier Speed multiplier (e.g., 0.8 for Easy, 1.5 for Hard)
     */
    setDifficulty(multiplier) {
        this.difficultyMultiplier = multiplier;
    }

    start() {
        this.init();
        if (this.stateManager) {
            this.stateManager.setState(GAME_STATE.PLAYING);
        }
        if (this.audioManager) {
            this.audioManager.play('move'); // Just a start sound? or maybe 'levelup'?
        }
    }

    pause() {
        if (!this.stateManager) return;

        if (this.stateManager.currentState === GAME_STATE.PLAYING) {
            this.stateManager.setState(GAME_STATE.PAUSED);
        } else if (this.stateManager.currentState === GAME_STATE.PAUSED) {
            this.stateManager.setState(GAME_STATE.PLAYING);
        }
    }

    gameOver() {
        if (this.stateManager) {
            this.stateManager.setState(GAME_STATE.GAMEOVER);
        }
        if (this.audioManager) {
            this.audioManager.play('crash');
        }
    }

    /**
     * @param {number} deltaTime ms passed since last frame
     */
    update(deltaTime) {
        // Use StateManager
        const currentState = this.stateManager ? this.stateManager.currentState : GAME_STATE.IDLE;

        if (currentState !== GAME_STATE.PLAYING) return;

        this.timeSinceLastMove += deltaTime;

        if (this.timeSinceLastMove >= this.snake.speed) {
            this.timeSinceLastMove = 0;

            // Move Snake
            this.snake.move();

            // Check Collisions
            this.checkCollisions();
        }
    }

    checkCollisions() {
        const collisions = Collision.checkAllCollisions({
            head: this.snake.head,
            body: this.snake.body.slice(1),
            obstacles: this.obstacleManager.getObstacles(),
            canvasWidth: this.width,
            canvasHeight: this.height
        });

        if (collisions.wall || collisions.self || collisions.obstacle) {
            this.gameOver();
            return;
        }

        // Check Food
        if (Collision.checkFoodCollision(this.snake.head, this.food.position)) {
            this.handleFoodEaten();
        }
    }

    handleFoodEaten() {
        if (this.scoreManager) {
            this.scoreManager.addPoints(SCORE_VALUES.FOOD);
        }

        this.snake.grow();

        if (this.audioManager) {
            this.audioManager.play('eat');
        }

        // Speed up logic (simplified)
        const currentScore = this.scoreManager ? this.scoreManager.currentScore : 0;
        if (currentScore > 0 && currentScore % 50 === 0) {
            this.increaseLevel();
        }

        this.food.spawn(this.snake.body, this.obstacleManager.getObstacles());
    }

    increaseLevel() {
        this.level++;
        if (this.snake.speed > GAME_CONFIG.MIN_SPEED) {
            this.snake.speed -= GAME_CONFIG.SPEED_DECREMENT;
        }
        if (this.audioManager) {
            this.audioManager.play('levelup');
        }
    }

    render() {
        this.ctx.fillStyle = '#172210';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Draw Food
        this.ctx.fillStyle = '#ff0055';
        this.ctx.fillRect(this.food.position.x, this.food.position.y, GAME_CONFIG.GRID_SIZE - 1, GAME_CONFIG.GRID_SIZE - 1);

        // Draw Obstacles
        this.ctx.fillStyle = '#ffffff';
        this.obstacleManager.getObstacles().forEach(obs => {
            this.ctx.fillRect(obs.x, obs.y, GAME_CONFIG.GRID_SIZE, GAME_CONFIG.GRID_SIZE);
        });

        // Draw Snake
        this.snake.body.forEach((segment, index) => {
            this.ctx.fillStyle = index === 0 ? '#7bf425' : '#5ec315';
            this.ctx.fillRect(segment.x, segment.y, GAME_CONFIG.GRID_SIZE - 1, GAME_CONFIG.GRID_SIZE - 1);
        });
    }
}
