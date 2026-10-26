// A short look-ahead schedules notes on the audio clock, independent of UI timing.
export function pattern(step) {
  return step%4===0?[step%16===0?'accent':'click']:[];
}
export class RhythmEngine {
  constructor(onBeat=()=>{},onState=()=>{}){this.onBeat=onBeat;this.onState=onState;this.bpm=90;this.tone='classic';this.volume=.55;this.running=false;this.pending=false;this.queue=[];}
  async start(){
    if(this.running||this.pending)return;
    this.pending=true;
    const attempt=this.attempt=Symbol();
    try{
      const Context=globalThis.AudioContext||globalThis.webkitAudioContext;
      if(!Context)throw Error('Bu tarayıcı ses üretimini desteklemiyor.');
      this.ctx??=new Context({latencyHint:'interactive'});
      await this.ctx.resume();
      await this.loadSounds();
      if(!this.pending||this.attempt!==attempt)return;
      if(this.ctx.state!=='running')throw Error('Ses başlatılamadı. Yeniden Başlat düğmesine dokun.');
      this.bus=this.ctx.createGain();this.bus.gain.value=this.volume*.6;
      const compressor=this.ctx.createDynamicsCompressor();compressor.threshold.value=-12;compressor.ratio.value=8;
      this.bus.connect(compressor);compressor.connect(this.ctx.destination);this.compressor=compressor;
      this.running=true;this.step=0;this.next=this.ctx.currentTime+.06;this.queue=[];
      this.schedule();this.timer=setInterval(()=>this.schedule(),25);this.draw();this.onState(true);
    }finally{if(this.attempt===attempt)this.pending=false;}
  }
  stop(){this.attempt=null;this.pending=false;this.running=false;clearInterval(this.timer);cancelAnimationFrame(this.frame);this.queue=[];this.bus?.disconnect();this.compressor?.disconnect();if(this.ctx?.state==='running')this.ctx.suspend().catch(()=>{});this.onState(false);this.onBeat(-1);}
  configure({bpm=this.bpm,volume=this.volume,tone=this.tone}={}){this.tone=['classic','low','high'].includes(tone)?tone:'classic';this.bpm=Math.min(240,Math.max(30,Number(bpm)||90));this.volume=Math.max(0,Math.min(1,Number(volume)||0));if(this.bus)this.bus.gain.setTargetAtTime(this.volume*.6,this.ctx.currentTime,.015);}
  schedule(){if(!this.running)return;const now=this.ctx.currentTime;if(this.next<now){this.next=now+.02;}while(this.next<now+.12){const step=this.step%16;for(const hit of pattern(step))this.sound(hit,this.next);if(step%4===0)this.queue.push({time:this.next,beat:step/4});this.next+=60/this.bpm/4;this.step=(step+1)%16;}}
  draw(){if(!this.running)return;while(this.queue[0]?.time<=this.ctx.currentTime){this.onBeat(this.queue.shift().beat);}this.frame=requestAnimationFrame(()=>this.draw());}
  async loadSounds(){
    if(this.buffers)return;
    if(!this.loading)this.loading=Promise.all(['classic','low','high'].map(async kind=>{
      const response=await fetch(new URL(`./sounds/${kind}.wav`,import.meta.url));
      if(!response.ok)throw Error('Vuruş sesleri yüklenemedi. Bağlantını kontrol edip tekrar dene.');
      return [kind,await this.ctx.decodeAudioData(await response.arrayBuffer())];
    })).then(entries=>{this.buffers=Object.fromEntries(entries);}).finally(()=>{this.loading=null;});
    await this.loading;
  }
  sound(kind,time){
    const source=this.ctx.createBufferSource();source.buffer=this.buffers[this.tone];
    const gain=this.ctx.createGain();gain.gain.value=kind==='accent'?.85:.6;
    source.connect(gain);gain.connect(this.bus);source.onended=()=>{source.disconnect();gain.disconnect();};source.start(time);
  }
}
