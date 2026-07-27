// src/data/readingData.js
export const readingLevels = ['A1', 'A2', 'B1', 'B2', 'C1'];

export const readingTests = {
  A1: [
    {
      id: 1,
      title: "My Daily Routine",
      text: "My name is Tom. I am 20 years old and I am a student. Every day, I wake up at 7:00 AM. I brush my teeth and wash my face. Then, I eat breakfast with my family. I usually drink tea and eat eggs with bread. At 8:30 AM, I go to university by bus. My classes start at 9:00 AM and finish at 2:00 PM. After class, I go home and eat lunch. In the evening, I do my homework and play video games. I go to bed at 10:30 PM.",
      questions: [
        { text: "How old is Tom?", options: ["18", "20", "22", "25"], correct: 1, explanation: "Text: 'My name is Tom. I am 20 years old...'" },
        { text: "What time does Tom wake up?", options: ["6:00 AM", "7:00 AM", "8:30 AM", "9:00 AM"], correct: 1, explanation: "Text: '...I wake up at 7:00 AM.'" },
        { text: "How does Tom go to university?", options: ["By car", "On foot", "By bus", "By train"], correct: 2, explanation: "Text: '...I go to university by bus.'" },
        { text: "What does Tom eat for breakfast?", options: ["Pizza and coffee", "Fruit and milk", "Eggs with bread", "Soup and rice"], correct: 2, explanation: "Text: 'I usually drink tea and eat eggs with bread.'" },
        { text: "What time do his classes finish?", options: ["1:00 PM", "2:00 PM", "3:00 PM", "10:30 PM"], correct: 1, explanation: "Text: 'My classes start at 9:00 AM and finish at 2:00 PM.'" },
        { text: "What does Tom do in the evening?", options: ["He goes to university", "He plays football", "He does homework and plays video games", "He cleans the house"], correct: 2, explanation: "Text: 'In the evening, I do my homework and play video games.'" }
      ]
    },
    {
      id: 2,
      title: "My Favorite Pet",
      text: "Sarah has a pet dog. His name is Max. Max is small, white, and very friendly. Sarah's father brought Max home two years ago on Sarah's birthday. Max loves to run in the park and play with a red ball. Every morning, Sarah takes Max for a walk before school. Max eats dog food twice a day and drinks a lot of water. When Sarah comes home from school, Max wags his tail and barks happily. Sarah loves her dog very much.",
      questions: [
        { text: "What kind of animal is Max?", options: ["A cat", "A parrot", "A dog", "A rabbit"], correct: 2, explanation: "Text: 'Sarah has a pet dog. His name is Max.'" },
        { text: "What color is Max?", options: ["Black", "White", "Brown", "Grey"], correct: 1, explanation: "Text: 'Max is small, white, and very friendly.'" },
        { text: "When did Sarah get Max?", options: ["On her birthday", "At Christmas", "Last summer", "Yesterday"], correct: 0, explanation: "Text: 'Sarah's father brought Max home two years ago on Sarah's birthday.'" },
        { text: "What is Max's favorite toy?", options: ["A blue shoe", "A red ball", "A small bone", "A yellow stick"], correct: 1, explanation: "Text: 'Max loves to run in the park and play with a red ball.'" },
        { text: "How many times a day does Max eat?", options: ["Once", "Twice", "Three times", "Four times"], correct: 1, explanation: "Text: 'Max eats dog food twice a day...'" },
        { text: "How does Max react when Sarah comes home?", options: ["He sleeps", "He runs away", "He wags his tail and barks happily", "He eats his food"], correct: 2, explanation: "Text: 'When Sarah comes home from school, Max wags his tail and barks happily.'" }
      ]
    },
    {
      id: 3,
      title: "A Visit to the Supermarket",
      text: "Today is Saturday. Anna and her mother are at the supermarket. They need to buy food for the week. First, they go to the fruit section. Anna chooses six apples and three bananas. Next, her mother buys milk, cheese, and butter in the dairy department. Anna also wants some chocolate, but her mother says, Only one small bar. Finally, they pay for the food at the checkout with a credit card and carry the bags to their car.",
      questions: [
        { text: "What day is it today?", options: ["Friday", "Saturday", "Sunday", "Monday"], correct: 1, explanation: "Text: 'Today is Saturday.'" },
        { text: "Who is Anna with?", options: ["Her father", "Her friend", "Her mother", "Her brother"], correct: 2, explanation: "Text: 'Anna and her mother are at the supermarket.'" },
        { text: "How many apples does Anna choose?", options: ["Three", "Four", "Six", "Ten"], correct: 2, explanation: "Text: 'Anna chooses six apples...'" },
        { text: "Which department has milk and cheese?", options: ["Bakery", "Fruit section", "Dairy department", "Meat section"], correct: 2, explanation: "Text: '...buys milk, cheese, and butter in the dairy department.'" },
        { text: "What does Anna's mother allow her to buy?", options: ["Big ice cream", "Two cakes", "One small bar of chocolate", "Potato chips"], correct: 2, explanation: "Text: 'Anna also wants some chocolate, but her mother says, Only one small bar.'" },
        { text: "How do they pay for the items?", options: ["With cash", "With a credit card", "With a phone app", "They don't pay"], correct: 1, explanation: "Text: '...they pay for the food at the checkout with a credit card...'" }
      ]
    },
    {
      id: 4,
      title: "A Sunny Day at the Beach",
      text: "It is summer and the weather is very hot. Mark and his family are at the beach. The sky is blue and the sun is shining. Mark's sister, Lily, is building a big sandcastle. Mark is swimming in the cool sea water. Their parents are sitting under a large umbrella and reading books. At 1:00 PM, they all sit together to eat sandwiches and drink fresh orange juice. It is a wonderful and relaxing day.",
      questions: [
        { text: "What season is it in the story?", options: ["Winter", "Spring", "Summer", "Autumn"], correct: 2, explanation: "Text: 'It is summer and the weather is very hot.'" },
        { text: "What is Lily doing?", options: ["Swimming in the sea", "Building a sandcastle", "Reading a book", "Drinking orange juice"], correct: 1, explanation: "Text: 'Mark's sister, Lily, is building a big sandcastle.'" },
        { text: "What is Mark doing?", options: ["Sleeping", "Cooking food", "Swimming in the sea", "Flying a kite"], correct: 2, explanation: "Text: 'Mark is swimming in the cool sea water.'" },
        { text: "Where are the parents sitting?", options: ["In a restaurant", "Under a large umbrella", "In the car", "On a boat"], correct: 1, explanation: "Text: 'Their parents are sitting under a large umbrella...'" },
        { text: "What do they eat at 1:00 PM?", options: ["Pizza", "Ice cream", "Sandwiches", "Salads"], correct: 2, explanation: "Text: '...they all sit together to eat sandwiches...'" },
        { text: "What do they drink?", options: ["Cold water", "Fresh orange juice", "Tea", "Lemonade"], correct: 1, explanation: "Text: '...and drink fresh orange juice.'" }
      ]
    }
  ],
  A2: [
    {
      id: 1,
      title: "The New City Library",
      text: "The town of Greenfield opened a new public library last month. The building is modern, bright, and has three floors. On the first floor, visitors can find newspapers, popular magazines, and a small cafe that sells coffee and snacks. The second floor contains thousands of books, including novels, history books, and science textbooks. The third floor is a silent study area equipped with computers and free Wi-Fi for students. Anyone living in the town can get a free library card to borrow up to five books for three weeks.",
      questions: [
        { text: "When did the new library open?", options: ["Last week", "Last month", "Last year", "Two months ago"], correct: 1, explanation: "Text: 'The town of Greenfield opened a new public library last month.'" },
        { text: "What can visitors find on the first floor?", options: ["A silent study area", "Computers and Wi-Fi", "Newspapers, magazines, and a cafe", "Science textbooks"], correct: 2, explanation: "Text: 'On the first floor, visitors can find newspapers, popular magazines, and a small cafe...'" },
        { text: "Where are the computers located?", options: ["On the first floor", "On the second floor", "On the third floor", "In the cafe"], correct: 2, explanation: "Text: 'The third floor is a silent study area equipped with computers...'" },
        { text: "Who can get a free library card?", options: ["Only university students", "Anyone living in the town", "Teachers only", "Children under 10 years old"], correct: 1, explanation: "Text: 'Anyone living in the town can get a free library card...'" },
        { text: "How many books can a member borrow at one time?", options: ["Three", "Four", "Five", "Ten"], correct: 2, explanation: "Text: '...to borrow up to five books...'" },
        { text: "How long can you keep the borrowed books?", options: ["One week", "Two weeks", "Three weeks", "One month"], correct: 2, explanation: "Text: '...for three weeks.'" }
      ]
    },
    {
      id: 2,
      title: "Preparing for a Trip",
      text: "Next weekend, David is going on a camping trip to the mountains with three of his close friends. They plan to leave early on Saturday morning and stay until Sunday evening. David spent all Tuesday night packing his equipment. He packed a tent, a warm sleeping bag, a flashlight, and comfortable hiking boots. His friend Jack is responsible for bringing the food, while Emma is bringing cooking equipment and a first-aid kit. They are excited because the weather forecast predicts clear skies and warm weather.",
      questions: [
        { text: "Where is David going next weekend?", options: ["To the beach", "To another city", "To the mountains", "To a hotel"], correct: 2, explanation: "Text: 'David is going on a camping trip to the mountains...'" },
        { text: "How many people are going on the trip in total?", options: ["Three", "Four", "Five", "Two"], correct: 1, explanation: "Text: '...with three of his close friends.' (David + 3 friends = 4 total)" },
        { text: "When do they plan to leave?", options: ["Friday night", "Saturday morning", "Saturday evening", "Sunday morning"], correct: 1, explanation: "Text: 'They plan to leave early on Saturday morning...'" },
        { text: "What item did David pack?", options: ["Cooking equipment", "Food", "A first-aid kit", "A flashlight"], correct: 3, explanation: "Text: 'He packed a tent, a warm sleeping bag, a flashlight...'" },
        { text: "Who is bringing the food for the trip?", options: ["David", "Jack", "Emma", "David's brother"], correct: 1, explanation: "Text: 'His friend Jack is responsible for bringing the food...'" },
        { text: "What is the weather forecast for the weekend?", options: ["Rainy and cold", "Clear skies and warm", "Windy and stormy", "Snowy"], correct: 1, explanation: "Text: '...the weather forecast predicts clear skies and warm weather.'" }
      ]
    },
    {
      id: 3,
      title: "Learning a New Language",
      text: "Learning a foreign language can be a challenging but rewarding experience. Many people choose to learn English because it is widely spoken around the world. Experts suggest that practicing for 15 to 20 minutes every day is much better than studying for three hours once a week. Listening to English podcasts, watching movies with subtitles, and speaking with native speakers are effective ways to improve quickly. The most important thing is not to be afraid of making mistakes, because mistakes are a natural part of learning.",
      questions: [
        { text: "Why do many people choose to learn English?", options: ["Because it is easy", "Because it is widely spoken around the world", "Because it has no grammar rules", "Because it is mandatory everywhere"], correct: 1, explanation: "Text: 'Many people choose to learn English because it is widely spoken around the world.'" },
        { text: "What daily practice time do experts recommend?", options: ["5 minutes", "15 to 20 minutes", "One hour", "Three hours"], correct: 1, explanation: "Text: 'Experts suggest that practicing for 15 to 20 minutes every day...'" },
        { text: "Why is studying 15 minutes daily better than 3 hours once a week?", options: ["It saves money", "It helps keep learning consistent", "It is less boring", "The text does not say"], correct: 1, explanation: "The text implies consistency is better." },
        { text: "Which is NOT mentioned as a helpful learning method?", options: ["Listening to podcasts", "Watching movies with subtitles", "Memorizing the entire dictionary", "Speaking with native speakers"], correct: 2, explanation: "Memorizing the entire dictionary is not mentioned in the text." },
        { text: "What is considered a natural part of learning a language?", options: ["Making mistakes", "Taking expensive exams", "Traveling to England", "Writing long books"], correct: 0, explanation: "Text: '...mistakes are a natural part of learning.'" },
        { text: "According to the text, what should learners NOT be afraid of?", options: ["Speaking aloud", "Making mistakes", "Listening to native speakers", "Reading long articles"], correct: 1, explanation: "Text: 'The most important thing is not to be afraid of making mistakes...'" }
      ]
    },
    {
      id: 4,
      title: "An Unforgettable Weekend",
      text: "Last month, Lisa won a photography competition organized by a local magazine. Her prize was a two-day trip to a coastal town famous for its picturesque landscapes. On the first day, she woke up early to capture the sunrise over the ocean. The light was golden and soft, creating perfect conditions for her photos. Later that afternoon, she explored the historic city center and took pictures of old wooden houses and narrow cobblestone streets. She returned home with over five hundred photographs and many great memories.",
      questions: [
        { text: "How did Lisa get the chance to go on the trip?", options: ["She bought a ticket", "She won a photography competition", "Her school organized it", "Her family gifted it to her"], correct: 1, explanation: "Text: 'Lisa won a photography competition organized by a local magazine.'" },
        { text: "Where was the trip located?", options: ["In a mountainous village", "In a coastal town", "In a large capital city", "Near a desert"], correct: 1, explanation: "Text: '...a two-day trip to a coastal town...'" },
        { text: "Why did Lisa wake up early on the first day?", options: ["To catch a train", "To capture the sunrise", "To buy local food", "To meet a friend"], correct: 1, explanation: "Text: '...she woke up early to capture the sunrise over the ocean.'" },
        { text: "What did she photograph in the afternoon?", options: ["Sea animals", "Modern skyscrapers", "Old wooden houses and cobblestone streets", "A local festival"], correct: 2, explanation: "Text: '...she explored the historic city center and took pictures of old wooden houses and narrow cobblestone streets.'" },
        { text: "How many photographs did she take during the trip?", options: ["Exactly one hundred", "Around two hundred", "Over five hundred", "More than a thousand"], correct: 2, explanation: "Text: 'She returned home with over five hundred photographs...'" },
        { text: "What made the sunrise good for photography?", options: ["The weather was cloudy", "The light was golden and soft", "The sun was extremely bright", "There were many birds"], correct: 1, explanation: "Text: 'The light was golden and soft, creating perfect conditions for her photos.'" }
      ]
    }
  ],
  B1: [
    {
      id: 1,
      title: "The Evolution of Remote Work",
      text: "In recent years, remote work has transformed from an occasional benefit into a standard working model for millions of professionals worldwide. Advances in telecommunication technology and cloud computing have enabled employees to perform complex tasks from almost anywhere. Proponents of remote work highlight increased flexibility, eliminated commute times, and improved work-life balance as major benefits. However, challenges remain, including feelings of isolation, difficulty in separating professional and personal life, and reduced face-to-face collaboration. Companies are increasingly adopting hybrid models to combine the advantages of both remote and in-office setups.",
      questions: [
        { text: "What has enabled the rapid growth of remote work?", options: ["Decreased internet prices", "Advances in telecommunication technology and cloud computing", "New government laws", "Higher corporate profits"], correct: 1, explanation: "Text: 'Advances in telecommunication technology and cloud computing have enabled employees to perform complex tasks from almost anywhere.'" },
        { text: "Which is NOT mentioned as a benefit of remote work?", options: ["Increased flexibility", "No commute time", "Free equipment from employers", "Better work-life balance"], correct: 2, explanation: "Free equipment is not mentioned as a benefit." },
        { text: "What major challenge do remote workers face regarding social connection?", options: ["High phone bills", "Feelings of isolation", "Too many meetings", "Lack of training"], correct: 1, explanation: "Text: '...challenges remain, including feelings of isolation...'" },
        { text: "What is a hybrid work model?", options: ["Working entirely from home", "Working only on weekends", "Combining remote and in-office work", "Working for two companies simultaneously"], correct: 2, explanation: "Text: 'Companies are increasingly adopting hybrid models to combine the advantages of both remote and in-office setups.'" },
        { text: "Why do companies adopt hybrid models?", options: ["To reduce office rent to zero", "To combine the advantages of remote and office work", "Because employees dislike working from home", "To monitor workers constantly"], correct: 1, explanation: "Text: '...to combine the advantages of both remote and in-office setups.'" },
        { text: "The word 'Proponents' in the passage is closest in meaning to:", options: ["Opponents", "Supporters", "Managers", "Researchers"], correct: 1, explanation: "Proponents means supporters or advocates of something." }
      ]
    },
    {
      id: 2,
      title: "The Importance of Biodiversity",
      text: "Biodiversity refers to the variety of living organisms, including plants, animals, and microorganisms, that inhabit our planet. Healthy ecosystems depend on biodiversity to function properly and provide essential resources such as clean water, oxygen, and fertile soil. Unfortunately, human activities such as deforestation, pollution, and climate change are accelerating the extinction rate of species worldwide. Protecting biodiversity requires international cooperation, habitat preservation, and sustainable agricultural practices. Preserving ecological balance is vital not only for wildlife but also for the long-term survival of human civilization.",
      questions: [
        { text: "What is the main definition of biodiversity according to the text?", options: ["The total weight of animals on Earth", "The variety of living organisms on the planet", "The study of rainforest plants", "The rate of ocean pollution"], correct: 1, explanation: "Text: 'Biodiversity refers to the variety of living organisms...'" },
        { text: "What essential resource provided by ecosystems is mentioned?", options: ["Electricity", "Fertile soil", "Plastic materials", "Renewable energy"], correct: 1, explanation: "Text: '...provide essential resources such as clean water, oxygen, and fertile soil.'" },
        { text: "Which human activity is listed as a threat to biodiversity?", options: ["Solar power generation", "Organic farming", "Deforestation", "Wildlife monitoring"], correct: 2, explanation: "Text: '...human activities such as deforestation, pollution, and climate change...'" },
        { text: "What is necessary to protect biodiversity on a global level?", options: ["Building more cities", "International cooperation", "Increasing industrial output", "Stopping all farming"], correct: 1, explanation: "Text: 'Protecting biodiversity requires international cooperation...'" },
        { text: "Why is ecological balance important for humans?", options: ["It ensures lower food prices", "It guarantees political stability", "It is vital for human survival", "It creates tourism jobs"], correct: 2, explanation: "Text: '...vital not only for wildlife but also for the long-term survival of human civilization.'" },
        { text: "What is the author's primary purpose in writing this passage?", options: ["To promote a specific holiday destination", "To raise awareness about preserving biodiversity", "To criticize agricultural techniques", "To explain the process of photosynthesis"], correct: 1, explanation: "The author aims to inform and raise awareness about biodiversity protection." }
      ]
    },
    {
      id: 3,
      title: "The History of Coffee Culture",
      text: "Coffee is one of the most consumed beverages globally, but its journey began centuries ago in the ancient coffee forests of the Ethiopian plateau. Legend says a goat herder named Kaldi discovered coffee after noticing his goats became energetic after eating berries from a specific tree. From Ethiopia, coffee spread to the Arabian Peninsula, where public coffee houses first emerged as vibrant centers of intellectual discussion and news exchange. By the 17th century, coffee had reached Europe, quickly establishing itself as a favorite drink among thinkers and merchants alike.",
      questions: [
        { text: "Where did coffee originate according to the text?", options: ["Brazil", "Italy", "The Ethiopian plateau", "Arabia"], correct: 2, explanation: "Text: '...began centuries ago in the ancient coffee forests of the Ethiopian plateau.'" },
        { text: "How was coffee discovered according to the legend?", options: ["A farmer cooked coffee beans", "A goat herder noticed energetic goats", "A king drank a new herbal tea", "Travelers found dried beans on the road"], correct: 1, explanation: "Text: 'Legend says a goat herder named Kaldi discovered coffee after noticing his goats became energetic...'" },
        { text: "What role did early coffee houses play in the Arabian Peninsula?", options: ["They were places to buy cheap food", "They served as centers of intellectual discussion", "They were exclusively for royal families", "They operated as hotels for traders"], correct: 1, explanation: "Text: '...where public coffee houses first emerged as vibrant centers of intellectual discussion...'" },
        { text: "When did coffee reach Europe?", options: ["In the 12th century", "In the 15th century", "In the 17th century", "In the 20th century"], correct: 2, explanation: "Text: 'By the 17th century, coffee had reached Europe...'" },
        { text: "Who particularly favored coffee when it arrived in Europe?", options: ["Soldiers and sailors", "Thinkers and merchants", "Farmers and children", "Monarchs only"], correct: 1, explanation: "Text: '...establishing itself as a favorite drink among thinkers and merchants alike.'" },
        { text: "The word 'vibrant' in the paragraph closest means:", options: ["Quiet and calm", "Lively and energetic", "Dark and mysterious", "Expensive and luxury"], correct: 1, explanation: "Vibrant means full of energy and enthusiasm; lively." }
      ]
    },
    {
      id: 4,
      title: "Urban Green Spaces",
      text: "As cities continue to expand rapidly, the integration of green spaces such as parks, rooftop gardens, and urban forests has become a priority for city planners. These natural zones offer numerous psychological and physical health benefits to residents, including reduced stress levels and cleaner air quality. Furthermore, urban greenery acts as a natural sponge, absorbing excess stormwater and mitigating the urban heat island effect. Investing in green infrastructure not only enhances city aesthetics but also builds resilient, sustainable communities.",
      questions: [
        { text: "What issue do city planners address by adding green spaces?", options: ["High traffic congestion", "Rapid urban expansion", "Lack of public transport", "Building height limits"], correct: 1, explanation: "Text: 'As cities continue to expand rapidly, the integration of green spaces...has become a priority...'" },
        { text: "Which health benefit for residents is mentioned in the text?", options: ["Improved vision", "Reduced stress levels", "Lower risk of bone fracture", "Weight loss"], correct: 1, explanation: "Text: '...including reduced stress levels and cleaner air quality.'" },
        { text: "How do urban green spaces help during heavy rainfall?", options: ["By diverting rain into rivers", "By absorbing excess stormwater like a sponge", "By freezing rainwater", "By storing water in underground tanks"], correct: 1, explanation: "Text: '...absorbs excess stormwater...'" },
        { text: "What is the urban heat island effect reduced by?", options: ["Tall concrete buildings", "Urban greenery", "Air conditioning systems", "Underground subways"], correct: 1, explanation: "Text: '...mitigating the urban heat island effect.' (through green spaces)" },
        { text: "What is one aesthetic benefit of green infrastructure?", options: ["It increases building prices", "It enhances city appearance", "It makes roads wider", "It removes street lights"], correct: 1, explanation: "Text: 'Investing in green infrastructure not only enhances city aesthetics...'" },
        { text: "The word 'mitigating' in the text means:", options: ["Increasing", "Moderating or reducing", "Ignoring", "Measuring"], correct: 1, explanation: "Mitigating means making something less severe or serious." }
      ]
    }
  ],
  B2: [
    {
      id: 1,
      title: "Artificial Intelligence in Modern Healthcare",
      text: "The integration of Artificial Intelligence (AI) into modern healthcare systems represents a pivotal shift in medical diagnostics and personalized treatment protocols. Machine learning algorithms, trained on vast datasets of radiological images and patient records, are demonstrating remarkable precision in detecting early-stage pathologies often exceeding the accuracy rates of human specialists. Moreover, AI-driven predictive modeling enables clinicians to anticipate patient deterioration hours before clinical symptoms manifest. However, this technological leap is accompanied by significant ethical dilemmas. Issues regarding patient data privacy, algorithmic bias, and the erosion of the physician-patient relationship necessitate robust regulatory frameworks to ensure AI is deployed safely and ethically without replacing human clinical judgment.",
      questions: [
        { text: "What is the primary advantage of AI in diagnostics mentioned in the text?", options: ["It reduces medical treatment costs to zero", "It detects early-stage pathologies with high precision", "It completely replaces the need for medical doctors", "It speeds up hospital admission processes"], correct: 1, explanation: "Text: '...demonstrating remarkable precision in detecting early-stage pathologies...'" },
        { text: "How does predictive modeling assist clinicians in patient care?", options: ["By prescribing automatic dosages", "By anticipating patient deterioration before symptoms appear", "By scheduling surgery dates automatically", "By communicating directly with patient relatives"], correct: 1, explanation: "Text: '...enables clinicians to anticipate patient deterioration hours before clinical symptoms manifest.'" },
        { text: "Which ethical dilemma associated with AI is explicitly stated?", options: ["High cost of purchasing AI hardware", "Algorithmic bias and data privacy concerns", "Lack of interest from medical students", "Overreliance on physical textbooks"], correct: 1, explanation: "Text: 'Issues regarding patient data privacy, algorithmic bias...'" },
        { text: "What is required to ensure the safe deployment of medical AI?", options: ["Eliminating human doctors entirely", "Robust regulatory frameworks", "Restricting AI to research institutions only", "Free software licenses for all hospitals"], correct: 1, explanation: "Text: '...necessitate robust regulatory frameworks to ensure AI is deployed safely...'" },
        { text: "What position does the author take regarding the role of AI in medicine?", options: ["AI should fully replace human doctors immediately", "AI is useless and dangerous in clinical settings", "AI should complement, not replace, human clinical judgment", "AI is only applicable in basic administrative tasks"], correct: 2, explanation: "Text: '...without replacing human clinical judgment.'" },
        { text: "The word 'pivotal' in the first sentence is closest in meaning to:", options: ["Minor and trivial", "Crucial and transformative", "Slow and gradual", "Temporary and uncertain"], correct: 1, explanation: "Pivotal means of crucial importance; central and transformative." }
      ]
    },
    {
      id: 2,
      title: "The Psychology of Consumer Behavior",
      text: "Understanding consumer behavior requires delving into complex cognitive and emotional processes that dictate purchasing decisions. Marketers frequently employ psychological triggers, such as cognitive scarcity and social proof, to influence buyer actions. The perception that a product is in limited supply triggers a psychological sense of urgency, compelling consumers to purchase impulsively to avoid potential regret. Similarly, consumer decisions are heavily anchored by social validation; potential buyers consistently rely on ratings, reviews, and influencer endorsements to validate their choices. Recognizing these subconscious drivers enables corporations to craft subtle yet potent marketing strategies that subtly guide consumer choices.",
      questions: [
        { text: "What drives consumer purchasing decisions according to the passage?", options: ["Purely mathematical financial calculations", "Complex cognitive and emotional processes", "Direct instruction from retail store staff", "Government recommendations"], correct: 1, explanation: "Text: 'Understanding consumer behavior requires delving into complex cognitive and emotional processes...'" },
        { text: "How does the principle of cognitive scarcity influence buyers?", options: ["It offers them discount coupons", "It triggers a sense of urgency to purchase impulsively", "It guarantees product durability", "It reduces shipping times"], correct: 1, explanation: "Text: '...triggers a psychological sense of urgency, compelling consumers to purchase impulsively...'" },
        { text: "What role do online reviews and ratings play in consumer behavior?", options: ["They serve as social proof to validate purchasing choices", "They lower the production costs of goods", "They inform manufacturers about raw materials", "They prevent competitors from advertising"], correct: 0, explanation: "Text: '...potential buyers consistently rely on ratings, reviews, and influencer endorsements to validate their choices.'" },
        { text: "What does the term 'anchored' imply in the context of consumer decisions?", options: ["Decisions are fixed and immovable", "Decisions are strongly influenced or grounded by specific reference points", "Decisions are made slowly over several years", "Decisions are completely random"], correct: 1, explanation: "Anchored means strongly influenced or grounded by specific reference points." },
        { text: "Why do corporations study subconscious consumer drivers?", options: ["To redesign their legal contracts", "To craft effective strategies that subtly guide choices", "To reduce tax obligations", "To hire fewer marketing specialists"], correct: 1, explanation: "Text: '...enables corporations to craft subtle yet potent marketing strategies that subtly guide consumer choices.'" },
        { text: "The word 'compelling' in the text is closest in meaning to:", options: ["Forcing or strongly persuading", "Discouraging", "Confusing", "Delaying"], correct: 0, explanation: "Compelling means forcing or strongly persuading someone to do something." }
      ]
    },
    {
      id: 3,
      title: "Sustainable Architecture and Urban Resilience",
      text: "As climate change accelerates urbanization challenges, sustainable architecture has shifted from an eco-conscious trend into an architectural necessity. Modern sustainable design focuses on minimizing a structure's environmental footprint through energy-efficient insulation, passive solar heating, and integrated rainwater harvesting systems. Furthermore, architects increasingly utilize cross-laminated timber and recycled industrial materials to diminish embodied carbon emissions generated during construction. Beyond environmental benefits, resilient architecture incorporates modular structures capable of withstanding extreme weather events, thereby safeguarding urban populations against climate instability.",
      questions: [
        { text: "How has sustainable architecture evolved according to the passage?", options: ["From a core principle into a forgotten theory", "From an eco-conscious trend into an architectural necessity", "From a costly experiment into an illegal practice", "From commercial building into residential housing only"], correct: 1, explanation: "Text: '...sustainable architecture has shifted from an eco-conscious trend into an architectural necessity.'" },
        { text: "Which design feature is mentioned as a way to minimize environmental impact?", options: ["Marble flooring", "Passive solar heating", "High-voltage air conditioning", "Deep underground basements"], correct: 1, explanation: "Text: '...focuses on minimizing...through energy-efficient insulation, passive solar heating...'" },
        { text: "Why is cross-laminated timber utilized in modern construction?", options: ["To lower construction noise levels", "To diminish embodied carbon emissions", "To reduce building security costs", "To simplify plumbing installations"], correct: 1, explanation: "Text: '...utilize cross-laminated timber and recycled industrial materials to diminish embodied carbon emissions...'" },
        { text: "What feature allows resilient structures to survive extreme weather?", options: ["Glass curtain walls", "Modular construction designs", "High-speed elevators", "Synthetic roofing paint"], correct: 1, explanation: "Text: '...resilient architecture incorporates modular structures capable of withstanding extreme weather events...'" },
        { text: "What is the overall goal of resilient architecture described in the text?", options: ["To increase property taxation value", "To safeguard urban populations against climate instability", "To make all buildings look visually identical", "To shorten construction times to a few days"], correct: 1, explanation: "Text: '...safeguarding urban populations against climate instability.'" },
        { text: "What does 'embodied carbon emissions' refer to in this context?", options: ["Carbon produced by residents during daily living", "Carbon generated during the manufacturing and transport of building materials", "Carbon absorbed by urban trees around the building", "Carbon emitted by appliances inside offices"], correct: 1, explanation: "Embodied carbon refers to the carbon emitted during the production and transportation of building materials." }
      ]
    },
    {
      id: 4,
      title: "The Impact of Globalization on Cultural Identity",
      text: "Globalization has undeniably interconnected international markets and facilitated seamless cross-cultural communication. However, this profound global integration has ignited an intense academic debate concerning its impact on local cultural identity. Critics argue that the global dominance of Western media conglomerates promotes cultural homogenization, gradually eroding unique indigenous traditions, dialects, and social customs. Conversely, proponents contend that globalization fosters cultural hybridization, a dynamic process where global influences are absorbed and reinterpreted within local contexts, giving rise to novel, vibrant cultural expressions rather than complete assimilation.",
      questions: [
        { text: "What major concern do critics raise regarding globalization?", options: ["Decline in international trade volume", "Cultural homogenization and loss of local traditions", "Excessive translation of literature", "Reduced speed of internet communications"], correct: 1, explanation: "Text: 'Critics argue that the global dominance of Western media conglomerates promotes cultural homogenization...'" },
        { text: "What entity is accused of pushing cultural homogenization?", options: ["Local agricultural unions", "Western media conglomerates", "Non-profit environmental NGOs", "Academic research institutions"], correct: 1, explanation: "Text: '...the global dominance of Western media conglomerates promotes cultural homogenization...'" },
        { text: "How do proponents view the process of 'cultural hybridization'?", options: ["As a destructive force erasing all native history", "As a dynamic process creating novel cultural expressions", "As a temporary economic trend without cultural value", "As an artificial policy enforced by international laws"], correct: 1, explanation: "Text: '...fosters cultural hybridization...giving rise to novel, vibrant cultural expressions...'" },
        { text: "What happens during cultural hybridization according to the text?", options: ["Local populations abandon their native languages completely", "Global influences are reinterpreted within local contexts", "Foreign media is strictly banned by governments", "Ancient traditions remain completely unchanged"], correct: 1, explanation: "Text: '...where global influences are absorbed and reinterpreted within local contexts...'" },
        { text: "The primary purpose of the text is to:", options: ["Encourage governments to block foreign media", "Present contrasting viewpoints on globalization's cultural impact", "Prove that Western culture is superior to local cultures", "Propose new international trade tariffs"], correct: 1, explanation: "The text presents both critical and positive perspectives." },
        { text: "The word 'erosion' (eroding) in the context means:", options: ["Gradual destruction or loss", "Sudden expansion", "Intentional preservation", "Complete isolation"], correct: 0, explanation: "Erosion means the gradual destruction or weakening of something." }
      ]
    }
  ],
  C1: [
    {
      id: 1,
      title: "Epistemological Foundations of Scientific Paradigms",
      text: "Thomas Kuhn's seminal work on scientific revolutions fundamentally disrupted the conventional, linear conception of scientific progress. Kuhn posited that science does not advance through a steady accumulation of objective knowledge, but rather operates within dominant operational frameworks termed 'paradigms.' During periods of 'normal science,' researchers work within the established paradigm, resolving anomalies without challenging core assumptions. However, as unresolvable empirical anomalies accumulate, the paradigm experiences a crisis, eventually culminating in a revolutionary 'paradigm shift.' This new framework redefines fundamental terminology and methodological standards, rendering the pre- and post-revolution scientific theories largely incommensurable.",
      questions: [
        { text: "What traditional view of scientific progress did Thomas Kuhn challenge?", options: ["That science is purely theoretical and lacks practical application", "That scientific knowledge accumulates in a steady, linear progression", "That scientific experiments are inherently unrepeatable", "That scientific research is driven by political agendas"], correct: 1, explanation: "Text: '...disrupted the conventional, linear conception of scientific progress.'" },
        { text: "According to Kuhn, how do scientists act during periods of 'normal science'?", options: ["They constantly attempt to overthrow the prevailing theories", "They resolve anomalies while remaining inside the established paradigm", "They reject empirical data in favor of philosophical dogma", "They work independently without adopting standard methodologies"], correct: 1, explanation: "Text: '...researchers work within the established paradigm, resolving anomalies without challenging core assumptions.'" },
        { text: "What directly precipitates a crisis within a scientific paradigm?", options: ["A lack of funding for university laboratories", "The accumulation of unresolvable empirical anomalies", "Public opposition to technological innovation", "Disagreements between theoretical and applied physicists"], correct: 1, explanation: "Text: '...as unresolvable empirical anomalies accumulate, the paradigm experiences a crisis...'" },
        { text: "What does the term 'incommensurable' imply in the context of paradigm shifts?", options: ["The two paradigms can be easily compared using identical criteria", "The paradigms are so fundamentally different that direct comparison using shared standards is impossible", "The new paradigm is mathematically smaller than the old one", "Both paradigms can coexist without any intellectual conflict"], correct: 1, explanation: "Incommensurable means lacking a common standard of measurement." },
        { text: "Which best captures the main theme of the text?", options: ["The historical development of physics laboratories", "The mechanism and philosophical implications of scientific paradigm shifts", "A biographical critique of Thomas Kuhn's scientific career", "The necessity of increasing empirical data collection"], correct: 1, explanation: "The text focuses on Kuhn's theory of scientific paradigms." },
        { text: "The word 'seminal' in the first sentence is closest in meaning to:", options: ["Outdated and forgotten", "Highly influential and groundbreaking", "Highly controversial and rejected", "Simple and elementary"], correct: 1, explanation: "Seminal means highly influential and groundbreaking." }
      ]
    },
    {
      id: 2,
      title: "The Socioeconomic Impact of Algorithmic Automation",
      text: "The burgeoning reliance on advanced algorithmic automation and generative machine intelligence has triggered a seismic re-evaluation of labor economics. Unlike prior industrial revolutions that primarily displaced manual labor while simultaneously creating higher-tier managerial and technical positions, contemporary cognitive automation imperils cognitive and creative roles previously thought immune to technological disruption. While technocrats argue that capital reallocation into automated systems inevitably maximizes aggregate economic productivity, labor economists highlight the widening wealth polarization and severe structural unemployment facing mid-skill knowledge workers. Mitigating this profound socioeconomic rift will require radical institutional interventions, such as universal basic income schemes, proactive retraining programs, and revised capital taxation models.",
      questions: [
        { text: "How does current cognitive automation differ from past industrial revolutions?", options: ["It only affects agricultural workers in developing nations", "It threatens high-level cognitive and creative positions rather than solely manual labor", "It reduces overall corporate productivity across all sectors", "It relies entirely on human physical labor for execution"], correct: 1, explanation: "Text: '...contemporary cognitive automation imperils cognitive and creative roles previously thought immune...'" },
        { text: "What argument is put forward by technocrats regarding automation?", options: ["It will lead to immediate national bankruptcy", "It maximizes aggregate economic productivity through capital reallocation", "It should be outlawed by international treaties", "It benefits only non-profit research organizations"], correct: 1, explanation: "Text: '...technocrats argue that capital reallocation into automated systems inevitably maximizes aggregate economic productivity...'" },
        { text: "Which demographic group is identified as particularly vulnerable to structural unemployment?", options: ["Unskilled manual laborers", "High-level government executives", "Mid-skill knowledge workers", "Agricultural land owners"], correct: 2, explanation: "Text: '...structural unemployment facing mid-skill knowledge workers.'" },
        { text: "Which intervention is NOT proposed to address the socioeconomic gap caused by automation?", options: ["Universal basic income schemes", "Proactive worker retraining programs", "Revised capital taxation models", "Complete prohibition of all corporate software"], correct: 3, explanation: "The text suggests UBI, retraining, and tax reform, not software prohibition." },
        { text: "The tone of the author regarding algorithmic automation can best be described as:", options: ["Overwhelmingly optimistic and dismissive of risks", "Analytical, highlighting both economic arguments and critical risks", "Nostalgic for pre-industrial manufacturing processes", "Indifferent to the financial consequences"], correct: 1, explanation: "The author presents both perspectives objectively." },
        { text: "The word 'burgeoning' in the first sentence means:", options: ["Declining rapidly", "Growing or expanding rapidly", "Stagnating completely", "Ceasing to exist"], correct: 1, explanation: "Burgeoning means growing or developing rapidly." }
      ]
    },
    {
      id: 3,
      title: "Cognitive Dissonance and Political Polarization",
      text: "In contemporary political discourse, the phenomenon of cognitive dissonance, the psychological discomfort experienced when holding contradictory beliefs or encountering evidence that invalidates one's worldview, plays a defining role in deepening partisan entrenchment. When individuals are presented with empirical evidence that contradicts their ideological convictions, they rarely abandon their stance. Instead, psychological defense mechanisms such as confirmation bias and hyper-partisan rationalization are deployed to neutralize the dissonance. Modern algorithmic echo chambers on social media platforms exacerbate this tendency by curating hyper-customized content streams that insulate users from disconfirming facts, thereby solidifying tribal polarization and eroding democratic consensus.",
      questions: [
        { text: "What defines 'cognitive dissonance' according to the passage?", options: ["The inability to process complex mathematical calculations", "Psychological discomfort arising from conflicting beliefs or disconfirming evidence", "A neurological condition affecting short-term memory", "The feeling of fatigue after long political debates"], correct: 1, explanation: "Text: '...the psychological discomfort experienced when holding contradictory beliefs...'" },
        { text: "How do individuals typically respond when confronted with facts that contradict their political beliefs?", options: ["They immediately adjust their beliefs to match empirical reality", "They deploy defense mechanisms like confirmation bias to defend their stance", "They consult neutral scientific panels for advice", "They permanently stop using social media platforms"], correct: 1, explanation: "Text: '...they rarely abandon their stance. Instead, psychological defense mechanisms...are deployed.'" },
        { text: "How do social media algorithms contribute to political polarization?", options: ["By forcing users to read opposing political viewpoints", "By curating echo chambers that insulate users from disconfirming facts", "By charging fees for posting political commentary", "By banning all political content from public feeds"], correct: 1, explanation: "Text: '...curating hyper-customized content streams that insulate users from disconfirming facts...'" },
        { text: "What is a long-term consequence of algorithmic echo chambers mentioned in the text?", options: ["The complete elimination of political news outlets", "The erosion of democratic consensus and solidifying of tribal polarization", "Accelerated technological innovation in voting software", "Decreased internet usage among political scientists"], correct: 1, explanation: "Text: '...thereby solidifying tribal polarization and eroding democratic consensus.'" },
        { text: "The word 'exacerbate' in the final sentence is synonymous with:", options: ["Alleviate or lessen", "Aggravate or worsen", "Explain or clarify", "Measure or quantify"], correct: 1, explanation: "Exacerbate means to make a problem worse." },
        { text: "What is the central thesis of the passage?", options: ["Social media should be shut down by federal regulators", "Psychological mechanisms combined with algorithms intensify political division", "Cognitive dissonance is a rare medical condition found in politicians", "Political polarization is caused entirely by educational deficiencies"], correct: 1, explanation: "The passage focuses on how cognitive dissonance and algorithms together deepen polarization." }
      ]
    },
    {
      id: 4,
      title: "Neuroplasticity and Cognitive Reserve",
      text: "For decades, neuroscientific orthodoxy maintained that the structural architecture of the adult human brain was largely fixed after early developmental stages. Modern neuroimaging and longitudinal studies have thoroughly dismantled this dogma, establishing the principle of neuroplasticity, the brain's intrinsic capacity to structurally reorganize itself in response to environmental stimuli, cognitive training, and neurological injury. Neuroplastic adaptations occur through synaptic pruning, neurogenesis, and functional remapping. Crucially, engaging in lifelong intellectually demanding endeavors builds 'cognitive reserve,' a compensatory buffer that enables individuals to sustain normal neurocognitive functioning despite significant physical neuropathology, such as the accumulation of amyloid plaques associated with Alzheimer's disease.",
      questions: [
        { text: "What former neuroscientific belief was disproved by modern studies?", options: ["That the brain uses electrical signals for communication", "That the adult brain's structural architecture remains fixed after childhood", "That Alzheimer's disease affects cognitive functions", "That memory storage requires synaptic connections"], correct: 1, explanation: "Text: '...maintained that the structural architecture of the adult human brain was largely fixed...Modern...studies have thoroughly dismantled this dogma...'" },
        { text: "What is 'neuroplasticity' as defined in the text?", options: ["The artificial replacement of damaged brain tissue with synthetic materials", "The brain's capacity to structurally reorganize itself in response to experience", "The gradual decrease of brain weight during adulthood", "The inability of neurons to recover from physical trauma"], correct: 1, explanation: "Text: '...the brain's intrinsic capacity to structurally reorganize itself...'" },
        { text: "Which mechanism is explicitly listed as a component of neuroplastic adaptation?", options: ["Synaptic pruning", "Cellular calcification", "Vascular constriction", "Spinal alignment"], correct: 0, explanation: "Text: 'Neuroplastic adaptations occur through synaptic pruning...'" },
        { text: "How does 'cognitive reserve' benefit an individual?", options: ["It completely prevents the physical onset of brain diseases", "It acts as a buffer allowing normal mental functioning despite physical brain pathology", "It eliminates the need for sleep in adults", "It increases physical muscle strength in old age"], correct: 1, explanation: "Text: '...a compensatory buffer that enables individuals to sustain normal neurocognitive functioning despite significant physical neuropathology...'" },
        { text: "What activity contributes to building cognitive reserve?", options: ["Avoiding complex mental challenges", "Engaging in lifelong intellectually demanding endeavors", "Relying solely on automated memory tools", "Taking long periods of physical inactivity"], correct: 1, explanation: "Text: '...engaging in lifelong intellectually demanding endeavors builds cognitive reserve...'" },
        { text: "The word 'dismantled' in the passage closest means:", options: ["Confirmed and validated", "Refuted and torn down", "Published and distributed", "Ignored and overlooked"], correct: 1, explanation: "Dismantled means taken apart or refuted; shown to be false." }
      ]
    }
  ]
};