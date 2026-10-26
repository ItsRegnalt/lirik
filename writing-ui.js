import {isHeading,selectedLine,sections,arrangeSection} from './writing.js';
// Alternatives belong to a set of exact texts, never to an unstable line number.
export function initWriting({draft,getGroups,save,notify,copyText}){
 const $=id=>document.getElementById(id);
 const make=(tag,text,cls)=>{const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(cls)el.className=cls;return el;};
 const button=(text,action,label)=>{const el=make('button',text);el.type='button';el.onclick=action;if(label)el.setAttribute('aria-label',label);return el;};
 let target=selectedLine(draft.value,draft.selectionStart),undo;
 const usable=line=>!!line.trim()&&!isHeading(line);
 function changed(text,position){
  undo={before:draft.value,after:text,start:draft.selectionStart,end:draft.selectionEnd};
  draft.value=text;draft.setSelectionRange(position,position);draft.dispatchEvent(new Event('input',{bubbles:true}));save();refresh();
 }
 function refresh(){
  target=selectedLine(draft.value,draft.selectionStart);
  $('variant-current').textContent=usable(target.text)?target.text:'Defterde alternatif yazmak istediğin dizeye dokun.';
  $('variant-input').disabled=!usable(target.text);$('variant-add').disabled=!usable(target.text);
  $('writing-undo').disabled=!undo||undo.after!==draft.value;
  const list=$('variant-list');list.replaceChildren();
  const group=getGroups().find(group=>group.includes(target.text));
  if(group)for(const line of group){
   const row=make('div',undefined,'writing-item');row.append(make('p',line));
   if(line===target.text)row.append(make('span','Kullanımda','fine'));
   else row.append(button('Kullan',()=>{
    if(draft.value.slice(target.start,target.end)!==target.text){notify('Dize değişti. Defterden yeniden seç.');refresh();return;}
    changed(draft.value.slice(0,target.start)+line+draft.value.slice(target.end),target.start+line.length);notify('Dize değiştirildi. Önceki hali alternatiflerde.');
   }));list.append(row);
  }
  const archive=$('variant-archive');archive.replaceChildren();
  getGroups().filter(item=>item!==group).forEach(group=>{
   const item=make('details',undefined,'variant-saved');item.append(make('summary',group[0]));
   group.forEach(line=>{const row=make('div',undefined,'writing-item');row.append(make('p',line),button('Kopyala',()=>copyText(line)));item.append(row);});archive.append(item);
  });
  $('variant-archive-wrap').hidden=!archive.childElementCount;
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
 $('variant-form').onsubmit=event=>{
  event.preventDefault();const value=$('variant-input').value.trim();
  if(!value||value.includes('\n')||isHeading(value)){notify('Tek bir dize yaz.');return;}
  if(!usable(target.text)||draft.value.slice(target.start,target.end)!==target.text){notify('Önce defterden bir dize seç.');return;}
  let group=getGroups().find(group=>group.includes(target.text));
  if(value===target.text||group?.includes(value)){notify('Bu dize zaten kayıtlı.');return;}
  if(!group){group=[target.text];getGroups().push(group);}group.push(value);
  $('variant-input').value='';save();refresh();notify('Alternatif kaydedildi.');
 };
 for(const control of document.querySelectorAll('[data-section]'))control.onclick=()=>{
  const line=selectedLine(draft.value,draft.selectionStart),kind=control.dataset.section;
  const count=1+Math.max(0,...sections(draft.value).filter(part=>part.label===kind||part.label.startsWith(kind+' ')).map(part=>Number(part.label.split(' ')[1])||1));
  const marker='['+kind+(kind==='Kıta'?' '+count:'')+']';
  if(isHeading(line.text))changed(draft.value.slice(0,line.start)+marker+draft.value.slice(line.end),line.start);
  else changed(draft.value.slice(0,line.start)+marker+'\n'+draft.value.slice(line.start),line.start+marker.length+1);
 };
 $('writing-undo').onclick=()=>{if(!undo||draft.value!==undo.after)return;const previous=undo;undo=null;draft.value=previous.before;draft.setSelectionRange(previous.start,previous.end);draft.dispatchEvent(new Event('input',{bubbles:true}));save();refresh();notify('Son dize veya bölüm işlemi geri alındı.');};
 draft.addEventListener('input',refresh);draft.addEventListener('click',refresh);draft.addEventListener('keyup',refresh);draft.addEventListener('select',refresh);
 for(const id of ['nav-variants','nav-sections'])$(id).addEventListener('click',refresh);
 refresh();return {refresh,reset(){undo=null;$('variant-input').value='';refresh();}};
}
