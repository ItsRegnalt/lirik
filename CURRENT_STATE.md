# Lirik — durum

- Depo: https://github.com/ItsRegnalt/lirik
- Yayın: https://itsregnalt.github.io/lirik/
- Main dalı Pages iş akışıyla yayımlanır; başarılı yayından sonra yalnız güncel dağıtım kaydı tutulur.
- Metronom: CC0 Metronom SoundFont klik örnekleri; klasik, alçak ve yüksek perde. Sesler yerel önbellekte tutulur.
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
