import {words,syllabify,countSyllables,analyze,findRhymes} from './turkish.js';
import {RhythmEngine} from './audio.js';
const $=id=>document.getElementById(id), draft=$('draft'), title=$('draft-title');
let toastTimer,saveTimer,pendingReplace,installPrompt;
function notify(message){$('toast').textContent=message;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),3500);}
function node(tag,cls,text){const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;}
function save(){try{localStorage.setItem('sozora-draft',JSON.stringify({title:title.value,text:draft.value}));$('save-state').textContent='Cihaza kaydedildi';}catch{$('save-state').textContent='Kaydedilemedi · İndir ile yedekle';}}
try{const saved=JSON.parse(localStorage.getItem('sozora-draft')||'null');if(saved){draft.value=String(saved.text||'');title.value=String(saved.title||'');}}catch{}
function empty(container){const div=node('div','empty-analysis');div.append(node('p','','Henüz metin yok.'));container.append(div);}
function render(){
  const text=draft.value,rows=analyze(text),active=rows.filter(x=>x.line.trim());
  $('word-count').textContent=words(text).length;$('line-count').textContent=active.length;$('syllable-count').textContent=countSyllables(text);
  $('scheme').textContent=active.length?rows.map(x=>x.line.trim()?x.letter:' / ').join(' ').trim():'—';
  const scheme=$('analysis-rows'), syllables=$('syllable-rows');scheme.replaceChildren();syllables.replaceChildren();
  if(!active.length){empty(scheme);empty(syllables);return;}
  rows.forEach((row,i)=>{
    if(!row.line.trim()){scheme.append(node('div','stanza-break'));syllables.append(node('div','stanza-break'));return;}
    const el=node('div','analysis-row'),line=node('div','row-text',row.line);
    const detail=[row.type?`${row.type} uyak`:'',row.redif?`Redif adayı: −${row.redif}`:'',`${row.syllables} hece`].filter(Boolean).join(' · ');
    line.append(node('small','',detail));if(row.note)line.append(node('small','',row.note));
    el.append(node('span','row-number',i+1),line,node('span','row-label',row.letter));scheme.append(el);
    const reader=node('div','analysis-row');reader.append(node('span','row-number',i+1),node('div','row-text',words(row.line).map(w=>/\d/u.test(w)?w:syllabify(w).join('·')||w).join('  /  ')),node('span','row-syllables',row.syllables));syllables.append(reader);
  });
}
draft.addEventListener('input',()=>{clearTimeout(saveTimer);$('save-state').textContent='Kaydediliyor…';saveTimer=setTimeout(save,250);render();});title.addEventListener('input',save);render();
function setTheme(theme){document.documentElement.dataset.theme=theme;$('theme-toggle').setAttribute('aria-checked',String(theme==='dark'));const label=theme==='dark'?'Açık moda geç':'Koyu moda geç';$('theme-toggle').setAttribute('aria-label',label);$('theme-toggle').title=label;document.querySelector('meta[name=theme-color]').content=theme==='dark'?'#121212':'#f2f3f7';}
setTheme(document.documentElement.dataset.theme==='dark'?'dark':'light');$('theme-toggle').onclick=()=>{const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';setTheme(theme);try{localStorage.setItem('sozora-theme',theme);}catch{}};
function setTab(name){for(const n of ['scheme','syllables']){const selected=n===name;$('tab-'+n).setAttribute('aria-selected',selected);$('tab-'+n).tabIndex=selected?0:-1;$('panel-'+n).hidden=!selected;}}
for(const n of ['scheme','syllables']){$('tab-'+n).onclick=()=>setTab(n);$('tab-'+n).onkeydown=e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?'scheme':e.key==='End'?'syllables':n==='scheme'?'syllables':'scheme';setTab(next);$('tab-'+next).focus();}};}
function search(){const q=$('rhyme-query').value.trim(),out=$('rhyme-results');out.replaceChildren();if(!q){out.append(node('span','empty-text','Kafiye bulmak için bir kelime yaz.'));return;}const results=findRhymes(q,{kind:$('rhyme-kind').value,limit:40});if(!results.length){out.append(node('span','empty-text','Bu seçkide eşleşme yok. Başka bir kelime veya uyak türü dene.'));return;}for(const r of results){const chip=node('button','chip',r.word);chip.type='button';chip.title=`${r.type} · ${r.syllables} hece · kopyala`;chip.onclick=()=>copyText(r.word);out.append(chip);}}
$('rhyme-form').onsubmit=e=>{e.preventDefault();search();};$('rhyme-kind').onchange=search;document.querySelectorAll('[data-query]').forEach(b=>b.onclick=()=>{$('rhyme-query').value=b.dataset.query;search();});
async function copyText(text){if(!text.trim()){notify('Önce birkaç kelime yaz.');return;}try{await navigator.clipboard.writeText(text);notify('Kopyalandı.');}catch{notify('Kopyalanamadı. Metni seçip cihazının Kopyala komutunu kullan.');}}
$('copy').onclick=()=>copyText(draft.value);
$('download').onclick=()=>{if(!draft.value.trim()){notify('Önce birkaç kelime yaz.');return;}const blob=new Blob([title.value?`${title.value}\n\n${draft.value}`:draft.value],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=node('a');a.href=url;a.download=(title.value||'Sözora-taslak').replace(/[<>:"/\\|?*\x00-\x1f]/g,'-').slice(0,80)+'.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
function replaceDraft(fn){if(draft.value.trim()||title.value.trim()){pendingReplace=fn;$('replace-dialog').showModal();}else fn();}
$('cancel-replace').onclick=()=>{$('replace-dialog').close();pendingReplace=null;};$('confirm-replace').onclick=()=>{$('replace-dialog').close();pendingReplace?.();pendingReplace=null;};
$('new-draft').onclick=()=>replaceDraft(()=>{draft.value='';title.value='';save();render();$('drawer-file').close();draft.focus();});
const engine=new RhythmEngine(beat=>{[...document.querySelectorAll('.beat-dots i')].forEach((el,i)=>el.classList.toggle('active',i===beat));},playing=>{$('play').textContent=playing?'■ Durdur':'▶ Başlat';$('audio-state').textContent=playing?'Çalıyor':'Duruşta';$('play').setAttribute('aria-pressed',String(playing));$('nav-rhythm').classList.toggle('playing',playing);$('nav-rhythm').setAttribute('aria-label',playing?'Metronom, çalıyor':'Metronom');});
function configure(){engine.configure({bpm:$('bpm').value,mode:$('rhythm-mode').value,meter:$('meter').value,volume:$('volume').value/100});}
function tempo(value){const n=Math.round(Math.min(240,Math.max(30,Number(value)||90)));$('bpm').value=n;$('tempo-range').value=n;configure();}
$('bpm').onchange=()=>tempo($('bpm').value);$('tempo-range').oninput=()=>tempo($('tempo-range').value);$('tempo-up').onclick=()=>tempo(Number($('bpm').value)+1);$('tempo-down').onclick=()=>tempo(Number($('bpm').value)-1);$('volume').oninput=configure;$('rhythm-mode').onchange=configure;
$('meter').onchange=()=>{const dots=document.querySelector('.beat-dots');dots.replaceChildren(...Array.from({length:Number($('meter').value)},()=>node('i')));configure();};
$('play').onclick=async()=>{if(engine.running){engine.stop();return;}$('play').disabled=true;try{stopReading();configure();await engine.start();}catch(e){notify(e.message);engine.stop();}finally{$('play').disabled=false;}};
let taps=[];$('tap').onclick=()=>{const now=performance.now();if(now-(taps.at(-1)||0)>2500)taps=[];taps.push(now);taps=taps.slice(-6);if(taps.length>1){const avg=(taps.at(-1)-taps[0])/(taps.length-1);tempo(60000/avg);}else notify('Aynı ritimde birkaç kez dokun.');};
document.addEventListener('visibilitychange',()=>{if(document.hidden&&engine.running){engine.stop();notify('Ritim arka planda duraklatıldı.');}if(document.hidden)stopReading();});window.addEventListener('pagehide',()=>{engine.stop();save();stopReading();});
let reading=false;function stopReading(){if('speechSynthesis' in window)speechSynthesis.cancel();reading=false;$('read').textContent='Sesli oku';}
$('read').onclick=()=>{if(reading){stopReading();return;}if(!draft.value.trim()){notify('Önce birkaç kelime yaz.');return;}if(!('speechSynthesis' in window)){notify('Bu tarayıcı sesli okumayı desteklemiyor.');return;}const voice=speechSynthesis.getVoices().find(v=>v.lang.toLowerCase().startsWith('tr'));if(!voice){notify('Cihazında Türkçe okuma sesi bulunamadı. Dil ayarlarından Türkçe ses ekleyebilirsin.');return;}engine.stop();const utterance=new SpeechSynthesisUtterance(draft.value);utterance.lang='tr-TR';utterance.voice=voice;utterance.rate=.8;utterance.onend=utterance.onerror=()=>{reading=false;$('read').textContent='Sesli oku';};reading=true;$('read').textContent='Okumayı durdur';speechSynthesis.speak(utterance);};
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;});window.addEventListener('appinstalled',()=>{installPrompt=null;$('install').textContent='Ana ekrana eklendi';});
$('install').onclick=async()=>{if(installPrompt){const p=installPrompt;installPrompt=null;await p.prompt();return;}const ios=/iPhone|iPad|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);$('install-instructions').textContent=matchMedia('(display-mode: standalone)').matches?'Sözora zaten uygulama olarak açık.':ios?'Safari’de Paylaş düğmesine dokun, ardından “Ana Ekrana Ekle”yi seç.':'Chrome veya Edge menüsünde “Uygulamayı yükle” ya da “Ana ekrana ekle”yi seç. Yükleme seçeneği yoksa sayfayı yer imlerine ekleyebilirsin.';$('install-dialog').showModal();};$('close-install').onclick=()=>$('install-dialog').close();
if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>notify('Çevrimdışı hazırlığı tamamlanamadı. İnternet bağlantını kontrol et.'));

for(const opener of document.querySelectorAll('[data-open]')){
 const panel=$(opener.dataset.open);
 opener.onclick=()=>{panel.showModal();opener.setAttribute('aria-expanded','true');};
 panel.querySelector('[data-close]').onclick=()=>panel.close();
 panel.addEventListener('click',e=>{if(e.target===panel){const r=panel.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)panel.close();}});
 panel.addEventListener('close',()=>opener.setAttribute('aria-expanded','false'));
}
