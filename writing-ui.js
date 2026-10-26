import {isHeading,selectedLine,sections,arrangeSection} from './writing.js';
export function initWriting({draft,save,notify}){
 const $=id=>document.getElementById(id);
 const make=(tag,text,cls)=>{const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(cls)el.className=cls;return el;};
 const button=(text,action,label)=>{const el=make('button',text);el.type='button';el.onclick=action;if(label)el.setAttribute('aria-label',label);return el;};
 let undo;
 function changed(text,position){
  undo={before:draft.value,after:text,start:draft.selectionStart,end:draft.selectionEnd};
  draft.value=text;draft.setSelectionRange(position,position);draft.dispatchEvent(new Event('input',{bubbles:true}));save();refresh();
 }
 function refresh(){
  $('writing-undo').disabled=!undo||undo.after!==draft.value;
  const parts=sections(draft.value),out=$('section-list');out.replaceChildren();
  if(!parts.length)out.append(make('p','Henüz bölüm yok. İmleci deftere yerleştirip bir bölüm ekle.','fine'));
  parts.forEach((part,i)=>{
   const row=make('div',undefined,'section-item');
   row.append(button(part.label,()=>{draft.focus();draft.setSelectionRange(part.start,part.start);refresh();},part.label+' bölümüne git'));
   const actions=make('div',undefined,'section-actions');
   for(const [action,label] of [['up','Yukarı'],['down','Aşağı'],['duplicate','Çoğalt']]){
    const control=button(label,()=>{const text=arrangeSection(draft.value,i,action);if(text!==draft.value){changed(text,0);notify('Bölüm '+(action==='duplicate'?'çoğaltıldı.':'taşındı.'));}},part.label+': '+label);
    control.disabled=(action==='up'&&i===0)||(action==='down'&&i===parts.length-1);actions.append(control);
   }
   row.append(actions);out.append(row);
  });
 }
 for(const control of document.querySelectorAll('[data-section]'))control.onclick=()=>{
  const line=selectedLine(draft.value,draft.selectionStart),kind=control.dataset.section;
  const count=1+Math.max(0,...sections(draft.value).filter(part=>part.label===kind||part.label.startsWith(kind+' ')).map(part=>Number(part.label.split(' ')[1])||1));
  const marker='['+kind+(kind==='Kıta'?' '+count:'')+']';
  if(isHeading(line.text))changed(draft.value.slice(0,line.start)+marker+draft.value.slice(line.end),line.start);
  else changed(draft.value.slice(0,line.start)+marker+'\n'+draft.value.slice(line.start),line.start+marker.length+1);
 };
 $('writing-undo').onclick=()=>{if(!undo||draft.value!==undo.after)return;const previous=undo;undo=null;draft.value=previous.before;draft.setSelectionRange(previous.start,previous.end);draft.dispatchEvent(new Event('input',{bubbles:true}));save();refresh();notify('Son bölüm işlemi geri alındı.');};
 draft.addEventListener('input',refresh);draft.addEventListener('click',refresh);draft.addEventListener('keyup',refresh);draft.addEventListener('select',refresh);
 $('nav-sections').addEventListener('click',refresh);
 refresh();return {refresh,reset(){undo=null;refresh();}};
}
