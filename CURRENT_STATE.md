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
