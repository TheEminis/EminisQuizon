// src/data/grammarData.js
export const grammarTopics = [
  { 
    id: 1, 
    title: "Present Simple Tense", 
    level: "A1", 
    description: "İndiki zamanda adətən edilən hərəkətlər, vərdişlər, ümumi həqiqətlər və cədvəl üzrə olan hadisələr.",
    rules: `
📌 FORMU:
• Müsbət: Subject + V1 (he/she/it -> V1+s/es)
• Mənfi: Subject + do/does + not + V1
• Sual: Do/Does + Subject + V1?

📌 İSTİFADƏ HALLARI:
1. Daimi vərdişlər: "I drink coffee every morning."
2. Ümumi həqiqətlər: "Water boils at 100°C."
3. Cədvəl üzrə hadisələr: "The train leaves at 6 PM."
4. Hiss və duyğular: "I feel happy."
5. Təkrarlanan hərəkətlər: "She always arrives on time."

📌 VURĞULU SÖZLƏR:
always, usually, often, sometimes, rarely, never, every day, on Mondays

📌 XÜSUSİ QAYDALAR:
• 3-cü şəxs tək (he/she/it) fellərə -s və ya -es əlavə olunur
• -s, -sh, -ch, -x, -o ilə bitən fellərə -es əlavə olunur (goes, watches)
• Səsli hərflə bitən fellərə -s əlavə olunur (plays, says)
    `
  },
  { 
    id: 2, 
    title: "Present Continuous Tense", 
    level: "A1", 
    description: "Hazırda, danışıq anında davam edən hərəkətləri, müvəqqəti vəziyyətləri və yaxın gələcək planlarını ifadə edən zaman forması.",
    rules: `
📌 FORMU:
• Müsbət: Subject + am/is/are + V-ing
• Mənfi: Subject + am/is/are + not + V-ing
• Sual: Am/Is/Are + Subject + V-ing?

📌 İSTİFADƏ HALLARI:
1. Danışıq anında davam edən: "She is reading a book now."
2. Müvəqqəti vəziyyətlər: "I am living in London this year."
3. Yaxın gələcək planları: "We are meeting tomorrow."
4. Dəyişən tendensiyalar: "The population is increasing."
5. Təkrarlanan hərəkətlər: "He is always losing his keys."

📌 VURĞULU SÖZLƏR:
now, at the moment, currently, today, this week, these days, still

📌 XÜSUSİ QAYDALAR:
• Səssiz -e ilə bitən fellər: -e çıxarılır (write -> writing)
• Bir samit + qısa sait + samit: son samit təkrarlanır (sit -> sitting)
• -ie ilə bitən: -ie → -y (lie -> lying)
• State verbs (stative verbs) continuous işlənmir: know, believe, love, hate
    `
  },
  { 
    id: 3, 
    title: "Past Simple Tense", 
    level: "A2", 
    description: "Keçmiş zamanda tamamlanmış, bitmiş hərəkətləri ifadə edən zaman forması.",
    rules: `
📌 FORMU:
• Müsbət: Subject + V2 (keçmiş zaman forması)
• Mənfi: Subject + did + not + V1
• Sual: Did + Subject + V1?

📌 İSTİFADƏ HALLARI:
1. Keçmişdə bitmiş hərəkətlər: "I visited Paris last year."
2. Keçmişdə ardıcıl hərəkətlər: "She woke up, brushed her teeth, and went to work."
3. Keçmişdəki vərdişlər: "I played football when I was young."
4. Keçmişdə baş vermiş hadisələr: "The concert started at 8 PM."

📌 VURĞULU SÖZLƏR:
yesterday, last week/month/year, in 2020, two days ago, when I was young

📌 XÜSUSİ QAYDALAR:
• Düzenli fellər: -ed əlavə olunur (walk -> walked)
• Düzensiz fellər: xüsusi formada olur (go -> went, eat -> ate)
• -y ilə bitən və samitdən əvvəl: -y → -ied (study -> studied)
• Bir samit + qısa sait + samit: son samit təkrarlanır (stop -> stopped)
    `
  },
  { 
    id: 4, 
    title: "Present Perfect Tense", 
    level: "B1", 
    description: "Keçmişdə başlamış və indiyə qədər davam edən və ya indiki zamanda təsiri hiss olunan hadisələri ifadə edən zaman.",
    rules: `
📌 FORMU:
• Müsbət: Subject + have/has + V3 (past participle)
• Mənfi: Subject + have/has + not + V3
• Sual: Have/Has + Subject + V3?

📌 İSTİFADƏ HALLARI:
1. Keçmişdə başlayıb davam edən: "I have lived here for 5 years."
2. İndiki zamanda təsiri olan: "She has lost her keys."
3. Həyat təcrübələri: "I have never been to Japan."
4. Bitməmiş zaman dövrü: "I have read two books this week."
5. Son vaxtlar baş verən: "They have just arrived."

📌 VURĞULU SÖZLƏR:
ever, never, just, already, yet, since, for, recently, lately, so far

📌 XÜSUSİ QAYDALAR:
• Since + başlanğıc nöqtəsi: since Monday, since 2010
• For + müddət: for 3 years, for a long time
• Gone vs Been: gone = getdi və qayıtmadı, been = getdi və qayıtdı
• Just = yeni, already = artıq (müsbət cümlələrdə), yet = hələ (sual və mənfi)
    `
  },
  { 
    id: 5, 
    title: "Future Simple (Will)", 
    level: "A2", 
    description: "Gələcəkdə baş verəcək hadisələri, proqnozları, ani qərarları, vədləri, təklifləri və xahişləri ifadə edən zaman forması.",
    rules: `
📌 FORMU:
• Müsbət: Subject + will + V1
• Mənfi: Subject + will + not (won't) + V1
• Sual: Will + Subject + V1?

📌 İSTİFADƏ HALLARI:
1. Proqnozlar: "It will rain tomorrow."
2. Ani qərarlar: "I'll have the pasta."
3. Vədlər: "I will always love you."
4. Təkliflər: "I'll help you with that."
5. Xahişlər: "Will you close the door?"
6. Faktlar və inanclar: "The sun will rise at 6 AM."

📌 VURĞULU SÖZLƏR:
tomorrow, next week/year, in the future, soon, one day, probably, definitely

📌 XÜSUSİ QAYDALAR:
• Shall = I/we ilə istifadə olunur (təklif və suallarda)
• 'll = qısa forması (I'll, you'll)
• Won't = will not (mənfi)
• Going to vs Will: Going to = plan, Will = ani qərar/proqnoz
    `
  },
  { 
    id: 6, 
    title: "Conditional Sentences", 
    level: "B1", 
    description: "Bir şərtin yerinə yetirilib-yetirilməməsindən asılı olan vəziyyətləri ifadə edən cümlə quruluşu.",
    rules: `
📌 4 NÖV ŞƏRT CÜMLƏLƏRİ:

🔹 ZERO CONDITIONAL (Həmişə doğru olanlar):
• If + Present Simple, Present Simple
• "If you heat water, it boils."
• İstifadə: Ümumi həqiqətlər, elmi faktlar

🔹 FIRST CONDITIONAL (Real, mümkün):
• If + Present Simple, will + V1
• "If it rains, I will stay home."
• İstifadə: Gələcəkdə mümkün olan real şərtlər

🔹 SECOND CONDITIONAL (Unreal, xəyali):
• If + Past Simple, would + V1
• "If I had money, I would travel."
• İstifadə: İndiki zamanda qeyri-mümkün/xəyali şərtlər

🔹 THIRD CONDITIONAL (Keçmişdəki xəyali):
• If + Past Perfect, would have + V3
• "If I had studied, I would have passed."
• İstifadə: Keçmişdə dəyişə bilməyəcək şərtlər

📌 XÜSUSİ QAYDALAR:
• Unless = if not: "I won't go unless you come."
• Provided/Providing that = if şərti ilə
• As long as = şərti ilə
• In case = ehtimala görə
    `
  },
  { 
    id: 7, 
    title: "Passive Voice", 
    level: "B1", 
    description: "Hərəkətin kim tərəfindən edildiyindən daha çox hərəkətin özünün vacib olduğu hallarda işlənən quruluş.",
    rules: `
📌 FORMU:
• Müsbət: Subject + to be + V3 (past participle)
• Mənfi: Subject + to be + not + V3
• Sual: To be + Subject + V3?

📌 ZAMANLARA GÖRƏ PASSIVE:
• Present Simple: am/is/are + V3
• Past Simple: was/were + V3
• Present Continuous: am/is/are + being + V3
• Past Continuous: was/were + being + V3
• Present Perfect: have/has + been + V3
• Future (will): will + be + V3
• Modal verbs: modal + be + V3

📌 İSTİFADƏ HALLARI:
1. Kimin etdiyi bilinməyəndə: "My car was stolen."
2. Hərəkət vacib olduqda: "The hospital was built in 1990."
3. Rəsmi və elmi mətnlərdə: "The experiment was conducted."

📌 XÜSUSİ QAYDALAR:
• By + agent (kim tərəfindən) - lazım olmadıqda çıxarılır
• Get + V3 (informal passive): "I got fired."
• Have/Get something done: "I had my hair cut."
    `
  },
  { 
    id: 8, 
    title: "Reported Speech", 
    level: "B1", 
    description: "Başqasının dediyi sözləri olduğu kimi təkrar etmədən öz sözlərimizlə çatdırmaq üsulu.",
    rules: `
📌 QAYDALAR:
• Direct Speech: "I am happy," she said.
• Reported Speech: She said (that) she was happy.

📌 ZAMAN DƏYİŞİKLİKLƏRİ:
• Present Simple → Past Simple
• Present Continuous → Past Continuous
• Past Simple → Past Perfect
• Present Perfect → Past Perfect
• will → would
• can → could
• must → had to

📌 KÖMƏKÇİ FEL DƏYİŞİKLİKLƏRİ:
• this → that • these → those • here → there
• now → then • today → that day
• yesterday → the day before • tomorrow → the next day

📌 SUALLARIN REPORTED SPEECH:
• Yes/No: ask + if/whether
• WH-suaları: ask + wh-word

📌 İSTİFADƏ HALLARI:
• Say vs Tell: say + (that), tell + object
• Order və request-lər: tell/ask + object + to + V1
    `
  },
  { 
    id: 9, 
    title: "Prepositions", 
    level: "A2", 
    description: "İsimlər, əvəzliklər və ya noun phrase-lərdən əvvəl gələrək onların cümlədəki digər sözlərlə münasibətini göstərən sözlər.",
    rules: `
📌 ZAMAN PREPOZİSİYALARI:
• at: at 5 o'clock, at midnight, at Christmas
• in: in July, in 2020, in the morning
• on: on Monday, on 5 July, on my birthday

📌 YER PREPOZİSİYALARI:
• at: at the bus stop, at home, at work
• in: in London, in the room, in the water
• on: on the table, on the wall, on the bus

📌 İSTİQAMƏT PREPOZİSİYALARI:
• to: go to school, fly to Paris
• into: walk into the room
• onto: jump onto the table
• towards: walk towards the door

📌 FELLƏR + PREPOZİSİYALAR:
• look at, look for, look after
• listen to, speak to, talk about
• wait for, ask for, pay for
• depend on, rely on, insist on

📌 SİFƏTLƏR + PREPOZİSİYALAR:
• afraid of, angry with, interested in
• good at, bad at, surprised at
• married to, similar to, different from
• famous for, responsible for, proud of
    `
  },
  { 
    id: 10, 
    title: "Modal Verbs", 
    level: "B1", 
    description: "Əsas felin mənasını tamamlayan, ehtimal, bacarıq, icazə, məcburiyyət, təklif, məsləhət mənaları verən köməkçi fellər.",
    rules: `
📌 MODAL FELLƏR VƏ MƏNALARI:

🔹 CAN / COULD (bacarıq, icazə, ehtimal):
• Ability: "I can swim."
• Permission: "Can I come in?"
• Possibility: "It could rain later."
• Request: "Could you help me?"

🔹 MAY / MIGHT (ehtimal, icazə):
• Possibility: "It may rain."
• Permission: "May I use the phone?"
• Might = daha az ehtimal: "He might be late."

🔹 MUST (məcburiyyət, yüksək ehtimal):
• Obligation: "You must wear a seatbelt."
• Certainty: "She must be at home."
• Mustn't = qadağan: "You mustn't smoke here."

🔹 SHOULD / OUGHT TO (məsləhət):
• Advice: "You should see a doctor."
• Expectation: "The train should arrive soon."

🔹 WILL / WOULD (vəd, təklif, istək):
• Promise: "I will help you."
• Offer: "I'll carry that for you."
• Request: "Would you mind closing the door?"

🔹 HAVE TO / NEED TO (xarici məcburiyyət):
• External obligation: "I have to work today."
• Necessity: "You need to fill this form."

📌 XÜSUSİ QAYDALAR:
• Modal fellərdən sonra V1 gəlir
• Modal felin 3-cü şəxs təkdə -s əlavəsi yoxdur
• Modal fellərin past forması: must → had to, can → could
• Perfect modals: must have + V3, should have + V3
    `
  },
  { 
    id: 11, 
    title: "Comparatives & Superlatives", 
    level: "A2", 
    description: "Sifətlərin iki və ya daha çox şeyi müqayisə etmək üçün dəyişdirilmiş formaları.",
    rules: `
📌 COMPARATIVE FORM (iki şeyin müqayisəsi):

🔹 Qısa sifətlər (1 hecalı):
• -er + than: tall → taller than
• "John is taller than Mark."

🔹 Uzun sifətlər (3+ hecalı):
• more + sifət + than
• expensive → more expensive than

🔹 2 hecalı sifətlər:
• -y ilə bitən: -y → -ier (happy → happier)
• Digərləri: more + sifət (modern → more modern)

📌 SUPERLATIVE FORM (3+ şeyin ən üstünü):

🔹 Qısa sifətlər:
• the + -est: tall → the tallest

🔹 Uzun sifətlər:
• the most + sifət: expensive → the most expensive

📌 DÜZENSİZ MÜQAYİSƏLƏR:
• good → better → the best
• bad → worse → the worst
• far → further/farther → the furthest/farthest
• little → less → the least
• many/much → more → the most

📌 BƏRABƏRLİK MÜQAYİSƏSƏ:
• as + sifət + as: "She is as tall as her brother."

📌 DOUBLE COMPARATIVE:
• "The harder you study, the better your results."
    `
  }
];

export const getGrammarTopic = (id) => {
  return grammarTopics.find(t => t.id === id);
};