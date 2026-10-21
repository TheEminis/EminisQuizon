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

# Statistika səhifəsi (`/stats`)
- Profil menyusundan (avatar → "📊 Statistics") açılır; hər istifadəçi yalnız öz statistikasını görür.
- Hər tamamlanan test (Quiz, Vocabulary, Reading, Listening, Level Test) tarixçəyə yazılır: nə, nə vaxt, neçə bal.
- Göstərilir: ümumi test sayı, düzgünlük %, düzgün/səhv, aktiv günlər, ardıcıl gün seriyası, son 14 gün qrafiki, kateqoriya üzrə faiz, filtrli tarixçə.
- Yeni fayllar: `src/utils/attemptHistory.js`, `src/components/pages/StatsPage.js`. Tarixçə localStorage + Firestore (`users/{uid}/attempts`) üzərində saxlanır.
- **Mütləq edin:** `firestore.rules` faylının yeni məzmununu Firebase Console → Firestore → Rules-a yapışdırıb Publish edin (əks halda tarixçə yalnız həmin brauzerdə qalır).
- Köhnə testlər (bu yeniləmədən əvvəl) tarixçədə yoxdur, yalnız ümumi saya daxildir.
