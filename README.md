# Sözora

Türkçe söz yazma atölyesi. Flowpad projesinin yenilenen arayüzü; PatiGram renk paleti ve güneş/ay anahtarı referans alınmıştır.

- Otomatik yerel taslak kaydı, metin indirme ve kopyalama
- Yerel kelime seçkisinden uyak önerileri
- Kafiye şeması, redif adayları, hece ayırma ve cihaz destekliyorsa Türkçe sesli okuma
- Web Audio ile cihazda üretilen metronom ve davul ritimleri, tap tempo
- Açık/koyu tema, ana ekrana ekleme ve ilk ziyaretten sonra çevrimdışı kullanım

## Çalıştırma

Node.js 22 veya üzeri: `npm start`, ardından http://127.0.0.1:4173. Testler: `npm test`.

`verify-ui.cjs` yerel geliştirme ortamındaki Playwright ve kurulu Chrome ile arayüz/PWA kontrollerini yürütür. Uygulamanın çalışma zamanı bağımlılığı yoktur.

## Dil motorunun kapsamı

Türkçe harfler ve düzeltme işaretleri desteklenir. Uyak türü ortak sondaki seslerin yazılışına göre hesaplanır. Aynı son ünlünün benzerliği asonans olarak ayrılır. Boş satırlar kıtaları ayırır. Tekrarlanan son kelimeler ve sınırlı kök/ek seçkisindeki eşleşmeler redif **adayıdır**; eş anlam/görev kesinliği için insan değerlendirmesi gerekir. Tam bir biçimbilim veya telaffuz sözlüğü içermez. Sayı ve kısaltmalar hece sayımında kesin sonuç vermez; arayüzde belirtilir. Uyak seçkisi kapsamlı Türkçe sözlük değildir.

Kurallar için [MEB Türk Dili ve Edebiyatı materyali](https://ogmmateryal.eba.gov.tr/panel/upload/etkilesimli/kitap/turkdiliveedebiyati/9/unite3/files/basic-html/page11.html) referans alınmıştır.

Metronom ses saatine göre kısa aralıklarla zamanlanır. Sekme arka plana geçtiğinde durur. Sesli okuma cihazda yüklü Türkçe sese bağlıdır.

Taslaklar bu tarayıcının yerel depolamasındadır; tarayıcı verileri silinirse kaybolur. İndir düğmesiyle yedek alınabilir. Sunucuya metin gönderilmez.

Orijinal proje yılı korunmuştur: **vivid creative works © 2025**. Nunito yazı tipi SIL Open Font License ile dağıtılır; bkz. `Nunito-OFL.txt`.
