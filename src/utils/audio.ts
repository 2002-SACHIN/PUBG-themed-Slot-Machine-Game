export class AudioManager {
  private static instance: AudioManager;
  private spinningSound: HTMLAudioElement;
  private winSound: HTMLAudioElement;
  private isMuted: boolean = false;

  private constructor() {
    this.spinningSound = new Audio('/spinning.mp3');
    this.winSound = new Audio('/win.mp3');
    
    // Configure audio elements
    this.spinningSound.volume = 0.5;
    this.winSound.volume = 0.7;
    
    // Enable looping for spinning sound
    this.spinningSound.loop = true;
    
    // Preload the sounds
    this.spinningSound.preload = 'auto';
    this.winSound.preload = 'auto';
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  public async playSpinning(): Promise<void> {
    if (this.isMuted) return;
    try {
      this.spinningSound.currentTime = 0;
      await this.spinningSound.play();
    } catch (error) {
      console.error('Failed to play spinning sound:', error);
    }
  }

  public stopSpinning(): void {
    this.spinningSound.pause();
    this.spinningSound.currentTime = 0;
  }

  public async playWin(): Promise<void> {
    if (this.isMuted) return;
    try {
      this.winSound.currentTime = 0;
      await this.winSound.play();
    } catch (error) {
      console.error('Failed to play win sound:', error);
    }
  }

  public toggleMute(): void {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopSpinning();
    }
  }

  public isSoundMuted(): boolean {
    return this.isMuted;
  }
}