# Lirik — Beş ajanla kullanım incelemesi

Tarih: 26 Ekim 2026. Kapsam: mevcut yerel kaynak ve Chrome üzerinde işlev/UI incelemesi. Uygulama kodu değiştirilmedi. Bu çalışma gerçek kullanıcı araştırması değil; beş bağımsız ajanın senaryo ve kaynak incelemesidir.

## Öncelikli geliştirme sırası

| Öncelik | Geliştirme | Kullanıcıya etkisi | Tamamlanma ölçütü |
| --- | --- | --- | --- |
| 1 | Kısa ekranda söz alanını koru | Araç açıkken sözleri okuyup düzenlemeye devam eder | 320×568 ve kısa masaüstü ekranında düzenleyici kullanılabilir kalır; panel kendi içinde kayar |
| 1 | Hece/kafiye belirsizliğini görünür kıl | Eksik sayımı kesin ölçü sanmaz | Sayı/kısaltmalı satırda kısmi sayım açıkça belirtilir; kısaltmalar harf sonuna göre önerilmez |
| 1 | Birleşik redif çözümlemesini genişlet | Aynı ekleri kafiye sanma riski azalır | gözlerimde/sözlerimde için göz/söz + ortak ek zinciri aday olarak gösterilir |
| 2 | Panel odağını düzenle | Klavyeyle araçlara daha hızlı ulaşır | Klavyeyle açılan panelin ilk alanına erişilir; Escape açan düğmeye döndürür |
| 2 | Çevrimdışı hazırlık ve hata yedeği | Hazır olduğunu bilir, geçici sunucu hatasında çalışmaya devam eder | Önbellek tamamlandı durumu; önbellekteki varlık için 500 yanıtında yedek kullanımı |
| 2 | Metronom tercihlerini ve ses çeşitlerini iyileştir | Ayarları tekrar yapmak zorunda kalmaz | BPM/düzey/ton yenilemede korunur; farklı seslerin kısa önizlemesi bulunur |

## 1. Mobil kullanım ajanı

**Senaryolar:** 320×568, 375×812 ve 568 piksel genişlik; açık/koyu tema; araç açma ve taşma kontrolü.

**Bulgular:**
- 320×568 ekranda düzenleyici yaklaşık 140 px; Kafiye paneli açılınca yaklaşık 36 px kalıyor. Panelin kendisi de yaklaşık 104 px. Yazıyla araç sonuçlarını karşılaştırmak zorlaşıyor. Kaynak: `style.css` mobil çalışma alanı oranları.
- 375×812 ekranında açık panelle düzenleyici yaklaşık 190 px; sorun özellikle kısa ekranlarda belirgin.
- Ekranı 320×288 boyutuna küçülten klavye benzetiminde düzenleyici alanı sıfıra yaklaşabiliyor. Bu yalnız viewport deneyi; gerçek mobil klavye kanıtı değildir.

**Öneri:** Alt alanı sadeleştir; aracı mobilde yüksekliği ayarlanabilir bir panel yap. Kullanıcı paneli küçültüp sözleri görebilsin. 160 px düzenleyici yüksekliği başlangıç hedefi olarak denenebilir; evrensel bir erişilebilirlik standardı değildir. Kurulum rehberi açıldığında yazma alanını tamamen tüketmemeli.

**İyi çalışanlar:** Denenen normal ekranlarda yatay taşma yok; açık/koyu temada yerleşim korunuyor. Genel düğmeler ve kapatma düğmeleri 44 px yüksekliğinde. Azaltılmış hareket tercihi için CSS var.

## 2. Masaüstü ve erişilebilirlik ajanı

**Senaryolar:** 1440×900, 1024×768 ve 720×450 Chrome; Tab/Shift+Tab/Enter/Escape akışı. Son boyut küçük görüntü alanı deneyi, gerçek tarayıcı yakınlaştırma testi değildir.

**Bulgular:**
- 720×450 boyutunda araç açılınca düzenleyici yaklaşık 55 px yüksekliğe iniyor; panel kendi içinde kayıyor. Mobildeki yükseklik sorunu kısa masaüstü pencerelerinde de görülüyor.
- Klavyeyle panel açıldığında odak açan düğmede kalıyor. Sonraki Tab diğer alt menülere/footer'a gidiyor; panel alanlarına ulaşmak için ters yönde gezinmek gerekiyor. Kaynak: `app.js` `openTool()` ve DOM sırası.

