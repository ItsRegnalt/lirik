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
