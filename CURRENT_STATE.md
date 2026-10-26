# Lirik — durum

- Depo: https://github.com/ItsRegnalt/lirik
- Yayın: https://itsregnalt.github.io/lirik/
- Main dalı Pages iş akışıyla yayımlanır; başarılı yayından sonra yalnız güncel dağıtım kaydı tutulur.
- Metronom: CC0 Metronom SoundFont klik örnekleri; klasik, tok ve parlak filtre varyasyonları. Sesler yerel önbellekte tutulur.
- Zemberek master sözlüğünden 26.615 kelime ve mevcut açık telaffuz kayıtları alındı. Tam Java morfoloji motoru çalıştırılmaz; redif/bağlam çözümlemesi sınırlıdır.
- Kullanılmayan font kaldırıldı; README yalnız Lirik için sadeleştirildi. Yayına yalnız uygulama varlıkları gönderilir.
- Taslak verilerini korumak için mevcut cihaz depolama anahtarları sürer. Depo yolu değiştiği için eski ana ekran kısayolu yeniden eklenmelidir.
- Kanıt: 38 Node testi; Chrome responsive yerleşim, ses sinyali, tercih/taslak kalıcılığı, canlı arama ve PWA çevrimdışı senaryosu geçti.
- Fiziksel telefon hoparlörü ve iOS kurulumu denenmedi.
- Geri dönüş: c383b9e kaynak sürümü; depo adı ve Pages ayarı ayrıca GitHub üzerinden geri alınabilir.
- RTK uyarısı: global hook kurulu değil; global ayarlar değiştirilmedi.

- Canlı Lirik adresinde aynı Chrome senaryosu ve çevrimdışı ses/kelime araması geçti. GitHub Tests ve Pages başarılı. Kelime listesi sabit kaynak sürümünden tekrar üretildi; SHA256 aynı.

- Sayfa altına ve README’ye yaklaşık 485 KB indirme / 800 KB çevrimdışı dosya bilgisi eklendi. Canlı gzip yanıtları ölçüldü; tarayıcı ekleri, taslaklar ve RAM bu ölçüme dahil değil. Önbellek sürümü lirik-v11.
- Boyut bilgilendirmesi sonrası responsive yerleşim ve PWA çevrimdışı tarayıcı kontrolü geçti; diff kontrolü temiz.

## Beş ajanla kullanım incelemesi — 26 Ekim 2026
- Mobil UI, masaüstü/erişilebilirlik, Türkçe motor, ses/PWA ve söz yazma akışı ayrı ajanlarla incelendi. Rapor: reports/2026-10-26-kullanim-incelemesi.md.
- Kanıt: mevcut 38/38 Node testi; yerel Chrome yerleşim/odak, kayıt-yenileme ve sıcak önbellekten çevrimdışı kullanım senaryoları. Kısaltma notunun çalıştığı ana ajan tarafından ayrıca doğrulandı; çelişkili bulgu raporda düzeltildi.
- Öncelik: kısa ekranda söz alanı, sayı/kısaltma belirsizliği ve birleşik redif; ardından panel odağı, metronom tercihleri ve önbellek hazırlığı/HTTP hata yedeği.
- Uygulama kodu değiştirilmedi, yayın yapılmadı. Geri dönüş gerektiren işlevsel değişiklik yok; yalnız rapor ve bu durum notu eklendi.
- Fiziksel telefon klavyesi/iOS/ekran okuyucu ve ses kalitesi denenmedi. RTK global hook durumu değiştirilmedi.

## İnceleme önerileri uygulandı — 26 Ekim 2026
- Alt metinlerin fontu eşitlendi; boyut bilgisi Kafiye bul paneline taşındı. Önbellek hazırlık durumu aynı panelde gösterilir.
- Kısa ekranda söz alanı genişletildi; ek büyütme düğmesi eklendi. Klavyeyle açılan araçta odak panelin ilk kontrolüne taşınır.
- Sayı/kısaltma içeren eksik hece sayımları + işaretli. Birleşik redif çözümlemesi genişletildi; belirsizlik açıklaması korundu.
- Metronomda ses önizlemesi ve tempo/ses düzeyi/ses seçimi kalıcılığı eklendi. Mevcut CC0 örneklerine farklı filtreler uygulanır; yeni ses dosyası indirilmez.
- lirik-v12 önbelleği; HTTP 404/500 yanıtlarında önbellekteki dosyaya geri dönüş eklendi.
- Kanıt: 43/43 Node testi; verify-ui.cjs ve verify-improvements.cjs Chrome senaryoları geçti. 320×568 ekranda araç açıkken söz alanı 167 px, büyütülünce 236 px.
- Fiziksel telefon klavyesi, iOS kurulumu ve hoparlör ses kalitesi denenmedi. RTK global hook değiştirilmedi.
- Geri dönüş: 430877a; düzenleme öncesi yerel yedek backup/2026-10-26-review-fixes/.

