# Durum

- Orijinal tek dosya `backup/index.original.html` altında yerel olarak korunuyor; yedek GitHub'a gönderilmez.
- PatiGram paleti ve tema anahtarıyla Sözora tasarımı tamamlandı. İlk tasarım kullanıcıya bildirildi.
- Orijinal watermark yılı 2025 korundu; metin vivid creative works olarak güncellendi.
- Türkçe hece/uyak/redif adayı motoru, cihazda ses sentezi, taslak kaydı ve PWA eklendi.
- Test: 32 Node testi. Chrome: masaüstü/küçük ekran, tema kalıcılığı, taslak kaydı, uyak arama, ses başlat/durdur/yeniden başlat, tempo sınırı, XSS metni, onay/yükleme pencereleri ve çevrimdışı yeniden yükleme geçti. OfflineAudioContext ile gerçek sentez sinyali ve ses sonundaki sessizlik doğrulandı. GitHub Tests CI başarılı.
- Görsel kanıt: test-results/desktop-dark.png ve mobile-light.png (yerel, ignore).
- Bilinen kapsam: küçük yerel kelime seçkisi; redif anlam/görev analizi kesin değildir. Sayı/kısaltmalarda hece belirsizliği gösterilir.
- Geri dönüş: Git sürümünden geri alınabilir; orijinal uygulama için yerel yedek kullanılabilir.
- Depo: https://github.com/ItsRegnalt/sozora
- Yayın adresi: https://itsregnalt.github.io/sozora/ (main dalı, kök dizin).
- Canlı yayın HTTP 200 doğrulandı. Aynı Chrome senaryoları GitHub Pages üzerinde de geçti; alt dizin yolları, ses sentezi ve çevrimdışı yenileme çalışıyor.

- Mobil defter revizyonu: tanıtım ve örnek dizeler kaldırıldı. Tam ekran çizgili defter, sade araç adları ve iki yandan açılan erişilebilir paneller eklendi. Metronom deftere dönünce çalmaya devam eder. Tema, yerel taslak ve 2025 korundu.
- Revizyon kanıtı: 32 Node testi; Chrome 375/320 px, panel/Escape/odak, metronomla yazma, kalıcılık ve çevrimdışı yenileme. Görseller test-results/mobile-light.png ve mobile-analysis.png. Fiziksel telefon klavyesi denenmedi. Geri dönüş: önceki main sürümü 238592d.
- 751a88c yayımlandı; yeni panel düzeni canlı Pages sayfasında doğrulandı. Canlı Chrome senaryosu da başarılı.

- Kullanıcının açık sekmesinde app.js:38 null onclick hatası doğrulandı: yeni HTML eski sample koduyla eşleşmiş. HTML CSS/JS v=3 ile sürümlendi; SW v3 kurulumda reload, ağ isteklerinde no-cache kullanır. Eski sürümsüz scripti tuzaklayan regresyon ve offline panel testleri eklendi.
