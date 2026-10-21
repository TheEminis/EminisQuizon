// src/data/vocabularyData.js
// Hər səviyyədə 75 söz var: 5 test × 15 söz (Test 1 = sözlər 1-15, Test 2 = 16-30 ...)
export const vocabularyLevels = [
  { id: 'A1', name: 'Beginner A1', description: 'Basic vocabulary and simple words', wordCount: '5 tests × 15 words' },
  { id: 'A2', name: 'Elementary A2', description: 'Common words for everyday situations', wordCount: '5 tests × 15 words' },
  { id: 'B1', name: 'Intermediate B1', description: 'Academic and professional vocabulary', wordCount: '5 tests × 15 words' },
  { id: 'B2', name: 'Upper Intermediate B2', description: 'Advanced vocabulary for complex topics', wordCount: '5 tests × 15 words' },
  { id: 'C1', name: 'Advanced C1', description: 'High-level academic and literary vocabulary', wordCount: '5 tests × 15 words' }
];

export const VOCAB_TEST_SIZE = 15;
export const VOCAB_TESTS_PER_LEVEL = 5;

export const vocabularyData = {
  A1: [
    { word: "House", meaning: "Ev" }, { word: "Apple", meaning: "Alma" }, { word: "Dog", meaning: "İt" }, { word: "Book", meaning: "Kitab" }, { word: "School", meaning: "Məktəb" },
    { word: "Water", meaning: "Su" }, { word: "Chair", meaning: "Stul" }, { word: "Car", meaning: "Maşın" }, { word: "Sun", meaning: "Günəş" }, { word: "Kitchen", meaning: "Mətbəx" },
    { word: "Hat", meaning: "Şapka" }, { word: "Pen", meaning: "Qələm" }, { word: "Forest", meaning: "Meşə" }, { word: "Bed", meaning: "Yataq" }, { word: "Clock", meaning: "Saat" },
    { word: "Cat", meaning: "Pişik" }, { word: "Table", meaning: "Masa" }, { word: "Door", meaning: "Qapı" }, { word: "Window", meaning: "Pəncərə" }, { word: "Milk", meaning: "Süd" },
    { word: "Bread", meaning: "Çörək" }, { word: "Mother", meaning: "Ana" }, { word: "Father", meaning: "Ata" }, { word: "Brother", meaning: "Qardaş" }, { word: "Sister", meaning: "Bacı" },
    { word: "Red", meaning: "Qırmızı" }, { word: "Blue", meaning: "Mavi" }, { word: "Green", meaning: "Yaşıl" }, { word: "Big", meaning: "Böyük" }, { word: "Small", meaning: "Kiçik" },
    { word: "Happy", meaning: "Xoşbəxt" }, { word: "Sad", meaning: "Kədərli" }, { word: "Hot", meaning: "İsti" }, { word: "Cold", meaning: "Soyuq" }, { word: "Day", meaning: "Gün" },
    { word: "Night", meaning: "Gecə" }, { word: "Morning", meaning: "Səhər" }, { word: "Tree", meaning: "Ağac" }, { word: "Flower", meaning: "Çiçək" }, { word: "Bird", meaning: "Quş" },
    { word: "Fish", meaning: "Balıq" }, { word: "Egg", meaning: "Yumurta" }, { word: "Tea", meaning: "Çay" }, { word: "Rice", meaning: "Düyü" }, { word: "Meat", meaning: "Ət" },
    { word: "Hand", meaning: "Əl" }, { word: "Eye", meaning: "Göz" }, { word: "Head", meaning: "Baş" }, { word: "Foot", meaning: "Ayaq" }, { word: "Nose", meaning: "Burun" },
    { word: "Mouth", meaning: "Ağız" }, { word: "Girl", meaning: "Qız" }, { word: "Boy", meaning: "Oğlan" }, { word: "Man", meaning: "Kişi" }, { word: "Woman", meaning: "Qadın" },
    { word: "City", meaning: "Şəhər" }, { word: "Street", meaning: "Küçə" }, { word: "Bag", meaning: "Çanta" }, { word: "Shoe", meaning: "Ayaqqabı" }, { word: "Shirt", meaning: "Köynək" },
    { word: "Phone", meaning: "Telefon" }, { word: "Money", meaning: "Pul" }, { word: "Key", meaning: "Açar" }, { word: "Moon", meaning: "Ay" }, { word: "Star", meaning: "Ulduz" },
    { word: "Rain", meaning: "Yağış" }, { word: "Snow", meaning: "Qar" }, { word: "Wind", meaning: "Külək" }, { word: "Road", meaning: "Yol" }, { word: "Bridge", meaning: "Körpü" },
    { word: "Garden", meaning: "Bağ" }, { word: "Lemon", meaning: "Limon" }, { word: "Cheese", meaning: "Pendir" }, { word: "Soup", meaning: "Şorba" }, { word: "Paper", meaning: "Kağız" }
  ],
  A2: [
    { word: "Travel", meaning: "Səyahət" }, { word: "Friend", meaning: "Dost" }, { word: "Hotel", meaning: "Otel" }, { word: "Airport", meaning: "Hava limanı" }, { word: "Teacher", meaning: "Müəllim" },
    { word: "Library", meaning: "Kitabxana" }, { word: "Restaurant", meaning: "Restoran" }, { word: "Hospital", meaning: "Xəstəxana" }, { word: "Museum", meaning: "Muzey" }, { word: "Beach", meaning: "Çimərlik" },
    { word: "Stadium", meaning: "Stadion" }, { word: "Mosque", meaning: "Məscid" }, { word: "Radio", meaning: "Radio" }, { word: "Newspaper", meaning: "Qəzet" }, { word: "Cinema", meaning: "Kino" },
    { word: "Doctor", meaning: "Həkim" }, { word: "Nurse", meaning: "Tibb bacısı" }, { word: "Driver", meaning: "Sürücü" }, { word: "Farmer", meaning: "Fermer" }, { word: "Engineer", meaning: "Mühəndis" },
    { word: "Market", meaning: "Bazar" }, { word: "Bakery", meaning: "Çörəkxana" }, { word: "Pharmacy", meaning: "Aptek" }, { word: "Bank", meaning: "Bank" }, { word: "Station", meaning: "Stansiya" },
    { word: "Ticket", meaning: "Bilet" }, { word: "Passport", meaning: "Pasport" }, { word: "Luggage", meaning: "Baqaj" }, { word: "Journey", meaning: "Səfər" }, { word: "Holiday", meaning: "Tətil" },
    { word: "Weather", meaning: "Hava" }, { word: "Season", meaning: "Fəsil" }, { word: "Summer", meaning: "Yay" }, { word: "Winter", meaning: "Qış" }, { word: "Autumn", meaning: "Payız" },
    { word: "Mountain", meaning: "Dağ" }, { word: "Lake", meaning: "Göl" }, { word: "Island", meaning: "Ada" }, { word: "Cloud", meaning: "Bulud" }, { word: "Storm", meaning: "Fırtına" },
    { word: "Neighbor", meaning: "Qonşu" }, { word: "Guest", meaning: "Qonaq" }, { word: "Family", meaning: "Ailə" }, { word: "Grandmother", meaning: "Nənə" }, { word: "Grandfather", meaning: "Baba" },
    { word: "Birthday", meaning: "Ad günü" }, { word: "Present", meaning: "Hədiyyə" }, { word: "Breakfast", meaning: "Səhər yeməyi" }, { word: "Lunch", meaning: "Nahar" }, { word: "Dinner", meaning: "Şam yeməyi" },
    { word: "Vegetable", meaning: "Tərəvəz" }, { word: "Fruit", meaning: "Meyvə" }, { word: "Menu", meaning: "Menyu" }, { word: "Bill", meaning: "Hesab" }, { word: "Price", meaning: "Qiymət" },
    { word: "Shop", meaning: "Mağaza" }, { word: "Customer", meaning: "Müştəri" }, { word: "Clothes", meaning: "Geyim" }, { word: "Jacket", meaning: "Gödəkçə" }, { word: "Umbrella", meaning: "Çətir" },
    { word: "Glasses", meaning: "Eynək" }, { word: "Medicine", meaning: "Dərman" }, { word: "Fever", meaning: "İsitmə" }, { word: "Headache", meaning: "Baş ağrısı" }, { word: "Sleep", meaning: "Yuxu" },
    { word: "Music", meaning: "Musiqi" }, { word: "Song", meaning: "Mahnı" }, { word: "Painting", meaning: "Rəsm" }, { word: "Game", meaning: "Oyun" }, { word: "Team", meaning: "Komanda" },
    { word: "Competition", meaning: "Yarış" }, { word: "Mirror", meaning: "Güzgü" }, { word: "Carpet", meaning: "Xalça" }, { word: "Roof", meaning: "Dam" }, { word: "Floor", meaning: "Mərtəbə" }
  ],
  B1: [
    { word: "Environment", meaning: "Ətraf mühit" }, { word: "Culture", meaning: "Mədəniyyət" }, { word: "Education", meaning: "Təhsil" }, { word: "Communication", meaning: "Ünsiyyət" }, { word: "Technology", meaning: "Texnologiya" },
    { word: "Leadership", meaning: "Rəhbərlik" }, { word: "Management", meaning: "İdarəetmə" }, { word: "Innovation", meaning: "İnnovasiya" }, { word: "Strategy", meaning: "Strategiya" }, { word: "Development", meaning: "İnkişaf" },
    { word: "Skill", meaning: "Bacarıq" }, { word: "Finance", meaning: "Maliyyə" }, { word: "Project", meaning: "Layihə" }, { word: "Support", meaning: "Dəstək" }, { word: "Progress", meaning: "İrəliləyiş" },
    { word: "Advantage", meaning: "Üstünlük" }, { word: "Disadvantage", meaning: "Çatışmazlıq" }, { word: "Opportunity", meaning: "Fürsət" }, { word: "Experience", meaning: "Təcrübə" }, { word: "Knowledge", meaning: "Bilik" },
    { word: "Decision", meaning: "Qərar" }, { word: "Solution", meaning: "Həll" }, { word: "Society", meaning: "Cəmiyyət" }, { word: "Government", meaning: "Hökumət" }, { word: "Economy", meaning: "İqtisadiyyat" },
    { word: "Industry", meaning: "Sənaye" }, { word: "Agriculture", meaning: "Kənd təsərrüfatı" }, { word: "Health", meaning: "Sağlamlıq" }, { word: "Illness", meaning: "Xəstəlik" }, { word: "Treatment", meaning: "Müalicə" },
    { word: "Behavior", meaning: "Davranış" }, { word: "Relationship", meaning: "Münasibət" }, { word: "Responsibility", meaning: "Məsuliyyət" }, { word: "Freedom", meaning: "Azadlıq" }, { word: "Equality", meaning: "Bərabərlik" },
    { word: "Justice", meaning: "Ədalət" }, { word: "Law", meaning: "Qanun" }, { word: "Crime", meaning: "Cinayət" }, { word: "Evidence", meaning: "Sübut" }, { word: "Research", meaning: "Tədqiqat" },
    { word: "Experiment", meaning: "Eksperiment" }, { word: "Discovery", meaning: "Kəşf" }, { word: "Invention", meaning: "İxtira" }, { word: "Increase", meaning: "Artım" }, { word: "Decrease", meaning: "Azalma" },
    { word: "Average", meaning: "Orta" }, { word: "Quality", meaning: "Keyfiyyət" }, { word: "Quantity", meaning: "Kəmiyyət" }, { word: "Population", meaning: "Əhali" }, { word: "Century", meaning: "Əsr" },
    { word: "History", meaning: "Tarix" }, { word: "Tradition", meaning: "Ənənə" }, { word: "Religion", meaning: "Din" }, { word: "Generation", meaning: "Nəsil" }, { word: "Border", meaning: "Sərhəd" },
    { word: "Trade", meaning: "Ticarət" }, { word: "Salary", meaning: "Maaş" }, { word: "Employee", meaning: "İşçi" }, { word: "Employer", meaning: "İşəgötürən" }, { word: "Career", meaning: "Karyera" },
    { word: "Interview", meaning: "Müsahibə" }, { word: "Meeting", meaning: "İclas" }, { word: "Deadline", meaning: "Son müddət" }, { word: "Budget", meaning: "Büdcə" }, { word: "Profit", meaning: "Mənfəət" },
    { word: "Loss", meaning: "İtki" }, { word: "Debt", meaning: "Borc" }, { word: "Advertisement", meaning: "Reklam" }, { word: "Benefit", meaning: "Fayda" }, { word: "Risk", meaning: "Risk" },
    { word: "Choice", meaning: "Seçim" }, { word: "Habit", meaning: "Vərdiş" }, { word: "Effort", meaning: "Səy" }, { word: "Achievement", meaning: "Nailiyyət" }, { word: "Goal", meaning: "Məqsəd" }
  ],
  B2: [
    { word: "Negotiate", meaning: "Danışıq aparmaq" }, { word: "Evaluate", meaning: "Qiymətləndirmək" }, { word: "Collaborate", meaning: "Əməkdaşlıq etmək" }, { word: "Implement", meaning: "Həyata keçirmək" }, { word: "Optimize", meaning: "Optimallaşdırmaq" },
    { word: "Analyze", meaning: "Analiz etmək" }, { word: "Coordinate", meaning: "Koordinasiya etmək" }, { word: "Delegate", meaning: "Vəzifə vermək" }, { word: "Facilitate", meaning: "Asanlaşdırmaq" }, { word: "Innovate", meaning: "İnnovasiya etmək" },
    { word: "Motivate", meaning: "Motivasiya etmək" }, { word: "Prioritize", meaning: "Prioritet təyin etmək" }, { word: "Articulate", meaning: "Aydın ifadə etmək" }, { word: "Comprehend", meaning: "Anlamaq" }, { word: "Convey", meaning: "Çatdırmaq" },
    { word: "Ambiguous", meaning: "Qeyri-müəyyən" }, { word: "Reluctant", meaning: "Könülsüz" }, { word: "Substantial", meaning: "Əhəmiyyətli" }, { word: "Inevitable", meaning: "Qaçılmaz" }, { word: "Consequence", meaning: "Nəticə" },
    { word: "Controversial", meaning: "Mübahisəli" }, { word: "Sustainable", meaning: "Davamlı" }, { word: "Fundamental", meaning: "Əsas" }, { word: "Elaborate", meaning: "Ətraflı izah etmək" }, { word: "Contribute", meaning: "Töhfə vermək" },
    { word: "Establish", meaning: "Yaratmaq" }, { word: "Maintain", meaning: "Qorumaq" }, { word: "Reinforce", meaning: "Gücləndirmək" }, { word: "Overcome", meaning: "Aşmaq" }, { word: "Demonstrate", meaning: "Nümayiş etdirmək" },
    { word: "Emphasize", meaning: "Vurğulamaq" }, { word: "Acknowledge", meaning: "Etiraf etmək" }, { word: "Assume", meaning: "Fərz etmək" }, { word: "Estimate", meaning: "Təxmin etmək" }, { word: "Anticipate", meaning: "Əvvəlcədən görmək" },
    { word: "Distinguish", meaning: "Fərqləndirmək" }, { word: "Enhance", meaning: "Yaxşılaşdırmaq" }, { word: "Eliminate", meaning: "Aradan qaldırmaq" }, { word: "Obtain", meaning: "Əldə etmək" }, { word: "Reveal", meaning: "Aşkar etmək" },
    { word: "Restrict", meaning: "Məhdudlaşdırmaq" }, { word: "Compensate", meaning: "Əvəzini ödəmək" }, { word: "Interpret", meaning: "Şərh etmək" }, { word: "Transform", meaning: "Çevirmək" }, { word: "Genuine", meaning: "Həqiqi" },
    { word: "Tolerate", meaning: "Dözmək" }, { word: "Flexible", meaning: "Çevik" }, { word: "Efficient", meaning: "Səmərəli" }, { word: "Reliable", meaning: "Etibarlı" }, { word: "Vulnerable", meaning: "Müdafiəsiz" },
    { word: "Coincidence", meaning: "Təsadüf" }, { word: "Mandatory", meaning: "Məcburi" }, { word: "Optional", meaning: "İxtiyari" }, { word: "Temporary", meaning: "Müvəqqəti" }, { word: "Permanent", meaning: "Daimi" },
    { word: "Urgent", meaning: "Təcili" }, { word: "Accurate", meaning: "Dəqiq" }, { word: "Adequate", meaning: "Kifayət qədər" }, { word: "Abundant", meaning: "Bol" }, { word: "Scarce", meaning: "Nadir" },
    { word: "Hostile", meaning: "Düşmənçilik edən" }, { word: "Skeptical", meaning: "Şübhəçi" }, { word: "Ambitious", meaning: "İddialı" }, { word: "Cautious", meaning: "Ehtiyatlı" }, { word: "Stubborn", meaning: "İnadkar" },
    { word: "Humble", meaning: "Təvazökar" }, { word: "Generous", meaning: "Səxavətli" }, { word: "Anxious", meaning: "Narahat" }, { word: "Curious", meaning: "Maraqlı" }, { word: "Rely", meaning: "Etibar etmək" },
    { word: "Prohibit", meaning: "Qadağan etmək" }, { word: "Persuade", meaning: "Razı salmaq" }, { word: "Reject", meaning: "Rədd etmək" }, { word: "Mislead", meaning: "Aldatmaq" }, { word: "Withdraw", meaning: "Geri çəkilmək" }
  ],
  C1: [
    { word: "Ubiquitous", meaning: "Hər yerdə olan" }, { word: "Meticulous", meaning: "Çox diqqətli" }, { word: "Exacerbate", meaning: "Pisləşdirmək" }, { word: "Ephemeral", meaning: "Müvəqqəti" }, { word: "Gregarious", meaning: "Ünsiyyətcil" },
    { word: "Ineffable", meaning: "İzah olunmaz" }, { word: "Sagacious", meaning: "Müdrik" }, { word: "Taciturn", meaning: "Az danışan" }, { word: "Voracious", meaning: "Doyumsuz" }, { word: "Magnanimous", meaning: "Ali mərtəbəli" },
    { word: "Cacophony", meaning: "Kakofoniya" }, { word: "Circumspect", meaning: "Ehtiyatlı" }, { word: "Insidious", meaning: "Gizli zərərli" }, { word: "Mellifluous", meaning: "Xoş səsli" }, { word: "Serendipitous", meaning: "Təsadüfi xoşbəxtlik" },
    { word: "Pragmatic", meaning: "Praqmatik" }, { word: "Resilient", meaning: "Dözümlü" }, { word: "Eloquent", meaning: "Natiq" }, { word: "Scrutinize", meaning: "Diqqətlə araşdırmaq" }, { word: "Mitigate", meaning: "Azaltmaq" },
    { word: "Alleviate", meaning: "Yüngülləşdirmək" }, { word: "Ambivalent", meaning: "Qərarsız" }, { word: "Candid", meaning: "Səmimi" }, { word: "Cynical", meaning: "Kinik" }, { word: "Diligent", meaning: "Çalışqan" },
    { word: "Eccentric", meaning: "Qəribə" }, { word: "Fastidious", meaning: "Çox seçici" }, { word: "Hypocrisy", meaning: "Riyakarlıq" }, { word: "Impartial", meaning: "Qərəzsiz" }, { word: "Indifferent", meaning: "Biganə" },
    { word: "Lucid", meaning: "Aydın" }, { word: "Nostalgia", meaning: "Nostalji" }, { word: "Obsolete", meaning: "Köhnəlmiş" }, { word: "Paradox", meaning: "Paradoks" }, { word: "Perpetual", meaning: "Fasiləsiz" },
    { word: "Plausible", meaning: "İnandırıcı" }, { word: "Prejudice", meaning: "Qərəz" }, { word: "Profound", meaning: "Dərin" }, { word: "Reconcile", meaning: "Barışdırmaq" }, { word: "Redundant", meaning: "Lazımsız" },
    { word: "Relentless", meaning: "Amansız" }, { word: "Scrupulous", meaning: "Vicdanlı" }, { word: "Superficial", meaning: "Səthi" }, { word: "Tenacious", meaning: "Əzmkar" }, { word: "Trivial", meaning: "Əhəmiyyətsiz" },
    { word: "Unprecedented", meaning: "Görünməmiş" }, { word: "Vague", meaning: "Qeyri-aydın" }, { word: "Volatile", meaning: "Dəyişkən" }, { word: "Ardent", meaning: "Qızğın" }, { word: "Benevolent", meaning: "Xeyirxah" },
    { word: "Concise", meaning: "Yığcam" }, { word: "Delicate", meaning: "Zərif" }, { word: "Deteriorate", meaning: "Pisləşmək" }, { word: "Dilemma", meaning: "Dilemma" }, { word: "Empathy", meaning: "Empatiya" },
    { word: "Fluctuate", meaning: "Dalğalanmaq" }, { word: "Hinder", meaning: "Əngəl törətmək" }, { word: "Inherent", meaning: "Ayrılmaz" }, { word: "Jeopardize", meaning: "Təhlükəyə atmaq" }, { word: "Lenient", meaning: "Yumşaq" },
    { word: "Notorious", meaning: "Bədnam" }, { word: "Oblivious", meaning: "Xəbərsiz" }, { word: "Persevere", meaning: "Əzmlə davam etmək" }, { word: "Thrive", meaning: "Çiçəklənmək" }, { word: "Undermine", meaning: "Altını oymaq" },
    { word: "Vindicate", meaning: "Haqq qazandırmaq" }, { word: "Zealous", meaning: "Qeyrətli" }, { word: "Acquire", meaning: "Qazanmaq" }, { word: "Contemplate", meaning: "Götür-qoy etmək" }, { word: "Subtle", meaning: "İncə" },
    { word: "Arbitrary", meaning: "Özbaşına" }, { word: "Coherent", meaning: "Məntiqli" }, { word: "Detrimental", meaning: "Zərərli" }, { word: "Pivotal", meaning: "Həlledici" }, { word: "Mundane", meaning: "Gündəlik" }
  ]
};

// Müəyyən səviyyənin müəyyən testinin sözləri (testIndex: 0-4)
export const getVocabTest = (level, testIndex) =>
  (vocabularyData[level] || []).slice(testIndex * VOCAB_TEST_SIZE, (testIndex + 1) * VOCAB_TEST_SIZE);