**Öneri:** Klavyeyle açılışta panel başlığına veya ilk anlamlı kontrole odak taşı. Bunlar kalıcı yan paneller olduğu için gereksiz odak tuzağı kurma. Kapatırken odağı açan düğmeye döndür.

**İyi çalışanlar:** Büyük iki boyutta taşma görülmedi. Görünür odak stilleri var. Escape paneli kapatıp odağı geri getiriyor. Kontrast sayısal olarak ölçülmedi; ekran okuyucu denenmedi.

## 3. Türkçe hece ve kafiye ajanı

**Senaryolar:** Node ile sayı/kısaltma, ğ, şapkalı harf ve birleşik ek örnekleri; `turkish.js`, sözlük ve test kapsamı incelemesi. Ana ajan çelişkili kısaltma bulgusunu ayrıca çalıştırarak düzeltti.

**Doğrulanmış bulgular:**
- `2026`, `12:45`, `TR`, `TBMM`, `THY` hece hesabında 0 üretiyor. **Analiz bu örneklerde zaten belirsizlik notu gösteriyor.** Eksik olan, toplamın kısmi olduğunu sayı yanında açıkça belirtmek; kısaltma tespitinin tamamen bozuk olduğu iddiası doğrulanmadı.
- Kafiye araması yine de `TR` için `albatr/amfiteatr`, `TBMM` için `akşam/ayağım/dilim` üretiyor. Harflerin okunma biçimi işlenmediği için bu sonuçlar güvenilir değil. Kısaltmayı sorguda yakala; okunuş iste veya öneriyi belirsiz olarak durdur.
- `Gözlerimde / Sözlerimde` iki satırı `redif: ''`, `type: 'zengin'` veriyor. `-ler-im-de` ortak ek zinciri tanınmıyor. Kaynak: sınırlı `morph` tablosu ve küçük `roots` kümesi. Büyük kelime sözlüğü redif kök doğrulamasında doğrudan kullanılmıyor.

**Dilbilimsel geliştirme alanları:**
- `dağ/bağ/çağ` dönüşümden sonra asonans etiketine düşebiliyor. Şapkalı harflerin ses uzunluğu anahtarda korunmuyor. Bunların doğru etiketleri dil uzmanıyla sabit bir örnek kümesinde kararlaştırılmalı; tartışmalı sınıflandırma kesin hata diye sunulmamalı.
- Hece sayımı ve heceye bölme için sözlükçe doğrulanmış sonuçlarla sezgisel sonuçlar ayrılabilir. Her bilinmeyen kelimenin yanlış olduğu sonucu çıkarılamaz.

**Öneri:** Zemberek kök/ek adaylarını derleme sırasında üretip küçük bir yerel veri dosyasına dönüştür; tarayıcıdaki ses benzerliği yöntemiyle birlikte kullan. Morfoloji redifi ayırsın, ses anahtarı kalan gövdeleri karşılaştırsın. Birden çok çözümlemede kesinlik iddiası yerine “redif adayı” yaz. Dosya boyutunu ölçerek ilerle; tam Java motorunu tarayıcıya taşımak bu raporun önerisi değildir.

**Kabul örnekleri:** gözlerimde/sözlerimde, gözlerim/sözlerim, dağ/bağ, deniz/temiz, ş/s ayrımı, kâr/kar, sayılar ve TR/TBMM/THY. Beklenen dilbilimsel sonuçlar önce onaylanmalı.

## 4. Metronom ve çevrimdışı kullanım ajanı

**Senaryolar:** Chrome çevrimdışı açılış ve başlat/durdur/yeniden başlat; Node ile ses yükleme hatasından sonra tekrar deneme; `audio.js`, `sw.js`, tercih kayıtları.

