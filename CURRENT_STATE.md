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
