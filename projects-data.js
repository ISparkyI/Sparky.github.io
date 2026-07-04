/* ==========================================================
   PROJECT DATA
   Add / edit / remove objects in this array.

   FIELDS:
   - title       (string)  — project name
   - category    (string)  — one of: "games", "apps", "web", "other"
   - description (string | { en, uk })
                           — short description. Can be a plain string
                             (shown as-is in both languages) OR an object
                             with "en" and "uk" keys for bilingual support:
                             description: {
                               en: "English description here.",
                               uk: "Опис українською тут.",
                             }
   - tags        (array)   — tech stack shown as small badges
   - video       (string, optional) — YouTube link. Shown in the Video tab.
                             Leave "" if none.
   - images      (array of strings, optional) — screenshot paths/URLs,
                             shown in the Photo tab. Put files in an
                             "images/" folder. Leave as [] if none.
   - demo        (string, optional) — link for the main button.
                             Leave "" if not ready yet.
   - repo        (string, optional) — source code link. Leave "" to hide
                             the Code button.

   MEDIA TABS: If a project has both images and video, a Photo / Video
   tab strip appears at the top of the card. Photos are shown first.
   If only one type — no tabs, just shown directly.
   If neither — a placeholder is shown.

   INFINITE CAROUSEL: If a project has more than 1 image, the photo
   carousel loops infinitely (wraps from last back to first).
   ========================================================== */
const PROJECTS = [
  {
    title: "Sprunki: Knockout",
    category: "games",
    description: {
      en: "Sprunki: Knockout is a fast-paced, chaotic arena brawler where your main goal is to push opponents out of the zone and be the last one standing.",
      uk: "Sprunki: Knockout — швидкий хаотичний арена-бrawler, де головна мета — зіштовхнути суперників із зони та залишитись останнім.",
    },
    tags: ["Unity", "C#"],
    video: "https://www.youtube.com/watch?v=hQ3e4fCk-r8",
    images: ["images/Play_Market_1.png", "images/Play_Market_2.png", "images/Play_Market_3.png", "images/Play_Market_4.png"],
    demo: "https://play.google.com/store/apps/details?id=com.GameStageStudio.SprunkiKnockout",
    repo: "",
  },
  {
    title: "Sprunki Phase: Minigame",
    category: "games",
    description: {
      en: "Sprunki Phase: Minigame is a vibrant collection of fun and addictive minigames set in the world of Sprunki, perfect for all players!",
      uk: "Sprunki Phase: Minigame — це яскрава збірка захопливих мініігор у світі Sprunki, яка підійде для кожного гравця!",
    },
    tags: ["Unity", "C#"],
    video: "",
    images: ["images/Play_1.png", "images/Play_2.png", "images/Play_3.png"],
    demo: "https://play.google.com/store/apps/details?id=com.GameStageStudio.SprunkiMinigames",
    repo: "",
  },
  {
    title: "Memory Islands: Brain Trainer",
    category: "games",
    description: {
      en: "Memory Islands: Brain Trainer is a captivating card game and mobile brain trainer that turns classic memory and reaction improvement into an exciting adventure.",
      uk: "Memory Islands: Brain Trainer — це захоплива карткова гра та мобільний тренажер для мозку, який перетворює класичне покращення пам'яті та реакції на цікаву пригоду.",
    },
    tags: ["Unity", "C#"],
    video: "https://www.youtube.com/shorts/EkoJNZdBOko",
    images: ["images/mi/mi_1.png", "images/mi/mi_2.png", "images/mi/mi_3.png", "images/mi/mi_4.png", "images/mi/mi_5.png", "images/mi/mi_6.png", "images/mi/mi_7.png"],
    demo: "https://play.google.com/store/apps/details?id=com.GameStageStudio.MemoryIslands",
    repo: "",
  },
  {
    title: "Easy Estimate",
    category: "apps",
    price:9.99,
    description: {
      en: `
    <ul class="feature-list">
      <li><strong>Estimate Calculation</strong><br>
      Quickly add tasks, quantities, and unit prices to calculate the total project cost.</li>

      <li><strong>Material Tracking</strong><br>
      Track construction materials used for every project.</li>

      <li><strong>Client Management</strong><br>
      Store customer contacts and project addresses.</li>

      <li><strong>PDF Export</strong><br>
      Generate professional PDF estimates ready for sharing.</li>

      <li><strong>Smart Templates</strong><br>
      Save frequently used tasks to speed up future estimates.</li>
    </ul>

    <p><strong>⚠️ Note</strong><br>
    All data is stored locally on your device and is not synced to the cloud. Deleting the app will permanently erase all saved data. To keep your estimates, export them as PDF files before uninstalling the application.</p>
    `,

      uk: `
    <ul class="feature-list">
      <li><strong>Розрахунок кошторисів</strong><br>
      Додавайте види робіт, обсяги та ціни за одиницю для миттєвого розрахунку вартості проєкту.</li>

      <li><strong>Облік матеріалів</strong><br>
      Контролюйте використання будівельних матеріалів для кожного об'єкта.</li>

      <li><strong>База клієнтів</strong><br>
      Зберігайте контакти замовників і адреси об'єктів.</li>

      <li><strong>Експорт у PDF</strong><br>
      Створюйте професійні PDF-кошториси для швидкого надсилання клієнтам.</li>

      <li><strong>Розумні шаблони</strong><br>
      Автоматично зберігайте часто використовувані роботи для швидшого створення нових кошторисів.</li>
    </ul>

    <p><strong>⚠️ Важливо</strong><br>
    Усі дані зберігаються лише локально на вашому пристрої та не синхронізуються з хмарою. Якщо видалити застосунок, усі збережені дані буде втрачено. Щоб зберегти кошториси, експортуйте їх у PDF перед видаленням застосунку.</p>
    `,
    },
    tags: ["Android Studio", "Flutter", "Kotlin"],
    video: "",
    images: ["images/ee/EE2.jpg", "images/ee/EE3.jpg", "images/ee/EE4.jpg", "images/ee/EE1.jpg", "images/ee/EE5.jpg"],
    demo: "",
    repo: "",
  },
];