## Yeni sesler ve ikinci inceleme — 26 Ekim 2026
- Çevrimdışı hazırlık ve uygulamanın tamamına ait boyut bilgisi, sayfa altında gizlilik metninin altına taşındı. Defter, kafiye ve metronomu kapsadığı belirtildi; alt metinler aynı puntoda.
- Filtre varyasyonları yerine üç farklı CC0 kayıt: Ahşap, Rimshot, Dijital. Kaynaklar THIRD_PARTY.md içinde. Yerel sesler toplam yaklaşık 27 KB; her satırın hoparlörü seçim değiştirmeden dinletir.
- Ses seçici klavye/Escape ve dışarı tıklamayla kapanır. Hızlı önizleme geçişi, Başlat ve sayfadan ayrılmada önceki önizleme durdurulur.
- Yaklaşık 500 KB indirme / 830 KB çevrimdışı dosya; tarayıcı ekleri ve kullanıcı sözleri hariç. Önbellek lirik-v13.
- Kanıt: 43/43 Node testi; verify-ui.cjs ve verify-improvements.cjs Chrome kontrolleri geçti. Üç farklı ses sinyali, çevrimdışı önizleme, seçimi değiştirmeme, hızlı geçiş ve önizleme→Başlat kontrol edildi. 320×568 kurulum rehberi açıkken sayfa taşması düzeltildi.
- Fiziksel hoparlör, Bluetooth, gerçek mobil klavye, iOS kurulumu ve ekran okuyucu denenmedi. Sesin beğenilmesi ölçülmüş sayılmaz.
- Geri dönüş: a701286; kaynak yedeği backup/2026-10-26-sound-picker/, eski ses dosyaları Git geçmişinde. RTK global hook değiştirilmedi.
- Aynı beş inceleme rolü beşer tur tamamladı (25 senaryo incelemesi): reports/2026-10-26-ikinci-inceleme.md. Söz yazma rolünde yeni tarayıcı çalışmadı; kaynak incelemesi ve Node kanıtı açıkça ayrıldı. Yeni öneriler: noktalı kısaltmalar, yaygınlık sıralaması, gerçek klavye alanı ve dize sonu odak akışı.

## Doğal metronom kayıtları ve öncelik tartışması — 26 Ekim 2026
- Klasik mekanik metronom, akustik ahşap blok ve TR-808 kapalı hi-hat kayıtları eklendi. Üçü de CC0; kaynak ve kesme/normalleştirme bilgisi THIRD_PARTY.md içinde. Ableton/FL özgün dosyaları kullanılmadı.
- Sesler toplam 46.878 bayt. Yaklaşık 510 KB indirme / 845 KB çevrimdışı dosya; tarayıcı ekleri ve sözler hariç. Önbellek lirik-v14.
- Kanıt: 43/43 Node testi; verify-ui.cjs ve verify-improvements.cjs yerel Chrome kontrolleri geçti. Çevrimdışı önizleme ve üç ayrı ses sinyali doğrulandı. Fiziksel hoparlör/kulaklık, gerçek mobil klavye, iOS ve ekran okuyucu denenmedi; eşit tepe seviyesi eşit algılanan ses yüksekliği anlamına gelmez.
- Aynı beş ajan üçer tur karşılıklı değerlendirdi (15 tur). Seçim listesi ve elenen öneriler: reports/2026-10-26-oncelik-tartismasi.md. Bu öneriler kullanıcı seçmeden uygulanmadı.
- Geri dönüş: 261bb43. Yerel yedek: backup/2026-10-26-natural-sounds/. RTK global ayarı değiştirilmedi.


