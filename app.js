import {words,syllabify,analyze,findRhymes} from './turkish.js';
import {RhythmEngine} from './audio.js';
import {lineEndings} from './editor.js';
import {isHeading,lyricsText,cleanAlternatives,alternativesAppendix} from './writing.js';
import {initWriting} from './writing-ui.js';
const $=id=>document.getElementById(id), draft=$('draft'), title=$('draft-title');
let toastTimer,saveTimer,pendingReplace,installPrompt,returnToDraft,writingTools;
let variantGroups=[];
function notify(message){$('toast').textContent=message;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),3500);}
function node(tag,cls,text){const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;}
function saveState(text,state){$('save-state').textContent=text;$('save-state').dataset.state=state;}
function save(){try{localStorage.setItem('sozora-draft',JSON.stringify({title:title.value,text:draft.value,alternatives:variantGroups}));saveState('Cihaza kaydedildi','saved');}catch{saveState('Kaydedilemedi · Metni indir','error');}}
try{const saved=JSON.parse(localStorage.getItem('sozora-draft')||'null');if(saved){draft.value=String(saved.text||'');title.value=String(saved.title||'');variantGroups=cleanAlternatives(saved.alternatives);saveState('Cihaza kaydedildi','saved');}}catch{}
function empty(container){const div=node('div','empty-analysis');div.append(node('p','','Henüz metin yok.'));container.append(div);}
const visibleEndings=new IntersectionObserver(entries=>{for(const entry of entries)entry.target.tabIndex=entry.isIntersecting&&entry.intersectionRatio>=.99?0:-1;},{root:$('ending-overlay'),threshold:[0,1]});
let mirroredLines=[];
function syncEndings(){const mirror=$('ending-mirror');mirror.style.width=draft.clientWidth+'px';mirror.style.transform=`translate(${-draft.scrollLeft}px,${-draft.scrollTop}px)`;}
function mirrorText(text){const span=node('span','',text);span.setAttribute('aria-hidden','true');return span;}
function endingLine(text){
 const row=node('span');let offset=0;
 for(const ending of (isHeading(text)?[]:lineEndings(text))){
  row.append(mirrorText(text.slice(offset,ending.start)));
  const button=node('button','ending-word',ending.word);button.type='button';button.tabIndex=-1;button.setAttribute('aria-label',`${ending.word} için kafiye bul`);
  button.onpointerdown=e=>e.preventDefault();
  button.onclick=()=>{const position={start:draft.selectionStart,end:draft.selectionEnd,direction:draft.selectionDirection,scroll:draft.scrollTop};$('rhyme-query').value=ending.word;$('rhyme-kind').value='all';openTool($('nav-rhyme'));returnToDraft=position;search();$('rhyme-query').focus({preventScroll:true});};
  row.append(button);visibleEndings.observe(button);offset=ending.end;
 }
 row.append(mirrorText(text.slice(offset)));return {text,element:row};
}
function renderEndings(){
 const mirror=$('ending-mirror'),lines=draft.value.match(/[^\n]*\n|[^\n]+$/g)||[''];let start=0,end=mirroredLines.length,newEnd=lines.length;
 while(start<end&&start<newEnd&&mirroredLines[start].text===lines[start])start++;
 while(end>start&&newEnd>start&&mirroredLines[end-1].text===lines[newEnd-1]){end--;newEnd--;}
 for(let i=start;i<end;i++){for(const button of mirroredLines[i].element.querySelectorAll('button'))visibleEndings.unobserve(button);mirroredLines[i].element.remove();}
 const additions=lines.slice(start,newEnd).map(endingLine),fragment=document.createDocumentFragment();for(const row of additions)fragment.append(row.element);
 mirror.insertBefore(fragment,mirroredLines[end]?.element||null);mirroredLines.splice(start,end-start,...additions);syncEndings();
}

