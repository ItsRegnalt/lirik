// Section markers are editable plain text; only these complete lines are labels.
export const isHeading=line=>/^\s*\[(?:Kıta|Nakarat|Köprü|Giriş|Çıkış)(?: [1-9]\d*)?\]\s*$/u.test(line);
export const lyricsText=text=>text.split('\n').map(line=>isHeading(line)?'':line).join('\n');
export function selectedLine(text,position){
 const cursor=Math.max(0,Math.min(text.length,position));
 const start=cursor===0?0:text.lastIndexOf('\n',cursor-1)+1;
 const next=text.indexOf('\n',cursor);
 const end=next<0?text.length:next;
 return {start,end,text:text.slice(start,end)};
}
export function sections(text){
 const result=[];let offset=0;
 for(const line of text.split('\n')){
  if(isHeading(line))result.push({start:offset,label:line.trim().slice(1,-1)});
  offset+=line.length+1;
 }
 if(!result.length)return text.trim()?[{start:0,end:text.length,label:'Etiketsiz bölüm',text}]:[];
 if(result[0].start>0)result.unshift({start:0,label:'Etiketsiz bölüm'});
 return result.map((part,i)=>({...part,end:result[i+1]?.start??text.length,text:text.slice(part.start,result[i+1]?.start??text.length)}));
}
export function arrangeSection(text,index,action){
 const parts=sections(text);if(!parts[index])return text;
 if(action==='duplicate')parts.splice(index+1,0,{...parts[index]});
 else {const target=index+(action==='up'?-1:1);if(target<0||target>=parts.length)return text;[parts[index],parts[target]]=[parts[target],parts[index]];}
 return parts.map((part,i)=>part.text+(i<parts.length-1&&!part.text.endsWith('\n')?'\n':'')).join('');
}
export function cleanAlternatives(value){
 if(!Array.isArray(value))return [];
 return value.filter(group=>Array.isArray(group)).map(group=>[...new Set(group.filter(line=>typeof line==='string'&&line.trim()&&!line.includes('\n')&&!isHeading(line)))]).filter(group=>group.length>1);
}
export function alternativesAppendix(groups){
 return groups.length?'\n\n--- Dize alternatifleri ---\n'+groups.map((group,i)=>`\nDize ${i+1}\n`+group.map((line,j)=>`${j+1}. ${line}`).join('\n')).join('\n'):'';
}
