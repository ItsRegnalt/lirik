# Yeni fonksiyon değerlendirmesi — 26 Ekim 2026

Üç ajan kaynak üzerinden değerlendirdi: söz yazma akışı, Türkçe dil araçları, müzikal çalışma. Yazma akışı ajanı ortak önerileri ikinci turda önceliklendirdi. Bu rapor kullanıcı testi veya uygulanmış özellik değildir. Site kodu değiştirilmedi.

## Önerilen sıra

| Sıra | Fonksiyon | Kullanım | Geliştirme yükü |
| --- | --- | --- | --- |
| 1 | Şarkı defteri | Birden çok şarkıyı ayrı başlıklarla saklama, arama ve aralarında geçiş. | Orta |
| 2 | Dize alternatifleri | Asıl dizeyi koruyup farklı sözleri deneme; seçilen alternatifi geri alma imkanıyla kullanma. | Orta |
| 3 | Şarkı bölümleri | Kıta, nakarat ve köprü etiketleri; bölümleri taşıma ve çoğaltma. | Orta |
| 4 | Açıklamalı kafiye | Öneride ortak sesi, hece sayısını ve türünü mobilde görünür gösterme. Tür/hece bilgisi mevcut araç ipucunda var; ortak ses açıklaması yeni iş. | Düşük |
| 5 | Tempoda prova | Seçilen kıtayı veya dizeyi metronomla birlikte odakta gösterme; dize geçişi kullanıcıda. | Orta |

Beşi de sunucu veya yeni büyük sözlük/model gerektirmeden çevrimdışı tasarlanabilir. Kod ve saklanan kullanıcı verisi ek yer kaplar; kesin KB değeri uygulama sonrası ölçülür. Yeni bir indirme boyutu vaat edilmez.

## Önce çözülmesi gerekenler

- Şarkı defteri: mevcut tek taslağı kayıpsız taşıma; ayrı kayıt kimlikleri, silme onayı, dışa aktarma ve depolama hatası. Çoklu taslak kalıcı yedek anlamına gelmez; tarayıcı verileri silinirse kayıtlar kaybolabilir.
- Dize alternatifleri: dize düzenlenip bölündüğünde alternatiflerin yanlış dizeye bağlanmasını engelleme; değişikliği geri alabilme.
- Bölümler: başlıkların hece/uyak sayımına karışmaması, taşıma sırasında boş satırların ve imlecin korunması. Ana defter sade kalmalı.
- Açıklamalı kafiye: ortak ses, redif veya anlam doğruluğunun kanıtı gibi sunulmamalı. Kullanıcı tercihine göre detay açılabilir.
- Prova: otomatik hece-vuruş eşleştirmesi veya doğru Türkçe vurgu tespiti vaat edilmemeli. Telefon klavyesi ve ses kesintileri gerçek cihazda denenmeli.

## Sonraki adaylar

- Hedef hece/uyak düzeni: kullanıcı 11 hece veya ABAB gibi hedef seçer; farklı dizeler yargılayıcı olmayan bir işaret alır. Mevcut analize hedef takibi ekler; belirsiz telaffuzlar uyarı olarak korunmalı.
- Elle vurgu işaretleme: kullanıcı güçlü okumak istediği kelimeleri işaretler. Türkçe vurguyu otomatik bulma iddiası yok.
- Bölüm BPM notu: tempo tercihini kıta/nakaratla birlikte saklama. Bölüm sistemi olmadan öncelikli değil.
- Sürüm geçmişi: isimlendirilmiş anlık kayıtlar arasında karşılaştırma ve geri dönme. Şarkı defterinden sonra düşünülebilir; depolama ve saklama sınırı gerekir.

## Ertelenenler

Kişisel kelime havuzu, tam otomatik vurgu/ritim yerleştirme, büyük dil modeli veya sunucu gerektiren üretim. İlk ikisi arayüz/doğruluk yükü; sonuncusu mevcut küçük ve çevrimdışı uygulama hedefiyle ayrıca tartışılmalı.

Öneri: önce şarkı defteri ve dize alternatifleri. Kullanıcı seçmeden uygulama yapılmasın.