## Onaylanan altı geliştirme ve şeffaf favicon — 26 Ekim 2026
- Noktalı kısaltmalar tek token; okunuş belirsizliği ve eksik hece toplamı korunur. Elle seçilmiş gündelik sözcükler kafiye önerilerinde öne çıkarılır; istatistiksel yaygınlık veya nadirlik iddiası yok.
- Dize sonu çipinden arama açılır; kapatınca yazı odağı, seçim yönü, imleç ve kaydırma geri gelir. Ses seçimi/önizlemesine canlı erişilebilir durum metni eklendi.
- Kısa mobil görünümde üst/alt bilgi gizlenerek deftere alan ayrılır. Chrome 375×288 benzetiminde araç açıkken editör 109 px. Gerçek telefon klavyesi, iOS ve gerçek ekran okuyucu denenmedi; Chrome erişilebilirlik ağacı ve klavye denendi.
- Satır bazlı sayaç önbelleği, değişen son kelimelerin kısmi güncellenmesi ve kapalı analiz panelinde gereksiz DOM üretimini durdurma. 5.000 satır ilk çizim yaklaşık 487→118 ms; araç kapalı yazma ölçümü beş tekrar medyanı 51 ms. Donanıma göre değişir; açık analiz paneli için aynı süre vaat edilmez.
- L + nota motifiyle şeffaf SVG favicon; 192/512 PNG yedeklerinin RGBA/alpha kanalı doğrulandı. Önbellek lirik-v15. Dosyalar yaklaşık 509 KB gzip / 841 KB ham; sayfadaki yaklaşık 510/845 KB bilgisi geçerli.
- Kanıt: 46/46 Node testi; verify-ui.cjs, verify-improvements.cjs ve verify-approved.cjs Chrome kontrolleri geçti. Son değişiklikler sonrası testler yeniden çalıştırılır.
- Geri dönüş: 159994e. Yedek: backup/2026-10-26-approved-improvements/. RTK hook kurulmadı; global ayarlar değiştirilmedi.

## Seçilen L + nota logosu — 26 Ekim 2026
- Imagegen ile seçilen üç mor satır ve altın kuyruklu nota biçimi temiz SVG olarak aktarıldı; renkli kenar artıkları kaldırıldı. Üst başlık, favicon ve 192/512 uygulama simgeleri güncellendi. Saydam arka plan korundu.
- Önbellek lirik-v16; eski kurulumların yeni simgeyi alması için kaynak sürümleri yenilendi.
- Kanıt: 46/46 Node testi; yerel Chrome 375×812 açık/koyu tema, taşma ve çevrimdışı logo yükleme kontrolü geçti. İki PNG RGBA/alpha doğrulandı. Gerçek iOS/Android ana ekran simgesi denenmedi.
- Geri dönüş: f578c7b. Yedek: backup/2026-10-26-selected-logo/. RTK global ayarları değiştirilmedi.


## Dize alternatifleri ve bölümler — 26 Ekim 2026
- Seçili dizeye elle alternatif kaydetme, sürümler arasında geçiş ve tek işlem geri alma eklendi. Aynı metinli dizeler alternatif grubunu paylaşır; satır silinse bile alternatifler saklanır. TXT indirme tüm alternatifleri ayrı ekte içerir.
- Kıta, Nakarat ve Köprü ekleme; bölümüne gitme, taşıma ve çoğaltma eklendi. Bölüm başlıkları hece/kelime/dize ve uyak analizinden dışlanır. Eski taslaklar korunur; yeni söz açma uyarısı alternatiflerin silineceğini belirtir.
- Mevcut metronomun tempoda prova işlevi yeni özellik olarak tekrar eklenmedi. Yeni bağımlılık veya çevrimiçi servis yok; önbellek lirik-v17.
- Yayın dosyaları 873.957 bayt ham / ayrı gzip toplamı 522.739 bayt ölçüldü; sayfa ve README yaklaşık 515 KB indirme / 855 KB çevrimdışı dosya olarak yuvarlandı. Sözler ve tarayıcı ekleri hariç; RAM ölçümü değil.
- Kanıt: 52/52 Node testi; verify-writing.cjs Chrome testinde eski taslak, alternatif geçişi/yenileme/arşiv, bölüm taşıma/çoğaltma, indirme, iptal, XSS, 320×568 / 375×288 / 1280×900 yerleşim ve çevrimdışı yeniden açma geçti. Gerçek telefon klavyesi ve iOS denenmedi.
- Geri dönüş: 98fea50. Yedek: backup/2026-10-26-writing-tools/. RTK global ayarları değiştirilmedi.

## Yazma kontrollerinin sadeleştirilmesi — 26 Ekim 2026
- Dize alternatifleri menüsü ve söz alanını büyüt/küçült kontrolü kaldırıldı. Kıta, Nakarat, Köprü ve bölüm işlemlerini geri alma korundu.
- Önceden kaydedilmiş alternatifler veri kaybını önlemek için depolamada ve TXT indirmede korunur. Yeni alternatif oluşturma arayüzü yok. Önbellek ve kaynak sürümleri lirik-v18 olarak eşitlendi.
- Kanıt: 52/52 Node testi; Chrome üzerinde kaldırılan kontroller, bölüm ekleme/geri alma, sayaçlar, eski alternatiflerin indirilmesi, 320×568 / 375×288 / 1280×900 yerleşim ve çevrimdışı yeniden açılış geçti. Tarayıcı hatası görülmedi. Gerçek telefon ve iOS denenmedi.
- Geri dönüş: c513ddc. Yedek: backup/2026-10-26-remove-writing-controls/. RTK global ayarları değiştirilmedi.
