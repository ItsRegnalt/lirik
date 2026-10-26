import test from 'node:test';
import assert from 'node:assert/strict';
import {lineEndings} from '../editor.js';
test('only completed logical line endings become actions',()=>{
 assert.deepEqual(lineEndings('deniz'),[]);
 assert.deepEqual(lineEndings('deniz '),[{start:0,end:5,word:'deniz'}]);
 assert.deepEqual(lineEndings('uzun bir dize'),[]);
 assert.deepEqual(lineEndings('deniz\nyol ').map(x=>x.word),['deniz','yol']);
});
test('Turkish letters, punctuation and source offsets survive',()=>{
 const text="Bir düş,\nİstanbul’un! ";
 const endings=lineEndings(text);assert.deepEqual(endings.map(x=>x.word),['düş','İstanbul’un']);
 for(const e of endings)assert.equal(text.slice(e.start,e.end),e.word);
 assert.deepEqual(lineEndings('123 \n \n'),[]);
});
