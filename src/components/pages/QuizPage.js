// src/components/pages/QuizPage.js
import React, { useState } from 'react';
import Footer from '../layout/Footer';
import QuizComponent from '../common/QuizComponent';
import { quizTopics, levels } from '../../data/quizQuestions';

const QuizPage = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);

  const getQuestions = (topicName, levelId) => {
    const allQuizzes = {
      'English Tenses': {
        A1: [
          { text: "I ___ to school every day.", options: ["go", "goes", "going", "went"], correct: 0, explanation: "I/You/We/They ilə 'go' istifadə olunur." },
          { text: "She ___ very well.", options: ["sing", "sings", "singing", "sang"], correct: 1, explanation: "He/She/It üçün feilə -s əlavə edilir." },
          { text: "They ___ playing football now.", options: ["is", "am", "are", "be"], correct: 2, explanation: "They ilə 'are' istifadə olunur." },
          { text: "He ___ to work every morning.", options: ["drive", "drives", "driving", "drove"], correct: 1, explanation: "He ilə feilə -s əlavə olunur." },
          { text: "We ___ breakfast at 8 AM.", options: ["have", "has", "having", "had"], correct: 0, explanation: "We ilə 'have' istifadə olunur." },
          { text: "The sun ___ in the east.", options: ["rise", "rises", "rising", "rose"], correct: 1, explanation: "Ümumi həqiqətlər Present Simple-də olur." },
          { text: "My sister ___ in a hospital.", options: ["work", "works", "working", "worked"], correct: 1, explanation: "My sister = She, buna görə -s əlavə olunur." },
          { text: "___ you like coffee?", options: ["Do", "Does", "Is", "Are"], correct: 0, explanation: "You ilə 'do' istifadə olunur." },
          { text: "He ___ television every evening.", options: ["watch", "watches", "watching", "watched"], correct: 1, explanation: "He ilə feilə -es əlavə olunur." },
          { text: "They ___ to the cinema on Fridays.", options: ["go", "goes", "going", "went"], correct: 0, explanation: "They ilə 'go' istifadə olunur." },
          { text: "She ___ English very well.", options: ["speak", "speaks", "speaking", "spoke"], correct: 1, explanation: "She ilə feilə -s əlavə olunur." },
          { text: "My parents ___ in Istanbul.", options: ["live", "lives", "living", "lived"], correct: 0, explanation: "My parents = They, buna görə 'live' işlədilir." },
          { text: "___ he play tennis?", options: ["Do", "Does", "Is", "Are"], correct: 1, explanation: "He ilə 'does' istifadə olunur." },
          { text: "The Earth ___ around the Sun.", options: ["move", "moves", "moving", "moved"], correct: 1, explanation: "Ümumi həqiqətlər Present Simple-də olur." },
          { text: "We ___ happy.", options: ["is", "am", "are", "be"], correct: 2, explanation: "We ilə 'are' istifadə olunur." }
        ],
        A2: [
          { text: "I ___ dinner when you called.", options: ["have", "was having", "had", "were having"], correct: 1, explanation: "Keçmişdə davam edən hərəkət üçün Past Continuous." },
          { text: "She ___ to Paris last summer.", options: ["go", "goes", "went", "gone"], correct: 2, explanation: "Last summer keçmiş zamandır, Past Simple." },
          { text: "They ___ the project by tomorrow.", options: ["finish", "finished", "will finish", "have finished"], correct: 2, explanation: "By tomorrow gələcək zamandır, Future Simple." },
          { text: "How long ___ you been waiting?", options: ["have", "has", "had", "will"], correct: 0, explanation: "You ilə 'have been' istifadə olunur." },
          { text: "She ___ her homework already.", options: ["do", "did", "has done", "will do"], correct: 2, explanation: "Already ilə Present Perfect işlədilir." },
          { text: "I ___ never seen such a beautiful place.", options: ["have", "has", "had", "will"], correct: 0, explanation: "I ilə 'have' istifadə olunur." },
          { text: "When I arrived, they ___ dinner.", options: ["have", "had", "were having", "are having"], correct: 2, explanation: "Keçmişdə iki hərəkət - biri davam edir." },
          { text: "She ___ be a doctor when she grows up.", options: ["want", "wants", "want to", "wants to"], correct: 3, explanation: "Want to + feil - arzu etmək." },
          { text: "They ___ playing football at 5 PM yesterday.", options: ["are", "were", "was", "is"], correct: 1, explanation: "They ilə 'were' istifadə olunur." },
          { text: "I think it ___ rain tomorrow.", options: ["is", "will", "was", "has"], correct: 1, explanation: "Təxmin bildirərkən 'will' istifadə olunur." },
          { text: "She ___ a letter when I saw her.", options: ["write", "wrote", "was writing", "is writing"], correct: 2, explanation: "Keçmişdə davam edən hərəkət - Past Continuous." },
          { text: "We ___ to the museum last week.", options: ["go", "went", "gone", "going"], correct: 1, explanation: "Last week keçmiş zamandır." },
          { text: "He ___ in London since 2015.", options: ["live", "lives", "has lived", "is living"], correct: 2, explanation: "Since ilə Present Perfect işlədilir." },
          { text: "They ___ a new car next month.", options: ["buy", "bought", "will buy", "have bought"], correct: 2, explanation: "Next month gələcək zamandır." },
          { text: "I ___ my key. I can't find it anywhere.", options: ["lose", "lost", "have lost", "am losing"], correct: 2, explanation: "Hazırda təsiri hiss olunan keçmiş hərəkət." }
        ],
        B1: [
          { text: "By the time we arrived, the movie ___ already started.", options: ["has", "had", "have", "was"], correct: 1, explanation: "Keçmişdə digər hərəkətdən əvvəl baş verən hərəkət üçün Past Perfect." },
          { text: "I ___ to call you, but I forgot.", options: ["going", "was going", "went", "have gone"], correct: 1, explanation: "Planlaşdırılmış, amma baş verməmiş keçmiş hərəkət." },
          { text: "She ___ English for five years before she moved to London.", options: ["learned", "has learned", "had learned", "was learning"], correct: 2, explanation: "Keçmişdə müəyyən müddət davam edən və sonra bitən hərəkət." },
          { text: "By next year, I ___ here for a decade.", options: ["work", "will work", "will have worked", "have worked"], correct: 2, explanation: "Gələcəkdə müəyyən vaxta kimi davam edəcək hərəkət - Future Perfect." },
          { text: "She ___ asleep while she was reading.", options: ["fall", "fell", "has fallen", "was falling"], correct: 1, explanation: "Birdən baş verən keçmiş hərəkət - Past Simple." },
          { text: "I ___ to the party if I had known about it.", options: ["would go", "would have gone", "went", "have gone"], correct: 1, explanation: "Keçmişdə dəyişməyən şərt - Third Conditional." },
          { text: "She ___ be a famous singer one day.", options: ["may", "must", "can", "will"], correct: 0, explanation: "Ehtimal bildirərkən 'may' istifadə olunur." },
          { text: "You ___ have told me about the meeting earlier.", options: ["should", "would", "could", "might"], correct: 0, explanation: "Məsləhət və peşmançılıq bildirərkən 'should have' işlədilir." },
          { text: "They ___ to the concert when I saw them.", options: ["go", "were going", "went", "have gone"], correct: 1, explanation: "Keçmişdə bir istiqamətə gedən hərəkət - Past Continuous." },
          { text: "By 2025, scientists ___ a cure for the disease.", options: ["find", "will find", "will have found", "have found"], correct: 2, explanation: "Gələcəkdə müəyyən vaxta kimi bitəcək iş." },
          { text: "I wish I ___ more time to travel.", options: ["have", "had", "will have", "have had"], correct: 1, explanation: "Arzu bildirərkən 'wish' + Past Simple işlədilir." },
          { text: "She ___ her homework before she went out.", options: ["finish", "finished", "had finished", "was finishing"], correct: 2, explanation: "Keçmişdə əvvəl baş verən hərəkət - Past Perfect." },
          { text: "They ___ for three hours when the storm started.", options: ["drive", "drove", "had been driving", "were driving"], correct: 2, explanation: "Keçmişdə müddətli davam edən hərəkət - Past Perfect Continuous." },
          { text: "I ___ to London five times so far.", options: ["go", "went", "have been", "had been"], correct: 2, explanation: "Həyat təcrübəsi - Present Perfect." },
          { text: "He ___ his leg while he was playing football.", options: ["break", "broke", "has broken", "was breaking"], correct: 1, explanation: "Birdən baş verən keçmiş hərəkət - Past Simple." }
        ],
        B2: [
          { text: "Had I known about the traffic, I ___ a different route.", options: ["would take", "would have taken", "took", "have taken"], correct: 1, explanation: "Inversion ilə Third Conditional." },
          { text: "She ___ a wonderful speech when the lights went out.", options: ["gave", "was giving", "had given", "has given"], correct: 1, explanation: "Davam edən hərəkət zamanı kəsildi - Past Continuous." },
          { text: "By the end of this year, I ___ this book.", options: ["finish", "will finish", "will have finished", "have finished"], correct: 2, explanation: "Gələcəkdə müəyyən vaxta kimi bitəcək iş." },
          { text: "Never ___ I seen such a beautiful sunset.", options: ["have", "has", "had", "did"], correct: 0, explanation: "Inversion ilə təkid: Never have I seen = I have never seen." },
          { text: "She ___ in New York for ten years by the time she retires.", options: ["lives", "will live", "will have lived", "has lived"], correct: 2, explanation: "Gələcəkdə müəyyən müddət - Future Perfect." },
          { text: "I ___ to call you, but I got caught up in a meeting.", options: ["mean", "meant", "have meant", "was meaning"], correct: 1, explanation: "Planlaşdırılmış, amma baş verməmiş keçmiş hərəkət." },
          { text: "She ___ a lot of progress since she started the course.", options: ["make", "made", "has made", "had made"], correct: 2, explanation: "Keçmişdə başlayıb indiyə kimi davam edən nəticə." },
          { text: "By the time we get there, they ___ the meeting.", options: ["start", "will start", "will have started", "have started"], correct: 2, explanation: "Gələcəkdə bir hərəkət digərindən əvvəl baş verəcək." },
          { text: "I ___ a strange noise when I was walking home.", options: ["hear", "heard", "have heard", "was hearing"], correct: 1, explanation: "Birdən baş verən keçmiş hərəkət." },
          { text: "She ___ TV for two hours before she started studying.", options: ["watches", "watched", "had been watching", "was watching"], correct: 2, explanation: "Keçmişdə müddətli davam edən hərəkət." },
          { text: "Had we left earlier, we ___ the train.", options: ["catch", "would catch", "would have caught", "caught"], correct: 2, explanation: "Inversion ilə Third Conditional." },
          { text: "I'm tired because I ___ all day.", options: ["work", "worked", "have been working", "had worked"], correct: 2, explanation: "İndiyə kimi davam edən və nəticəsi hiss olunan hərəkət." },
          { text: "She ___ a famous writer by the time she turns 30.", options: ["becomes", "will become", "will have become", "has become"], correct: 2, explanation: "Gələcəkdə müəyyən vaxta kimi nailiyyət." },
          { text: "I ___ my mind about quitting my job.", options: ["change", "changed", "have changed", "had changed"], correct: 2, explanation: "İndiki zamanda təsiri olan keçmiş qərar." },
          { text: "She ___ to the gym regularly for months now.", options: ["goes", "went", "has been going", "had gone"], correct: 2, explanation: "Keçmişdə başlayıb indiyə kimi davam edən hərəkət." }
        ],
        C1: [
          { text: "Were she more experienced, she ___ the job.", options: ["would get", "will get", "gets", "got"], correct: 0, explanation: "Inversion ilə Second Conditional." },
          { text: "Never before ___ such a compelling argument.", options: ["have I heard", "I have heard", "did I hear", "I heard"], correct: 0, explanation: "Never before ilə inversion." },
          { text: "She ___ a book for three hours before her friend arrived.", options: ["read", "had read", "had been reading", "was reading"], correct: 2, explanation: "Keçmişdə müddətli davam edən və sonra kəsilən hərəkət." },
          { text: "Not only ___ she talented, but she is also hardworking.", options: ["is", "was", "has", "does"], correct: 0, explanation: "Not only ilə inversion." },
          { text: "I'd rather you ___ smoking.", options: ["stop", "stopped", "have stopped", "will stop"], correct: 1, explanation: "I'd rather + Past Simple - başqasının hərəkəti üçün arzu." },
          { text: "She acts as if she ___ everything.", options: ["know", "knows", "knew", "has known"], correct: 2, explanation: "As if ilə unreal situation - Past Simple." },
          { text: "Had it not been for his help, I ___ failed.", options: ["would", "would have", "will have", "have"], correct: 1, explanation: "Inversion ilə Third Conditional - mənfi forma." },
          { text: "It's high time we ___ a decision.", options: ["make", "made", "have made", "will make"], correct: 1, explanation: "It's high time + Past Simple - indi vaxtıdır." },
          { text: "Little ___ they know about the surprise.", options: ["do", "does", "did", "have"], correct: 0, explanation: "Little ilə inversion - heç bilmirlər." },
          { text: "I ___ to call you, but I've been extremely busy.", options: ["mean", "meant", "have meant", "had meant"], correct: 1, explanation: "Keçmişdə planlaşdırılmış, amma baş verməmiş hərəkət." },
          { text: "She would rather ___ alone than go with them.", options: ["to stay", "staying", "stay", "stayed"], correct: 2, explanation: "Would rather + V1 - özünün üstünlüyü." },
          { text: "No sooner ___ I arrived than the phone rang.", options: ["have", "had", "did", "was"], correct: 1, explanation: "No sooner ilə inversion - gələn kimi." },
          { text: "I wish I ___ to take that job offer.", options: ["agree", "agreed", "have agreed", "had agreed"], correct: 3, explanation: "Keçmişdə dəyişməyən hadisə üçün peşmançılıq." },
          { text: "She talked about him as if she ___ him for years.", options: ["knows", "knew", "has known", "had known"], correct: 3, explanation: "Keçmişdəki unreal situation üçün Past Perfect." },
          { text: "Only after the exam ___ I realize my mistake.", options: ["do", "did", "have", "had"], correct: 1, explanation: "Only after ilə inversion - yalnız sonra anladım." }
        ]
      },
      'Grammar Rules': {
        A1: [
          { text: "___ apple a day keeps the doctor away.", options: ["A", "An", "The", "None"], correct: 1, explanation: "Apple sait səsi ilə başladığı üçün an işlədilir." },
          { text: "She is ___ engineer.", options: ["a", "an", "the", "none"], correct: 1, explanation: "Engineer sait səsi ilə başlayır." },
          { text: "This is ___ interesting book.", options: ["a", "an", "the", "none"], correct: 1, explanation: "Interesting sait səsi ilə başlayır." },
          { text: "He is ___ best student in class.", options: ["a", "an", "the", "none"], correct: 2, explanation: "Ən üstün dərəcədə the işlədilir." },
          { text: "___ sun rises in the east.", options: ["A", "An", "The", "None"], correct: 2, explanation: "Unikal şeylərdə the işlədilir." },
          { text: "I have ___ umbrella in my bag.", options: ["a", "an", "the", "none"], correct: 1, explanation: "Umbrella sait səsi ilə başlayır." },
          { text: "She is ___ honest person.", options: ["a", "an", "the", "none"], correct: 1, explanation: "Honest-də h səslənmir, sait səsi ilə başlayır." },
          { text: "___ Earth is our home.", options: ["A", "An", "The", "None"], correct: 2, explanation: "Unikal planet adında the işlədilir." },
          { text: "I want ___ cup of coffee.", options: ["a", "an", "the", "none"], correct: 0, explanation: "Cup samit səsi ilə başlayır." },
          { text: "He is ___ university student.", options: ["a", "an", "the", "none"], correct: 0, explanation: "University ju səsi ilə başlayır samit kimi." },
          { text: "___ moon is shining tonight.", options: ["A", "An", "The", "None"], correct: 2, explanation: "Unikal səma cisimlərində the işlədilir." },
          { text: "She is ___ best singer.", options: ["a", "an", "the", "none"], correct: 2, explanation: "Superlative degree ilə the işlədilir." },
          { text: "I saw ___ eagle in the sky.", options: ["a", "an", "the", "none"], correct: 1, explanation: "Eagle sait səsi ilə başlayır." },
          { text: "___ Amazon is a long river.", options: ["A", "An", "The", "None"], correct: 2, explanation: "Çay adlarında the işlədilir." },
          { text: "She is ___ doctor.", options: ["a", "an", "the", "none"], correct: 0, explanation: "Peşə adlarından əvvəl a işlədilir." }
        ],
        A2: [
          { text: "She ___ to school yesterday.", options: ["go", "goes", "went", "gone"], correct: 2, explanation: "Yesterday keçmiş zamandır, went işlədilir." },
          { text: "They ___ playing football now.", options: ["is", "am", "are", "be"], correct: 2, explanation: "They ilə are istifadə olunur." },
          { text: "I ___ TV when you called.", options: ["watch", "watched", "was watching", "have watched"], correct: 2, explanation: "Davam edən keçmiş hərəkət - Past Continuous." },
          { text: "She ___ already eaten lunch.", options: ["have", "has", "is", "are"], correct: 1, explanation: "Already ilə Present Perfect, she ilə has." },
          { text: "We ___ to Paris last summer.", options: ["go", "went", "gone", "going"], correct: 1, explanation: "Last summer keçmiş zamandır." },
          { text: "He ___ never been to London.", options: ["have", "has", "is", "are"], correct: 1, explanation: "Never ilə Present Perfect." },
          { text: "They ___ dinner when I arrived.", options: ["have", "had", "were having", "are having"], correct: 2, explanation: "Davam edən keçmiş hərəkət." },
          { text: "She ___ be a doctor.", options: ["want", "wants", "want to", "wants to"], correct: 3, explanation: "Want to + feil - arzu etmək." },
          { text: "I think it ___ rain.", options: ["is", "will", "was", "has"], correct: 1, explanation: "Təxmin bildirərkən will." },
          { text: "She ___ a letter when I saw her.", options: ["write", "wrote", "was writing", "is writing"], correct: 2, explanation: "Keçmişdə davam edən hərəkət." },
          { text: "We ___ to the museum last week.", options: ["go", "went", "gone", "going"], correct: 1, explanation: "Last week keçmiş zamandır." },
          { text: "He ___ in London since 2015.", options: ["live", "lives", "has lived", "is living"], correct: 2, explanation: "Since ilə Present Perfect." },
          { text: "They ___ a new car next month.", options: ["buy", "bought", "will buy", "have bought"], correct: 2, explanation: "Next month gələcək zamandır." },
          { text: "I ___ my keys. I can't find them.", options: ["lose", "lost", "have lost", "am losing"], correct: 2, explanation: "Hazırda təsiri hiss olunan keçmiş hərəkət." },
          { text: "She ___ to the party last night.", options: ["go", "goes", "went", "gone"], correct: 2, explanation: "Last night keçmiş zamandır." }
        ],
        B1: [
          { text: "If I ___ you, I would study harder.", options: ["am", "was", "were", "is"], correct: 2, explanation: "Second Conditional-də were istifadə olunur." },
          { text: "She suggested that he ___ earlier.", options: ["arrive", "arrives", "arrived", "has arrived"], correct: 0, explanation: "Subjunctive mood-da that he arrive işlədilir." },
          { text: "It's time we ___ home.", options: ["go", "went", "have gone", "going"], correct: 1, explanation: "It's time + Past Simple - indi vaxtıdır." },
          { text: "I'd rather you ___ quiet.", options: ["keep", "kept", "have kept", "keeping"], correct: 1, explanation: "I'd rather + Past Simple - başqasının hərəkəti üçün." },
          { text: "She acts as if she ___ the boss.", options: ["is", "are", "were", "be"], correct: 2, explanation: "As if ilə unreal situation - were işlədilir." },
          { text: "He insisted that she ___ with us.", options: ["come", "comes", "came", "has come"], correct: 0, explanation: "Insist + that + subjunctive - that she come." },
          { text: "It is essential that he ___ there on time.", options: ["is", "are", "be", "were"], correct: 2, explanation: "Essential + that + subjunctive - that he be." },
          { text: "I wish I ___ taller.", options: ["am", "was", "were", "is"], correct: 2, explanation: "Wish ilə unreal situation - were işlədilir." },
          { text: "She recommended that he ___ a doctor.", options: ["see", "sees", "saw", "has seen"], correct: 0, explanation: "Recommend + that + subjunctive - that he see." },
          { text: "If only I ___ more time.", options: ["have", "has", "had", "have had"], correct: 2, explanation: "If only + Past Simple - arzu." },
          { text: "It's high time we ___ something.", options: ["do", "did", "have done", "doing"], correct: 1, explanation: "It's high time + Past Simple." },
          { text: "She demanded that he ___ immediately.", options: ["leave", "leaves", "left", "has left"], correct: 0, explanation: "Demand + that + subjunctive - that he leave." },
          { text: "I'd sooner you ___ alone.", options: ["go", "went", "have gone", "going"], correct: 1, explanation: "I'd sooner + Past Simple - üstünlük." },
          { text: "He proposed that they ___ the meeting.", options: ["postpone", "postpones", "postponed", "have postponed"], correct: 0, explanation: "Propose + that + subjunctive - that they postpone." },
          { text: "It is important that she ___ the truth.", options: ["tell", "tells", "told", "has told"], correct: 0, explanation: "Important + that + subjunctive - that she tell." }
        ],
        B2: [
          { text: "Had I known, I ___ differently.", options: ["would act", "would have acted", "acted", "have acted"], correct: 1, explanation: "Inversion ilə Third Conditional." },
          { text: "Not only ___ he late, but he also forgot the documents.", options: ["was", "is", "were", "has"], correct: 0, explanation: "Not only ilə inversion." },
          { text: "Under no circumstances ___ you leave the room.", options: ["should", "shall", "will", "would"], correct: 0, explanation: "Under no circumstances ilə inversion." },
          { text: "Rarely ___ I seen such talent.", options: ["have", "has", "had", "did"], correct: 0, explanation: "Rarely ilə inversion - nadir hallarda." },
          { text: "Only then ___ I understand the problem.", options: ["did", "do", "have", "had"], correct: 0, explanation: "Only then ilə inversion - yalnız o zaman." },
          { text: "No sooner ___ he arrived than he left.", options: ["have", "had", "did", "was"], correct: 1, explanation: "No sooner ilə inversion - gələn kimi." },
          { text: "Little ___ they know what awaits them.", options: ["do", "does", "did", "have"], correct: 0, explanation: "Little ilə inversion - heç bilmirlər." },
          { text: "Seldom ___ we have such weather.", options: ["do", "does", "did", "have"], correct: 0, explanation: "Seldom ilə inversion - nadir hallarda." },
          { text: "Nowhere ___ I find peace like in nature.", options: ["can", "could", "will", "would"], correct: 0, explanation: "Nowhere ilə inversion - heç yerdə." },
          { text: "In no way ___ this be considered acceptable.", options: ["should", "shall", "will", "would"], correct: 0, explanation: "In no way ilə inversion - heç bir şəkildə." },
          { text: "Only by working hard ___ you succeed.", options: ["will", "would", "can", "could"], correct: 0, explanation: "Only by ilə inversion - yalnız bununla." },
          { text: "So beautiful ___ the view that I couldn't look away.", options: ["was", "is", "were", "has"], correct: 0, explanation: "So + adjective ilə inversion." },
          { text: "Such ___ his anger that no one spoke.", options: ["was", "is", "were", "has"], correct: 0, explanation: "Such ilə inversion - elə idi ki." },
          { text: "Never ___ I met such a kind person.", options: ["have", "has", "had", "did"], correct: 0, explanation: "Never ilə inversion - heç vaxt." },
          { text: "Only when it ended ___ I realize the truth.", options: ["did", "do", "have", "had"], correct: 0, explanation: "Only when ilə inversion - yalnız o zaman." }
        ],
        C1: [
          { text: "Were it not for your help, I ___ failed.", options: ["would have", "would", "will have", "have"], correct: 0, explanation: "Inversion ilə Third Conditional - mənfi forma." },
          { text: "Had it not been for the rain, we ___ the game.", options: ["would win", "would have won", "won", "have won"], correct: 1, explanation: "Inversion ilə Third Conditional." },
          { text: "So quickly ___ he run that no one could catch him.", options: ["did", "do", "has", "had"], correct: 0, explanation: "So + adverb ilə inversion." },
          { text: "Such was his influence ___ he changed the law.", options: ["that", "so", "as", "like"], correct: 0, explanation: "Such... that strukturunda inversion." },
          { text: "No matter how hard ___ tried, he couldn't succeed.", options: ["he", "did he", "has he", "had he"], correct: 1, explanation: "No matter how ilə inversion." },
          { text: "Be it rain or shine, we ___ go.", options: ["will", "would", "shall", "must"], correct: 0, explanation: "Be it... ilə inversion - yağsa da, yağmasa da." },
          { text: "Come what ___, I will stand by you.", options: ["may", "might", "will", "would"], correct: 0, explanation: "Come what may - nə olursa olsun." },
          { text: "Should you need anything, please ___ me know.", options: ["let", "letting", "lets", "to let"], correct: 0, explanation: "Should ilə inversion - əgər lazım olsa." },
          { text: "Had I the money, I ___ buy a house.", options: ["would", "will", "can", "could"], correct: 0, explanation: "Inversion ilə Second Conditional." },
          { text: "Were they to arrive early, we ___ start immediately.", options: ["would", "will", "can", "could"], correct: 0, explanation: "Were they to + inversion - əgər gəlsələr." },
          { text: "Long ___ he live and prosper!", options: ["may", "might", "will", "would"], correct: 0, explanation: "Long may he live - yaşasın." },
          { text: "So sudden ___ the attack that we had no time to react.", options: ["was", "is", "were", "has"], correct: 0, explanation: "So + adjective ilə inversion." },
          { text: "Never in my life ___ I witnessed such a scene.", options: ["have", "has", "had", "did"], correct: 0, explanation: "Never ilə inversion." },
          { text: "Only rarely ___ we see such dedication.", options: ["do", "does", "did", "have"], correct: 0, explanation: "Only rarely ilə inversion." },
          { text: "Had we but world enough and time...", options: ["this", "that", "these", "those"], correct: 0, explanation: "Had we but - kaş ki." }
        ]
      },
      'Vocabulary': {
        A1: [
          { text: "Big means ___", options: ["small", "large", "thin", "short"], correct: 1, explanation: "Big = large - böyük mənasında." },
          { text: "Fast means ___", options: ["quick", "slow", "late", "early"], correct: 0, explanation: "Fast = quick - sürətli." },
          { text: "Happy means ___", options: ["sad", "angry", "joyful", "tired"], correct: 2, explanation: "Happy = joyful - xoşbəxt." },
          { text: "Begin means ___", options: ["end", "start", "close", "finish"], correct: 1, explanation: "Begin = start - başlamaq." },
          { text: "Cold is opposite of ___", options: ["hot", "cool", "warm", "chilly"], correct: 0, explanation: "Cold-un əksi hot - isti." },
          { text: "Rich means ___", options: ["poor", "wealthy", "cheap", "needy"], correct: 1, explanation: "Rich = wealthy - varlı." },
          { text: "Easy means ___", options: ["hard", "simple", "heavy", "difficult"], correct: 1, explanation: "Easy = simple - asan." },
          { text: "Dangerous means ___", options: ["safe", "risky", "easy", "calm"], correct: 1, explanation: "Dangerous = risky - təhlükəli." },
          { text: "Buy means ___", options: ["sell", "purchase", "give", "take"], correct: 1, explanation: "Buy = purchase - almaq." },
          { text: "Old means ___", options: ["young", "ancient", "new", "modern"], correct: 1, explanation: "Old = ancient - köhnə." },
          { text: "Strong means ___", options: ["weak", "powerful", "soft", "gentle"], correct: 1, explanation: "Strong = powerful - güclü." },
          { text: "Clean means ___", options: ["dirty", "clear", "messy", "dusty"], correct: 1, explanation: "Clean = clear - təmiz." },
          { text: "Early means ___", options: ["late", "soon", "fast", "quick"], correct: 1, explanation: "Early = soon - tez." },
          { text: "Noisy means ___", options: ["quiet", "loud", "soft", "silent"], correct: 1, explanation: "Noisy = loud - səsli." },
          { text: "Correct means ___", options: ["wrong", "right", "false", "incorrect"], correct: 1, explanation: "Correct = right - düzgün." }
        ],
        A2: [
          { text: "Travel means ___", options: ["stay", "journey", "rest", "sleep"], correct: 1, explanation: "Travel = journey - səyahət etmək." },
          { text: "Friend means ___", options: ["enemy", "companion", "stranger", "foe"], correct: 1, explanation: "Friend = companion - dost." },
          { text: "Hotel is a place to ___", options: ["eat", "sleep", "work", "study"], correct: 1, explanation: "Hotel - yuxu yeri." },
          { text: "Airport is for ___", options: ["trains", "planes", "buses", "ships"], correct: 1, explanation: "Airport - təyyarə üçün." },
          { text: "Teacher is a person who ___", options: ["learns", "teaches", "studies", "reads"], correct: 1, explanation: "Teacher - müəllim." },
          { text: "Library is a place with ___", options: ["food", "books", "clothes", "cars"], correct: 1, explanation: "Library - kitabxana." },
          { text: "Restaurant is for ___", options: ["sleeping", "eating", "studying", "working"], correct: 1, explanation: "Restaurant - yemək üçün." },
          { text: "Hospital is for ___ people", options: ["healthy", "sick", "happy", "rich"], correct: 1, explanation: "Hospital - xəstəxana." },
          { text: "Museum has ___", options: ["art", "food", "cars", "clothes"], correct: 0, explanation: "Museum - muzey." },
          { text: "Zoo has ___", options: ["plants", "animals", "books", "cars"], correct: 1, explanation: "Zoo - heyvanat bağı." },
          { text: "Beach is near the ___", options: ["mountains", "sea", "forest", "desert"], correct: 1, explanation: "Beach - çimərlik." },
          { text: "Stadium is for ___", options: ["sports", "movies", "music", "art"], correct: 0, explanation: "Stadium - stadion." },
          { text: "Mosque is a place of ___", options: ["prayer", "eating", "sleeping", "working"], correct: 0, explanation: "Mosque - məscid." },
          { text: "Radio is for ___", options: ["listening", "watching", "reading", "writing"], correct: 0, explanation: "Radio - radio." },
          { text: "Newspaper is for ___", options: ["reading", "listening", "watching", "writing"], correct: 0, explanation: "Newspaper - qəzet." }
        ],
        B1: [
          { text: "Environment means ___", options: ["nature", "building", "city", "house"], correct: 0, explanation: "Environment - ətraf mühit." },
          { text: "Culture means ___", options: ["customs", "buildings", "food", "clothes"], correct: 0, explanation: "Culture - mədəniyyət." },
          { text: "Education means ___", options: ["learning", "working", "sleeping", "eating"], correct: 0, explanation: "Education - təhsil." },
          { text: "Communication means ___", options: ["talking", "sleeping", "eating", "walking"], correct: 0, explanation: "Communication - ünsiyyət." },
          { text: "Technology means ___", options: ["machines", "books", "food", "clothes"], correct: 0, explanation: "Technology - texnologiya." },
          { text: "Leadership means ___", options: ["leading", "following", "sleeping", "eating"], correct: 0, explanation: "Leadership - rəhbərlik." },
          { text: "Management means ___", options: ["control", "chaos", "confusion", "disorder"], correct: 0, explanation: "Management - idarəetmə." },
          { text: "Innovation means ___", options: ["newness", "oldness", "sameness", "similarity"], correct: 0, explanation: "Innovation - innovasiya." },
          { text: "Strategy means ___", options: ["plan", "random", "chaos", "confusion"], correct: 0, explanation: "Strategy - strategiya." },
          { text: "Development means ___", options: ["growth", "decline", "decrease", "reduction"], correct: 0, explanation: "Development - inkişaf." },
          { text: "Skill means ___", options: ["ability", "disability", "weakness", "inability"], correct: 0, explanation: "Skill - bacarıq." },
          { text: "Finance means ___", options: ["money", "health", "happiness", "sadness"], correct: 0, explanation: "Finance - maliyyə." },
          { text: "Project means ___", options: ["plan", "chaos", "confusion", "disorder"], correct: 0, explanation: "Project - layihə." },
          { text: "Support means ___", options: ["help", "hinder", "block", "stop"], correct: 0, explanation: "Support - dəstək." },
          { text: "Progress means ___", options: ["advancement", "decline", "decrease", "reduction"], correct: 0, explanation: "Progress - irəliləyiş." }
        ],
        B2: [
          { text: "Negotiate means ___", options: ["discuss", "ignore", "avoid", "refuse"], correct: 0, explanation: "Negotiate - danışıq aparmaq." },
          { text: "Evaluate means ___", options: ["assess", "ignore", "avoid", "refuse"], correct: 0, explanation: "Evaluate - qiymətləndirmək." },
          { text: "Collaborate means ___", options: ["work together", "work alone", "fight", "argue"], correct: 0, explanation: "Collaborate - əməkdaşlıq etmək." },
          { text: "Implement means ___", options: ["execute", "cancel", "stop", "pause"], correct: 0, explanation: "Implement - həyata keçirmək." },
          { text: "Optimize means ___", options: ["improve", "worsen", "destroy", "break"], correct: 0, explanation: "Optimize - optimallaşdırmaq." },
          { text: "Analyze means ___", options: ["examine", "ignore", "avoid", "refuse"], correct: 0, explanation: "Analyze - analiz etmək." },
          { text: "Coordinate means ___", options: ["organize", "confuse", "destroy", "break"], correct: 0, explanation: "Coordinate - koordinasiya etmək." },
          { text: "Delegate means ___", options: ["assign", "keep", "hold", "retain"], correct: 0, explanation: "Delegate - vəzifə vermək." },
          { text: "Facilitate means ___", options: ["make easier", "make harder", "stop", "block"], correct: 0, explanation: "Facilitate - asanlaşdırmaq." },
          { text: "Innovate means ___", options: ["create new", "copy", "imitate", "repeat"], correct: 0, explanation: "Innovate - innovasiya etmək." },
          { text: "Motivate means ___", options: ["inspire", "discourage", "stop", "block"], correct: 0, explanation: "Motivate - motivasiya etmək." },
          { text: "Prioritize means ___", options: ["rank", "ignore", "avoid", "refuse"], correct: 0, explanation: "Prioritize - prioritet təyin etmək." },
          { text: "Articulate means ___", options: ["express clearly", "mumble", "whisper", "shout"], correct: 0, explanation: "Articulate - aydın ifadə etmək." },
          { text: "Comprehend means ___", options: ["understand", "ignore", "avoid", "refuse"], correct: 0, explanation: "Comprehend - anlamaq." },
          { text: "Convey means ___", options: ["communicate", "hide", "conceal", "cover"], correct: 0, explanation: "Convey - çatdırmaq." }
        ],
        C1: [
          { text: "Ubiquitous means ___", options: ["everywhere", "nowhere", "rare", "scarce"], correct: 0, explanation: "Ubiquitous - hər yerdə olan." },
          { text: "Meticulous means ___", options: ["careful", "careless", "sloppy", "messy"], correct: 0, explanation: "Meticulous - çox diqqətli." },
          { text: "Exacerbate means ___", options: ["worsen", "improve", "help", "fix"], correct: 0, explanation: "Exacerbate - pisləşdirmək." },
          { text: "Ephemeral means ___", options: ["temporary", "permanent", "eternal", "forever"], correct: 0, explanation: "Ephemeral - müvəqqəti." },
          { text: "Gregarious means ___", options: ["social", "lonely", "alone", "isolated"], correct: 0, explanation: "Gregarious - ünsiyyətcil." },
          { text: "Ineffable means ___", options: ["indescribable", "simple", "easy", "clear"], correct: 0, explanation: "Ineffable - izah olunmaz." },
          { text: "Sagacious means ___", options: ["wise", "foolish", "stupid", "ignorant"], correct: 0, explanation: "Sagacious - müdrik." },
          { text: "Taciturn means ___", options: ["quiet", "talkative", "loud", "noisy"], correct: 0, explanation: "Taciturn - az danışan." },
          { text: "Voracious means ___", options: ["insatiable", "satisfied", "full", "content"], correct: 0, explanation: "Voracious - doymaz." },
          { text: "Magnanimous means ___", options: ["generous", "selfish", "greedy", "mean"], correct: 0, explanation: "Magnanimous - ali mərtəbəli." },
          { text: "Cacophony means ___", options: ["noise", "silence", "quiet", "peace"], correct: 0, explanation: "Cacophony - kakofoniya." },
          { text: "Circumspect means ___", options: ["cautious", "reckless", "careless", "rash"], correct: 0, explanation: "Circumspect - ehtiyatlı." },
          { text: "Insidious means ___", options: ["harmful", "helpful", "kind", "gentle"], correct: 0, explanation: "Insidious - gizli zərərli." },
          { text: "Mellifluous means ___", options: ["sweet sounding", "harsh", "rough", "grating"], correct: 0, explanation: "Mellifluous - xoş səsli." },
          { text: "Serendipitous means ___", options: ["fortunate", "unlucky", "unfortunate", "planned"], correct: 0, explanation: "Serendipitous - təsadüfi xoşbəxtlik." }
        ]
      },
      'Phrasal Verbs': {
        A1: [
          { text: "Get up means ___", options: ["wake up", "sleep", "rest", "lie down"], correct: 0, explanation: "Get up - oyanmaq, durmaq." },
          { text: "Sit down means ___", options: ["take a seat", "stand up", "jump", "run"], correct: 0, explanation: "Sit down - oturmaq." },
          { text: "Stand up means ___", options: ["rise", "sit", "lie", "sleep"], correct: 0, explanation: "Stand up - ayağa qalxmaq." },
          { text: "Put on means ___", options: ["wear", "remove", "take off", "throw"], correct: 0, explanation: "Put on - geyinmək." },
          { text: "Take off means ___", options: ["remove", "wear", "put on", "hold"], correct: 0, explanation: "Take off - çıxarmaq." },
          { text: "Turn on means ___", options: ["start", "stop", "end", "finish"], correct: 0, explanation: "Turn on - işə salmaq." },
          { text: "Turn off means ___", options: ["stop", "start", "begin", "open"], correct: 0, explanation: "Turn off - söndürmək." },
          { text: "Come in means ___", options: ["enter", "exit", "leave", "go out"], correct: 0, explanation: "Come in - daxil olmaq." },
          { text: "Go out means ___", options: ["leave", "enter", "come in", "stay"], correct: 0, explanation: "Go out - çıxmaq." },
          { text: "Wake up means ___", options: ["stop sleeping", "sleep", "rest", "lie"], correct: 0, explanation: "Wake up - oyanmaq." },
          { text: "Look at means ___", options: ["watch", "ignore", "avoid", "miss"], correct: 0, explanation: "Look at - baxmaq." },
          { text: "Listen to means ___", options: ["hear", "ignore", "avoid", "miss"], correct: 0, explanation: "Listen to - dinləmək." },
          { text: "Wait for means ___", options: ["await", "leave", "go", "come"], correct: 0, explanation: "Wait for - gözləmək." },
          { text: "Ask for means ___", options: ["request", "give", "take", "offer"], correct: 0, explanation: "Ask for - xahiş etmək." },
          { text: "Look for means ___", options: ["search", "ignore", "avoid", "miss"], correct: 0, explanation: "Look for - axtarmaq." }
        ],
        A2: [
          { text: "Give up means ___", options: ["quit", "continue", "start", "begin"], correct: 0, explanation: "Give up - təslim olmaq, buraxmaq." },
          { text: "Look after means ___", options: ["take care", "ignore", "avoid", "miss"], correct: 0, explanation: "Look after - qayğı göstərmək." },
          { text: "Run out of means ___", options: ["exhaust", "have", "get", "find"], correct: 0, explanation: "Run out of - tükənmək." },
          { text: "Pick up means ___", options: ["lift", "drop", "fall", "leave"], correct: 0, explanation: "Pick up - götürmək." },
          { text: "Find out means ___", options: ["discover", "hide", "conceal", "cover"], correct: 0, explanation: "Find out - öyrənmək." },
          { text: "Get on means ___", options: ["board", "leave", "exit", "depart"], correct: 0, explanation: "Get on - minmək." },
          { text: "Get off means ___", options: ["alight", "board", "enter", "get on"], correct: 0, explanation: "Get off - düşmək." },
          { text: "Put away means ___", options: ["store", "take out", "use", "wear"], correct: 0, explanation: "Put away - yığışdırmaq." },
          { text: "Throw away means ___", options: ["discard", "keep", "save", "hold"], correct: 0, explanation: "Throw away - atmaq." },
          { text: "Turn around means ___", options: ["rotate", "stop", "start", "go"], correct: 0, explanation: "Turn around - dönmək." },
          { text: "Slow down means ___", options: ["decelerate", "speed up", "accelerate", "race"], correct: 0, explanation: "Slow down - yavaşlamaq." },
          { text: "Speed up means ___", options: ["accelerate", "slow down", "stop", "wait"], correct: 0, explanation: "Speed up - sürətləndirmək." },
          { text: "Calm down means ___", options: ["relax", "agitate", "excite", "anger"], correct: 0, explanation: "Calm down - sakitləşmək." },
          { text: "Show up means ___", options: ["appear", "disappear", "leave", "go"], correct: 0, explanation: "Show up - gəlmək, görünmək." },
          { text: "Work out means ___", options: ["exercise", "rest", "sleep", "eat"], correct: 0, explanation: "Work out - idman etmək." }
        ],
        B1: [
          { text: "Break down means ___", options: ["stop working", "work", "function", "operate"], correct: 0, explanation: "Break down - sıradan çıxmaq." },
          { text: "Carry on means ___", options: ["continue", "stop", "end", "finish"], correct: 0, explanation: "Carry on - davam etmək." },
          { text: "Set up means ___", options: ["establish", "destroy", "break", "ruin"], correct: 0, explanation: "Set up - qurmaq." },
          { text: "Give in means ___", options: ["surrender", "fight", "resist", "oppose"], correct: 0, explanation: "Give in - təslim olmaq." },
          { text: "Come across means ___", options: ["find by chance", "lose", "miss", "ignore"], correct: 0, explanation: "Come across - təsadüfən rast gəlmək." },
          { text: "Get along means ___", options: ["have good relations", "fight", "argue", "disagree"], correct: 0, explanation: "Get along - yaxşı münasibətdə olmaq." },
          { text: "Look forward to means ___", options: ["anticipate", "dread", "fear", "hate"], correct: 0, explanation: "Look forward to - səbirsizliklə gözləmək." },
          { text: "Put off means ___", options: ["postpone", "do now", "complete", "finish"], correct: 0, explanation: "Put off - təxirə salmaq." },
          { text: "Take after means ___", options: ["resemble", "dislike", "hate", "ignore"], correct: 0, explanation: "Take after - oxşamaq." },
          { text: "Turn down means ___", options: ["reject", "accept", "agree", "allow"], correct: 0, explanation: "Turn down - rədd etmək." },
          { text: "Bring up means ___", options: ["raise", "lower", "drop", "fall"], correct: 0, explanation: "Bring up - böyütmək, tərbiyə etmək." },
          { text: "Call off means ___", options: ["cancel", "continue", "start", "begin"], correct: 0, explanation: "Call off - ləğv etmək." },
          { text: "Do without means ___", options: ["manage without", "need", "require", "demand"], correct: 0, explanation: "Do without - əldə olmadan etmək." },
          { text: "Fall through means ___", options: ["fail", "succeed", "complete", "finish"], correct: 0, explanation: "Fall through - baş tutmamaq." },
          { text: "Go through means ___", options: ["experience", "avoid", "ignore", "skip"], correct: 0, explanation: "Go through - yaşamaq, keçmək." }
        ],
        B2: [
          { text: "Account for means ___", options: ["explain", "ignore", "avoid", "miss"], correct: 0, explanation: "Account for - izah etmək." },
          { text: "Bring about means ___", options: ["cause", "prevent", "stop", "block"], correct: 0, explanation: "Bring about - səbəb olmaq." },
          { text: "Come up with means ___", options: ["produce", "lose", "miss", "ignore"], correct: 0, explanation: "Come up with - tapmaq, icad etmək." },
          { text: "Cut down on means ___", options: ["reduce", "increase", "expand", "grow"], correct: 0, explanation: "Cut down on - azaltmaq." },
          { text: "Drop out of means ___", options: ["quit", "join", "enter", "start"], correct: 0, explanation: "Drop out of - yarımçıq buraxmaq." },
          { text: "Get over means ___", options: ["recover from", "fall into", "get into", "fall from"], correct: 0, explanation: "Get over - öhdəsindən gəlmək." },
          { text: "Go over means ___", options: ["review", "ignore", "avoid", "miss"], correct: 0, explanation: "Go over - təkrarlamaq, nəzərdən keçirmək." },
          { text: "Hold on means ___", options: ["wait", "leave", "go", "depart"], correct: 0, explanation: "Hold on - gözləmək." },
          { text: "Keep up with means ___", options: ["stay on track", "fall behind", "slow down", "stop"], correct: 0, explanation: "Keep up with - ayaqlaşmaq." },
          { text: "Live up to means ___", options: ["satisfy", "disappoint", "fail", "miss"], correct: 0, explanation: "Live up to - gözləntiləri qarşılamaq." },
          { text: "Look up to means ___", options: ["admire", "dislike", "hate", "ignore"], correct: 0, explanation: "Look up to - hörmət etmək." },
          { text: "Make up for means ___", options: ["compensate", "ignore", "avoid", "miss"], correct: 0, explanation: "Make up for - əvəzini vermək." },
          { text: "Put up with means ___", options: ["tolerate", "fight", "resist", "oppose"], correct: 0, explanation: "Put up with - dözmək." },
          { text: "Run into means ___", options: ["meet unexpectedly", "avoid", "miss", "ignore"], correct: 0, explanation: "Run into - təsadüfən rast gəlmək." },
          { text: "Stand for means ___", options: ["represent", "oppose", "fight", "resist"], correct: 0, explanation: "Stand for - təmsil etmək." }
        ],
        C1: [
          { text: "Abide by means ___", options: ["follow", "break", "ignore", "avoid"], correct: 0, explanation: "Abide by - riayət etmək." },
          { text: "Balk at means ___", options: ["resist", "accept", "agree", "allow"], correct: 0, explanation: "Balk at - qarşı durmaq." },
          { text: "Conjure up means ___", options: ["imagine", "destroy", "break", "ruin"], correct: 0, explanation: "Conjure up - təsəvvür etmək." },
          { text: "Dispense with means ___", options: ["eliminate", "keep", "hold", "maintain"], correct: 0, explanation: "Dispense with - qurtarmaq." },
          { text: "Enlarge upon means ___", options: ["elaborate", "simplify", "shorten", "abbreviate"], correct: 0, explanation: "Enlarge upon - ətraflı danışmaq." },
          { text: "Frown upon means ___", options: ["disapprove", "approve", "like", "love"], correct: 0, explanation: "Frown upon - təqdir etməmək." },
          { text: "Gear up for means ___", options: ["prepare", "ignore", "avoid", "miss"], correct: 0, explanation: "Gear up for - hazırlaşmaq." },
          { text: "Hinge on means ___", options: ["depend on", "ignore", "avoid", "miss"], correct: 0, explanation: "Hinge on - asılı olmaq." },
          { text: "Insinuate into means ___", options: ["maneuver", "direct", "push", "pull"], correct: 0, explanation: "Insinuate into - gizlicə daxil olmaq." },
          { text: "Jockey for means ___", options: ["compete for", "ignore", "avoid", "miss"], correct: 0, explanation: "Jockey for - yarışmaq." },
          { text: "Latch onto means ___", options: ["attach", "detach", "remove", "take"], correct: 0, explanation: "Latch onto - bağlanmaq." },
          { text: "Mull over means ___", options: ["consider", "ignore", "avoid", "miss"], correct: 0, explanation: "Mull over - düşünmək." },
          { text: "Narrow down means ___", options: ["reduce", "increase", "expand", "grow"], correct: 0, explanation: "Narrow down - daraltmaq." },
          { text: "Pore over means ___", options: ["study carefully", "ignore", "avoid", "skip"], correct: 0, explanation: "Pore over - diqqətlə öyrənmək." },
          { text: "Shrug off means ___", options: ["dismiss", "accept", "agree", "allow"], correct: 0, explanation: "Shrug off - laqeyd qalmaq." }
        ]
      },
      'Conditionals': {
        A1: [
          { text: "If it rains, I ___ home.", options: ["stay", "stayed", "will stay", "would stay"], correct: 2, explanation: "First Conditional - mümkün şərt." },
          { text: "If you heat ice, it ___", options: ["melts", "melted", "will melt", "would melt"], correct: 0, explanation: "Zero Conditional - ümumi həqiqət." },
          { text: "If she studies, she ___ pass.", options: ["will", "would", "could", "might"], correct: 0, explanation: "First Conditional - will pass." },
          { text: "If he comes, we ___ start.", options: ["will", "would", "could", "might"], correct: 0, explanation: "First Conditional - will start." },
          { text: "If you mix red and blue, you ___ purple.", options: ["get", "got", "will get", "would get"], correct: 0, explanation: "Zero Conditional - get." },
          { text: "If she calls, I ___ answer.", options: ["will", "would", "could", "might"], correct: 0, explanation: "First Conditional - will answer." },
          { text: "If you don't hurry, you ___ late.", options: ["will be", "would be", "are", "were"], correct: 0, explanation: "First Conditional - will be." },
          { text: "If I see him, I ___ tell him.", options: ["will", "would", "could", "might"], correct: 0, explanation: "First Conditional - will tell." },
          { text: "If you freeze water, it ___ into ice.", options: ["turns", "turned", "will turn", "would turn"], correct: 0, explanation: "Zero Conditional - turns." },
          { text: "If she needs help, she ___ ask.", options: ["will", "would", "could", "might"], correct: 0, explanation: "First Conditional - will ask." },
          { text: "If they invite us, we ___ go.", options: ["will", "would", "could", "might"], correct: 0, explanation: "First Conditional - will go." },
          { text: "If you boil water, it ___", options: ["evaporates", "evaporated", "will evaporate", "would evaporate"], correct: 0, explanation: "Zero Conditional - evaporates." },
          { text: "If he works hard, he ___ succeed.", options: ["will", "would", "could", "might"], correct: 0, explanation: "First Conditional - will succeed." },
          { text: "If you touch fire, you ___ burned.", options: ["get", "got", "will get", "would get"], correct: 0, explanation: "Zero Conditional - get." },
          { text: "If we leave now, we ___ catch the bus.", options: ["will", "would", "could", "might"], correct: 0, explanation: "First Conditional - will catch." }
        ],
        A2: [
          { text: "If I were rich, I ___ a car.", options: ["buy", "bought", "would buy", "will buy"], correct: 2, explanation: "Second Conditional - qeyri-mümkün indiki vəziyyət." },
          { text: "If I had money, I ___ travel.", options: ["will", "would", "could", "might"], correct: 1, explanation: "Second Conditional - would travel." },
          { text: "If I were you, I ___ go.", options: ["will", "would", "could", "might"], correct: 1, explanation: "Second Conditional - would go." },
          { text: "If she knew the answer, she ___ tell us.", options: ["will", "would", "could", "might"], correct: 1, explanation: "Second Conditional - would tell." },
          { text: "If I had a million dollars, I ___ buy a house.", options: ["will", "would", "could", "might"], correct: 1, explanation: "Second Conditional - would buy." },
          { text: "If he studied harder, he ___ pass the exam.", options: ["will", "would", "could", "might"], correct: 1, explanation: "Second Conditional - would pass." },
          { text: "If we lived in Paris, we ___ speak French.", options: ["will", "would", "could", "might"], correct: 1, explanation: "Second Conditional - would speak." },
          { text: "If she were here, she ___ help us.", options: ["will", "would", "could", "might"], correct: 1, explanation: "Second Conditional - would help." },
          { text: "If I had more time, I ___ exercise more.", options: ["will", "would", "could", "might"], correct: 1, explanation: "Second Conditional - would exercise." },
          { text: "If he spoke English, he ___ get a better job.", options: ["will", "would", "could", "might"], correct: 1, explanation: "Second Conditional - would get." },
          { text: "If she were taller, she ___ be a model.", options: ["will", "would", "could", "might"], correct: 1, explanation: "Second Conditional - would be." },
          { text: "If I knew his number, I ___ call him.", options: ["will", "would", "could", "might"], correct: 1, explanation: "Second Conditional - would call." },
          { text: "If we had a garden, we ___ grow vegetables.", options: ["will", "would", "could", "might"], correct: 1, explanation: "Second Conditional - would grow." },
          { text: "If he were younger, he ___ travel more.", options: ["will", "would", "could", "might"], correct: 1, explanation: "Second Conditional - would travel." },
          { text: "If I were the president, I ___ change many things.", options: ["will", "would", "could", "might"], correct: 1, explanation: "Second Conditional - would change." }
        ],
        B1: [
          { text: "If I had known, I ___ you.", options: ["tell", "told", "would have told", "will tell"], correct: 2, explanation: "Third Conditional - keçmişdə dəyişməyən hadisə." },
          { text: "If she had studied, she ___ passed.", options: ["would have", "will have", "would", "will"], correct: 0, explanation: "Third Conditional - would have passed." },
          { text: "If they had left earlier, they ___ missed the train.", options: ["wouldn't have", "would have", "will have", "won't have"], correct: 0, explanation: "Third Conditional - wouldn't have missed." },
          { text: "If he had apologized, I ___ forgiven him.", options: ["would have", "will have", "would", "will"], correct: 0, explanation: "Third Conditional - would have forgiven." },
          { text: "If we had taken a taxi, we ___ on time.", options: ["would have arrived", "will have arrived", "would arrive", "will arrive"], correct: 0, explanation: "Third Conditional - would have arrived." },
          { text: "If she had worn a coat, she ___ cold.", options: ["wouldn't have caught", "would have caught", "will catch", "would catch"], correct: 0, explanation: "Third Conditional - wouldn't have caught." },
          { text: "If they had invited me, I ___ gone.", options: ["would have", "will have", "would", "will"], correct: 0, explanation: "Third Conditional - would have gone." },
          { text: "If he had saved money, he ___ afford it.", options: ["could have", "will have", "would", "will"], correct: 0, explanation: "Third Conditional - could have afforded." },
          { text: "If we had known about the party, we ___ attended.", options: ["would have", "will have", "would", "will"], correct: 0, explanation: "Third Conditional - would have attended." },
          { text: "If she had taken the medicine, she ___ better.", options: ["would have felt", "will have felt", "would feel", "will feel"], correct: 0, explanation: "Third Conditional - would have felt." },
          { text: "If they had practiced more, they ___ won.", options: ["could have", "will have", "would", "will"], correct: 0, explanation: "Third Conditional - could have won." },
          { text: "If I had seen the sign, I ___ stopped.", options: ["would have", "will have", "would", "will"], correct: 0, explanation: "Third Conditional - would have stopped." },
          { text: "If she had listened carefully, she ___ understood.", options: ["would have", "will have", "would", "will"], correct: 0, explanation: "Third Conditional - would have understood." },
          { text: "If they had booked early, they ___ a better price.", options: ["would have gotten", "will have gotten", "would get", "will get"], correct: 0, explanation: "Third Conditional - would have gotten." },
          { text: "If he had trained harder, he ___ the race.", options: ["could have won", "will have won", "would win", "will win"], correct: 0, explanation: "Third Conditional - could have won." }
        ],
        B2: [
          { text: "Had I known, I ___ differently.", options: ["would have acted", "would act", "will act", "act"], correct: 0, explanation: "Inversion ilə Third Conditional." },
          { text: "Were she here, she ___ help.", options: ["would", "will", "can", "may"], correct: 0, explanation: "Inversion ilə Second Conditional." },
          { text: "Should you need anything, ___ me know.", options: ["let", "lets", "letting", "to let"], correct: 0, explanation: "Inversion ilə First Conditional." },
          { text: "Had it not been for you, I ___ failed.", options: ["would have", "would", "will have", "have"], correct: 0, explanation: "Inversion ilə Third Conditional - mənfi." },
          { text: "Were they to arrive, we ___ ready.", options: ["would be", "will be", "are", "were"], correct: 0, explanation: "Inversion ilə Second Conditional." },
          { text: "Had she apologized, I ___ forgiven her.", options: ["would have", "would", "will have", "have"], correct: 0, explanation: "Inversion ilə Third Conditional." },
          { text: "Should he call, ___ him I'm busy.", options: ["tell", "tells", "telling", "to tell"], correct: 0, explanation: "Inversion ilə First Conditional." },
          { text: "Were I rich, I ___ travel the world.", options: ["would", "will", "can", "may"], correct: 0, explanation: "Inversion ilə Second Conditional." },
          { text: "Had we left earlier, we ___ late.", options: ["wouldn't be", "won't be", "aren't", "weren't"], correct: 0, explanation: "Inversion ilə Third Conditional." },
          { text: "Were it not for his help, we ___ lost.", options: ["would have gotten", "would get", "will get", "get"], correct: 0, explanation: "Inversion ilə Third Conditional." },
          { text: "Should she arrive, ___ her to wait.", options: ["ask", "asks", "asking", "to ask"], correct: 0, explanation: "Inversion ilə First Conditional." },
          { text: "Had they seen the sign, they ___ stopped.", options: ["would have", "would", "will have", "have"], correct: 0, explanation: "Inversion ilə Third Conditional." },
          { text: "Were he the manager, he ___ change things.", options: ["would", "will", "can", "may"], correct: 0, explanation: "Inversion ilə Second Conditional." },
          { text: "Had she studied, she ___ passed.", options: ["would have", "would", "will have", "have"], correct: 0, explanation: "Inversion ilə Third Conditional." },
          { text: "Should it rain, we ___ cancel.", options: ["will", "would", "could", "might"], correct: 0, explanation: "Inversion ilə First Conditional." }
        ],
        C1: [
          { text: "If only I ___ more time.", options: ["had", "have", "has", "having"], correct: 0, explanation: "If only + Past Simple - arzu." },
          { text: "I wish I ___ taller.", options: ["were", "was", "is", "are"], correct: 0, explanation: "Wish + Past Subjunctive - were." },
          { text: "She wishes she ___ harder.", options: ["had studied", "studied", "studies", "study"], correct: 0, explanation: "Keçmiş üçün peşmançılıq - Past Perfect." },
          { text: "If only they ___ on time.", options: ["had arrived", "arrived", "arrive", "arrives"], correct: 0, explanation: "Keçmiş peşmançılıq - Past Perfect." },
          { text: "I'd rather you ___ quiet.", options: ["kept", "keep", "keeps", "keeping"], correct: 0, explanation: "I'd rather + Past Simple - başqasının hərəkəti." },
          { text: "Suppose she ___ late, what would we do?", options: ["were", "was", "is", "are"], correct: 0, explanation: "Suppose + Past Subjunctive - were." },
          { text: "Imagine we ___ unlimited resources.", options: ["had", "have", "has", "having"], correct: 0, explanation: "Imagine + Past Simple - xəyali vəziyyət." },
          { text: "It's time we ___ home.", options: ["went", "go", "goes", "going"], correct: 0, explanation: "It's time + Past Simple - indi vaxtıdır." },
          { text: "I'd sooner he ___ alone.", options: ["went", "go", "goes", "going"], correct: 0, explanation: "I'd sooner + Past Simple - üstünlük." },
          { text: "If only she ___ the truth.", options: ["had told", "told", "tells", "tell"], correct: 0, explanation: "Keçmiş peşmançılıq - Past Perfect." },
          { text: "I wish they ___ quieter.", options: ["were", "was", "is", "are"], correct: 0, explanation: "Wish + Past Subjunctive - were." },
          { text: "She'd rather I ___ smoking.", options: ["stopped", "stop", "stops", "stopping"], correct: 0, explanation: "Would rather + Past Simple." },
          { text: "Suppose he ___ , what would you say?", options: ["came", "come", "comes", "coming"], correct: 0, explanation: "Suppose + Past Simple - xəyali vəziyyət." },
          { text: "It's high time we ___ action.", options: ["took", "take", "takes", "taking"], correct: 0, explanation: "It's high time + Past Simple." },
          { text: "If only I ___ that mistake.", options: ["hadn't made", "didn't make", "haven't made", "wasn't made"], correct: 0, explanation: "Keçmiş peşmançılıq - Past Perfect mənfi." }
        ]
      },
      'Passive Voice': {
        A1: [
          { text: "The book ___ by him.", options: ["writes", "was written", "wrote", "is written"], correct: 1, explanation: "Keçmiş zaman passiv - was written." },
          { text: "The room ___ cleaned yesterday.", options: ["is", "was", "has", "were"], correct: 1, explanation: "Yesterday keçmiş zaman - was cleaned." },
          { text: "The cake ___ by my mom.", options: ["made", "was made", "is making", "makes"], correct: 1, explanation: "Passive voice - was made." },
          { text: "English ___ worldwide.", options: ["speaks", "is spoken", "spoke", "spoken"], correct: 1, explanation: "Present Simple passive - is spoken." },
          { text: "The car ___ repaired.", options: ["was", "has", "had", "is"], correct: 0, explanation: "The car was repaired - passiv." },
          { text: "The window ___ broken.", options: ["is", "was", "were", "has"], correct: 1, explanation: "Keçmiş zaman passiv - was broken." },
          { text: "The song ___ sung well.", options: ["is", "was", "were", "has"], correct: 1, explanation: "The song was sung - passiv." },
          { text: "The house ___ built in 1990.", options: ["is", "was", "has", "were"], correct: 1, explanation: "1990 keçmiş zaman - was built." },
          { text: "The food ___ served hot.", options: ["is", "was", "has", "were"], correct: 0, explanation: "Present Simple passive - is served." },
          { text: "The phone ___ stolen.", options: ["is", "was", "were", "has"], correct: 1, explanation: "Passive voice - was stolen." },
          { text: "The letter ___ written by John.", options: ["is", "was", "were", "has"], correct: 1, explanation: "Keçmiş zaman passiv - was written." },
          { text: "The movie ___ directed by Spielberg.", options: ["is", "was", "were", "has"], correct: 1, explanation: "Passive - was directed." },
          { text: "The car ___ driven by my father.", options: ["is", "was", "were", "has"], correct: 1, explanation: "Keçmiş zaman passiv." },
          { text: "The lesson ___ taught by Ms. Smith.", options: ["is", "was", "were", "has"], correct: 1, explanation: "Passive voice." },
          { text: "The dog ___ fed every morning.", options: ["is", "was", "were", "has"], correct: 0, explanation: "Present Simple passive - is fed." }
        ],
        A2: [
          { text: "The letter ___ sent already.", options: ["is", "was", "has been", "will be"], correct: 2, explanation: "Already ilə Present Perfect passive - has been sent." },
          { text: "A new bridge ___ built.", options: ["is being", "was being", "has been", "will be"], correct: 0, explanation: "Present Continuous passive - is being built." },
          { text: "The work ___ finished by 5 PM.", options: ["will be", "is being", "was being", "has been"], correct: 0, explanation: "Future Simple passive - will be finished." },
          { text: "The cookies ___ eaten by the children.", options: ["were", "was", "is", "are"], correct: 0, explanation: "Past Simple passive - were eaten." },
          { text: "The problem ___ solved yet.", options: ["hasn't been", "isn't", "wasn't", "won't be"], correct: 0, explanation: "Yet ilə Present Perfect passive - hasn't been solved." },
          { text: "The package ___ delivered tomorrow.", options: ["will be", "is", "was", "has been"], correct: 0, explanation: "Tomorrow gələcək zaman - will be delivered." },
          { text: "The report ___ written by the assistant.", options: ["was", "is", "are", "were"], correct: 0, explanation: "Past Simple passive - was written." },
          { text: "The house ___ painted right now.", options: ["is being", "was being", "has been", "will be"], correct: 0, explanation: "Hazırda davam edir - is being painted." },
          { text: "The documents ___ signed by the manager.", options: ["were", "was", "is", "are"], correct: 0, explanation: "Past Simple passive - were signed." },
          { text: "The meeting ___ held next Monday.", options: ["will be", "is", "was", "has been"], correct: 0, explanation: "Future Simple passive - will be held." },
          { text: "The flowers ___ watered every day.", options: ["are", "is", "was", "were"], correct: 0, explanation: "Present Simple passive - are watered." },
          { text: "The answer ___ known by everyone.", options: ["is", "was", "were", "are"], correct: 0, explanation: "Present Simple passive - is known." },
          { text: "The game ___ cancelled due to rain.", options: ["was", "is", "are", "were"], correct: 0, explanation: "Past Simple passive - was cancelled." },
          { text: "The money ___ stolen from the bank.", options: ["was", "is", "are", "were"], correct: 0, explanation: "Passive voice - was stolen." },
          { text: "The cake ___ made by my grandmother.", options: ["was", "is", "are", "were"], correct: 0, explanation: "Past Simple passive." }
        ],
        B1: [
          { text: "The project ___ finished by the time you arrive.", options: ["will have been", "will be", "is", "was"], correct: 0, explanation: "Future Perfect passive - will have been finished." },
          { text: "The car ___ repaired when I saw it.", options: ["was being", "is being", "has been", "will be"], correct: 0, explanation: "Past Continuous passive - was being repaired." },
          { text: "The letter ___ sent before you called.", options: ["had been", "has been", "was", "is"], correct: 0, explanation: "Past Perfect passive - had been sent." },
          { text: "The house ___ built for two years now.", options: ["has been being", "is being", "was being", "will be"], correct: 0, explanation: "Present Perfect Continuous passive." },
          { text: "The decision ___ made by the committee.", options: ["was", "is", "are", "were"], correct: 0, explanation: "Past Simple passive." },
          { text: "The problem ___ discussed at the meeting.", options: ["was", "is", "are", "were"], correct: 0, explanation: "Passive voice." },
          { text: "The tickets ___ sold out already.", options: ["have been", "has been", "was", "were"], correct: 0, explanation: "Present Perfect passive - have been sold." },
          { text: "The book ___ translated into 20 languages.", options: ["has been", "have been", "was", "were"], correct: 0, explanation: "Present Perfect passive - has been translated." },
          { text: "The patient ___ taken to the hospital.", options: ["was", "is", "are", "were"], correct: 0, explanation: "Past Simple passive." },
          { text: "The event ___ organized by the students.", options: ["was", "is", "are", "were"], correct: 0, explanation: "Passive voice." },
          { text: "The truth ___ revealed eventually.", options: ["will be", "is", "was", "has been"], correct: 0, explanation: "Future Simple passive." },
          { text: "The product ___ launched last month.", options: ["was", "is", "are", "were"], correct: 0, explanation: "Past Simple passive." },
          { text: "The documents ___ prepared by the lawyer.", options: ["were", "was", "is", "are"], correct: 0, explanation: "Passive voice - were prepared." },
          { text: "The song ___ recorded in London.", options: ["was", "is", "are", "were"], correct: 0, explanation: "Past Simple passive." },
          { text: "The contract ___ signed yesterday.", options: ["was", "is", "are", "were"], correct: 0, explanation: "Yesterday keçmiş zaman - was signed." }
        ],
        B2: [
          { text: "The matter ___ taken care of by the time you return.", options: ["will have been", "will be", "has been", "had been"], correct: 0, explanation: "Future Perfect passive." },
          { text: "The building ___ renovated when the earthquake struck.", options: ["was being", "is being", "has been", "had been"], correct: 0, explanation: "Past Continuous passive." },
          { text: "The package ___ delivered before you called.", options: ["had been", "has been", "was", "is"], correct: 0, explanation: "Past Perfect passive." },
          { text: "The matter ___ discussed at the moment.", options: ["is being", "was being", "has been", "will be"], correct: 0, explanation: "Present Continuous passive." },
          { text: "The results ___ announced by next week.", options: ["will have been", "will be", "have been", "had been"], correct: 0, explanation: "Future Perfect passive." },
          { text: "The suspect ___ questioned for hours.", options: ["has been being", "is being", "was being", "had been"], correct: 0, explanation: "Present Perfect Continuous passive." },
          { text: "The offer ___ considered by the board.", options: ["is being", "was being", "has been", "will be"], correct: 0, explanation: "Present Continuous passive." },
          { text: "The message ___ sent before you arrived.", options: ["had been", "has been", "was", "is"], correct: 0, explanation: "Past Perfect passive." },
          { text: "The plan ___ approved by the committee.", options: ["has been", "have been", "was", "were"], correct: 0, explanation: "Present Perfect passive." },
          { text: "The issue ___ resolved by the end of the day.", options: ["will have been", "will be", "has been", "had been"], correct: 0, explanation: "Future Perfect passive." },
          { text: "The project ___ completed before the deadline.", options: ["had been", "has been", "was", "is"], correct: 0, explanation: "Past Perfect passive." },
          { text: "The painting ___ stolen from the museum.", options: ["was", "is", "are", "were"], correct: 0, explanation: "Past Simple passive." },
          { text: "The decision ___ made by the CEO.", options: ["was", "is", "are", "were"], correct: 0, explanation: "Passive voice." },
          { text: "The new policy ___ implemented next month.", options: ["will be", "is", "was", "has been"], correct: 0, explanation: "Future Simple passive." },
          { text: "The homework ___ done by the students.", options: ["was", "is", "are", "were"], correct: 0, explanation: "Past Simple passive." }
        ],
        C1: [
          { text: "It ___ believed that the company will go bankrupt.", options: ["is", "was", "has", "had"], correct: 0, explanation: "Impersonal passive - It is believed that..." },
          { text: "The suspect ___ to be armed and dangerous.", options: ["is believed", "was believed", "has believed", "had believed"], correct: 0, explanation: "Passive with infinitive - is believed to be." },
          { text: "The meeting ___ to have been cancelled.", options: ["is said", "was said", "has said", "had said"], correct: 0, explanation: "Passive with infinitive - is said to have been." },
          { text: "The building ___ to be haunted.", options: ["is thought", "was thought", "has thought", "had thought"], correct: 0, explanation: "Passive with infinitive - is thought to be." },
          { text: "The accident ___ to have been caused by negligence.", options: ["is reported", "was reported", "has reported", "had reported"], correct: 0, explanation: "Passive with infinitive." },
          { text: "The painting ___ to be a fake.", options: ["is considered", "was considered", "has considered", "had considered"], correct: 0, explanation: "Passive with infinitive." },
          { text: "The company ___ to be losing money.", options: ["is known", "was known", "has known", "had known"], correct: 0, explanation: "Passive with infinitive." },
          { text: "The prisoners ___ to have escaped.", options: ["are believed", "were believed", "have believed", "had believed"], correct: 0, explanation: "Present passive with infinitive." },
          { text: "The treasure ___ to be hidden in the cave.", options: ["is said", "was said", "has said", "had said"], correct: 0, explanation: "Passive with infinitive." },
          { text: "She ___ to have written the novel.", options: ["is alleged", "was alleged", "has alleged", "had alleged"], correct: 0, explanation: "Allege + passive with infinitive." },
          { text: "The suspect ___ to have left the country.", options: ["is thought", "was thought", "has thought", "had thought"], correct: 0, explanation: "Passive with infinitive." },
          { text: "The event ___ to have been a success.", options: ["is considered", "was considered", "has considered", "had considered"], correct: 0, explanation: "Passive with infinitive." },
          { text: "The manuscript ___ to be authentic.", options: ["is believed", "was believed", "has believed", "had believed"], correct: 0, explanation: "Passive with infinitive." },
          { text: "The prisoners ___ to be released tomorrow.", options: ["are expected", "were expected", "have expected", "had expected"], correct: 0, explanation: "Passive with infinitive - are expected to be." },
          { text: "The deal ___ to have fallen through.", options: ["is reported", "was reported", "has reported", "had reported"], correct: 0, explanation: "Passive with infinitive." }
        ]
      },
      'Reported Speech': {
        A1: [
          { text: "She said she ___ tired.", options: ["is", "was", "were", "has"], correct: 1, explanation: "Present Simple → Past Simple: is → was." },
          { text: "He said he ___ coming.", options: ["is", "was", "were", "has"], correct: 1, explanation: "Present Continuous → Past Continuous: is coming → was coming." },
          { text: "They said they ___ finished.", options: ["have", "had", "has", "will"], correct: 1, explanation: "Present Perfect → Past Perfect: have finished → had finished." },
          { text: "She said she ___ help.", options: ["will", "would", "can", "may"], correct: 1, explanation: "Future Simple → would: will help → would help." },
          { text: "He said he ___ seen it.", options: ["has", "had", "have", "will"], correct: 1, explanation: "Present Perfect → Past Perfect: has seen → had seen." },
          { text: "She said she ___ busy.", options: ["is", "was", "were", "has"], correct: 1, explanation: "Present Simple → Past Simple: is → was." },
          { text: "They said they ___ late.", options: ["are", "were", "will", "would"], correct: 1, explanation: "Present Simple → Past Simple: are → were." },
          { text: "He said he ___ go.", options: ["will", "would", "can", "may"], correct: 1, explanation: "Future → would." },
          { text: "She said she ___ happy.", options: ["is", "was", "were", "has"], correct: 1, explanation: "Present → Past." },
          { text: "They said they ___ try.", options: ["will", "would", "can", "may"], correct: 1, explanation: "Will → would." },
          { text: "He said he ___ know.", options: ["does", "did", "will", "would"], correct: 1, explanation: "Present → Past: does → did." },
          { text: "She said she ___ seen him.", options: ["has", "had", "have", "will"], correct: 1, explanation: "Has seen → had seen." },
          { text: "They said they ___ finished.", options: ["are", "had", "were", "have"], correct: 1, explanation: "Present Perfect → Past Perfect." },
          { text: "He said he ___ ready.", options: ["is", "was", "were", "has"], correct: 1, explanation: "Is → was." },
          { text: "She said she ___ call.", options: ["will", "would", "can", "may"], correct: 1, explanation: "Will → would." }
        ],
        A2: [
          { text: "He asked me where ___ going.", options: ["I was", "was I", "I am", "am I"], correct: 0, explanation: "Reported question: where I was going." },
          { text: "She asked if ___ coffee.", options: ["I liked", "did I like", "I like", "do I like"], correct: 0, explanation: "Yes/No question: if I liked." },
          { text: "He told me ___ quiet.", options: ["to be", "be", "being", "been"], correct: 0, explanation: "Imperative: told me to be quiet." },
          { text: "She said that she ___ to Paris.", options: ["had never been", "has never been", "never went", "never goes"], correct: 0, explanation: "Present Perfect → Past Perfect." },
          { text: "He asked me what ___ doing.", options: ["I was", "was I", "I am", "am I"], correct: 0, explanation: "Reported question: what I was doing." },
          { text: "She asked if ___ the answer.", options: ["I knew", "did I know", "I know", "do I know"], correct: 0, explanation: "If I knew the answer." },
          { text: "He told us ___ wait.", options: ["to", "for", "at", "in"], correct: 0, explanation: "Told us to wait." },
          { text: "She said that she ___ her keys.", options: ["had lost", "has lost", "lost", "loses"], correct: 0, explanation: "Has lost → had lost." },
          { text: "He asked where ___ parked.", options: ["I had", "had I", "I have", "have I"], correct: 0, explanation: "Where I had parked." },
          { text: "She asked if ___ hungry.", options: ["I was", "was I", "I am", "am I"], correct: 0, explanation: "If I was hungry." },
          { text: "He told me ___ the door.", options: ["to close", "close", "closing", "closed"], correct: 0, explanation: "Told me to close the door." },
          { text: "She said that she ___ come.", options: ["would", "will", "can", "may"], correct: 0, explanation: "Will → would." },
          { text: "He asked me what ___ wanted.", options: ["I", "me", "my", "mine"], correct: 0, explanation: "What I wanted." },
          { text: "She asked if ___ to the party.", options: ["I was going", "was I going", "I go", "do I go"], correct: 0, explanation: "If I was going." },
          { text: "He told her ___ smoking.", options: ["to stop", "stop", "stopping", "stopped"], correct: 0, explanation: "Told her to stop smoking." }
        ],
        B1: [
          { text: "She said, 'I will call you tomorrow.' Reported: She said ___ call me the next day.", options: ["she would", "she will", "I would", "I will"], correct: 0, explanation: "Pronoun and tense change: I → she, will → would." },
          { text: "He asked, 'Do you like pizza?' Reported: He asked if ___ pizza.", options: ["I liked", "did I like", "I like", "do I like"], correct: 0, explanation: "Question in past tense: if I liked." },
          { text: "She told me, 'Don't be late.' Reported: She told me ___ late.", options: ["not to be", "to not be", "don't be", "not be"], correct: 0, explanation: "Negative imperative: not to be late." },
          { text: "He said, 'I am leaving now.' Reported: He said ___ leaving then.", options: ["he was", "he is", "I was", "I am"], correct: 0, explanation: "Present Continuous → Past Continuous, now → then." },
          { text: "She asked, 'Where do you live?' Reported: She asked where ___ live.", options: ["I lived", "did I live", "I live", "do I live"], correct: 0, explanation: "Where I lived." },
          { text: "He said, 'I have finished my work.' Reported: He said that he ___ his work.", options: ["had finished", "has finished", "finished", "finishes"], correct: 0, explanation: "Present Perfect → Past Perfect." },
          { text: "She said, 'I can swim.' Reported: She said that she ___ swim.", options: ["could", "can", "might", "should"], correct: 0, explanation: "Can → could." },
          { text: "He asked, 'Will you help me?' Reported: He asked if ___ help him.", options: ["I would", "would I", "I will", "will I"], correct: 0, explanation: "If I would help him." },
          { text: "She said, 'I may be late.' Reported: She said that she ___ be late.", options: ["might", "may", "could", "would"], correct: 0, explanation: "May → might." },
          { text: "He told her, 'Open the window.' Reported: He told her ___ the window.", options: ["to open", "open", "opening", "opened"], correct: 0, explanation: "Told her to open." },
          { text: "She asked, 'What time is it?' Reported: She asked what time ___ .", options: ["it was", "was it", "it is", "is it"], correct: 0, explanation: "What time it was." },
          { text: "He said, 'I must go now.' Reported: He said that he ___ go then.", options: ["had to", "must", "should", "could"], correct: 0, explanation: "Must → had to." },
          { text: "She said, 'I was sleeping.' Reported: She said that she ___ sleeping.", options: ["had been", "was", "has been", "is"], correct: 0, explanation: "Past Continuous → Past Perfect Continuous." },
          { text: "He asked, 'Have you seen the movie?' Reported: He asked if ___ seen the movie.", options: ["I had", "had I", "I have", "have I"], correct: 0, explanation: "If I had seen." },
          { text: "She said, 'I'll be there.' Reported: She said that she ___ there.", options: ["would be", "will be", "is", "was"], correct: 0, explanation: "Will → would." }
        ],
        B2: [
          { text: "He said, 'I would help if I could.' Reported: He said that he ___ help if he could.", options: ["would", "will", "can", "may"], correct: 0, explanation: "Would remains would in reported speech." },
          { text: "She said, 'I might come later.' Reported: She said that she ___ come later.", options: ["might", "may", "could", "would"], correct: 0, explanation: "Might remains might." },
          { text: "He asked, 'What were you doing?' Reported: He asked what ___ doing.", options: ["I had been", "was I", "I was", "had I been"], correct: 0, explanation: "Past Continuous → Past Perfect Continuous." },
          { text: "She said, 'I wish I knew.' Reported: She said that she ___ she knew.", options: ["wished", "wishes", "wish", "wishing"], correct: 0, explanation: "Wish remains wish with tense backshift." },
          { text: "He said, 'I had already eaten.' Reported: He said that he ___ already eaten.", options: ["had", "has", "have", "was"], correct: 0, explanation: "Past Perfect remains Past Perfect." },
          { text: "She asked, 'Would you like some tea?' Reported: She asked if ___ some tea.", options: ["I would like", "would I like", "I like", "do I like"], correct: 0, explanation: "If I would like." },
          { text: "He said, 'Let's go to the cinema.' Reported: He suggested ___ to the cinema.", options: ["going", "to go", "go", "went"], correct: 0, explanation: "Suggest + gerund: going." },
          { text: "She said, 'Congratulations!' Reported: She ___ me.", options: ["congratulated", "said", "told", "asked"], correct: 0, explanation: "Reporting verb: congratulated." },
          { text: "He said, 'I must have left it at home.' Reported: He said that he ___ have left it at home.", options: ["must", "had to", "should", "could"], correct: 0, explanation: "Must for deduction remains must." },
          { text: "She said, 'You should see a doctor.' Reported: She said that I ___ see a doctor.", options: ["should", "would", "could", "might"], correct: 0, explanation: "Should remains should." },
          { text: "He asked, 'Where shall we meet?' Reported: He asked where ___ meet.", options: ["they should", "should they", "they would", "would they"], correct: 0, explanation: "Where they should meet." },
          { text: "She said, 'I used to live in London.' Reported: She said that she ___ to live in London.", options: ["used", "use", "was using", "had used"], correct: 0, explanation: "Used to remains used to." },
          { text: "He said, 'I would rather stay home.' Reported: He said that he ___ rather stay home.", options: ["would", "will", "could", "might"], correct: 0, explanation: "Would rather remains." },
          { text: "She asked, 'How long have you been waiting?' Reported: She asked how long ___ been waiting.", options: ["I had", "had I", "I have", "have I"], correct: 0, explanation: "How long I had been waiting." },
          { text: "He said, 'I don't like it.' Reported: He said that he ___ like it.", options: ["didn't", "doesn't", "don't", "hadn't"], correct: 0, explanation: "Present → Past: don't → didn't." }
        ],
        C1: [
          { text: "She said, 'Had I known, I would have acted differently.' Reported: She said that if she ___ known, she would have acted differently.", options: ["had", "have", "has", "having"], correct: 0, explanation: "Conditional inversion remains." },
          { text: "He said, 'Were I rich, I would travel.' Reported: He said that if he ___ rich, he would travel.", options: ["were", "was", "is", "are"], correct: 0, explanation: "Were remains were." },
          { text: "She said, 'Should you need anything, call me.' Reported: She said that if I ___ anything, to call her.", options: ["should need", "needed", "need", "have needed"], correct: 0, explanation: "Should remains in reported speech." },
          { text: "He said, 'It's high time we left.' Reported: He said that it was high time they ___ .", options: ["left", "leave", "leaving", "to leave"], correct: 0, explanation: "Past subjunctive remains." },
          { text: "She said, 'I'd rather you didn't smoke.' Reported: She said that she'd rather I ___ smoke.", options: ["didn't", "don't", "wouldn't", "couldn't"], correct: 0, explanation: "Would rather + past remains." },
          { text: "He asked, 'What if it rained?' Reported: He asked what would happen if it ___ .", options: ["rained", "rains", "rain", "raining"], correct: 0, explanation: "Past subjunctive remains." },
          { text: "She said, 'So be it.' Reported: She said that so ___ it.", options: ["be", "is", "was", "were"], correct: 0, explanation: "Subjunctive remains be." },
          { text: "He said, 'Come what may, I'll be there.' Reported: He said that come what ___, he would be there.", options: ["may", "might", "could", "would"], correct: 0, explanation: "Come what may remains." },
          { text: "She said, 'Be that as it may...' Reported: She said that be that as it ___ .", options: ["may", "might", "could", "would"], correct: 0, explanation: "Fixed expression remains." },
          { text: "He said, 'If only I had listened.' Reported: He said that if only he ___ listened.", options: ["had", "have", "has", "having"], correct: 0, explanation: "If only + past perfect remains." },
          { text: "She said, 'I wish I were younger.' Reported: She said that she wished she ___ younger.", options: ["were", "was", "is", "are"], correct: 0, explanation: "Were remains were." },
          { text: "He said, 'It's time we went home.' Reported: He said that it was time they ___ home.", options: ["went", "go", "gone", "going"], correct: 0, explanation: "It's time + past remains." },
          { text: "She said, 'I would sooner die than surrender.' Reported: She said that she would sooner die than ___ .", options: ["surrender", "surrendered", "surrendering", "to surrender"], correct: 0, explanation: "Would sooner + infinitive remains." },
          { text: "He said, 'Suppose he were to find out.' Reported: He asked what would happen if he ___ to find out.", options: ["were", "was", "is", "are"], correct: 0, explanation: "Were to remains." },
          { text: "She said, 'Long may he reign.' Reported: She said that long ___ he reign.", options: ["may", "might", "could", "would"], correct: 0, explanation: "May remains in fixed expression." }
        ]
      },
      'Prepositions': {
        A1: [
          { text: "He is good ___ math.", options: ["in", "at", "on", "for"], correct: 1, explanation: "Good at - bir şeydə yaxşı olmaq." },
          { text: "She arrived ___ Monday.", options: ["in", "on", "at", "for"], correct: 1, explanation: "On + day - günlərdə on işlənir." },
          { text: "The book is ___ the table.", options: ["in", "on", "at", "under"], correct: 1, explanation: "On the table - masanın üstündə." },
          { text: "We live ___ Baku.", options: ["at", "in", "on", "to"], correct: 1, explanation: "In + city - şəhər adında in işlənir." },
          { text: "He is afraid ___ dogs.", options: ["of", "from", "with", "at"], correct: 0, explanation: "Afraid of - qorxmaq." },
          { text: "She is interested ___ art.", options: ["in", "on", "at", "for"], correct: 0, explanation: "Interested in - maraqlanmaq." },
          { text: "He depends ___ me.", options: ["on", "in", "at", "for"], correct: 0, explanation: "Depend on - asılı olmaq." },
          { text: "The cat is ___ the box.", options: ["in", "on", "at", "under"], correct: 0, explanation: "In the box - qutunun içində." },
          { text: "She was born ___ 2005.", options: ["in", "on", "at", "for"], correct: 0, explanation: "In + year - illərdə in işlənir." },
          { text: "We met ___ night.", options: ["at", "on", "in", "for"], correct: 0, explanation: "At night - gecə vaxtı." },
          { text: "He is married ___ her.", options: ["to", "with", "at", "for"], correct: 0, explanation: "Married to - evli olmaq." },
          { text: "The shop is ___ the corner.", options: ["on", "in", "at", "to"], correct: 0, explanation: "On the corner - küncdə." },
          { text: "She laughed ___ the joke.", options: ["at", "on", "in", "for"], correct: 0, explanation: "Laugh at - gülmək." },
          { text: "I'm tired ___ work.", options: ["of", "from", "with", "at"], correct: 0, explanation: "Tired of - bezmək, cansıxıcı olmaq." },
          { text: "He apologized ___ me.", options: ["to", "for", "with", "at"], correct: 0, explanation: "Apologize to - üzr istəmək." }
        ],
        A2: [
          { text: "She is waiting ___ the bus stop.", options: ["at", "in", "on", "for"], correct: 0, explanation: "At the bus stop - dayanacaqda." },
          { text: "He is going ___ school.", options: ["to", "at", "in", "on"], correct: 0, explanation: "Go to school - məktəbə getmək." },
          { text: "The picture is ___ the wall.", options: ["on", "in", "at", "to"], correct: 0, explanation: "On the wall - divarda." },
          { text: "She is sitting ___ the chair.", options: ["on", "in", "at", "to"], correct: 0, explanation: "On the chair - stulda." },
          { text: "He is ___ home.", options: ["at", "in", "on", "to"], correct: 0, explanation: "At home - evdə." },
          { text: "She is ___ the phone.", options: ["on", "in", "at", "to"], correct: 0, explanation: "On the phone - telefonda." },
          { text: "He is ___ vacation.", options: ["on", "in", "at", "to"], correct: 0, explanation: "On vacation - tətildə." },
          { text: "She is good ___ English.", options: ["at", "in", "on", "for"], correct: 0, explanation: "Good at - yaxşı olmaq." },
          { text: "He is interested ___ learning.", options: ["in", "on", "at", "for"], correct: 0, explanation: "Interested in - maraqlanmaq." },
          { text: "She is afraid ___ spiders.", options: ["of", "from", "with", "at"], correct: 0, explanation: "Afraid of - qorxmaq." },
          { text: "He is responsible ___ the team.", options: ["for", "of", "with", "at"], correct: 0, explanation: "Responsible for - məsul olmaq." },
          { text: "She is married ___ a doctor.", options: ["to", "with", "at", "for"], correct: 0, explanation: "Married to - evli olmaq." },
          { text: "He apologized ___ being late.", options: ["for", "to", "with", "at"], correct: 0, explanation: "Apologize for - görə üzr istəmək." },
          { text: "She is looking ___ her keys.", options: ["for", "at", "to", "in"], correct: 0, explanation: "Look for - axtarmaq." },
          { text: "He is listening ___ music.", options: ["to", "at", "in", "on"], correct: 0, explanation: "Listen to - dinləmək." }
        ],
        B1: [
          { text: "She is accustomed ___ waking up early.", options: ["to", "with", "at", "for"], correct: 0, explanation: "Accustomed to - öyrəşmiş." },
          { text: "He is capable ___ doing the job.", options: ["of", "to", "with", "at"], correct: 0, explanation: "Capable of - bacarıqlı." },
          { text: "She is concerned ___ her health.", options: ["about", "with", "at", "for"], correct: 0, explanation: "Concerned about - narahat olmaq." },
          { text: "He is famous ___ his work.", options: ["for", "of", "with", "at"], correct: 0, explanation: "Famous for - məşhur." },
          { text: "She is proud ___ her son.", options: ["of", "with", "at", "for"], correct: 0, explanation: "Proud of - qürur duymaq." },
          { text: "He is responsible ___ the project.", options: ["for", "of", "with", "at"], correct: 0, explanation: "Responsible for - məsul." },
          { text: "She is satisfied ___ the results.", options: ["with", "of", "at", "for"], correct: 0, explanation: "Satisfied with - razı olmaq." },
          { text: "He is similar ___ his father.", options: ["to", "with", "at", "for"], correct: 0, explanation: "Similar to - oxşar." },
          { text: "She is tired ___ waiting.", options: ["of", "from", "with", "at"], correct: 0, explanation: "Tired of - bezmiş." },
          { text: "He is worried ___ the exam.", options: ["about", "of", "with", "at"], correct: 0, explanation: "Worried about - narahat olmaq." },
          { text: "She apologized ___ coming late.", options: ["for", "to", "with", "at"], correct: 0, explanation: "Apologize for - görə üzr istəmək." },
          { text: "He is looking forward ___ the trip.", options: ["to", "for", "at", "in"], correct: 0, explanation: "Look forward to - səbirsizliklə gözləmək." },
          { text: "She is thinking ___ changing her job.", options: ["about", "of", "with", "at"], correct: 0, explanation: "Think about - düşünmək." },
          { text: "He succeeded ___ passing the exam.", options: ["in", "at", "to", "with"], correct: 0, explanation: "Succeed in - uğur qazanmaq." },
          { text: "She is suffering ___ a cold.", options: ["from", "of", "with", "at"], correct: 0, explanation: "Suffer from - əziyyət çəkmək." }
        ],
        B2: [
          { text: "He is abstaining ___ voting.", options: ["from", "to", "with", "at"], correct: 0, explanation: "Abstain from - çəkinmək." },
          { text: "She is accused ___ theft.", options: ["of", "for", "with", "at"], correct: 0, explanation: "Accused of - ittiham olunmaq." },
          { text: "He is addicted ___ smoking.", options: ["to", "with", "at", "for"], correct: 0, explanation: "Addicted to - asılı olmaq." },
          { text: "She is admired ___ her courage.", options: ["for", "of", "with", "at"], correct: 0, explanation: "Admired for - heyran olunmaq." },
          { text: "He is anxious ___ the results.", options: ["about", "of", "with", "at"], correct: 0, explanation: "Anxious about - narahat olmaq." },
          { text: "She is aware ___ the problem.", options: ["of", "about", "with", "at"], correct: 0, explanation: "Aware of - xəbərdar olmaq." },
          { text: "He is blamed ___ the accident.", options: ["for", "of", "with", "at"], correct: 0, explanation: "Blamed for - günahlandırılmaq." },
          { text: "She is committed ___ her work.", options: ["to", "with", "at", "for"], correct: 0, explanation: "Committed to - bağlı olmaq." },
          { text: "He is composed ___ many parts.", options: ["of", "from", "with", "at"], correct: 0, explanation: "Composed of - ibarət olmaq." },
          { text: "She is concerned ___ the environment.", options: ["about", "of", "with", "at"], correct: 0, explanation: "Concerned about - narahat." },
          { text: "He is connected ___ the internet.", options: ["to", "with", "at", "for"], correct: 0, explanation: "Connected to - qoşulmuş." },
          { text: "She is covered ___ dust.", options: ["with", "of", "by", "in"], correct: 0, explanation: "Covered with - örtülmüş." },
          { text: "He is deprived ___ sleep.", options: ["of", "from", "with", "at"], correct: 0, explanation: "Deprived of - məhrum olmaq." },
          { text: "She is derived ___ a Latin word.", options: ["from", "of", "with", "at"], correct: 0, explanation: "Derived from - alınmaq." },
          { text: "He is different ___ his brother.", options: ["from", "to", "than", "with"], correct: 0, explanation: "Different from - fərqli olmaq." }
        ],
        C1: [
          { text: "He is synonymous ___ excellence.", options: ["with", "to", "for", "of"], correct: 0, explanation: "Synonymous with - sinonim olmaq." },
          { text: "She is tantamount ___ a confession.", options: ["to", "with", "as", "for"], correct: 0, explanation: "Tantamount to - bərabər olmaq." },
          { text: "He is vested ___ authority.", options: ["with", "in", "by", "of"], correct: 0, explanation: "Vested with - səlahiyyət verilmiş." },
          { text: "She is wanting ___ common sense.", options: ["in", "of", "for", "with"], correct: 0, explanation: "Wanting in - çatışmayan." },
          { text: "He is worthy ___ praise.", options: ["of", "for", "to", "with"], correct: 0, explanation: "Worthy of - layiq." },
          { text: "She is zealous ___ her cause.", options: ["for", "of", "in", "with"], correct: 0, explanation: "Zealous for - həvəsli." },
          { text: "He is bereft ___ hope.", options: ["of", "from", "with", "at"], correct: 0, explanation: "Bereft of - məhrum." },
          { text: "She is cognizant ___ the facts.", options: ["of", "about", "with", "to"], correct: 0, explanation: "Cognizant of - məlumatlı." },
          { text: "He is conducive ___ learning.", options: ["to", "for", "with", "at"], correct: 0, explanation: "Conducive to - əlverişli." },
          { text: "She is conversant ___ the rules.", options: ["with", "in", "of", "about"], correct: 0, explanation: "Conversant with - bələd." },
          { text: "He is devoid ___ meaning.", options: ["of", "from", "with", "at"], correct: 0, explanation: "Devoid of - məhrum." },
          { text: "She is discerning ___ quality.", options: ["of", "in", "about", "with"], correct: 0, explanation: "Discerning of - fərq edən." },
          { text: "He is endowed ___ talent.", options: ["with", "by", "of", "from"], correct: 0, explanation: "Endowed with - bəxş edilmiş." },
          { text: "She is engrossed ___ her book.", options: ["in", "with", "by", "at"], correct: 0, explanation: "Engrossed in - dalmaq." },
          { text: "He is fraught ___ danger.", options: ["with", "of", "by", "from"], correct: 0, explanation: "Fraught with - dolu olmaq." }
        ]
      },
      'Articles': {
        A1: [
          { text: "She is ___ doctor.", options: ["a", "an", "the", "none"], correct: 0, explanation: "Peşə adından əvvəl a işlənir." },
          { text: "I saw ___ elephant.", options: ["a", "an", "the", "none"], correct: 1, explanation: "Elephant sait səsi ilə başlayır - an." },
          { text: "___ sun is bright.", options: ["A", "An", "The", "None"], correct: 2, explanation: "Unikal şey - the sun." },
          { text: "He bought ___ car.", options: ["a", "an", "the", "none"], correct: 0, explanation: "İlk dəfə qeyd olunur - a car." },
          { text: "She has ___ umbrella.", options: ["a", "an", "the", "none"], correct: 1, explanation: "Umbrella sait səsi ilə başlayır - an." },
          { text: "___ Earth is round.", options: ["A", "An", "The", "None"], correct: 2, explanation: "Planet adı - the Earth." },
          { text: "I need ___ pen.", options: ["a", "an", "the", "none"], correct: 0, explanation: "Tək sayda isim - a pen." },
          { text: "She is ___ honest woman.", options: ["a", "an", "the", "none"], correct: 1, explanation: "Honest-də h səslənmir - an honest." },
          { text: "___ moon is full.", options: ["A", "An", "The", "None"], correct: 2, explanation: "Unikal səma cismi - the moon." },
          { text: "He found ___ job.", options: ["a", "an", "the", "none"], correct: 0, explanation: "İlk dəfə qeyd olunur - a job." },
          { text: "She adopted ___ cat.", options: ["a", "an", "the", "none"], correct: 0, explanation: "A cat - bir pişik." },
          { text: "___ water is cold.", options: ["A", "An", "The", "None"], correct: 2, explanation: "Xüsusi su - the water." },
          { text: "He is ___ engineer.", options: ["a", "an", "the", "none"], correct: 1, explanation: "Engineer sait səsi - an." },
          { text: "She read ___ book.", options: ["a", "an", "the", "none"], correct: 0, explanation: "A book - bir kitab." },
          { text: "___ sky is blue.", options: ["A", "An", "The", "None"], correct: 2, explanation: "Unikal şey - the sky." }
        ],
        A2: [
          { text: "I saw ___ movie last night.", options: ["a", "an", "the", "none"], correct: 0, explanation: "İlk dəfə qeyd olunur - a movie." },
          { text: "___ movie was great.", options: ["A", "An", "The", "None"], correct: 2, explanation: "Təkrar qeyd olunur - the movie." },
          { text: "She is ___ best student.", options: ["a", "an", "the", "none"], correct: 2, explanation: "Superlative degree - the best." },
          { text: "He is ___ tallest in class.", options: ["a", "an", "the", "none"], correct: 2, explanation: "Superlative - the tallest." },
          { text: "I live in ___ United States.", options: ["a", "an", "the", "none"], correct: 2, explanation: "Ölkə adı - the United States." },
          { text: "She plays ___ piano.", options: ["a", "an", "the", "none"], correct: 2, explanation: "Musiqi aləti - the piano." },
          { text: "He went to ___ hospital.", options: ["a", "an", "the", "none"], correct: 2, explanation: "Xəstəxana - the hospital." },
          { text: "She is ___ only child.", options: ["a", "an", "the", "none"], correct: 2, explanation: "Only - the only." },
          { text: "___ rich should help ___ poor.", options: ["The", "A", "An", "None"], correct: 0, explanation: "The + adjective = qrup." },
          { text: "___ Amazon is a river.", options: ["A", "An", "The", "None"], correct: 2, explanation: "Çay adı - the Amazon." },
          { text: "She is ___ first to arrive.", options: ["a", "an", "the", "none"], correct: 2, explanation: "Sıra sayı - the first." },
          { text: "He is ___ same age as me.", options: ["a", "an", "the", "none"], correct: 2, explanation: "Same - the same." },
          { text: "___ sun rises in ___ east.", options: ["The", "A", "An", "None"], correct: 0, explanation: "The sun, the east." },
          { text: "She has ___ flu.", options: ["a", "an", "the", "none"], correct: 2, explanation: "Xəstəlik - the flu." },
          { text: "He is ___ president of ___ company.", options: ["the", "a", "an", "none"], correct: 0, explanation: "Vəzifə - the president." }
        ],
        B1: [
          { text: "___ French are known for their cuisine.", options: ["The", "A", "An", "None"], correct: 0, explanation: "Millət - the French." },
          { text: "She is ___ university professor.", options: ["a", "an", "the", "none"], correct: 0, explanation: "University ju səsi - a." },
          { text: "He is ___ honest man.", options: ["a", "an", "the", "none"], correct: 1, explanation: "Honest - an honest." },
          { text: "___ honor is important to him.", options: ["A", "An", "The", "None"], correct: 3, explanation: "Abstrakt isim - no article." },
          { text: "She is ___ European.", options: ["a", "an", "the", "none"], correct: 0, explanation: "European ju səsi - a." },
          { text: "He has ___ one-way ticket.", options: ["a", "an", "the", "none"], correct: 0, explanation: "One w səsi - a." },
          { text: "___ history is interesting.", options: ["A", "An", "The", "None"], correct: 3, explanation: "Abstrakt - no article." },
          { text: "She is ___ heir to the throne.", options: ["a", "an", "the", "none"], correct: 1, explanation: "Heir - an heir." },
          { text: "He is ___ unique person.", options: ["a", "an", "the", "none"], correct: 0, explanation: "Unique ju səsi - a." },
          { text: "___ honest is the best policy.", options: ["A", "An", "The", "None"], correct: 3, explanation: "Abstrakt - no article." },
          { text: "She is ___ best teacher I know.", options: ["a", "an", "the", "none"], correct: 2, explanation: "Superlative - the best." },
          { text: "He is ___ man of ___ hour.", options: ["a, the", "the, a", "an, the", "none"], correct: 0, explanation: "A man of the hour." },
          { text: "___ life is beautiful.", options: ["A", "An", "The", "None"], correct: 3, explanation: "Abstrakt - no article." },
          { text: "She is ___ most talented singer.", options: ["a", "an", "the", "none"], correct: 2, explanation: "Most ilə - the most." },
          { text: "He is ___ man of his word.", options: ["a", "an", "the", "none"], correct: 0, explanation: "A man of his word." }
        ],
        B2: [
          { text: "___ justice was served.", options: ["A", "An", "The", "None"], correct: 3, explanation: "Abstrakt isim - no article." },
          { text: "She has ___ good understanding of ___ matter.", options: ["a, the", "the, a", "an, the", "none"], correct: 0, explanation: "A good understanding of the matter." },
          { text: "He is ___ authority on ___ subject.", options: ["an, the", "a, the", "the, a", "none"], correct: 1, explanation: "An authority - sait səsi." },
          { text: "___ patience is ___ virtue.", options: ["A, a", "The, the", "None, a", "None, none"], correct: 2, explanation: "Patience - no article, a virtue." },
          { text: "She is ___ woman of ___ integrity.", options: ["a, no", "the, no", "a, the", "the, a"], correct: 0, explanation: "A woman of integrity." },
          { text: "He has ___ eye for detail.", options: ["a", "an", "the", "none"], correct: 1, explanation: "An eye for detail." },
          { text: "___ knowledge is power.", options: ["A", "An", "The", "None"], correct: 3, explanation: "Abstrakt - no article." },
          { text: "She is ___ embodiment of ___ grace.", options: ["the, no", "a, the", "an, no", "the, the"], correct: 0, explanation: "The embodiment of grace." },
          { text: "He is ___ master of ___ art.", options: ["a, the", "the, a", "an, the", "the, no"], correct: 0, explanation: "A master of the art." },
          { text: "___ courage is admirable.", options: ["A", "An", "The", "None"], correct: 3, explanation: "Abstrakt - no article." },
          { text: "She has ___ knack for ___ languages.", options: ["a, no", "the, the", "an, no", "a, the"], correct: 0, explanation: "A knack for languages." },
          { text: "He is ___ victim of circumstances.", options: ["a", "an", "the", "none"], correct: 0, explanation: "A victim of circumstances." },
          { text: "___ freedom is priceless.", options: ["A", "An", "The", "None"], correct: 3, explanation: "Abstrakt - no article." },
          { text: "She is ___ inspiration to many.", options: ["a", "an", "the", "none"], correct: 1, explanation: "An inspiration." },
          { text: "He is ___ product of his environment.", options: ["a", "an", "the", "none"], correct: 0, explanation: "A product of his environment." }
        ],
        C1: [
          { text: "___ time heals all wounds.", options: ["A", "An", "The", "None"], correct: 3, explanation: "Abstract general - no article." },
          { text: "She is ___ force to be reckoned with.", options: ["a", "an", "the", "none"], correct: 0, explanation: "A force to be reckoned with." },
          { text: "He has ___ understanding of ___ human condition.", options: ["a, the", "an, the", "the, a", "none, the"], correct: 0, explanation: "A understanding - a, the human condition." },
          { text: "___ art of ___ negotiation is difficult.", options: ["The, no", "A, the", "The, the", "No, no"], correct: 0, explanation: "The art of negotiation." },
          { text: "She is ___ shadow of her former self.", options: ["a", "an", "the", "none"], correct: 0, explanation: "A shadow of her former self." },
          { text: "He is ___ product of ___ society.", options: ["a, no", "the, the", "a, the", "the, no"], correct: 0, explanation: "A product of society." },
          { text: "___ truth shall set you free.", options: ["A", "An", "The", "None"], correct: 2, explanation: "The truth - xüsusi həqiqət." },
          { text: "She is ___ symbol of hope.", options: ["a", "an", "the", "none"], correct: 0, explanation: "A symbol of hope." },
          { text: "He is ___ master of his own destiny.", options: ["a", "an", "the", "none"], correct: 0, explanation: "A master of his own destiny." },
          { text: "___ love conquers all.", options: ["A", "An", "The", "None"], correct: 3, explanation: "Abstract - no article." },
          { text: "She is ___ epitome of elegance.", options: ["a", "an", "the", "none"], correct: 2, explanation: "The epitome of elegance." },
          { text: "He is ___ man of ___ people.", options: ["a, the", "the, a", "an, the", "the, no"], correct: 0, explanation: "A man of the people." },
          { text: "___ beauty is in the eye of ___ beholder.", options: ["A, the", "The, a", "No, the", "The, the"], correct: 2, explanation: "Beauty no article, the beholder." },
          { text: "She is ___ woman of her word.", options: ["a", "an", "the", "none"], correct: 0, explanation: "A woman of her word." },
          { text: "He is ___ living legend.", options: ["a", "an", "the", "none"], correct: 0, explanation: "A living legend." }
        ]
      },
      'Comparatives Superlatives': {
        A1: [
          { text: "This is ___ than that.", options: ["fast", "faster", "fastest", "more fast"], correct: 1, explanation: "Qısa sözdə -er əlavə olunur." },
          { text: "She is ___ student.", options: ["good", "better", "best", "more good"], correct: 2, explanation: "Superlative - the best." },
          { text: "This book is ___ than mine.", options: ["interesting", "more interesting", "most interesting", "interestinger"], correct: 1, explanation: "Uzun sözdə more interesting." },
          { text: "He is ___ than me.", options: ["tall", "taller", "tallest", "more tall"], correct: 1, explanation: "Comparative - taller." },
          { text: "This is ___ day.", options: ["bad", "worse", "worst", "more bad"], correct: 2, explanation: "Superlative - the worst." },
          { text: "She runs ___ than him.", options: ["fast", "faster", "fastest", "more fast"], correct: 1, explanation: "Comparative - faster." },
          { text: "This test is ___ than last.", options: ["easy", "easier", "easiest", "more easy"], correct: 1, explanation: "Comparative - easier." },
          { text: "He is ___ player.", options: ["good", "better", "best", "more good"], correct: 2, explanation: "Superlative - the best." },
          { text: "Today is ___ than yesterday.", options: ["hot", "hotter", "hottest", "more hot"], correct: 1, explanation: "CVC - double t + er: hotter." },
          { text: "This is ___ movie.", options: ["interesting", "more interesting", "most interesting", "interestinger"], correct: 2, explanation: "Superlative - most interesting." },
          { text: "She is ___ than her sister.", options: ["young", "younger", "youngest", "more young"], correct: 1, explanation: "Comparative - younger." },
          { text: "This car is ___ expensive.", options: ["more", "most", "much", "very"], correct: 1, explanation: "Superlative - the most expensive." },
          { text: "My house is ___ than yours.", options: ["big", "bigger", "biggest", "more big"], correct: 1, explanation: "Comparative - bigger." },
          { text: "That was ___ experience.", options: ["bad", "worse", "worst", "more bad"], correct: 2, explanation: "Superlative - the worst." },
          { text: "This task is ___ simple.", options: ["more", "most", "much", "very"], correct: 1, explanation: "Superlative - the most simple." }
        ],
        A2: [
          { text: "He is ___ than his brother.", options: ["taller", "tall", "tallest", "more tall"], correct: 0, explanation: "Comparative - taller than." },
          { text: "This is ___ book I've ever read.", options: ["good", "better", "the best", "more good"], correct: 2, explanation: "Superlative - the best." },
          { text: "She is ___ than me.", options: ["intelligent", "more intelligent", "most intelligent", "intelligenter"], correct: 1, explanation: "Uzun söz - more intelligent." },
          { text: "This is ___ day of my life.", options: ["happy", "happier", "the happiest", "more happy"], correct: 2, explanation: "Superlative - the happiest." },
          { text: "He drives ___ than me.", options: ["careful", "more careful", "most careful", "carefuller"], correct: 1, explanation: "Comparative - more careful." },
          { text: "This is ___ expensive watch.", options: ["less", "least", "the least", "lesser"], correct: 2, explanation: "The least expensive - ən az bahalı." },
          { text: "She is ___ than her mother.", options: ["beautiful", "more beautiful", "most beautiful", "beautifuller"], correct: 1, explanation: "More beautiful than." },
          { text: "This is ___ difficult test.", options: ["the most", "more", "much", "very"], correct: 0, explanation: "The most difficult - ən çətin." },
          { text: "He is ___ person I know.", options: ["kind", "kinder", "the kindest", "more kind"], correct: 2, explanation: "Superlative - the kindest." },
          { text: "This car is ___ than that one.", options: ["cheap", "cheaper", "cheapest", "more cheap"], correct: 1, explanation: "Comparative - cheaper." },
          { text: "She speaks ___ than him.", options: ["clear", "clearer", "clearest", "more clear"], correct: 1, explanation: "Comparative - clearer." },
          { text: "This is ___ comfortable chair.", options: ["more", "most", "the most", "much"], correct: 2, explanation: "The most comfortable." },
          { text: "He is ___ than his father.", options: ["strong", "stronger", "strongest", "more strong"], correct: 1, explanation: "Comparative - stronger." },
          { text: "This is ___ important rule.", options: ["more", "the most", "much", "very"], correct: 1, explanation: "The most important." },
          { text: "She is ___ than her sister.", options: ["friendly", "friendlier", "friendliest", "more friendly"], correct: 1, explanation: "Friendlier or more friendly both ok." }
        ],
        B1: [
          { text: "The more you study, ___ you learn.", options: ["the more", "more", "most", "the most"], correct: 0, explanation: "The more... the more - nə qədər çox... o qədər çox." },
          { text: "She is ___ than anyone else.", options: ["more talented", "talented", "most talented", "the most talented"], correct: 0, explanation: "Comparative - more talented than." },
          { text: "This is ___ of all.", options: ["better", "best", "the best", "more good"], correct: 2, explanation: "Superlative - the best of all." },
          { text: "He is ___ than his reputation.", options: ["better", "best", "good", "more good"], correct: 0, explanation: "Comparative - better than." },
          { text: "The weather is getting ___ and ___ .", options: ["hot, hot", "hotter, hotter", "hottest, hottest", "more hot, more hot"], correct: 1, explanation: "Double comparative - hotter and hotter." },
          { text: "She is ___ student in the class.", options: ["more intelligent", "the most intelligent", "intelligenter", "most intelligent"], correct: 1, explanation: "Superlative - the most intelligent." },
          { text: "This is ___ book I own.", options: ["less interesting", "the least interesting", "least interesting", "more less interesting"], correct: 1, explanation: "The least interesting - ən az maraqlı." },
          { text: "He is ___ than his brother.", options: ["less tall", "shorter", "more short", "shortest"], correct: 1, explanation: "Comparative - shorter." },
          { text: "This is ___ problem we face.", options: ["more serious", "the most serious", "seriouser", "most serious"], correct: 1, explanation: "The most serious - ən ciddi." },
          { text: "She is ___ person I've met.", options: ["more kind", "the kindest", "kinder", "most kind"], correct: 1, explanation: "Superlative - the kindest." },
          { text: "The faster you run, ___ you'll get tired.", options: ["the sooner", "sooner", "more soon", "the more soon"], correct: 0, explanation: "The faster... the sooner." },
          { text: "This is ___ option.", options: ["less bad", "the least bad", "least bad", "more less bad"], correct: 1, explanation: "The least bad - ən az pis." },
          { text: "He is ___ than he looks.", options: ["stronger", "strong", "strongest", "more strong"], correct: 0, explanation: "Comparative - stronger than." },
          { text: "This is ___ movie ever made.", options: ["more expensive", "the most expensive", "expensivest", "most expensive"], correct: 1, explanation: "The most expensive - ən bahalı." },
          { text: "She is ___ than she appears.", options: ["more wise", "wiser", "wisest", "most wise"], correct: 1, explanation: "Comparative - wiser." }
        ],
        B2: [
          { text: "The ___ you have, the ___ you want.", options: ["more, more", "most, most", "much, much", "many, many"], correct: 0, explanation: "The more... the more - nə qədər çox... o qədər çox." },
          { text: "She is ___ candidate for the job.", options: ["by far the best", "more better", "the more best", "bestest"], correct: 0, explanation: "By far the best - ən yaxşı." },
          { text: "This is ___ movie I've seen.", options: ["far the best", "the best by far", "by far the best", "best by far"], correct: 2, explanation: "By far the best - mükəmməl." },
          { text: "He is ___ intelligent of the two.", options: ["the more", "more", "most", "the most"], correct: 0, explanation: "İki arasında müqayisə - the more intelligent." },
          { text: "This is ___ expensive option.", options: ["slightly less", "more less", "much less", "less more"], correct: 0, explanation: "Slightly less expensive - bir az az bahalı." },
          { text: "She is ___ beautiful as her sister.", options: ["as", "more", "most", "so"], correct: 0, explanation: "As... as - bərabərlik dərəcəsi." },
          { text: "He is not ___ tall as his father.", options: ["as", "more", "most", "so"], correct: 0, explanation: "Not as tall as - o qədər hündür deyil." },
          { text: "This is ___ interesting book I've read.", options: ["by far the most", "more most", "most by far", "the more most"], correct: 0, explanation: "By far the most interesting - ən maraqlısı." },
          { text: "The ___ you sleep, the ___ you feel.", options: ["more, better", "much, good", "many, best", "most, well"], correct: 0, explanation: "The more you sleep, the better you feel." },
          { text: "She is ___ the two.", options: ["the smarter of", "smarter of", "the smartest of", "smartest of"], correct: 0, explanation: "The smarter of the two - ikisinin daha ağıllısı." },
          { text: "This is ___ hardest test I've taken.", options: ["by far the", "more the", "the more", "far the"], correct: 0, explanation: "By far the hardest - ən çətini." },
          { text: "He is ___ better than his rival.", options: ["far", "more", "much", "very"], correct: 0, explanation: "Far better - daha yaxşı." },
          { text: "The weather is getting ___ worse.", options: ["even", "more", "much", "very"], correct: 0, explanation: "Even worse - daha da pis." },
          { text: "She is ___ the most talented singer.", options: ["arguably", "more", "much", "very"], correct: 0, explanation: "Arguably the most - bəlkə də ən." },
          { text: "This is ___ the worst decision.", options: ["by far", "more", "much", "very"], correct: 0, explanation: "By far the worst - ən pisi." }
        ],
        C1: [
          { text: "The ___ you know, the ___ you realize you don't know.", options: ["more, more", "most, most", "much, much", "many, many"], correct: 0, explanation: "The more... the more - nə qədər çox bilsən, o qədər çox bilmədiyini anlayırsan." },
          { text: "She is ___ the most accomplished artist.", options: ["quite possibly", "more", "much", "very"], correct: 0, explanation: "Quite possibly the most - ola bilsin ən." },
          { text: "This is ___ the best performance I've witnessed.", options: ["without a doubt", "more", "much", "very"], correct: 0, explanation: "Without a doubt the best - şübhəsiz ən yaxşı." },
          { text: "He is ___ the least qualified candidate.", options: ["arguably", "more", "much", "very"], correct: 0, explanation: "Arguably the least - bəlkə də ən az." },
          { text: "The ___ you practice, the ___ you become.", options: ["more, more proficient", "most, most proficient", "much, much proficient", "many, many proficient"], correct: 0, explanation: "The more you practice, the more proficient you become." },
          { text: "She is ___ the most dedicated teacher I know.", options: ["hands down", "more", "much", "very"], correct: 0, explanation: "Hands down the most - ən." },
          { text: "This is ___ the hardest decision of my life.", options: ["easily", "more", "much", "very"], correct: 0, explanation: "Easily the hardest - asanlıqla ən çətin." },
          { text: "He is ___ the worst candidate for the job.", options: ["by a long shot", "more", "much", "very"], correct: 0, explanation: "By a long shot the worst - ən pis." },
          { text: "The ___ you explain, the ___ I get confused.", options: ["more, more", "most, most", "much, much", "many, many"], correct: 0, explanation: "The more you explain, the more I get confused." },
          { text: "She is ___ the most influential person I've met.", options: ["undoubtedly", "more", "much", "very"], correct: 0, explanation: "Undoubtedly the most - şübhəsiz ən." },
          { text: "This is ___ the most significant discovery.", options: ["arguably", "more", "much", "very"], correct: 0, explanation: "Arguably the most - iddia edilə bilər ki ən." },
          { text: "He is ___ the least experienced member.", options: ["clearly", "more", "much", "very"], correct: 0, explanation: "Clearly the least - aydın ən az." },
          { text: "The ___ you read, the ___ you'll understand.", options: ["more, better", "most, best", "much, good", "many, well"], correct: 0, explanation: "The more you read, the better you'll understand." },
          { text: "She is ___ the most qualified person for this role.", options: ["without question", "more", "much", "very"], correct: 0, explanation: "Without question the most - sualsız ən." },
          { text: "This is ___ the greatest achievement of all.", options: ["quite simply", "more", "much", "very"], correct: 0, explanation: "Quite simply the greatest - sadəcə ən böyük." }
        ]
      },
      'Synonyms Antonyms': {
        A1: [
          { text: "Happy means ___", options: ["sad", "joyful", "angry", "tired"], correct: 1, explanation: "Happy = joyful - xoşbəxt." },
          { text: "Fast means ___", options: ["slow", "quick", "late", "early"], correct: 1, explanation: "Fast = quick - sürətli." },
          { text: "Big means ___", options: ["small", "large", "tiny", "short"], correct: 1, explanation: "Big = large - böyük." },
          { text: "Cold means ___", options: ["hot", "warm", "chilly", "cool"], correct: 2, explanation: "Cold = chilly - soyuq." },
          { text: "Easy means ___", options: ["hard", "simple", "difficult", "tough"], correct: 1, explanation: "Easy = simple - asan." },
          { text: "Angry means ___", options: ["calm", "mad", "peaceful", "happy"], correct: 1, explanation: "Angry = mad - qəzəbli." },
          { text: "Begin means ___", options: ["end", "start", "finish", "stop"], correct: 1, explanation: "Begin = start - başlamaq." },
          { text: "Old means ___", options: ["young", "ancient", "new", "modern"], correct: 1, explanation: "Old = ancient - köhnə." },
          { text: "Smart means ___", options: ["dumb", "clever", "stupid", "slow"], correct: 1, explanation: "Smart = clever - ağıllı." },
          { text: "Rich means ___", options: ["poor", "wealthy", "needy", "broke"], correct: 1, explanation: "Rich = wealthy - varlı." },
          { text: "Clean means ___", options: ["dirty", "neat", "messy", "dusty"], correct: 1, explanation: "Clean = neat - təmiz." },
          { text: "Strong means ___", options: ["weak", "powerful", "feeble", "fragile"], correct: 1, explanation: "Strong = powerful - güclü." },
          { text: "Quick means ___", options: ["slow", "fast", "late", "leisurely"], correct: 1, explanation: "Quick = fast - tez." },
          { text: "Hard means ___", options: ["easy", "difficult", "simple", "soft"], correct: 1, explanation: "Hard = difficult - çətin." },
          { text: "Correct means ___", options: ["wrong", "right", "false", "incorrect"], correct: 1, explanation: "Correct = right - düzgün." }
        ],
        A2: [
          { text: "Happy antonym is ___", options: ["joyful", "sad", "cheerful", "glad"], correct: 1, explanation: "Happy əksi = sad - kədərli." },
          { text: "Fast antonym is ___", options: ["quick", "rapid", "slow", "speedy"], correct: 2, explanation: "Fast əksi = slow - yavaş." },
          { text: "Big antonym is ___", options: ["large", "huge", "small", "enormous"], correct: 2, explanation: "Big əksi = small - kiçik." },
          { text: "Hot antonym is ___", options: ["warm", "cold", "boiling", "scorching"], correct: 1, explanation: "Hot əksi = cold - soyuq." },
          { text: "Rich antonym is ___", options: ["wealthy", "poor", "affluent", "prosperous"], correct: 1, explanation: "Rich əksi = poor - kasıb." },
          { text: "Strong antonym is ___", options: ["powerful", "weak", "mighty", "sturdy"], correct: 1, explanation: "Strong əksi = weak - zəif." },
          { text: "Clean antonym is ___", options: ["neat", "dirty", "tidy", "spotless"], correct: 1, explanation: "Clean əksi = dirty - çirkli." },
          { text: "Early antonym is ___", options: ["soon", "late", "prompt", "punctual"], correct: 1, explanation: "Early əksi = late - gec." },
          { text: "Noisy antonym is ___", options: ["loud", "quiet", "boisterous", "clamorous"], correct: 1, explanation: "Noisy əksi = quiet - sakit." },
          { text: "Light antonym is ___", options: ["bright", "dark", "luminous", "radiant"], correct: 1, explanation: "Light əksi = dark - qaranlıq." },
          { text: "Wet antonym is ___", options: ["moist", "dry", "damp", "soaked"], correct: 1, explanation: "Wet əksi = dry - quru." },
          { text: "Full antonym is ___", options: ["complete", "empty", "entire", "total"], correct: 1, explanation: "Full əksi = empty - boş." },
          { text: "Open antonym is ___", options: ["ajar", "closed", "unlocked", "accessible"], correct: 1, explanation: "Open əksi = closed - qapalı." },
          { text: "Young antonym is ___", options: ["youthful", "old", "juvenile", "immature"], correct: 1, explanation: "Young əksi = old - qoca." },
          { text: "High antonym is ___", options: ["tall", "low", "lofty", "elevated"], correct: 1, explanation: "High əksi = low - aşağı." }
        ],
        B1: [
          { text: "Begin synonym is ___", options: ["end", "start", "finish", "complete"], correct: 1, explanation: "Begin synonym = start - başlamaq." },
          { text: "Purchase synonym is ___", options: ["sell", "buy", "trade", "exchange"], correct: 1, explanation: "Purchase = buy - almaq." },
          { text: "Assist synonym is ___", options: ["hinder", "help", "block", "obstruct"], correct: 1, explanation: "Assist = help - kömək etmək." },
          { text: "Brave synonym is ___", options: ["cowardly", "courageous", "fearful", "timid"], correct: 1, explanation: "Brave = courageous - cəsur." },
          { text: "Calm synonym is ___", options: ["agitated", "peaceful", "upset", "disturbed"], correct: 1, explanation: "Calm = peaceful - sakit." },
          { text: "Create synonym is ___", options: ["destroy", "make", "ruin", "break"], correct: 1, explanation: "Create = make - yaratmaq." },
          { text: "Destroy synonym is ___", options: ["build", "ruin", "create", "construct"], correct: 1, explanation: "Destroy = ruin - məhv etmək." },
          { text: "Famous synonym is ___", options: ["unknown", "renowned", "obscure", "nameless"], correct: 1, explanation: "Famous = renowned - məşhur." },
          { text: "Gather synonym is ___", options: ["scatter", "collect", "spread", "disperse"], correct: 1, explanation: "Gather = collect - toplamaq." },
          { text: "Help synonym is ___", options: ["hinder", "aid", "obstruct", "block"], correct: 1, explanation: "Help = aid - yardım." },
          { text: "Increase synonym is ___", options: ["decrease", "grow", "reduce", "lessen"], correct: 1, explanation: "Increase = grow - artmaq." },
          { text: "Join synonym is ___", options: ["separate", "connect", "divide", "split"], correct: 1, explanation: "Join = connect - birləşmək." },
          { text: "Keep synonym is ___", options: ["lose", "retain", "drop", "release"], correct: 1, explanation: "Keep = retain - saxlamaq." },
          { text: "Love synonym is ___", options: ["hate", "adore", "despise", "detest"], correct: 1, explanation: "Love = adore - sevmək." },
          { text: "Make synonym is ___", options: ["break", "create", "destroy", "ruin"], correct: 1, explanation: "Make = create - etmək." }
        ],
        B2: [
          { text: "Abundant antonym is ___", options: ["plentiful", "scarce", "ample", "copious"], correct: 1, explanation: "Abundant əksi = scarce - az." },
          { text: "Benevolent antonym is ___", options: ["kind", "malevolent", "charitable", "altruistic"], correct: 1, explanation: "Benevolent əksi = malevolent - pisniyyətli." },
          { text: "Cautious antonym is ___", options: ["careful", "reckless", "prudent", "vigilant"], correct: 1, explanation: "Cautious əksi = reckless - ehtiyatsız." },
          { text: "Diligent antonym is ___", options: ["hardworking", "lazy", "industrious", "assiduous"], correct: 1, explanation: "Diligent əksi = lazy - tənbəl." },
          { text: "Eloquent antonym is ___", options: ["fluent", "inarticulate", "articulate", "expressive"], correct: 1, explanation: "Eloquent əksi = inarticulate - söz tapa bilməyən." },
          { text: "Frugal antonym is ___", options: ["thrifty", "extravagant", "economical", "sparing"], correct: 1, explanation: "Frugal əksi = extravagant - israfçı." },
          { text: "Generous antonym is ___", options: ["charitable", "stingy", "benevolent", "altruistic"], correct: 1, explanation: "Generous əksi = stingy - xəsis." },
          { text: "Humble antonym is ___", options: ["modest", "arrogant", "meek", "unassuming"], correct: 1, explanation: "Humble əksi = arrogant - təkəbbürlü." },
          { text: "Innovative synonym is ___", options: ["traditional", "original", "conventional", "old-fashioned"], correct: 1, explanation: "Innovative = original - yenilikçi." },
          { text: "Judicious synonym is ___", options: ["unwise", "wise", "foolish", "reckless"], correct: 1, explanation: "Judicious = wise - müdrik." },
          { text: "Keen synonym is ___", options: ["dull", "sharp", "blunt", "obtuse"], correct: 1, explanation: "Keen = sharp - kəskin." },
          { text: "Lucid synonym is ___", options: ["confusing", "clear", "obscure", "vague"], correct: 1, explanation: "Lucid = clear - aydın." },
          { text: "Meticulous synonym is ___", options: ["careless", "thorough", "sloppy", "negligent"], correct: 1, explanation: "Meticulous = thorough - vasvası." },
          { text: "Novel synonym is ___", options: ["common", "new", "ordinary", "usual"], correct: 1, explanation: "Novel = new - yeni." },
          { text: "Optimistic antonym is ___", options: ["hopeful", "pessimistic", "positive", "cheerful"], correct: 1, explanation: "Optimistic əksi = pessimistic - bədbin." }
        ],
        C1: [
          { text: "Ephemeral synonym is ___", options: ["permanent", "temporary", "eternal", "everlasting"], correct: 1, explanation: "Ephemeral = temporary - müvəqqəti." },
          { text: "Gregarious synonym is ___", options: ["solitary", "sociable", "lonely", "reserved"], correct: 1, explanation: "Gregarious = sociable - ünsiyyətcil." },
          { text: "Ineffable synonym is ___", options: ["indescribable", "expressible", "definable", "utterable"], correct: 0, explanation: "Ineffable = indescribable - izah olunmaz." },
          { text: "Loquacious synonym is ___", options: ["taciturn", "talkative", "silent", "reserved"], correct: 1, explanation: "Loquacious = talkative - danışqan." },
          { text: "Magnanimous synonym is ___", options: ["petty", "generous", "selfish", "mean"], correct: 1, explanation: "Magnanimous = generous - ali mərtəbəli." },
          { text: "Nefarious synonym is ___", options: ["virtuous", "wicked", "righteous", "honorable"], correct: 1, explanation: "Nefarious = wicked - şərli." },
          { text: "Obfuscate synonym is ___", options: ["clarify", "confuse", "explain", "illuminate"], correct: 1, explanation: "Obfuscate = confuse - qarışdırmaq." },
          { text: "Pragmatic synonym is ___", options: ["idealistic", "practical", "unrealistic", "visionary"], correct: 1, explanation: "Pragmatic = practical - praktik." },
          { text: "Quixotic synonym is ___", options: ["realistic", "idealistic", "pragmatic", "practical"], correct: 1, explanation: "Quixotic = idealistic - xəyali." },
          { text: "Recalcitrant synonym is ___", options: ["obedient", "stubborn", "compliant", "docile"], correct: 1, explanation: "Recalcitrant = stubborn - inadcıl." },
          { text: "Sagacious synonym is ___", options: ["foolish", "wise", "stupid", "ignorant"], correct: 1, explanation: "Sagacious = wise - müdrik." },
          { text: "Taciturn synonym is ___", options: ["talkative", "reserved", "loquacious", "garrulous"], correct: 1, explanation: "Taciturn = reserved - az danışan." },
          { text: "Ubiquitous synonym is ___", options: ["rare", "omnipresent", "scarce", "uncommon"], correct: 1, explanation: "Ubiquitous = omnipresent - hər yerdə olan." },
          { text: "Voracious synonym is ___", options: ["insatiable", "satisfied", "full", "content"], correct: 0, explanation: "Voracious = insatiable - doymaz." },
          { text: "Zealous synonym is ___", options: ["apathetic", "enthusiastic", "indifferent", "uninterested"], correct: 1, explanation: "Zealous = enthusiastic - həvəsli." }
        ]
      }
    };

    if (allQuizzes[topicName] && allQuizzes[topicName][levelId]) {
      return allQuizzes[topicName][levelId];
    }
    return [
      { text: "Question 1 for " + topicName + " at " + levelId + " level.", options: ["Option A", "Option B", "Option C", "Option D"], correct: 0, explanation: "Sample explanation." },
      { text: "Question 2 for " + topicName + " at " + levelId + " level.", options: ["Option A", "Option B", "Option C", "Option D"], correct: 0, explanation: "Sample explanation." },
      { text: "Question 3 for " + topicName + " at " + levelId + " level.", options: ["Option A", "Option B", "Option C", "Option D"], correct: 0, explanation: "Sample explanation." },
      { text: "Question 4 for " + topicName + " at " + levelId + " level.", options: ["Option A", "Option B", "Option C", "Option D"], correct: 0, explanation: "Sample explanation." },
      { text: "Question 5 for " + topicName + " at " + levelId + " level.", options: ["Option A", "Option B", "Option C", "Option D"], correct: 0, explanation: "Sample explanation." }
    ];
  };

  if (selectedTopic && selectedLevel) {
    return (
      <QuizComponent 
        topic={selectedTopic} 
        level={selectedLevel} 
        onBack={() => { setSelectedTopic(null); setSelectedLevel(null); }}
        getQuestions={getQuestions}
      />
    );
  }

  if (selectedTopic) {
    return (
      <>
        <div className="page-hero">
          <button className="back-btn" onClick={() => setSelectedTopic(null)}> Back to Topics</button>
          <h2>Select Your Level - {selectedTopic.name}</h2>
          <p>Choose the difficulty level that matches your knowledge. Each level has 15 unique questions.</p>
        </div>
        <div className="level-selection-container">
          {levels.map((level) => (
            <div key={level.id} className="level-card" onClick={() => setSelectedLevel(level)}>
              <div className="level-header">
                <span className="level-badge">{level.id}</span>
                <span className="level-difficulty">{level.difficulty}</span>
              </div>
              <h3>{level.name}</h3>
              <p>{level.description}</p>
              <div className="level-stats">
                <span>15 Questions</span>
                <span>No Time Limit</span>
              </div>
              <button className="level-start-btn">Start Test</button>
            </div>
          ))}
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="page-hero">
        <h2>Choose Your Quiz Topic</h2>
        <p>Select a grammar topic to test your knowledge. Each topic has 5 difficulty levels with 15 unique questions each.</p>
      </div>
      <div className="topic-selection-container">
        {quizTopics.map((topic) => (
          <div key={topic.id} className="topic-card" onClick={() => setSelectedTopic(topic)}>
            <h3>{topic.name}</h3>
            <p>{topic.description}</p>
            <div className="topic-footer">
              <span className="topic-levels">5 Levels Available</span>
              <span className="topic-arrow">→</span>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default QuizPage;