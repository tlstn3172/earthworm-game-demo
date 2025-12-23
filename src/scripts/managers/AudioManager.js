export class AudioManager {
    constructor() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.isMuted = false;

        // Sound configurations (Synths)
        this.sounds = {
            move: { type: 'sine', freq: 200, duration: 0.1, gain: 0.1 },
            eat: { type: 'square', freq: 440, duration: 0.1, gain: 0.1 },
            crash: { type: 'sawtooth', freq: 100, duration: 0.3, gain: 0.2 },
            levelup: { type: 'triangle', freq: 600, duration: 0.5, gain: 0.1 }
        };
    }

    /**
     * Toggle mute state
     */
    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            this.ctx.suspend();
        } else {
            this.ctx.resume();
        }
    }

    /**
     * Play a sound by name
     * @param {string} name 
     */
    async play(name) {
        if (this.isMuted || !this.sounds[name]) return;

        if (this.ctx.state === 'suspended') {
            await this.ctx.resume();
        }

        const sound = this.sounds[name];
        const osc = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();

        osc.type = sound.type;
        osc.frequency.setValueAtTime(sound.freq, this.ctx.currentTime);

        // Simple Envelope
        gainNode.gain.setValueAtTime(sound.gain, this.ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + sound.duration);

        osc.connect(gainNode);
        gainNode.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + sound.duration);
    }
}
