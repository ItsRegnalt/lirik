// Logical lines only: visual wrapping must not turn unfinished words into actions.
export function lineEndings(text){
  const endings=[];let offset=0;const lines=text.split('\n');
  lines.forEach((line,i)=>{
    const match=line.match(/([\p{L}\p{M}]+(?:['’][\p{L}\p{M}]+)*)([^\p{L}\p{M}\p{N}]*?)$/u);
    if(match&&(i<lines.length-1||/\s$/u.test(line))){const start=offset+match.index;endings.push({start,end:start+match[1].length,word:match[1]});}
    offset+=line.length+1;
  });
  return endings;
}
