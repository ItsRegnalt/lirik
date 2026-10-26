# Lirik

Türkçe şarkı sözleri için sade bir söz defteri.

**[Lirik’i aç](https://itsregnalt.github.io/lirik/)**

- Sözlerin cihazına otomatik kaydedilir; metin olarak indirilebilir.
- Dize sonundaki kelimeden kafiye ara; yazarken öneriler güncellenir.
- Hece sayılarını ve olası uyak düzenini sözlerinle birlikte incele. Sayı ve kısaltma içeren eksik sayımlar `+` ile işaretlenir.
- Klasik mekanik metronom, ahşap blok veya kapalı hi-hat metronom sesini dinleyerek seç; tempo ve ses tercihlerin saklanır.
- Küçük ekranda söz alanını büyüt; araçları klavyeyle de kullan.
- Açık/koyu tema ve ana ekrana ekleme desteği.

İlk çevrimiçi açılış ve önbellek hazırlığı tamamlandıktan sonra araçlar çevrimdışı çalışır. Hazırlık durumu sayfanın altında gösterilir. Ses seçicisindeki hoparlör simgeleri, seçimi değiştirmeden kısa bir önizleme çalar. Tarayıcı verilerini silmek taslağını da siler; önemli sözlerini indirerek sakla.

Çevrimdışı kullanım dosyalarının sıkıştırılmış indirme boyutu yaklaşık **510 KB**, açılmış toplamı yaklaşık **845 KB**. Tarayıcının ek depolama alanı ve kaydettiğin sözler bu değerlere dahil değildir. Boyutlar sürüme göre değişebilir; RAM kullanımını göstermez.

Kafiye önerileri Zemberek kaynaklı 26.615 kelime ve yerel ses kuralları kullanır. Tam Zemberek dil çözümleyicisi çalıştırılmaz. Redif, anlam, yöresel söyleyiş, sayı ve kısaltmalarda sonuçlar kesin değildir.

## Geliştirme

Node.js 22 veya üzeri ile `npm start`; testler için `npm test`. Kelime listesini yeniden üretmek için `python scripts/build-lexicon.py`.

Main dalına gönderilen değişiklikler testlerden sonra GitHub Pages’e yayımlanır. Başarılı yayından sonra eski dağıtım kayıtları temizlenir.

Üçüncü taraf veri, ses ve font lisansları: [Kaynaklar](THIRD_PARTY.md).
