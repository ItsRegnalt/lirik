import test from 'node:test';
import assert from 'node:assert/strict';
import {isHeading,lyricsText,selectedLine,sections,arrangeSection,cleanAlternatives,alternativesAppendix} from '../writing.js';
import {analyze,words} from '../turkish.js';
test('only explicit section labels are excluded, ordinary lyrics survive',()=>{
 for(const label of ['[Kıta 1]','[Nakarat]',' [Köprü] ','[Giriş 2]'])assert.ok(isHeading(label));
 for(const line of ['Nakarat','[bir gün]','[Kıta 0]','[Nakarat] sesim'])assert.ok(!isHeading(line));
 assert.equal(lyricsText('[Kıta 1]\nGece gelir\n[Nakarat]\nBeni bulur'),'\nGece gelir\n\nBeni bulur');
 assert.equal(words(lyricsText('[Nakarat]\nBeni bul')).length,2);
 assert.equal(analyze(lyricsText('[Nakarat]\nBeni bul'))[1].syllables,3);
});
test('logical line selection respects beginning, empty lines, duplicate lines and Unicode',()=>{
 assert.deepEqual(selectedLine('\nyol',0),{start:0,end:0,text:''});
 assert.deepEqual(selectedLine('gül\ngül',4),{start:4,end:7,text:'gül'});
 assert.deepEqual(selectedLine('gül\n',4),{start:4,end:4,text:''});
 assert.equal(selectedLine('bir\niki',3).text,'bir');
});
test('section ranges preserve unlabelled preface and blank lines',()=>{
 const text='önce\n\n[Kıta 1]\nsöz\n\n[Nakarat]\nyol';
 const parts=sections(text);assert.equal(parts.length,3);assert.equal(parts.map(x=>x.text).join(''),text);
 assert.deepEqual(parts.map(x=>text.slice(x.start,x.end)),parts.map(x=>x.text));
});
test('moving and duplicating final section cannot merge heading with lyric',()=>{
 const text='[Kıta 1]\ngece\n\n[Nakarat]\nyol';
 assert.equal(arrangeSection(text,1,'up'),'[Nakarat]\nyol\n[Kıta 1]\ngece\n\n');
 const copy=arrangeSection(text,1,'duplicate');assert.equal(sections(copy).length,3);assert.equal(copy,'[Kıta 1]\ngece\n\n[Nakarat]\nyol\n[Nakarat]\nyol');
 assert.equal(arrangeSection(text,0,'up'),text);assert.equal(arrangeSection(text,8,'up'),text);
});
test('legacy drafts and malformed alternatives load without unsafe records',()=>{
 assert.deepEqual(cleanAlternatives(undefined),[]);
 assert.deepEqual(cleanAlternatives([null,['a','a'],['a','b',4,'','[Nakarat]','x\ny']]),[['a','b']]);
 const text='<img onerror=alert(1)>';
 assert.deepEqual(cleanAlternatives([[text,'başka']]),[[text,'başka']]);
});
test('download preserves all saved variants including deleted lines',()=>{
 const appendix=alternativesAppendix([['gece','gündüz'],['yol','iz']]);
 for(const line of ['gece','gündüz','yol','iz'])assert.ok(appendix.includes(line));
 assert.equal(alternativesAppendix([]),'');
});
