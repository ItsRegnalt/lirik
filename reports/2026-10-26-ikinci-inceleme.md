# Lirik — İkinci kullanım incelemesi

26 Ekim 2026 · v13. Önceki beş inceleme rolü, değişikliklerden sonra beşer ayrı senaryo turuyla yeniden çalıştı. Bunlar ajan incelemeleridir; gerçek kullanıcı araştırması, fiziksel telefon veya dinleme testi değildir.

## Mobil kullanım — 5 tur

| Tur | Kanıt | Yeni geliştirme adayı |
| --- | --- | --- |
| 1 · 320×568 araç | Metronom açıkken söz alanı 167 px, panel 138 px; belge taşmıyor | Panel küçültme tercihini oturumlar arasında saklama değerlendirilebilir |
| 2 · 375×812 ses seçici | Üç önizleme düğmesi 48×44 px, erişilebilir adları var | Uzun panelde aşağıda içerik olduğunu belli eden hafif görsel ipucu |
| 3 · 568×1290 kurulum | Rehber açıkken söz alanı 531 px; footer 540 px, belge taşmıyor | Rehberi açan kişinin yazıya dönüşünü hızlandıracak kapatma davranışı araştırılabilir |
| 4 · Tema | Açık/koyu geçişi çalıştı | Gerçek cihazda tema animasyonunun akıcılığını ölçme |
| 5 · 320×288 benzetimi | Söz alanı 0 px, panel 37 px | Çok düşük yükseklikte paneli küçültme; gerçek mobil klavyeyle doğrulama öncelikli |

## Masaüstü ve erişilebilirlik — 5 tur

| Tur | Kanıt | Yeni geliştirme adayı |
| --- | --- | --- |
| 1 · 1440×900 | Panel 379 px; seçim güncellendi, odak summary'ye döndü | Ayrı ses seçimi/dinletme davranışını koruma |
| 2 · 1024×768 klavye | Panel ilk kontrolüne odak; önizleme true→false | Ekran okuyucuyla seçili ses ve dinletme duyurusunu sınama |
| 3 · 720×450 | Sayfa taşmıyor; rehber 584 px içerik/171 px görünür alan | Kaydırma ipucu; araç açıkken gizlenen alt bilgiye erişim |
| 4 · Escape | İlk Escape ses seçiciyi, ikincisi paneli kapatıyor; odak geri geliyor | Bu iki aşamalı davranışı regresyon testinde koruma |
| 5 · Azaltılmış hareket | Geçişler 0s; tema switch durumu güncelleniyor | İşletim sistemi yakınlaştırması ve ekran okuyucu deneyi |

## Ses ve çevrimdışı kullanım — 5 tur

| Tur | Kanıt | Yeni geliştirme adayı |
| --- | --- | --- |
| 1 · Örnek ölçümü | Üç farklı mono 44,1 kHz /16 bit WAV; tepe −1,94 dBFS; süreler 100/140/69 ms | Algılanan ses yüksekliği eşleştirmesi: RMS 0,144 /0,159 /0,083 |
| 2 · Önizleme | Her düğme kendi sesini çalıyor; seçim değişmiyor; üçü çevrimdışı çalışıyor | Fiziksel hoparlör/kulaklık değerlendirmesi |
| 3 · Hızlı geçiş | Ajanın hızlı tıklama betiği tamamlanmadı; ana ajan hızlı önizleme ve önizleme→Başlat testini ayrıca geçti | Mobil ses kesintisi/telefon araması sonrası davranışı sınama |
| 4 · PWA | 43 Node testi ve Chrome çevrimdışı senaryosu geçti; HTTP 404/500 önbellek yedeği var | Kurulu iOS/Android uygulamasında aynı akışı doğrulama |
| 5 · Tercihler | BPM 137, düzey %31 ve Dijital yenilemede korunuyor | Yeni sürüm sırasında yükleme hatası/yeniden deneme senaryosu |

## Türkçe hece ve kafiye — 5 tur

| Tur | Kanıt | Yeni geliştirme adayı |
| --- | --- | --- |
| 1 · Hece | aile 3, saat 2, şiir 2 hece; telaffuz verisi sınırlı | İnsan onaylı örnek kümesi; kesin ve sezgisel sayımı ayırma |
| 2 · Sayı/kısaltma | T.B.M.M. geldi yalnız 2 hece ve uncertain:false; kısaltmaya kafiye öneriliyor | Noktalı kısaltmaları tanıma, belirsizlik uyarısı ve arama sınırı |
| 3 · Redif | Gözlerimde/Sözlerimde için lerimde redif adayı bulunuyor | Alternatif ek çözümlemelerini belirsizlikle gösterme |
| 4 · Ses anahtarı | kâr/kar aynı anahtarda; dağ için bağ/çağ adayları var | Uzun ünlü ve ğ özelliklerini uzman onaylı örneklerle geliştirme |
| 5 · Sıralama | aile için gaile/haile/maaile; saat için teknik birleşikler önde | Yaygınlık puanı ve nadir/teknik kelime etiketi |

## Söz yazma akışı — 5 tur

Bu rol yeni tarayıcı oturumunu tamamlayamadı. Aşağıdaki beş tur kaynak incelemesidir; 43/43 Node testi geçti. Ana ajanın tarayıcı kontrolleri ayrıca geçti; bu rolün yeni ölçümü olarak sunulmaz.

| Tur | Kanıt | Yeni geliştirme adayı |
| --- | --- | --- |
| 1 · Kayıt/yenileme | Taslak+başlık tek kayıtta; 250 ms gecikme, pagehide kaydı | Hızlı yenileme ve depolama kotası hatası regresyonları |
| 2 · Değiştirme uyarısı | İptal metni koruyor; indir uyarıyı açık bırakıyor; onay boş taslağı kaydediyor | Escape ve dış alana tıklamayla iptal regresyonları |
| 3 · Kopyalama/indirme | İndirme başlığı içeriyor; kopyalama yalnız sözleri içeriyor | İçerik farkını açıklama; uzun/Unicode dosya adı senaryoları |
| 4 · Dize sonu kafiye | Çip aramayı başlatıyor; çip akışında odak dönüşü kaynakta belirsiz | Klavyeyle çip→arama→editör odağını ve imleç yerini doğrulama |
| 5 · Uzun metin/undo | Her giriş tüm analiz ve son-kelime düğmelerini yeniden kuruyor; yeni süre ölçümü yok | 1000–5000 satırda performans ölçümü; sonuca göre analiz geciktirme |

## Önerilen sonraki işler

1. Noktalı kısaltmaları tanıma: yanlış kesin hece sayımını ve anlamsız kafiye aramasını önleme.
2. Kafiye sonuçlarına yaygınlık puanı: teknik/nadir sözcükleri işaretleme; büyük sözlüğü daha kullanışlı sıralama.
3. Gerçek telefon klavyesi açıkken söz alanını koruma; kısa ekranlarda açık paneli küçültebilme.
4. Dize sonu düğmesinden aramaya geçerken odağı ve editöre dönüşte imleç yerini koruma.
5. Üç sesi fiziksel cihazda karşılaştırma, algılanan ses yüksekliğini eşitleme; uzun metin performansını ölçme.

## Doğrulama sınırları

Chrome headless kullanıldı. Fiziksel ses kalitesi, Bluetooth gecikmesi, ekran okuyucu ve gerçek mobil klavye denenmedi. Her tur ayrı kapsamı olan bir incelemedir; 25 bağımsız gerçek kullanıcı oturumu anlamına gelmez. Öneriler henüz ürün değişikliği olarak uygulanmış sayılmaz.
