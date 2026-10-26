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

- Uygulama adı Lirik olarak seçildi. Görünen ad, PWA ve indirme adı güncellendi; mevcut taslakları korumak için sozora-draft/sozora-theme depolama anahtarları korundu. SW lirik-v4; sürümlü CSS/JS v4. Depo adı değişimi otomatik onay incelemesince açık yetki olmadığı gerekçesiyle reddedildi; mevcut adreste yayınlanır.

- Defter revizyonu v5: üst alt başlık kaldırıldı, başlık kalın, kayıt durumu anlamlı/renkli. Bütün araçlar tek alanda açılır; masaüstünde sağda, mobilde defterin altında; defter düzenlenebilir ve araç çubuğu sabit görünür. Yeni söz yaz / Sözü kopyala adları güncellendi. Alt bölümde ana ekrana ekle ve vivid creative works © 2025 yer alır. Tema düğmesinden dairesel geçiş (azaltılmış harekete saygılı) eklendi. SVG L/şarkı satırları favicon ve PWA ikonları güncellendi.
- Kanıt: 32 Node testi ve Chrome UI senaryosu geçti; 375/320 px taşma, açık analizde yazma/araç değiştirme, kayıt, tema, ses ve çevrimdışı kontrolleri. Fiziksel mobil klavye denenmedi. Görseller test-results/mobile-analysis.png ve desktop-analysis.png. Geri dönüş: e88fbf8.

- v6 kullanıcı revizyonu: PatiGram yerel kaynak tema geçişi (kök crossfade + bağımsız thumb/ikon geçişleri) uyarlandı. Mobil başlık/pill ve arama/kapama ikonları merkezlendi, araç etiketleri 12 px ve ikonlar 22 px eşlendi. Bütün araç alanı grid interpolasyonuyla 260 ms açılır/kapanır; azaltılmış hareket korunur.
- Alt alan örneğe eşlendi: Ana ekrana ekle, saklama bilgisi, © 2025 Vivid Creative Works · Açık kaynak bir hobi projesi. Proje yılı ve taslak depolama anahtarları korunur. Sesli okuma ve ilişkili metinler kaldırıldı.
- Metronom sade dört vuruş; ritim/ölçü seçenekleri kaldırıldı. Ahşap vuruş için iki sönümlenen sinüs rezonansı, yumuşak zarf, ilk vuruş vurgusu, audio-clock zamanlama ve kompresör kullanılır. Ses örneği/CDN gerektirmez.
- Kafiye: sözcük sonu/ünsüz öncesi ğ uzaması ve aynı ünlüler arasındaki ğ daralması ses anahtarında modellenir; asonans filtresi eklendi. Türkçe ses ayrımları korunur. Tam telaffuz sözlüğü, bütün ğ bağlamları, yöresel söyleyiş veya kesin anlam/redif çözümlemesi yoktur; küçük yerel seçki sınırı sürer.
- PWA v6: yeni varlık önbelleği, güncellemede skipWaiting ve çevrimdışı URL sorgusu için index fallback. İlk çevrimiçi hazırlık sonrası defter, kafiye, analiz ve ses üretimi ağsız çalışır.
- Kanıt: 34 Node testi ve Chrome UI geçti. Gerçek OfflineAudioContext sentezi/tepe/sessizlik, 375/320 px taşma, ikon/pill merkez farkı <1 px, açılır alanın ara genişliği, tema/azaltılmış hareket, taslak, ses yeniden başlatma, çevrimdışı arama+metronom test edildi. Fiziksel telefon/PWA kurulumu ve hoparlör dinlemesi denenmedi. Görseller test-results/mobile-analysis.png ve mobile-light.png. Geri dönüş: 26644ab.

- v7: Inter değişken fontu lisansıyla yerel paketlendi ve tüm arayüze uygulandı; defterin büyük yazı/satır aralığı korundu. Menüler Dosya / Kafiye bul / Hece ve uyak / Metronom; analiz sekmeleri Uyak düzeni / Hece sayısı olarak ayrıldı.
- Yeni söz onayı cihazdaki başlık ve söz kaydının silineceğini açıklar. Metni indir, varsayılan odaklı Vazgeç ve belirgin kırmızı Sil ve yeni söz aç eylemleri bulunur. İndirme pencereden ayrılmadan çalışır; yalnız başlık içeren taslak da indirilebilir.
- PatiGram yerel kaynağındaki açılır kurulum düğmesi, platform adımları ve resmî rehber bağlantıları uyarlandı. Ayrı PWA depolaması için sözleri indirme bilgisi eklendi. Yıl 2025 ve mevcut saklama anahtarları korunur. SW lirik-v7, Inter çevrimdışı önbellekte.
- Kanıt: 34 Node testi, Chrome UI ve diff check geçti. Inter yüklenmesi, menü adları, onayda güvenli odak/indirme/iptal/silme, kurulum rehberi, 320/375 px taşma, çevrimdışı font/araçlar denendi. Görseller test-results/mobile-warning.png, mobile-install.png, mobile-analysis.png. Fiziksel telefon kurulumu denenmedi. Geri dönüş: ac68a7a.
