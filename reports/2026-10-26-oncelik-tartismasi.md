# Geliştirme seçimi — beş rol, üç tartışma turu

26 Ekim 2026. Girdi: [ikinci inceleme](2026-10-26-ikinci-inceleme.md). Roller: mobil kullanım, masaüstü/erişilebilirlik, Türkçe/kafiye, ses/çevrimdışı, söz yazma akışı. Aynı beş rol üçer tur çalıştı (15 değerlendirme). Bu tartışma yeni bir cihaz testi değildir. Öneriler kullanıcı seçimi bekler; bu tur yalnız istenen ses değişikliği uygulanmıştır.

## Tur 1 — bağımsız değerlendirme

| Rol | Öncelikli öneri | Sonraya bırakılan |
| --- | --- | --- |
| Mobil | Gerçek klavyede söz alanı | Kaydırma ipucu, kompakt tercih kalıcılığı |
| Türkçe | Noktalı kısaltmalar, yaygınlık sıralaması | Çipten editöre dönüş önce doğrulansın |
| Erişilebilirlik | Çip/arama/editör odak ve imleç testi | Ekran okuyucu, gerçek klavye, kaydırma ipucu |
| Ses | Algılanan ses yüksekliğini araştırma | Mobil kesinti, güncelleme hatası senaryoları |
| Söz yazma | Çip odağı; kopyala/indir başlık farkını netleştirme | Uzun metin ölçümü, kayıt/kota senaryoları |

## Tur 2 — diğer rollerin önerilerine itiraz

- Mobil: yaygınlık sıralaması, kanıtlı kısaltma hatasının önüne geçmemeli. Ses düzeyini fiziksel dinleme olmadan değiştirmek erken.
- Türkçe: kısaltmalar → gerçek klavye → çip odağı sırasını destekledi; ölçülmemiş uzun metin optimizasyonu ve kaydırma ipucu ertelensin.
- Erişilebilirlik: kopyala/indir farkı doğrulanmış davranış, ancak karışıklık kanıtı değil; kullanıcı beklentisi ölçülmeden değiştirilmesin. Ses RMS eşitlemesi fiziksel dinlemeyi beklesin.
- Ses: itirazı kabul etti; RMS eşitlemesini sonraya çekti. Mobil ses kesintisi ve güncellemede yeniden deneme henüz kanıtlanmış hata değil.
- Söz yazma: kopyala/indir önerisini geri çekti; önce kullanıcı sinyali. Çip odağı temel akış; uzun metin önce ölçülmeli.

## Tur 3 — ortak karar ve seçilebilir liste

| No | İş | Karar ve kanıt |
| --- | --- | --- |
| 1 | Noktalı kısaltmaları doğru tanıma | Beş rolün ilk üçünde. Önceki raporda `T.B.M.M. geldi` iki hece ve kesin sonuç; kısaltmaya anlamsız kafiye adayları doğrulanmış. Kısaltmaların okunuş belirsizliği korunmalı. |
| 2 | Telefon klavyesi açıkken yazı alanı | Beş rolün ilk üçünde. 320×288 benzetiminde editör 0 px; gerçek klavye hatası henüz doğrulanmadı. Önce gerçek cihaz ölçümü, gerekirse yerleşim düzeltmesi. |
| 3 | Kafiye aramasından yazmaya dönüş | Beş rolün ilk üçünde. Çip → arama → editör akışında odak, seçim ve imleç yeri test edilsin. Kaynakta belirsizlik var; doğrulanmış bozukluk diye sunulmaz. |
| 4 | Daha kullanışlı kafiye sıralaması | Mobil, Türkçe, ses ve yazma rollerinin ek önerisi. Yaygın kelimeleri öne çıkarma, nadir/teknik sözcükleri işaretleme. Kabul örnekleri ve lisanslı yaygınlık kaynağı belirlenmeli; kök/telaffuz kuralları korunmalı. |
| 5 | Ekran okuyucuyla ses seçici testi | Erişilebilirlik rolünün ek önerisi. Seçilen ses, önizleme ve kapanış odağı gerçek ekran okuyucuyla denensin. Mevcut headless testler bunu kanıtlamaz. |
| 6 | Uzun sözlerde hız ölçümü | Düşük öncelikli aday. 1.000–5.000 satırda yazma gecikmesini ölç; yavaşlık doğrulanırsa iyileştir. Mevcut incelemede yavaşlama ölçülmedi. |

## Şimdilik eklenmesin

Yeni önbellek katmanı, ek tema animasyonu, kaydırma ipucu, kopyala/indir içeriğini değiştirme. Kanıtlı ihtiyaç yok. Metronom ses yüksekliği eşitlemesi gerçek hoparlör/kulaklık dinlemesinden sonra değerlendirilsin. Mobil ses kesintisi ve depolama kotası senaryoları ileride test adayıdır.

## Bu tur yapılan ses değişikliği

Kullanıcı isteğiyle eski örnekler Klasik (mekanik metronom), Ahşap (VCSL woodblock), Hi-hat (TR-808 kapalı hi-hat) kayıtlarıyla değiştirildi. Kaynak ve işlemler THIRD_PARTY.md içinde. Ableton/FL dosyaları kopyalanmadı; benzer karakter için CC0 kayıtlar kullanıldı. Fiziksel cihazda beğeni veya ses yüksekliği eşitliği doğrulanmış değildir.
