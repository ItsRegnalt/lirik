import test from 'node:test';
import assert from 'node:assert/strict';
import {normalize,words,syllabify,countSyllables,analyze,findRhymes} from '../turkish.js';

test('Turkish locale casing and NFC',()=>{assert.equal(normalize('I İ Â'),'ı i â');assert.equal(normalize('I\u0307'),'i');});
test('punctuation and apostrophe tokenization',()=>{assert.deepEqual(words("İstanbul’a, güzel!"),["İstanbul’a",'güzel']);});
test('syllable boundaries for common Turkish words',()=>{assert.deepEqual(syllabify('merhaba'),['mer','ha','ba']);assert.deepEqual(syllabify('Türkçe'),['türk','çe']);assert.deepEqual(syllabify('İstanbul'),['is','tan','bul']);});
test('zero vowels means zero syllables; apostrophe is not a syllable',()=>{assert.deepEqual(syllabify('XYZ'),[]);assert.deepEqual(syllabify("Ankara'nın"),['an','ka','ra','nın']);});
test('counts â î û as vowel nuclei',()=>{assert.equal(countSyllables('kârî bir'),3);});
test('numbers and abbreviations report uncertainty',()=>{const r=analyze('2026\nTR');assert.match(r[0].note,/belirsiz/);assert.match(r[1].note,/belirsiz/);});
test('physical blank lines preserved and stanza split',()=>{assert.equal(analyze('gül\n\nçöl').length,3);});
test('rhyme sound includes all final sounds',()=>{assert.ok(findRhymes('deniz').some(x=>x.word==='temiz'&&x.type==='tam'));assert.ok(findRhymes('güneş').some(x=>x.word==='ateş'&&x.type==='tam'));assert.ok(findRhymes('gül').some(x=>x.word==='çöl'&&x.type==='yarım'));});
test('rhyme suggestions rank stronger shared endings first',()=>{const r=findRhymes('güneş');assert.equal(r[0].word,'ateş');});
test('offline rhyme corpus returns useful suggestions',()=>{for(const q of ['taş','gül','göz','yol','deniz','güneş','kalem','bahar','umut','zaman'])assert.ok(findRhymes(q).length>0,q);});
test('half, full and rich rhyme types are distinguished',()=>{assert.equal(findRhymes('gül').find(x=>x.word==='çöl').type,'yarım');assert.equal(findRhymes('deniz').find(x=>x.word==='temiz').type,'tam');assert.equal(findRhymes('ışık').find(x=>x.word==='aşık').type,'zengin');});
test('abab scheme',()=>{const r=analyze('deniz\nyol\ntemiz\nkol');assert.deepEqual(r.map(x=>x.letter),['A','B','A','B']);});
test('aabb scheme',()=>{const r=analyze('deniz\ntemiz\nyol\nkol');assert.deepEqual(r.map(x=>x.letter),['A','A','B','B']);});
test('abba scheme',()=>{const r=analyze('deniz\nyol\nkol\ntemiz');assert.deepEqual(r.map(x=>x.letter),['A','B','B','A']);});
test('exact repeated multiword ending is symmetric stanza redif',()=>{const r=analyze('güzel bir göz\nözel bir göz');assert.ok(r.every(x=>x.redif==='bir göz'));});
test('exact same terminal word checks preceding word',()=>{const r=analyze('deniz güzel\ntemiz güzel');assert.equal(r[0].redif,'güzel');assert.equal(r[1].redif,'güzel');assert.equal(r[0].letter,r[1].letter);});
test('verified shared suffix becomes redif, root remains rhyme',()=>{const r=analyze('gözlerim\nsözlerim');assert.ok(r.every(x=>x.redif==='lerim'));assert.equal(r[0].letter,r[1].letter);});
test('multiword common ending is recognized',()=>{const r=analyze('güzel sözler\nözel sözler');assert.ok(r.every(x=>x.redif==='sözler'));});
test('rhyme groups do not merge transitively across weak links',()=>{const r=analyze('deniz\ntemiz\naziz');assert.equal(r[0].letter,r[1].letter);});
test('labels expand beyond Z',()=>{const r=analyze([...'abcçdefgğhıijklmnoöprsştuüvyz'].join('\n'));assert.equal(r[26].letter,'AA');assert.equal(r[28].letter,'AC');});
test('long multisyllabic word handled',()=>{assert.equal(syllabify('başarısızlık').length,5);});
test('XSS-like markup remains plain input',()=>{assert.equal(words('<script>alert(1)</script>')[0],'script');assert.equal(analyze('<img src=x>').length,1);});
test('findRhymes obeys limit and kind',()=>{assert.ok(findRhymes('deniz',{limit:2}).length<=2);assert.ok(findRhymes('deniz',{kind:'tam'}).every(x=>x.type==='tam'));});
test('single row is not redif; repeated-only rows contain no fake rhyme',()=>{
  assert.equal(analyze('bir deniz')[0].redif,'');
  assert.ok(analyze('güzel\ngüzel').every(r=>r.rhyme===''&&r.letter==='—'));
});
test('diacritics preserved in syllable reader',()=>assert.deepEqual(syllabify('rüyâ'),['rü','yâ']));
test('three shared sounds are rich even with one consonant',()=>assert.ok(analyze('kaya\nyaya').every(r=>r.type==='zengin')));
test('uncertainty anywhere in line is reported',()=>assert.match(analyze('2025 güzel bir yıl')[0].note,/belirsiz/));
test('rhyme type applies symmetrically to both rows',()=>assert.ok(analyze('deniz\ntemiz').every(r=>r.type==='tam')));
test('crossed groups recognize shared suffix redif',()=>{
 const r=analyze('gözlerim\nyol\nsözlerim\nkol');assert.deepEqual(r.map(x=>x.letter),['A','B','A','B']);assert.equal(r[0].redif,'lerim');assert.equal(r[2].redif,'lerim');
});
