import test from 'node:test';
import assert from 'node:assert/strict';
import {pattern,RhythmEngine} from '../audio.js';
test('metronome accents only first beat of each measure',()=>{
  for(const meter of [3,4,6]) for(let step=0;step<meter*4;step++) assert.deepEqual(pattern(step,'click',meter),step%4?[]:[step===0?'accent':'click']);
});
test('trap has sixteen hats; boom bap has four',()=>{
  const count=mode=>Array.from({length:16},(_,i)=>pattern(i,mode)).flat().filter(x=>x==='hat').length;
  assert.equal(count('trap'),16);assert.equal(count('boomBap'),4);
});
test('scheduler uses audio time and recovers without late bursts',()=>{
  const e=new RhythmEngine();e.ctx={currentTime:2};e.running=true;e.next=1;e.step=0;const notes=[];e.sound=(kind,time)=>notes.push({kind,time});e.schedule();
  assert.ok(notes.length);assert.ok(notes.every(x=>x.time>=2.02&&x.time<2.12));
  assert.equal(notes[0].kind,'accent');e.configure({bpm:999,meter:7});assert.equal(e.bpm,240);assert.equal(e.meter,4);
});
