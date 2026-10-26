const VOWELS = new Set([...'aeıioöuü']);
const fold = s => s.normalize('NFC').replace(/[âîû]/g, c => ({'â':'a','î':'i','û':'u'}[c]));

export function normalize(text = '') { return String(text).normalize('NFC').toLocaleLowerCase('tr-TR').normalize('NFC'); }
export function words(text = '') { return String(text).normalize('NFC').match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu) || []; }

export function syllabify(word = '') {
  const s=normalize(word).replace(/['’]/g,''); const c=[...s];
  const nuclei=c.flatMap((x,i)=>VOWELS.has(fold(x))?[i]:[]);
  if (!nuclei.length) return [];
  const out=[]; let start=0;
  for(let i=0;i<nuclei.length-1;i++) {
    const left=nuclei[i], right=nuclei[i+1]; let onset=right;
    // One consonant begins the next syllable; in longer clusters only the last does.
    while(onset>left+1 && !VOWELS.has(fold(c[onset-1]))) onset--;
    const cluster=right-onset; onset=cluster===0?right:cluster===1?onset:right-1;
    out.push(c.slice(start,onset).join('')); start=onset;
  }
  out.push(c.slice(start).join('')); return out;
}
export function countSyllables(text='') { return words(text).reduce((n,w)=>n+( /\d/u.test(w) ? 0 : syllabify(w).length),0); }

// Curated, ordinary Turkish vocabulary, kept local for offline use. This is a suggestion
// corpus, not a comprehensive dictionary or semantic/morphological analyzer.
const corpus=`ağaç aydınlık akşam akıl alan alaz aile arkadaş arı araç armağan aslan aşk aşık atak avuç ay ayaz ayağım ayak ayla ayrılık bağ bahar bakış bal balık barış baş bayrak beden bekle ben beyaz bilgi bilek bilge bir bitki biz boğaz boya böcek bölük bulut burç buruk büyük cadde can canlı cevap cesur ceylan çiçek çocuk çorap dağ dal damla dans dayan deniz derman derin ders dilek dilim din doğa doğum dost düş düşler dünya düğüm el elma emek engel esen eser eş etek ev evren ezgi fidan fırtına fikir filiz ateş gelin gemi genç gerçek güzel göz gölge gömlek gönül gökyüzü gün güneş gül çöl güç gürültü haber hayat hak hakikat halk halı hamal han hane hayal hayran hece hediye heyecan hırka hikaye his hitap umut ırmak ışık iz iç içim insan İstanbul izlek kadın kader kalem kalp kanat kapı kara kardeş karga karın karlı kartal kasaba kavak kaya keder kelime keman kendi keskin kitap kıraç kıyı kış koku kol konak konu korku koşu köprü köy köz kuğu kulak kum kurak kuş kuytu labirent lale lamba leke leylak liman lisan lokma lodos mahir masal mavilik mektup melodi merak merdiven meşe mesele mesut mevsim meydan mısra misafir mizah mutlu nar nefes nehir neden nesil gece niyet nokta nur ocak oda okul olgun omuz onur orman ortak oyun ödev örnek özgür ömür ölüm özlem pahalı pamuk parça park pas parıltı pencere perde pervane piyasa rahat renk resim rüya sabah sabır sade saf sahil saklı sanat sarı saygı sefer seher sakin sel sema sen serin sevgi sevinç sığınak sınır sırt sıcak şiir şifa şirin şişe şive şöhret şule taç tane taş tavır temiz tepe terazi tını toprak töre türkü umut uyak uzak ümit üzüm vadi vakit varlık vatan vefa verim yağmur yakamoz yalın yalnız yamaç yan yana yaren yasemin yaşam yaz yazı yel yeni yer yeryüzü yığın yıldız yılkı yiğit yokuş yol yoldaş yorgun yürek yüz zaman zevk zeytin zihin zümrüt söz`.split(/\s+/);
const morph = new Map([
 ['ler',['ler']],['lar',['lar']],['lerim',['ler','im']],['larım',['lar','ım']],['lerimiz',['ler','imiz']],['larımız',['lar','ımız']],
 ['leriniz',['ler','iniz']],['larınız',['lar','ınız']],['leri',['ler','i']],['ları',['lar','ı']],
 ['lerden',['ler','den']],['lardan',['lar','dan']],['lerde',['ler','de']],['larda',['lar','da']],
 ['lerce',['ler','ce']],['ca',['ca']],['ce',['ce']],['ım',['ım']],['im',['im']],['um',['um']],['üm',['üm']]
]);
const roots = new Set(corpus.map(normalize));
const dictionary = new Set([...roots]);

function tail(w) { return fold(normalize(w).replace(/['’]/g,'')).replace(/[^\p{L}]+$/gu,''); }
function sharedEnding(a,b) { let n=0; while(n<a.length&&n<b.length&&a.at(-1-n)===b.at(-1-n)) n++; return a.slice(a.length-n); }
function rhymeType(a,b) {
  const common=sharedEnding(a,b); if(!common) return '';
  if([...common].every(c=>VOWELS.has(c))) return 'asonans';
  return common.length===1?'yarım':common.length===2?'tam':'zengin';
}
function endSound(w) { return tail(w); }

export function findRhymes(query,{kind='all',limit=40}={}) {
  const q=tail(query); if(!q) return [];
  return [...dictionary].filter(w=>tail(w)!==q).map(word=>{
    const ending=endSound(word), common=sharedEnding(endSound(q),ending), type=rhymeType(endSound(q),ending);
    return {word,ending:common||ending,type,syllables:syllabify(word).length,score:common.length};
  }).filter(x=>x.type && (kind==='all'||x.type===kind))
    .sort((a,b)=>b.score-a.score||a.word.localeCompare(b.word,'tr')).slice(0,Math.max(0,limit))
    .map(({score,...x})=>x);
}

function label(i){let x=i+1,s='';while(x){x--;s=String.fromCharCode(65+x%26)+s;x=Math.floor(x/26);}return s;}
function terminal(line){return words(line).at(-1)||'';}
function redifSplit(word){
  const w=tail(word); if(roots.has(w)) return {root:w,suffix:''};
  for(const [suffix] of [...morph].sort((a,b)=>b[0].length-a[0].length)) if(w.endsWith(suffix)) {
    const root=w.slice(0,-suffix.length); if(roots.has(root)) return {root,suffix};
  }
  return {root:w,suffix:''};
}
function stanza(rowGroup){
  const tokenRows=rowGroup.map(r=>words(r.line).map(tail));
  const exactDepth=Math.min(...tokenRows.map(x=>x.length)); let exact=0;
  while(rowGroup.length>1 && exact<exactDepth && tokenRows.every(x=>x.at(-1-exact)===tokenRows[0].at(-1-exact))) exact++;
  if(exact){
    const shared=tokenRows[0].slice(-exact).join(' ');
    for(const [i,r] of rowGroup.entries()){
      r.redif=shared; r.rhyme=tokenRows[i].at(-exact-1)||'';
      r.note='Tekrarlanan son kelimeler redif adayı; anlam ve görev bağlamda doğrulanmalı.';
    }
  } else if(rowGroup.length>1){
    const splits=tokenRows.map(x=>redifSplit(x.at(-1)||'')), suffix=splits[0].suffix;
    if(suffix && splits.every(x=>x.suffix===suffix)) for(const [i,r] of rowGroup.entries()){
      r.redif=suffix; r.rhyme=splits[i].root; r.note='Doğrulanmış kök/ek ayrımıyla redif adayı; kök anlamı bağlamda kesin olmayabilir.';
    }
  }
  if(!rowGroup.some(r=>r.redif)&&rowGroup.length>2){
    const subsets=new Map();
    for(const r of rowGroup){const split=redifSplit(r.word);const key=split.suffix?'suffix:'+split.suffix:'word:'+tail(r.word);if(!subsets.has(key))subsets.set(key,[]);subsets.get(key).push(r);}
    for(const rows of subsets.values())if(rows.length>1&&rows.length<rowGroup.length)stanza(rows);
  }
  const groups=[];
  for(const r of rowGroup){
    const end=endSound(r.redif ? r.rhyme : r.word); r.rhyme=end;
    if(!end){r.letter='—';r.type='';continue;}
    let best=-1, bestScore=0;
    for(let i=0;i<groups.length;i++){
      const common=sharedEnding(end,groups[i].ending), type=rhymeType(end,groups[i].ending);
      if(type && common.length>bestScore){best=i;bestScore=common.length;}
    }
    if(best<0){const g={ending:end,rows:[r],letter:label(groups.length)}; r.letter=g.letter;r.type='';groups.push(g);}
    else {r.letter=groups[best].letter;r.type=rhymeType(end,groups[best].ending);groups[best].rows.push(r);}
  }
  for(const g of groups) for(const r of g.rows){r.letter=g.letter;r.type=g.rows.length>1?rhymeType(g.rows.map(x=>endSound(x.rhyme)).reduce(sharedEnding),g.rows.map(x=>endSound(x.rhyme)).reduce(sharedEnding)):'';}
}

export function analyze(text='',options={}) {
  const lines=String(text).normalize('NFC').split(/\r?\n/), result=[]; let group=[];
  const flush=()=>{if(group.length){stanza(group);result.push(...group);group=[];}};
  for(const line of lines){
    if(!line.trim()){flush();result.push({line,word:'',syllables:0,letter:'-',rhyme:'',redif:'',type:'',note:''});continue;}
    const word=terminal(line), uncertain=words(line).some(w=>/\d/u.test(w)||/^[A-ZÇĞİÖŞÜ]{2,}$/.test(w));
    group.push({line,word,syllables:countSyllables(line),letter:'',rhyme:word,redif:'',type:'',note:uncertain?'Sayı/kısaltmanın telaffuzu belirsiz; hece sayısı eksik olabilir.':''});
  }
  flush(); return result;
}
