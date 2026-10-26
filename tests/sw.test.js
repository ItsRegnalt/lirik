import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const source=readFileSync(new URL('../sw.js',import.meta.url),'utf8');
for(const status of [404,500])test(`cached app asset survives HTTP ${status}`,async()=>{
 const handlers={},cached=new Response('cached asset');
 const self={location:{origin:'https://lirik.test'},registration:{scope:'https://lirik.test/'},addEventListener:(name,fn)=>handlers[name]=fn};
 vm.runInNewContext(source,{self,URL,Request,Response,fetch:async()=>new Response('server error',{status}),caches:{match:async()=>cached}});
 let response;handlers.fetch({request:new Request('https://lirik.test/audio.js'),respondWith:promise=>response=promise,waitUntil:()=>{}});
 assert.equal(await (await response).text(),'cached asset');
});
test('HTTP error without a cache is preserved',async()=>{
 const handlers={};const self={location:{origin:'https://lirik.test'},registration:{scope:'https://lirik.test/'},addEventListener:(name,fn)=>handlers[name]=fn};
 vm.runInNewContext(source,{self,URL,Request,Response,fetch:async()=>new Response('missing',{status:404}),caches:{match:async()=>undefined}});
 let response;handlers.fetch({request:new Request('https://lirik.test/audio.js'),respondWith:promise=>response=promise,waitUntil:()=>{}});assert.equal((await response).status,404);
});
