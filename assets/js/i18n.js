/**
 * KeepNotes for Nextcloud - Internationalization (i18n) Dictionary
 * Supports Russian (ru) and English (en)
 */

const translations = {
  ru: {
    // Meta & SEO
    pageTitle: "KeepNotes for Nextcloud — Android-клиент в стиле Google Keep",
    metaDescription: "Современный и быстрый Android-клиент для Nextcloud Notes с интерфейсом в стиле Google Keep. Полноценный Offline-First, Material 3, двусторонняя синхронизация, интерактивные чек-листы и биометрия.",
    privacyPageTitle: "Политика конфиденциальности — KeepNotes for Nextcloud",
    privacyMetaDesc: "Политика конфиденциальности Android-приложения KeepNotes for Nextcloud. 100% FOSS, без трекеров, рекламы и передачи данных третьим лицам.",

    // Nav
    navFeatures: "Возможности",
    navScreenshots: "Скриншоты",
    navHowTo: "Как начать",
    navSecurity: "Безопасность",
    navFaq: "FAQ",
    navDownload: "Скачать",
    starOnGithub: "Звезда на GitHub",

    // Hero
    heroBadge: "100% Free & Open Source • Без рекламы и трекеров",
    heroTitle: "Клиент Nextcloud Notes с интерфейсом в стиле Google Keep",
    heroSubtitle: "Мгновенная работа с заметками, интерактивные чек-листы, надёжный Offline-First и двусторонняя синхронизация с вашим облаком Nextcloud.",
    downloadApk: "Скачать APK",
    downloadFdroid: "Доступно в F-Droid",
    fdroidComingSoon: "Скоро",
    ctaFdroidSoon: "F-Droid — Скоро",
    footerFdroid: "F-Droid Каталог",
    soonBadge: "Скоро",
    viewOnGithub: "Исходный код",
    heroMockupAlt: "Главный экран KeepNotes for Nextcloud",

    // Highlights / Stats badge
    statsOffline: "Offline-First",
    statsOfflineDesc: "Локальная БД Room",
    statsSync: "2-Way Sync",
    statsSyncDesc: "По etag и меткам времени",
    statsPrivacy: "0 трекеров",
    statsPrivacyDesc: "Полная приватность",

    // Features Section
    featuresHeadingPre: "Функционал приложения",
    featuresHeading: "Всё необходимое для ваших заметок",
    featuresSubheading: "Создано с упором на приватность данных, скорость работы и удобство интерфейса",
    
    feature1Title: "Интерфейс Google Keep",
    feature1Desc: "Адаптивная сетка карточек (Staggered Grid), поддержка Material Design 3, динамические цвета и светлая/тёмная темы.",
    
    feature2Title: "Полноценный Offline-First",
    feature2Desc: "Локальная база данных Room выступает единым источником правды. Мгновенное сохранение и доступ к заметкам без ожидания сети.",
    
    feature3Title: "Двусторонняя синхронизация",
    feature3Desc: "Автоматическая синхронизация с сервером по etag и временным меткам с визуальной индикацией прогресса и статуса.",
    
    feature4Title: "Markdown и интерактивные списки",
    feature4Desc: "Крупные чекбоксы с зачёркиванием, умный переход на новую строку по Enter и быстрая конвертация текста в чек-лист.",
    
    feature5Title: "Биометрическая защита",
    feature5Desc: "Защитите личные записи: надёжная блокировка приложения по отпечатку пальца, скану лица или системному PIN-коду устройства.",
    
    feature6Title: "Бесшовный вход (Login Flow v2)",
    feature6Desc: "Вход в 1 клик через браузер: не нужно вручную копировать URL сервера и генерировать сложные пароли приложений.",
    
    feature7Title: "100% Приватность и FOSS",
    feature7Desc: "Никаких Google Play Services, встроенной рекламы, телеметрии и аналитики. Ваши заметки принадлежат только вам.",
    
    feature8Title: "Персонализация и размеры шрифтов",
    feature8Desc: "Независимый выбор масштаба шрифтов для карточек и редактора, удобная смена языка интерфейса и навигация по категориям.",

    // Screenshots Section
    screenshotsHeadingPre: "Галерея интерфейса",
    screenshotsHeading: "Продуманный до мелочей дизайн",
    screenshotsSubheading: "Ознакомьтесь с реальными скриншотами приложения на русском языке",
    screenshotsHint: "Нажмите на любой скриншот для полноэкранного просмотра",

    screenshot1Title: "Главный экран заметок",
    screenshot1Desc: "Адаптивная сетка карточек с интерактивными чекбоксами и быстрым поиском.",
    screenshot2Title: "Просмотр чек-листа",
    screenshot2Desc: "Удобное вычёркивание задач в один тап прямо с экрана просмотра.",
    screenshot3Title: "Редактор списков",
    screenshot3Desc: "Умное автодополнение пунктов по Enter и поддержка Markdown.",
    screenshot4Title: "Конвертация в список",
    screenshot4Desc: "Превращение обычного текста в интерактивный чек-лист в один клик.",
    screenshot5Title: "Управление категориями",
    screenshot5Desc: "Быстрая сортировка заметок по проектам, темам и тегам.",
    screenshot6Title: "Гибкие настройки",
    screenshot6Desc: "Выбор темы оформления, настройка размера шрифта и биометрический замок.",

    // How to start (3 steps)
    howToHeadingPre: "Быстрый старт",
    howToHeading: "Как начать пользоваться за 3 шага",
    howToSubheading: "Простая настройка без сложных инструкций",
    step1Num: "01",
    step1Title: "Включите Notes в Nextcloud",
    step1Desc: "В веб-интерфейсе вашего сервера Nextcloud перейдите в «Приложения» и включите официальное приложение «Notes».",
    step2Num: "02",
    step2Title: "Установите KeepNotes",
    step2Desc: "Скачайте актуальный APK-файл со страницы релизов GitHub (релиз в каталоге F-Droid готовится к публикации).",
    step3Num: "03",
    step3Title: "Войдите в 1 клик",
    step3Desc: "Откройте приложение, введите адрес вашего облака и подтвердите авторизацию в браузере через Nextcloud Login Flow v2.",

    // Security & Architecture
    secHeadingPre: "Архитектура и доверие",
    secHeading: "Ваши данные под вашим полным контролем",
    secSubheading: "Прямая защищённая связь между смартфоном и вашим сервером без посредников",
    secDirectTitle: "Прямое соединение",
    secDirectDesc: "Приложение связывается напрямую только с указанным вами доменом Nextcloud по шифрованному протоколу HTTPS. Серверов-посредников не существует в принципе.",
    secNoTrackTitle: "Без трекеров и аналитики",
    secNoTrackDesc: "Никаких Firebase, Google Analytics, Sentry или Facebook SDK. Ни один байт телеметрии не покидает ваше устройство.",
    secBiometricTitle: "Локальный сейф",
    secBiometricDesc: "Чувствительные учетные данные хранятся в защищённом хранилище Android EncryptedSharedPreferences и закрыты биометрией.",

    // Architecture Diagram
    archSchemaBadge: "Архитектурная схема взаимодействия",
    archPhoneTitle: "Ваш смартфон",
    archPhoneSub: "KeepNotes + Room DB",
    archHttpsBadge: "Прямой HTTPS",
    archZeroRelay: "Zero-Relay",
    archServerTitle: "Ваш Nextcloud",
    archServerSub: "Notes API (v1/v2)",
    archFooter: "🔒 Полная изоляция от любых сторонних серверов, облаков и аналитики.",

    // FAQ Section
    faqHeadingPre: "Вопросы и ответы",
    faqHeading: "Часто задаваемые вопросы",
    faqSubheading: "Ответы на популярные вопросы о работе приложения и безопасности",

    faqQ1: "Нужен ли постоянный интернет для работы приложения?",
    faqA1: "Нет! KeepNotes спроектирован по парадигме Offline-First. Локальная база Room является единым источником правды. Вы можете читать, создавать и редактировать любые заметки без подключения к сети. Как только появится интернет, приложение автоматически выполнит быструю двустороннюю синхронизацию.",

    faqQ2: "Поддерживается ли тёмная тема оформления?",
    faqA2: "Да. Приложение полностью поддерживает тёмную тему и концепцию Material Design 3, автоматически адаптируя интерфейс и цвета под системную тему вашего Android-устройства.",

    faqQ3: "Хранятся ли мои пароли и заметки на ваших серверах?",
    faqA3: "Категорически нет. У разработчиков приложения нет серверов для сбора данных. Приложение общается исключительно между вашим устройством и вашим сервером Nextcloud. Используется современный протокол Login Flow v2, при котором приложению передаётся только уникальный защищённый токен сессии.",

    faqQ4: "Можно ли пользоваться приложением без сервисов Google Play?",
    faqA4: "Да, абсолютно. В KeepNotes нет ни одной проприетарной библиотеки Google. Приложение распространяется в виде прямых APK-файлов на GitHub Releases, а также готовится к публикации в каталоге свободного ПО F-Droid. Оно отлично работает на дегуглифицированных прошивках (LineageOS, GrapheneOS, /e/OS и др.).",

    faqQ5: "Какие версии Android поддерживаются?",
    faqA5: "KeepNotes поддерживает Android версии 8.0 (Oreo) и новее, включая актуальные версии Android 14 и Android 15, сохраняя высокую скорость работы даже на бюджетных устройствах.",

    faqQ6: "Как включить поддержку заметок на сервере Nextcloud?",
    faqA6: "В веб-интерфейсе Nextcloud администратору достаточно перейти в раздел «Приложения» (Apps), найти в каталоге официальное приложение «Notes» и нажать кнопку «Установить и включить». Никаких дополнительных настроек не требуется.",

    // CTA Banner
    ctaHeading: "Готовы навести порядок в заметках?",
    ctaSubheading: "Скачайте KeepNotes for Nextcloud прямо сейчас — свободно, бесплатно и без ограничений.",
    ctaDownloadApk: "Скачать APK (GitHub)",
    ctaFdroid: "F-Droid — Скоро",

    // Footer
    footerDesc: "Современный, быстрый и открытый Android-клиент для Nextcloud Notes с интерфейсом в стиле Google Keep.",
    footerNavTitle: "Навигация",
    footerResourcesTitle: "Ресурсы",
    footerLegalTitle: "Правовая информация",
    footerPrivacyPolicy: "Политика конфиденциальности",
    footerSourceCode: "Исходный код (GitHub)",
    footerReleases: "Релизы и сборки",
    footerIssues: "Сообщить об ошибке",
    footerLicense: "Лицензия GPL-3.0",
    footerDisclaimer: "Nextcloud является зарегистрированным товарным знаком Nextcloud GmbH. KeepNotes является независимым проектом с открытым исходным кодом и не аффилирован с Nextcloud GmbH.",
    footerCopy: "KeepNotes for Nextcloud. Распространяется под свободной лицензией.",

    // Privacy Page Specific
    privacyTitle: "Политика конфиденциальности KeepNotes for Nextcloud",
    privacyLastUpdated: "Последнее обновление: 10 сентября 2026 г.",
    privacyIntro: "Мы уважаем ваше право на конфиденциальность. KeepNotes for Nextcloud создавался с фундаментальным принципом: ваши данные принадлежат исключительно вам.",
    privacyBackToHome: "← Вернуться на главную",
    
    privacySec1Title: "1. Сбор и передача данных",
    privacySec1Text: "Приложение KeepNotes for Nextcloud НЕ собирает, НЕ хранит и НЕ передаёт персональные данные, идентификаторы устройств или аналитику третьим лицам или разработчикам приложения. У нас нет собственных серверов, баз данных или аналитических сервисов.",
    
    privacySec2Title: "2. Связь с сервером Nextcloud",
    privacySec2Text: "Приложение взаимодействует исключительно и напрямую с сервером Nextcloud, адрес которого вы указываете при авторизации. Все операции чтения, создания и редактирования заметок передаются по защищённому протоколу HTTPS непосредственно на ваш сервер.",
    
    privacySec3Title: "3. Учётные данные и токены",
    privacySec3Text: "Авторизация осуществляется через официальный механизм Nextcloud Login Flow v2. Приложение не видит и не сохраняет ваш мастер-пароль. Созданный токен доступа хранится локально на устройстве в защищённом хранилище Android Keystore / EncryptedSharedPreferences.",
    
    privacySec4Title: "4. Биометрическая аутентификация",
    privacySec4Text: "Функция биометрической защиты (отпечаток пальца, сканирование лица) использует стандартный системный Android BiometricPrompt API. Приложение не имеет прямого доступа к биометрическим данным — проверка выполняется аппаратно операционной системой устройства.",

    privacySec5Title: "5. Отсутствие сторонних трекеров и библиотек",
    privacySec5Text: "В приложении отсутствуют сторонние рекламные сети, трекеры и сервисы телеметрии (включая Google Play Services, Firebase, Sentry, Yandex AppMetrica и др.). Код приложения полностью открыт и может быть проверен любым желающим в публичном репозитории на GitHub.",

    privacySec6Title: "6. Контакты",
    privacySec6Text: "Если у вас возникли вопросы по поводу политики конфиденциальности или работы приложения, вы можете создать тикет в официальном репозитории проекта на GitHub: https://github.com/maelst-dev/KeepNotes-for-Nextcloud/issues."
  },

  en: {
    // Meta & SEO
    pageTitle: "KeepNotes for Nextcloud — Google Keep-inspired Android Client",
    metaDescription: "Modern and fast Android client for Nextcloud Notes featuring a Google Keep-style user interface. Offline-first, Material 3, two-way sync, checklists, and biometrics.",
    privacyPageTitle: "Privacy Policy — KeepNotes for Nextcloud",
    privacyMetaDesc: "Privacy Policy for KeepNotes for Nextcloud Android app. 100% FOSS, zero trackers, zero ads, no third-party data collection.",

    // Nav
    navFeatures: "Features",
    navScreenshots: "Screenshots",
    navHowTo: "Getting Started",
    navSecurity: "Security",
    navFaq: "FAQ",
    navDownload: "Download",
    starOnGithub: "Star on GitHub",

    // Hero
    heroBadge: "100% Free & Open Source • No Ads • No Trackers",
    heroTitle: "Nextcloud Notes client with a Google Keep-inspired UI",
    heroSubtitle: "Instant note-taking, interactive checklists, robust Offline-First architecture, and seamless two-way synchronization with your Nextcloud instance.",
    downloadApk: "Download APK",
    downloadFdroid: "Available on F-Droid",
    fdroidComingSoon: "Coming Soon",
    ctaFdroidSoon: "F-Droid — Coming Soon",
    footerFdroid: "F-Droid Catalog",
    soonBadge: "Soon",
    viewOnGithub: "Source Code",
    heroMockupAlt: "KeepNotes for Nextcloud main screen",

    // Highlights / Stats badge
    statsOffline: "Offline-First",
    statsOfflineDesc: "Local Room Database",
    statsSync: "2-Way Sync",
    statsSyncDesc: "Fast etag & timestamps",
    statsPrivacy: "0 Trackers",
    statsPrivacyDesc: "Complete privacy",

    // Features Section
    featuresHeadingPre: "App Features",
    featuresHeading: "Everything you need for effortless notes",
    featuresSubheading: "Built with a core focus on personal privacy, performance, and intuitive design",
    
    feature1Title: "Google Keep-Inspired UI",
    feature1Desc: "Staggered grid card layout, Material Design 3 dynamic theming, and smooth Light and Dark mode adaptations.",
    
    feature2Title: "Robust Offline-First",
    feature2Desc: "Local Room database acts as the single source of truth. Instant local operations without waiting for network responses.",
    
    feature3Title: "Bidirectional Sync",
    feature3Desc: "Automatic synchronization with your server using etags and timestamps, complete with visual progress indication.",
    
    feature4Title: "Rich Markdown & Checklists",
    feature4Desc: "Clickable checkboxes with strikethrough, smart Enter key list continuation, and quick one-tap text-to-checklist conversion.",
    
    feature5Title: "Biometric Protection",
    feature5Desc: "Keep your notes private: lock the app with fingerprint, face recognition, or your device lock screen PIN / pattern.",
    
    feature6Title: "Seamless Login Flow v2",
    feature6Desc: "One-click authentication in your browser without manually entering URLs or generating cumbersome app passwords.",
    
    feature7Title: "100% Privacy & FOSS",
    feature7Desc: "Zero Google Play Services dependencies, no embedded advertising, telemetry, or analytics. Your notes remain solely yours.",
    
    feature8Title: "Personalization & Fonts",
    feature8Desc: "Independent font size presets for cards and editor, in-app language switching, and comprehensive category filtering.",

    // Screenshots Section
    screenshotsHeadingPre: "UI Gallery",
    screenshotsHeading: "Carefully crafted for mobile productivity",
    screenshotsSubheading: "Explore real in-app screenshots of KeepNotes in English",
    screenshotsHint: "Click any screenshot to view in full resolution",

    screenshot1Title: "Main Notes Screen",
    screenshot1Desc: "Staggered grid card layout with live checkboxes and instant search.",
    screenshot2Title: "Checklist Preview",
    screenshot2Desc: "Check off tasks with a single tap directly from note preview.",
    screenshot3Title: "Checklist Editor",
    screenshot3Desc: "Smart Enter continuation, quick ordering, and Markdown support.",
    screenshot4Title: "Convert to Checklist",
    screenshot4Desc: "Instantly turn plain text into an interactive checklist in one tap.",
    screenshot5Title: "Category Management",
    screenshot5Desc: "Organize notes cleanly into projects, topics, and custom categories.",
    screenshot6Title: "Flexible Settings",
    screenshot6Desc: "Theme toggles, independent font scaling, and biometric app lock.",

    // How to start (3 steps)
    howToHeadingPre: "Quick Start",
    howToHeading: "Get started in 3 simple steps",
    howToSubheading: "Effortless setup with zero complicated configuration",
    step1Num: "01",
    step1Title: "Enable Notes in Nextcloud",
    step1Desc: "In your Nextcloud web dashboard, go to 'Apps' and enable the official 'Notes' app.",
    step2Num: "02",
    step2Title: "Install KeepNotes",
    step2Desc: "Download the latest APK directly from GitHub Releases (F-Droid release is coming soon).",
    step3Num: "03",
    step3Title: "Log in with 1 Click",
    step3Desc: "Open KeepNotes, provide your Nextcloud instance address, and approve access in your browser via Login Flow v2.",

    // Security & Architecture
    secHeadingPre: "Architecture & Trust",
    secHeading: "Your data stays under your absolute control",
    secSubheading: "Direct, encrypted communication between your device and your Nextcloud server",
    secDirectTitle: "Direct Connection",
    secDirectDesc: "KeepNotes communicates solely and directly with your specified Nextcloud server over HTTPS. There are zero intermediate relay servers.",
    secNoTrackTitle: "No Trackers or Telemetry",
    secNoTrackDesc: "No Firebase, Google Analytics, Sentry, or third-party advertising SDKs. Not a single byte of telemetry ever leaves your phone.",
    secBiometricTitle: "Local Device Vault",
    secBiometricDesc: "Sensitive session tokens are stored securely in Android EncryptedSharedPreferences, guarded by biometric lock.",

    // Architecture Diagram
    archSchemaBadge: "Architecture Interaction Flow",
    archPhoneTitle: "Your Smartphone",
    archPhoneSub: "KeepNotes + Room DB",
    archHttpsBadge: "Direct HTTPS",
    archZeroRelay: "Zero-Relay",
    archServerTitle: "Your Nextcloud",
    archServerSub: "Notes API (v1/v2)",
    archFooter: "🔒 Complete isolation from any third-party servers, clouds, and telemetry.",

    // FAQ Section
    faqHeadingPre: "FAQ",
    faqHeading: "Frequently Asked Questions",
    faqSubheading: "Answers to common questions regarding functionality and security",

    faqQ1: "Do I need a continuous internet connection to use KeepNotes?",
    faqA1: "No! KeepNotes is built with an Offline-First architecture. The local Room database acts as the single source of truth. You can view, create, and edit notes anytime without internet. Once connectivity is available, the app automatically performs bidirectional sync.",

    faqQ2: "Is dark theme supported?",
    faqA2: "Yes. The app fully supports dark theme and Material Design 3 dynamic theming, automatically adapting its interface and colors to your Android system theme.",

    faqQ3: "Are my credentials or notes stored on your servers?",
    faqA3: "Definitely not. The developers do not operate any backend servers. All communication happens strictly between your smartphone and your personal Nextcloud instance. Nextcloud Login Flow v2 issues a secure session token without exposing your password.",

    faqQ4: "Can I use KeepNotes without Google Play Services?",
    faqA4: "Yes, completely! KeepNotes is 100% Free and Open Source Software (FOSS). It contains no proprietary Google libraries and is available as direct GitHub Release APKs (and soon in the F-Droid catalog). It runs flawlessly on de-Googled ROMs (LineageOS, GrapheneOS, /e/OS, etc.).",

    faqQ5: "Which Android versions are supported?",
    faqA5: "KeepNotes supports Android 8.0 (Oreo) and above, fully optimized for Android 14 and Android 15 while maintaining snappy performance on all devices.",

    faqQ6: "How do I install the Notes app on my Nextcloud server?",
    faqA6: "Log into your Nextcloud instance as an administrator, navigate to 'Apps', search for the official 'Notes' app, and click 'Download and enable'. No extra configuration required.",

    // CTA Banner
    ctaHeading: "Ready to organize your notes with ease?",
    ctaSubheading: "Download KeepNotes for Nextcloud today — free, open source, and built for privacy.",
    ctaDownloadApk: "Download APK (GitHub)",
    ctaFdroid: "F-Droid — Coming Soon",

    // Footer
    footerDesc: "Modern, snappy, open-source Android client for Nextcloud Notes with Google Keep-inspired aesthetics.",
    footerNavTitle: "Navigation",
    footerResourcesTitle: "Resources",
    footerLegalTitle: "Legal",
    footerPrivacyPolicy: "Privacy Policy",
    footerSourceCode: "Source Code (GitHub)",
    footerReleases: "Releases & Binaries",
    footerIssues: "Report an Issue",
    footerLicense: "GPL-3.0 License",
    footerDisclaimer: "Nextcloud is a registered trademark of Nextcloud GmbH. KeepNotes is an independent open-source project and is not affiliated with Nextcloud GmbH.",
    footerCopy: "KeepNotes for Nextcloud. Released under the GPL-3.0 open source license.",

    // Privacy Page Specific
    privacyTitle: "KeepNotes for Nextcloud Privacy Policy",
    privacyLastUpdated: "Last updated: September 10, 2026",
    privacyIntro: "We respect your privacy. KeepNotes for Nextcloud is designed with a fundamental rule: your personal data belongs solely to you.",
    privacyBackToHome: "← Back to Home",
    
    privacySec1Title: "1. Data Collection & Sharing",
    privacySec1Text: "KeepNotes for Nextcloud does NOT collect, store, or share any personal information, device identifiers, or analytics data with third parties or the app developers. We run no user data servers, databases, or analytics platforms.",
    
    privacySec2Title: "2. Server Communication",
    privacySec2Text: "The app communicates exclusively and directly with the Nextcloud server instance specified by you during authentication. All read, write, and synchronization tasks occur directly via secure HTTPS between your phone and your server.",
    
    privacySec3Title: "3. Credentials & Tokens",
    privacySec3Text: "Authentication uses the official Nextcloud Login Flow v2. The application never sees or stores your main account password. Generated access tokens are kept locally in Android Keystore / EncryptedSharedPreferences.",
    
    privacySec4Title: "4. Biometric Authentication",
    privacySec4Text: "Biometric protection features (fingerprint, face unlock) use Android's native BiometricPrompt API. The app never processes or accesses raw biometric data; verification is handled by the secure hardware of your operating system.",

    privacySec5Title: "5. Absence of Proprietary Trackers",
    privacySec5Text: "The app contains no proprietary ad networks, telemetry trackers, or crash analytic SDKs (including Google Play Services, Firebase, Sentry, etc.). The source code is publicly auditable on GitHub.",

    privacySec6Title: "6. Contact",
    privacySec6Text: "If you have questions regarding this Privacy Policy or the application, please open an issue in the official GitHub repository at: https://github.com/maelst-dev/KeepNotes-for-Nextcloud/issues."
  }
};

window.I18N_DATA = translations;
