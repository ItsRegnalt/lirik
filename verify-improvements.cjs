const {chromium}=require('C:/Users/Doğukan/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});const page=await browser.newPage({viewport:{width:320,height:568}});
 await page.goto(process.env.APP_URL||'http://127.0.0.1:4173/');await page.locator('#draft').fill('TR ile 2025 yılında\nGözlerimde\nSözlerimde');
 assert.match(await page.locator('#syllable-count').innerText(),/\+$/);
 assert.equal(await page.locator('.footer-meta').innerText().then(x=>x.includes('KB')),false);
 const fonts=await page.locator('.footer-meta p').evaluateAll(els=>els.map(el=>getComputedStyle(el).fontSize));assert.equal(new Set(fonts).size,1);
 await page.locator('#nav-rhyme').focus();await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>document.activeElement.id),'rhyme-query');await page.waitForTimeout(320);
 const before=await page.locator('#draft').evaluate(el=>el.clientHeight);await page.locator('#panel-size').click();await page.waitForTimeout(320);const after=await page.locator('#draft').evaluate(el=>el.clientHeight);assert.ok(before>90);assert.ok(after>before+35);console.log('320x568 editor pixels:',{before,after});
 await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>document.activeElement.id),'nav-rhyme');
 await page.setViewportSize({width:720,height:450});await page.locator('#nav-file').click();await page.waitForTimeout(320);assert.ok(await page.locator('#draft').evaluate(el=>el.clientHeight)>100);
 await page.setViewportSize({width:375,height:812});await page.locator('#nav-rhythm').click();await page.locator('#bpm').fill('123');await page.locator('#bpm').dispatchEvent('change');await page.locator('#volume').fill('33');await page.locator('#metronome-sound').selectOption('low');
 await page.locator('#preview-sound').click();await page.waitForTimeout(600);assert.equal(await page.locator('#preview-sound').isEnabled(),true);assert.equal(await page.locator('#audio-state').innerText(),'Duruşta');await page.reload();assert.equal(await page.locator('#bpm').inputValue(),'123');assert.equal(await page.locator('#volume').inputValue(),'33');assert.equal(await page.locator('#metronome-sound').inputValue(),'low');
 await page.evaluate(()=>navigator.serviceWorker.ready);await page.waitForFunction(()=>document.querySelector('#offline-state').textContent.includes('hazır.'));await page.locator('#nav-rhyme').click();await page.waitForTimeout(350);await page.screenshot({path:'test-results/review-mobile.png'});await browser.close();console.log('Review improvements PASS: typography, details placement, uncertainty, keyboard focus, compact editor, audio preview/preferences, offline ready');
})().catch(e=>{console.error(e);process.exit(1)});