draft.addEventListener('scroll',syncEndings);
new ResizeObserver(syncEndings).observe(draft);
document.fonts.ready.then(syncEndings);
let lineStats=new Map();
function render(updateEndings=true){
  if(updateEndings)renderEndings();
  const text=lyricsText(draft.value),nextStats=new Map();let wordCount=0,lineCount=0,syllablesCount=0,uncertain=false;
  for(const line of text.split('\n')){let stats=lineStats.get(line)||nextStats.get(line);if(!stats){const row=analyze(line)[0];stats={words:words(line).length,syllables:row.syllables,uncertain:row.uncertain,active:!!line.trim()};}nextStats.set(line,stats);wordCount+=stats.words;syllablesCount+=stats.syllables;lineCount+=Number(stats.active);uncertain ||= stats.uncertain;}
  lineStats=nextStats;$('word-count').textContent=wordCount;$('line-count').textContent=lineCount;$('syllable-count').textContent=syllablesCount+(uncertain?'+':'');$('syllable-count').title=uncertain?'Sayı ve kısaltmalar sayılmadı; toplam eksik olabilir.':'';
  if($('drawer-analysis').hidden)return;
  const rows=analyze(text),active=rows.filter(x=>x.line.trim());
  $('scheme').textContent=active.length?rows.map(x=>x.line.trim()?x.letter:' / ').join(' ').trim():'—';
  const scheme=$('analysis-rows'), syllables=$('syllable-rows');scheme.replaceChildren();syllables.replaceChildren();
  if(!active.length){empty(scheme);empty(syllables);return;}
  rows.forEach((row,i)=>{
    if(!row.line.trim()){scheme.append(node('div','stanza-break'));syllables.append(node('div','stanza-break'));return;}
    const el=node('div','analysis-row'),line=node('div','row-text',row.line);
    const detail=[row.type?`${row.type} uyak`:'',row.redif?`Redif adayı: −${row.redif}`:'',`${row.syllables}${row.uncertain?'+':''} hece`].filter(Boolean).join(' · ');
    line.append(node('small','',detail));if(row.note)line.append(node('small','',row.note));
    el.append(node('span','row-number',i+1),line,node('span','row-label',row.letter));scheme.append(el);
    const reader=node('div','analysis-row');reader.append(node('span','row-number',i+1),node('div','row-text',words(row.line).map(w=>/\d/u.test(w)?w:syllabify(w).join('·')||w).join('  /  ')),node('span','row-syllables',row.syllables+(row.uncertain?'+':'')));syllables.append(reader);
  });
}
draft.addEventListener('input',()=>{returnToDraft=null;clearTimeout(saveTimer);saveState('Kaydediliyor…','saving');saveTimer=setTimeout(save,250);render();});title.addEventListener('input',save);render();
let themeChoice=document.documentElement.dataset.theme==='dark'?'dark':'light';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function haptic(pattern = 8) {
  if (reducedMotion.matches) return;
  try { navigator.vibrate?.(pattern); } catch {}
}
function setTheme(theme, updateBrowserColor = true) {
  document.documentElement.dataset.theme = theme;
  const toggle = document.getElementById('theme-toggle');
  const label = theme === 'dark' ? 'Açık moda geç' : 'Koyu moda geç';
  toggle.setAttribute('aria-label', label); toggle.title = label;
  toggle.setAttribute('aria-checked', String(theme === 'dark'));
  if (updateBrowserColor) document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#121212' : '#f2f3f7';
}
setTheme(themeChoice || 'light');
document.getElementById('theme-toggle').addEventListener('click', async event => {
  const button = event.currentTarget;
  haptic();
  themeChoice = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  const apply = () => { setTheme(themeChoice, false); try { localStorage.setItem('sozora-theme', themeChoice); } catch {} };
  if (reducedMotion.matches || !document.startViewTransition) { apply(); setTheme(themeChoice); return; }
  button.disabled = true;
  // Capture complete theme colors, rather than intermediate control transitions.
  document.documentElement.classList.add('theme-transition');
  getComputedStyle(document.documentElement).color;
  try {
    const transition = document.startViewTransition(apply);
    await transition.ready;
    document.documentElement.animate({ opacity: [0, 1] }, {
      duration: 280, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)'
    });
    await transition.finished;
  } catch { apply(); }
  finally {
    setTheme(themeChoice);
    document.documentElement.classList.remove('theme-transition');
    button.disabled = false;
  }
});
function setTab(name){for(const n of ['scheme','syllables']){const selected=n===name;$('tab-'+n).setAttribute('aria-selected',selected);$('tab-'+n).tabIndex=selected?0:-1;$('panel-'+n).hidden=!selected;}}
for(const n of ['scheme','syllables']){$('tab-'+n).onclick=()=>setTab(n);$('tab-'+n).onkeydown=e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?'scheme':e.key==='End'?'syllables':n==='scheme'?'syllables':'scheme';setTab(next);$('tab-'+next).focus();}};}
function search(){const q=$('rhyme-query').value.trim(),out=$('rhyme-results');out.replaceChildren();if(!q){out.append(node('span','empty-text','Kafiye bulmak için bir kelime yaz.'));return;}const results=findRhymes(q,{kind:$('rhyme-kind').value,limit:40});if(!results.length){out.append(node('span','empty-text','Bu seçkide eşleşme yok. Başka bir kelime veya kafiye türü dene.'));return;}for(const r of results){const chip=node('button','chip',r.word);chip.type='button';chip.title=`${r.type} · ${r.syllables} hece · kopyala`;chip.onclick=()=>copyText(r.word);out.append(chip);}}
$('rhyme-form').onsubmit=e=>{e.preventDefault();search();};$('rhyme-query').addEventListener('input',e=>{if(!e.isComposing)search();});$('rhyme-query').addEventListener('compositionend',search);$('rhyme-kind').onchange=search;document.querySelectorAll('[data-query]').forEach(b=>b.onclick=()=>{$('rhyme-query').value=b.dataset.query;search();});
async function copyText(text){if(!text.trim()){notify('Önce birkaç kelime yaz.');return;}try{await navigator.clipboard.writeText(text);notify('Kopyalandı.');}catch{notify('Kopyalanamadı. Metni seçip cihazının Kopyala komutunu kullan.');}}
$('copy').onclick=()=>copyText(draft.value);
function downloadDraft(){if(!draft.value.trim()&&!title.value.trim()&&!variantGroups.length){notify('Önce birkaç kelime yaz.');return;}const blob=new Blob([(title.value?`${title.value}\n\n${draft.value}`:draft.value)+alternativesAppendix(variantGroups)],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=node('a');a.href=url;a.download=(title.value||'Lirik-taslak').replace(/[<>:"/\\|?*\x00-\x1f]/g,'-').slice(0,80)+'.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
$('download').onclick=downloadDraft;$('download-before-replace').onclick=downloadDraft;
function replaceDraft(fn){if(draft.value.trim()||title.value.trim()||variantGroups.length){pendingReplace=fn;$('replace-dialog').showModal();}else fn();}
$('cancel-replace').onclick=()=>{$('replace-dialog').close();pendingReplace=null;};$('confirm-replace').onclick=()=>{$('replace-dialog').close();pendingReplace?.();pendingReplace=null;};
$('new-draft').onclick=()=>replaceDraft(()=>{draft.value='';title.value='';variantGroups=[];clearTimeout(saveTimer);writingTools?.reset();save();render();closeTools();draft.focus();});
const engine=new RhythmEngine(beat=>{[...document.querySelectorAll('.beat-dots i')].forEach((el,i)=>el.classList.toggle('active',i===beat));},playing=>{$('play').textContent=playing?'Durdur':'Başlat';$('audio-state').textContent=playing?'Çalıyor':'Duruşta';$('play').setAttribute('aria-pressed',String(playing));$('nav-rhythm').classList.toggle('playing',playing);$('nav-rhythm').setAttribute('aria-label',playing?'Metronom, çalıyor':'Metronom');});
function configure(){engine.configure({bpm:$('bpm').value,volume:$('volume').value/100,tone:$('metronome-sound').value});try{localStorage.setItem('lirik-metronome-settings',JSON.stringify({bpm:engine.bpm,volume:engine.volume,tone:engine.tone}));}catch{}}
function tempo(value){const n=Math.round(Math.min(240,Math.max(30,Number(value)||90)));$('bpm').value=n;$('tempo-range').value=n;configure();}
$('bpm').onchange=()=>tempo($('bpm').value);$('tempo-range').oninput=()=>tempo($('tempo-range').value);$('tempo-up').onclick=()=>tempo(Number($('bpm').value)+1);$('tempo-down').onclick=()=>tempo(Number($('bpm').value)-1);$('volume').oninput=configure;
try{const tone=localStorage.getItem('lirik-metronome-sound');if(['classic','low','high'].includes(tone))$('metronome-sound').value=tone;}catch{}
try{const settings=JSON.parse(localStorage.getItem('lirik-metronome-settings')||'null');if(settings){if(['classic','low','high'].includes(settings.tone))$('metronome-sound').value=settings.tone;if(Number.isFinite(settings.volume))$('volume').value=Math.round(Math.max(0,Math.min(1,settings.volume))*100);tempo(settings.bpm);}}catch{}
const soundNames={classic:'Klasik',low:'Ahşap',high:'Hi-hat'};
function updateSoundPicker(){const selected=$('metronome-sound').value;$('sound-name').textContent=soundNames[selected];document.querySelectorAll('[data-sound]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.sound===selected)));}
updateSoundPicker();
for(const button of document.querySelectorAll('[data-sound]'))button.onclick=()=>{$('metronome-sound').value=button.dataset.sound;configure();updateSoundPicker();$('sound-status').textContent=soundNames[button.dataset.sound]+' sesi seçildi.';$('sound-picker').open=false;$('sound-picker').querySelector('summary').focus();try{localStorage.setItem('lirik-metronome-sound',button.dataset.sound);}catch{}};
const previewEngine=new RhythmEngine();let previewTimer,previewAttempt=0;
function stopPreview(){previewAttempt++;clearTimeout(previewTimer);previewEngine.stop();document.querySelectorAll('[data-preview]').forEach(button=>button.setAttribute('aria-pressed','false'));}
for(const button of document.querySelectorAll('[data-preview]'))button.onclick=async()=>{stopPreview();const attempt=previewAttempt;try{if(engine.running)engine.stop();button.setAttribute('aria-pressed','true');previewEngine.configure({bpm:240,volume:$('volume').value/100,tone:button.dataset.preview});await previewEngine.start();if(attempt===previewAttempt)$('sound-status').textContent=soundNames[button.dataset.preview]+' sesi önizleniyor.';if(attempt===previewAttempt)previewTimer=setTimeout(stopPreview,450);}catch(e){if(attempt===previewAttempt){stopPreview();notify(e.message);}}};
$('play').onclick=async()=>{stopPreview();if(engine.running){engine.stop();return;}$('play').disabled=true;try{configure();await engine.start();}catch(e){notify(e.message);engine.stop();}finally{$('play').disabled=false;}};
$('sound-picker').addEventListener('keydown',e=>{if(e.key==='Escape'&&$('sound-picker').open){e.preventDefault();e.stopPropagation();$('sound-picker').open=false;$('sound-picker').querySelector('summary').focus();}});
document.addEventListener('click',e=>{if(!e.target.closest('#sound-picker'))$('sound-picker').open=false;});
let taps=[];$('tap').onclick=()=>{const now=performance.now();if(now-(taps.at(-1)||0)>2500)taps=[];taps.push(now);taps=taps.slice(-6);if(taps.length>1){const avg=(taps.at(-1)-taps[0])/(taps.length-1);tempo(60000/avg);}else notify('Aynı ritimde birkaç kez dokun.');};
document.addEventListener('visibilitychange',()=>{if(document.hidden){stopPreview();}if(document.hidden&&engine.running){engine.stop();notify('Ritim arka planda duraklatıldı.');}});window.addEventListener('pagehide',()=>{engine.stop();stopPreview();save();});
// PatiGram's expandable installation guide; all text remains available offline.
const installGuides = [
 ['iPhone · Safari', 'Lirik’i Safari’de aç. Paylaş’a (veya Sayfa Menüsü → Paylaş) dokun → Ana Ekrana Ekle. Görünüyorsa “Web Uygulaması Olarak Aç” seçeneğini açık tut ve Ekle’ye dokun.'],
 ['iPhone / iPad · Chrome', 'Lirik’i Chrome’da aç. Adres çubuğunun yanındaki Paylaş → Ana Ekrana Ekle → Ekle yolunu izle. Görünüyorsa “Web Uygulaması Olarak Aç” seçeneğini açık tut.'],
 ['Android · Chrome', 'Lirik’i Chrome’da aç. ⋮ → Yükle ve kısayol oluştur → Yükle yolunu izle ve ekrandaki adımları tamamla. Sürüme göre “Ana ekrana ekle” yazabilir.'],
 ['Bilgisayar · Chrome / Edge', 'Adres çubuğundaki yükleme simgesine tıkla veya tarayıcı menüsünden “Lirik’i yükle” seçeneğini kullan.']
];
const installSources = ['https://support.apple.com/en-gb/guide/iphone/iphea86e5236/ios', 'https://support.google.com/chrome/answer/9658361?co=GENIE.Platform%3DiOS', 'https://support.google.com/chrome/answer/9658361?co=GENIE.Platform%3DAndroid'];
const nativeInstall=node('button','primary','Lirik’i yükle');nativeInstall.type='button';nativeInstall.id='native-install';nativeInstall.hidden=true;$('install-instructions').append(nativeInstall);
installGuides.forEach(([title,body],i)=>{const section=node('section');section.append(node('h3','',title),node('p','',body));if(installSources[i]){const link=node('a','','Resmi rehber ↗');link.href=installSources[i];link.target='_blank';link.rel='noopener noreferrer';section.append(link);}$('install-instructions').append(section);});
$('install-instructions').append(node('p','install-note','Menü adları sistem sürümüne göre değişebilir. iPhone’da seçenek yoksa Safari’yi dene. Ana ekran uygulaması ayrı depolama kullanabilir; geçmeden önce sözlerini indir. İlk çevrimiçi açılıştan sonra defter ve araçlar çevrimdışı çalışır.'));
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;nativeInstall.hidden=false;});
window.addEventListener('appinstalled',()=>{installPrompt=null;nativeInstall.hidden=true;notify('Lirik ana ekrana eklendi.');});
nativeInstall.onclick=async()=>{if(!installPrompt)return;const prompt=installPrompt;installPrompt=null;nativeInstall.hidden=true;try{await prompt.prompt();await prompt.userChoice;}catch{notify('Kurulumu aşağıdaki tarayıcı adımlarıyla tamamlayabilirsin.');}};
$('install-help').addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();$('install-help').open=false;$('install').focus();}});
if('serviceWorker' in navigator){navigator.serviceWorker.register('./sw.js').then(()=>navigator.serviceWorker.ready).then(()=>{$('offline-state').textContent='Çevrimdışı kullanıma hazır.';}).catch(()=>{$('offline-state').textContent='Çevrimdışı hazırlığı tamamlanamadı. İnternete bağlanıp sayfayı yeniden aç.';});}else $('offline-state').textContent='Bu tarayıcı çevrimdışı kaydı desteklemiyor.';

const openers=[...document.querySelectorAll('[data-open]')];
let activeTool=null, toolOpeningTimer;
function finishToolOpening(){clearTimeout(toolOpeningTimer);$('tool-dock').classList.remove('is-opening');}
document.querySelector('.workspace').addEventListener('transitionend',e=>{if(e.target===e.currentTarget)finishToolOpening();});
$('tool-dock').hidden=false;$('tool-dock').inert=true;
function closeTools(restoreFocus=false){finishToolOpening();if(!activeTool)return;const opener=activeTool;$(opener.dataset.open).hidden=true;opener.setAttribute('aria-expanded','false');document.querySelector('.workspace').classList.remove('has-tools');$('tool-dock').inert=true;activeTool=null;if(restoreFocus&&returnToDraft){const position=returnToDraft;draft.focus({preventScroll:true});draft.setSelectionRange(position.start,position.end,position.direction);draft.scrollTop=position.scroll;syncEndings();}else if(restoreFocus)opener.focus();returnToDraft=null;}
function openTool(opener){if(activeTool===opener)return;closeTools();activeTool=opener;$(opener.dataset.open).hidden=false;document.querySelector('.workspace').classList.add('has-tools');$('tool-dock').inert=false;opener.setAttribute('aria-expanded','true');if(opener.id==='nav-analysis')render(false);if(!reducedMotion.matches){$('tool-dock').classList.add('is-opening');toolOpeningTimer=setTimeout(finishToolOpening,300);}}
for(const opener of openers){
 const panel=$(opener.dataset.open);$('tool-dock').append(panel);
 opener.onclick=event=>{if(activeTool===opener)closeTools();else{openTool(opener);if(event.detail===0)panel.querySelector('input,button:not([data-close]),[role=tab]')?.focus({preventScroll:true});}};
 panel.querySelector('[data-close]').onclick=()=>closeTools(true);
}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!document.querySelector('dialog[open]'))closeTools(true);});

$('panel-size').onclick=()=>{const compact=document.querySelector('.workspace').classList.toggle('compact-tools');$('panel-size').textContent=compact?'Araç alanını büyüt':'Söz alanını büyüt';$('panel-size').setAttribute('aria-expanded',String(!compact));};

// visualViewport follows the keyboard on mobile browsers; short desktop windows stay unchanged.
function fitKeyboard(){const viewport=window.visualViewport;const compact=matchMedia('(max-width:700px)').matches&&((viewport?.height||innerHeight)<480);document.documentElement.classList.toggle('keyboard-open',compact);document.documentElement.style.setProperty('--editor-viewport',`${viewport?.height||innerHeight}px`);}
window.visualViewport?.addEventListener('resize',fitKeyboard);window.addEventListener('resize',fitKeyboard);document.addEventListener('focusin',fitKeyboard);document.addEventListener('focusout',()=>requestAnimationFrame(fitKeyboard));fitKeyboard();

writingTools=initWriting({draft,getGroups:()=>variantGroups,save,notify,copyText});
