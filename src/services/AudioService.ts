export class AudioService {
  private static instance: AudioService;
  private spinningSound: HTMLAudioElement;
  private winSound: HTMLAudioElement;
  private isMuted: boolean = false;

  private constructor() {
    // Update paths to use the correct public directory structure
    this.spinningSound = new Audio('/spinning.mp3');
    this.winSound = new Audio('/win.mp3');
    
    this.spinningSound.volume = 0.5;
    this.winSound.volume = 0.7;
    this.spinningSound.loop = true;

    // Preload the audio files
    this.preloadAudio();
  }

  private async preloadAudio() {
    try {
      await this.spinningSound.load();
      await this.winSound.load();
    } catch (error) {
      console.error('Failed to preload audio:', error);
    }
  }

  public static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
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
    try {
      this.spinningSound.pause();
      this.spinningSound.currentTime = 0;
    } catch (error) {
      console.error('Failed to stop spinning sound:', error);
    }
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
}