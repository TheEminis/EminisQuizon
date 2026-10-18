# Dəyişikliklər (1-ci mərhələ)

## Kod
- `QuizPage.js`: 830 sualın təkrar surəti silindi (143 KB -> 3 KB), `data/quizQuestions.js` istifadə olunur.
- Bütün səhifələr `React.lazy` ilə lazım olanda yüklənir (ilk yükləmə xeyli kiçildi).
- İstifadə olunmayan `utils/testStats.js` və `hooks/useUserStats.js` silindi.
- Vocabulary: düzgün (Fisher-Yates) qarışdırma.
- Listening: `preload="none"` (audio yalnız oynadanda yüklənir).
- Header: loqo artıq real `<Link>` (klaviatura / ekran oxuyucu).
- Yüklənmə spinneri (ProtectedRoute və lazy səhifələr).
- `/grammar` səhifəsi giriş tələb etmir (SEO + qeydiyyatdan əvvəl sınaq).

## Hesab
- "Şifrəni unutdum" (`/forgot-password`).
- Google ilə giriş.
- Qeydiyyatda təsdiq emaili göndərilir; şifrədə böyük hərf tələbi.

## Təhlükəsizlik
- Leaderboard artıq ayrı `leaderboard` kolleksiyasından oxuyur (yalnız ad + bal, EMAIL YOXDUR).
- Köhnə hesabların nəticəsi ilk girişdə avtomatik köçürülür.
- `firestore.rules` faylı əlavə olundu.

## Cloudflare / SEO
- `public/_headers` (keş + təhlükəsizlik başlıqları + CSP), `manifest.json`, `favicon.svg`, ikonlar, `og-image.png`, `robots.txt`, `sitemap.xml`, OG teqləri.

# Sizin etməli olduqlarınız
1. (Edildi) Domen `eminisquizon.ibrahimliemin190.workers.dev` olaraq yazıldı. Gələcəkdə öz domeninizi qoşsanız, `index.html`, `robots.txt`, `sitemap.xml`-də dəyişin.
2. Firebase Console -> Firestore -> Rules: `firestore.rules` məzmununu yapışdırıb Publish edin.
3. Firebase Console -> Authentication -> Sign-in method: **Google**-u aktiv edin. Authorized domains-ə öz domeninizi əlavə edin.
4. Firebase Console -> Authentication -> Templates: şifrə sıfırlama email mətnini azərbaycancaya çevirə bilərsiniz.
5. `npm run build` edib Cloudflare-ə yükləyin. CSP başlığını (`_headers`) deploy-dan sonra brauzer konsolunda yoxlayın (Google giriş və analytics işləməlidir).
6. Google Cloud Console -> APIs & Services -> Credentials: Firebase API açarını öz domeninizlə məhdudlaşdırın.

7. Sayt Cloudflare **Workers** üzərindədir: `wrangler.jsonc` əlavə olundu (`/quiz` kimi linklər yeniləndikdə 404 verməsin deyə SPA rejimi). Worker adı `eminisquizon` olmalıdır, fərqlidirsə `name` sahəsini dəyişin. Deploy əmri: `npm run build && npx wrangler deploy`.
8. Firebase Authorized domains-ə `eminisquizon.ibrahimliemin190.workers.dev` əlavə edin (Google girişi üçün mütləqdir).