**Bulgular:**
- Ses seçimi saklanıyor; BPM ve ses düzeyi yenilemede varsayılana dönüyor. Üç tercihi birlikte saklamak tutarlı olur.
- Klasik/Alçak/Yüksek aynı iki WAV dosyasını 1/0.8/1.2 hızında çalıyor. Bu üç ayrı vuruş kaydı değil. Kullanıcının ses beklentisi için ayrı klik/tahta/dijital vuruş örnekleri ve kısa dinletme düğmesi denenebilir. Lisans ve indirme boyutu her örnekte korunmalı.
- Service worker ağ bağlantısı kopunca önbelleğe dönüyor, ancak HTTP 404/500 yanıtında aynı yedeği kullanmıyor. Bu kaynak incelemesiyle doğrulandı; hata yanıtını taklit eden ayrı tarayıcı regresyonu eklenmeli.
- Önbellek hazırlığının tamamlandığına ilişkin görünür durum yok. İlk çevrimiçi açılışın yettiği söylenirken hazırlığın gerçekten bitmiş olması gerekiyor.

**İyi çalışanlar:** Sıcak önbellekten çevrimdışı açılış, ses seçimi, tempo sınırı ve yeniden başlatma geçti. Başarısız ses yüklemesinden sonra tekrar deneme çalıştı. Sıfır önbellekle ilk çevrimdışı açılışın çalışmaması beklenen önkoşuldur. Arka plana geçince metronom bilinçli olarak duruyor; bu hata sayılmadı.

**Sınır:** Fiziksel hoparlör/kulaklık kalitesi, Bluetooth gecikmesi ve iOS ana ekran kurulumu denenmedi.

## 5. Söz yazma akışı ajanı

**Senaryolar:** Başlık ve söz kaydı, yenileme, yeni söz uyarısı, dize sonu kafiye düğmesi; uzun tek satır için sentetik input ölçümü.

**Bulgular:**
- Dize sonu `yol` düğmesi Kafiye panelini açıp sorguyu dolduruyor. Sonrasında odak arama alanına geçmiyor; bu senaryoda body'de kaldı. İkinci ajanın odak bulgusuyla ortak çözülmeli. Dokunmatik cihazda otomatik klavye açmanın istenip istenmediği ayrıca denenmeli.
- Mevcut birim testleri kelime sonu ayrıştırmasını kapsıyor; taslak kayıt/yenileme, değiştirme uyarısı, kopyalama/indirme akışları için kalıcı tarayıcı regresyon senaryoları eklenebilir. Tek seferlik inceleme bunların sürekli korunmasını sağlamaz.

**İyi çalışanlar:** `Deniz\nyol ` ve başlık cihaza kaydoldu, yenilemede geri geldi. Dolu taslakta yeni söz uyarısı ve indirme seçeneği açıldı. Doğrulanmış veri kaybı bulunmadı. 40.000 karakterlik tek satırın sentetik input render ölçümü 19,2 ms idi; bu sonuç düşük donanımlı telefonda gerçek yazma performansı garantisi değildir.

## Uygulama planı

1. **Yazma alanı ve odak:** Kısa ekran düzeni, ayarlanabilir panel, klavye odağı. Kabul: sözler ve araç sonuçları birlikte kullanılabilir.
2. **Türkçe doğruluk:** Sayı/kısaltma belirsizliği, birleşik ek adayları, uzmanla doğrulanmış test kümesi. Kabul: hatalı kesinlik azaltılır, regresyon örnekleri teste dönüşür.
3. **Metronom ve PWA:** Tercih kaydı, küçük lisanslı ses paketi, ses önizlemesi, önbellek hazır durumu ve HTTP hata yedeği. Kabul: çevrimdışı ve hata durumları tarayıcı testleriyle doğrulanır.

Yeni özellik olarak çoklu taslak defteri ve taslağa özgü BPM, söz yazma amacına uygun adaylardır. Bunlar bu incelemede uygulanmadı veya kullanıcılarla doğrulanmadı; mevcut sorunlardan sonra ele alınmalı.

## Kanıt ve sınırlar

- Mevcut Node testleri: **38/38 geçti**. Geçmesi dilbilimsel doğruluğun tamamını kanıtlamaz.
- Yerel Chrome senaryoları ve Node çıktıları kullanıldı. Uygulama kaynakları değiştirilmedi.
- Geçici deneme dosyaları git tarafından yok sayılan `test-results/` altında; kalıcı rapor bu dosyadır.
- Gerçek telefon klavyesi, iOS, ekran okuyucu, sayısal kontrast ölçümü, fiziksel ses dinleme ve bağımsız dil uzmanı değerlendirmesi kapsam dışı kaldı.
