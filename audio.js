// A short look-ahead schedules notes on the audio clock, independent of UI timing.
export function pattern(step, mode, meter=4) {
  const beat=Math.floor(step/4), sub=step%4;
  if(mode==='click') return sub===0?[beat===0?'accent':'click']:[];
  const hits=[];
  if(sub===0&&(beat===0||(beat===2))) hits.push('kick');
  if(sub===0&&(beat%2===1)) hits.push('snare');
  if((mode==='trap')||sub%2===0) hits.push('hat');
  if(mode==='boomBap'&&sub===2) return hits.filter(x=>x!=='hat');
  return hits;
}
export class RhythmEngine {
  constructor(onBeat=()=>{},onState=()=>{}){this.onBeat=onBeat;this.onState=onState;this.bpm=90;this.meter=4;this.mode='click';this.volume=.55;this.running=false;this.pending=false;this.queue=[];}
  async start(){
    if(this.running||this.pending)return;
    this.pending=true;
    try{
      const Context=globalThis.AudioContext||globalThis.webkitAudioContext;
      if(!Context)throw Error('Bu tarayıcı ses üretimini desteklemiyor.');
      this.ctx??=new Context({latencyHint:'interactive'});
      await this.ctx.resume();
      if(!this.pending)return;
      if(this.ctx.state!=='running')throw Error('Ses başlatılamadı. Yeniden Başlat düğmesine dokun.');
      this.bus=this.ctx.createGain();this.bus.gain.value=this.volume*.6;
      const compressor=this.ctx.createDynamicsCompressor();compressor.threshold.value=-12;compressor.ratio.value=8;
      this.bus.connect(compressor);compressor.connect(this.ctx.destination);this.compressor=compressor;
      if(!this.noise){this.noise=this.ctx.createBuffer(1,this.ctx.sampleRate*.25,this.ctx.sampleRate);const d=this.noise.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;}
      this.running=true;this.step=0;this.next=this.ctx.currentTime+.06;this.queue=[];
      this.schedule();this.timer=setInterval(()=>this.schedule(),25);this.draw();this.onState(true);
    }finally{this.pending=false;}
  }
  stop(){this.pending=false;this.running=false;clearInterval(this.timer);cancelAnimationFrame(this.frame);this.queue=[];this.bus?.disconnect();this.compressor?.disconnect();if(this.ctx?.state==='running')this.ctx.suspend().catch(()=>{});this.onState(false);this.onBeat(-1);}
  configure({bpm=this.bpm,meter=this.meter,mode=this.mode,volume=this.volume}={}){this.bpm=Math.min(240,Math.max(30,Number(bpm)||90));this.meter=[3,4,6].includes(Number(meter))?Number(meter):4;this.mode=mode;this.volume=Math.max(0,Math.min(1,Number(volume)||0));if(this.bus)this.bus.gain.setTargetAtTime(this.volume*.6,this.ctx.currentTime,.015);}
  schedule(){if(!this.running)return;const now=this.ctx.currentTime;if(this.next<now){this.next=now+.02;}while(this.next<now+.12){const step=this.step%(this.meter*4);for(const hit of pattern(step,this.mode,this.meter))this.sound(hit,this.next);if(step%4===0)this.queue.push({time:this.next,beat:step/4});this.next+=60/this.bpm/4;this.step=(step+1)%(this.meter*4);}}
  draw(){if(!this.running)return;while(this.queue[0]?.time<=this.ctx.currentTime){this.onBeat(this.queue.shift().beat);}this.frame=requestAnimationFrame(()=>this.draw());}
  sound(kind,time){
    const ctx=this.ctx,gain=ctx.createGain();gain.connect(this.bus);let source,duration;
    if(kind==='hat'||kind==='snare'){
      source=ctx.createBufferSource();source.buffer=this.noise;
      const filter=ctx.createBiquadFilter();filter.type='highpass';filter.frequency.value=kind==='hat'?7000:1500;source.connect(filter);filter.connect(gain);duration=kind==='hat'?.045:.14;
      gain.gain.setValueAtTime(kind==='hat'?.16:.4,time);gain.gain.exponentialRampToValueAtTime(.001,time+duration);
      source.onended=()=>{source.disconnect();filter.disconnect();gain.disconnect();};
    }else{
      source=ctx.createOscillator();source.type=kind==='kick'?'sine':'triangle';duration=kind==='kick'?.18:.045;
      source.frequency.setValueAtTime(kind==='kick'?140:kind==='accent'?1400:950,time);
      if(kind==='kick')source.frequency.exponentialRampToValueAtTime(42,time+.14);
      gain.gain.setValueAtTime(.001,time);gain.gain.exponentialRampToValueAtTime(kind==='kick'?.8:.35,time+.002);gain.gain.exponentialRampToValueAtTime(.001,time+duration);source.connect(gain);source.onended=()=>{source.disconnect();gain.disconnect();};
    }
    source.start(time);source.stop(time+duration+.01);
  }
}
