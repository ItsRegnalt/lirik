import test from 'node:test';
import assert from 'node:assert/strict';
import {pattern,RhythmEngine} from '../audio.js';
test('four-beat metronome accents first beat and leaves subdivisions silent',()=>{
 for(let step=0;step<32;step++)assert.deepEqual(pattern(step),step%4?[]:[step%16===0?'accent':'click']);
});
test('tempo and volume are bounded, including silent volume',()=>{
 const e=new RhythmEngine();e.configure({bpm:1,volume:2});assert.equal(e.bpm,30);assert.equal(e.volume,1);
 e.configure({volume:0});assert.equal(e.volume,0);
});
test('scheduler uses audio time and recovers without late bursts',()=>{
  const e=new RhythmEngine();e.ctx={currentTime:2};e.running=true;e.next=1;e.step=0;const notes=[];e.sound=(kind,time)=>notes.push({kind,time});e.schedule();
  assert.ok(notes.length);assert.ok(notes.every(x=>x.time>=2.02&&x.time<2.12));
  assert.equal(notes[0].kind,'accent');e.configure({bpm:999});assert.equal(e.bpm,240);
});
