/**
 * KeepNotes for Nextcloud - Internationalization (i18n) Dictionary
 * Supports Russian (ru), English (en), Spanish (es), Portuguese (pt), French (fr), German (de)
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
    lightboxHint: "Совет: используйте стрелки на клавиатуре (← / →) или свайпы на смартфоне для переключения.",

    // How to start (3 steps)
    howToHeadingPre: "Быстрый старт",
    howToHeading: "Как начать пользоваться за 3 шага",
    howToSubheading: "Простая настройка без сложных инструкций",
    step1Num: "01",
    step1Title: "Включите Notes в Nextcloud",
    step1Desc: "В веб-интерфейсе вашего сервера Nextcloud перейдите в «Приложения» и включите официальное приложение «Notes».",
    step2Num: "02",
    step2Title: "Установите KeepNotes",
    step2Desc: "Установите приложение из каталога F-Droid или скачайте актуальный APK-файл со страницы релизов GitHub.",
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
    faqA4: "Да, абсолютно. В KeepNotes нет ни одной проприетарной библиотеки Google. Приложение доступно в каталоге свободного ПО F-Droid, а также в виде прямых APK-файлов на GitHub Releases. Оно отлично работает на дегуглифицированных прошивках (LineageOS, GrapheneOS, /e/OS и др.).",

    faqQ5: "Какие версии Android поддерживаются?",
    faqA5: "KeepNotes поддерживает Android версии 8.0 (Oreo) и новее, включая актуальные версии Android 14 и Android 15, сохраняя высокую скорость работы даже на бюджетных устройствах.",

    faqQ6: "Как включить поддержку заметок на сервере Nextcloud?",
    faqA6: "В веб-интерфейсе Nextcloud администратору достаточно перейти в раздел «Приложения» (Apps), найти в каталоге официальное приложение «Notes» и нажать кнопку «Установить и включить». Никаких дополнительных настроек не требуется.",

    // CTA Banner
    ctaHeading: "Готовы навести порядок в заметках?",
    ctaSubheading: "Скачайте KeepNotes for Nextcloud прямо сейчас — свободно, бесплатно и без ограничений.",
    ctaDownloadApk: "Скачать APK (GitHub)",
    ctaFdroid: "Доступно в F-Droid",

    // Footer
    footerDesc: "Современный, быстрый и открытый Android-клиент для Nextcloud Notes с интерфейсом в стиле Google Keep.",
    footerNavTitle: "Навигация",
    footerResourcesTitle: "Ресурсы",
    footerLegalTitle: "Правовая информация",
    footerPrivacyPolicy: "Политика конфиденциальности",
    footerSourceCode: "Исходный код (GitHub)",
    footerReleases: "Релизы и сборки",
    footerIssues: "Сообщить об ошибке",
    footerLicense: "Лицензия Apache-2.0",
    footerDisclaimer: "Nextcloud является зарегистрированным товарным знаком Nextcloud GmbH. KeepNotes является независимым проектом с открытым исходным кодом и не аффилирован с Nextcloud GmbH.",
    footerCopy: "© 2026 KeepNotes for Nextcloud. Распространяется под свободной лицензией Apache 2.0.",

    // Privacy Page Specific
    privacyTitle: "Политика конфиденциальности KeepNotes for Nextcloud",
    privacyLastUpdated: "Последнее обновление: 21 ноября 2026 г.",
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
    lightboxHint: "Tip: Use keyboard arrow keys (← / →) or swipe gestures to navigate screenshots.",

    // How to start (3 steps)
    howToHeadingPre: "Quick Start",
    howToHeading: "Get started in 3 simple steps",
    howToSubheading: "Effortless setup with zero complicated configuration",
    step1Num: "01",
    step1Title: "Enable Notes in Nextcloud",
    step1Desc: "In your Nextcloud web dashboard, go to 'Apps' and enable the official 'Notes' app.",
    step2Num: "02",
    step2Title: "Install KeepNotes",
    step2Desc: "Install KeepNotes from the F-Droid catalog or download the latest APK directly from GitHub Releases.",
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
    faqA4: "Yes, completely! KeepNotes is 100% Free and Open Source Software (FOSS). It contains no proprietary Google libraries and is available in the official F-Droid catalog as well as via direct GitHub Release APKs. It runs flawlessly on de-Googled ROMs (LineageOS, GrapheneOS, /e/OS, etc.).",

    faqQ5: "Which Android versions are supported?",
    faqA5: "KeepNotes supports Android 8.0 (Oreo) and above, fully optimized for Android 14 and Android 15 while maintaining snappy performance on all devices.",

    faqQ6: "How do I install the Notes app on my Nextcloud server?",
    faqA6: "Log into your Nextcloud instance as an administrator, navigate to 'Apps', search for the official 'Notes' app, and click 'Download and enable'. No extra configuration required.",

    // CTA Banner
    ctaHeading: "Ready to organize your notes with ease?",
    ctaSubheading: "Download KeepNotes for Nextcloud today — free, open source, and built for privacy.",
    ctaDownloadApk: "Download APK (GitHub)",
    ctaFdroid: "Available on F-Droid",

    // Footer
    footerDesc: "Modern, snappy, open-source Android client for Nextcloud Notes with Google Keep-inspired aesthetics.",
    footerNavTitle: "Navigation",
    footerResourcesTitle: "Resources",
    footerLegalTitle: "Legal",
    footerPrivacyPolicy: "Privacy Policy",
    footerSourceCode: "Source Code (GitHub)",
    footerReleases: "Releases & Binaries",
    footerIssues: "Report an Issue",
    footerLicense: "Apache-2.0 License",
    footerDisclaimer: "Nextcloud is a registered trademark of Nextcloud GmbH. KeepNotes is an independent open-source project and is not affiliated with Nextcloud GmbH.",
    footerCopy: "© 2026 KeepNotes for Nextcloud. Released under the Apache-2.0 open source license.",

    // Privacy Page Specific
    privacyTitle: "KeepNotes for Nextcloud Privacy Policy",
    privacyLastUpdated: "Last updated: November 21, 2026",
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
  },

  es: {
    // Meta & SEO
    pageTitle: "KeepNotes for Nextcloud — Cliente de Android inspirado en Google Keep",
    metaDescription: "Cliente moderno y rápido para Nextcloud Notes en Android con interfaz inspirada en Google Keep. Offline-First, Material 3, sincronización bidireccional, listas interactivas y biometría.",
    privacyPageTitle: "Política de privacidad — KeepNotes for Nextcloud",
    privacyMetaDesc: "Política de privacidad de la app Android KeepNotes for Nextcloud. 100% FOSS, sin rastreadores, sin anuncios ni recopilación de datos de terceros.",

    // Nav
    navFeatures: "Características",
    navScreenshots: "Capturas",
    navHowTo: "Primeros pasos",
    navSecurity: "Seguridad",
    navFaq: "FAQ",
    navDownload: "Descargar",
    starOnGithub: "Danos una estrella en GitHub",

    // Hero
    heroBadge: "100% Libre y de código abierto • Sin anuncios • Sin rastreadores",
    heroTitle: "Cliente de Nextcloud Notes con interfaz inspirada en Google Keep",
    heroSubtitle: "Toma de notas instantánea, listas de tareas interactivas, arquitectura Offline-First robusta y sincronización bidireccional fluida con tu servidor Nextcloud.",
    downloadApk: "Descargar APK",
    downloadFdroid: "Disponible en F-Droid",
    fdroidComingSoon: "Próximamente",
    ctaFdroidSoon: "F-Droid — Próximamente",
    footerFdroid: "Catálogo de F-Droid",
    soonBadge: "Pronto",
    viewOnGithub: "Código fuente",
    heroMockupAlt: "Pantalla principal de KeepNotes for Nextcloud",

    // Highlights / Stats badge
    statsOffline: "Offline-First",
    statsOfflineDesc: "Base de datos Room local",
    statsSync: "2-Way Sync",
    statsSyncDesc: "Por etag y marcas de tiempo",
    statsPrivacy: "0 rastreadores",
    statsPrivacyDesc: "Privacidad absoluta",

    // Features Section
    featuresHeadingPre: "Funcionalidades de la aplicación",
    featuresHeading: "Todo lo que necesitas para tus notas",
    featuresSubheading: "Diseñado con prioridad en la privacidad de los datos, el rendimiento y la facilidad de uso",
    
    feature1Title: "Interfaz inspirada en Google Keep",
    feature1Desc: "Diseño de cuadrícula escalonada (Staggered Grid), soporte para colores dinámicos de Material Design 3 y modos claro y oscuro.",
    
    feature2Title: "Arquitectura Offline-First robusta",
    feature2Desc: "La base de datos local Room actúa como única fuente de verdad. Guardado instantáneo y acceso a notas sin esperar a la red.",
    
    feature3Title: "Sincronización bidireccional",
    feature3Desc: "Sincronización automática con tu servidor mediante etags y marcas de tiempo, con indicación visual del progreso y estado.",
    
    feature4Title: "Markdown y listas interactivas",
    feature4Desc: "Casillas clicables con tachado automático, continuación inteligente de listas con Enter y conversión rápida de texto a lista.",
    
    feature5Title: "Protección biométrica",
    feature5Desc: "Protege tus notas privadas: bloqueo de la aplicación mediante huella dactilar, reconocimiento facial o PIN / patrón del dispositivo.",
    
    feature6Title: "Inicio de sesión fluido (Login Flow v2)",
    feature6Desc: "Inicio de sesión en 1 clic en el navegador: sin copiar URLs de servidor ni generar engorrosas contraseñas de aplicación.",
    
    feature7Title: "100% Privacidad y FOSS",
    feature7Desc: "Sin dependencias de Google Play Services, sin anuncios, sin telemetría ni analítica. Tus notas te pertenecen únicamente a ti.",
    
    feature8Title: "Personalización y tamaños de fuente",
    feature8Desc: "Ajuste independiente del tamaño de fuente para tarjetas y editor, cambio de idioma en la app y navegación por categorías.",

    // Screenshots Section
    screenshotsHeadingPre: "Galería de la interfaz",
    screenshotsHeading: "Diseño pensado hasta el último detalle",
    screenshotsSubheading: "Explore capturas de pantalla reales de la aplicación KeepNotes",
    screenshotsHint: "Haz clic en cualquier captura para verla en pantalla completa",

    screenshot1Title: "Pantalla principal de notas",
    screenshot1Desc: "Cuadrícula escalonada con casillas interactivas y búsqueda instantánea.",
    screenshot2Title: "Vista previa de la lista",
    screenshot2Desc: "Marca tareas con un solo toque directamente desde la vista previa.",
    screenshot3Title: "Editor de listas de tareas",
    screenshot3Desc: "Autocompletado inteligente con Enter, ordenación y soporte Markdown.",
    screenshot4Title: "Convertir en lista de tareas",
    screenshot4Desc: "Convierte texto plano en una lista interactiva con un solo toque.",
    screenshot5Title: "Gestión de categorías",
    screenshot5Desc: "Organiza notas de forma limpia por proyectos, temas y etiquetas.",
    screenshot6Title: "Ajustes flexibles",
    screenshot6Desc: "Selección de tema, escala de fuentes independiente y bloqueo biométrico.",
    lightboxHint: "Consejo: Usa las flechas del teclado (← / →) o desliza en el móvil para cambiar de imagen.",

    // How to start (3 steps)
    howToHeadingPre: "Inicio rápido",
    howToHeading: "Comienza en 3 sencillos pasos",
    howToSubheading: "Configuración sencilla y sin complicaciones",
    step1Num: "01",
    step1Title: "Habilita Notes en Nextcloud",
    step1Desc: "En el panel web de Nextcloud, ve a «Aplicaciones» y activa la aplicación oficial «Notes».",
    step2Num: "02",
    step2Title: "Instala KeepNotes",
    step2Desc: "Instala KeepNotes desde el catálogo F-Droid o descarga el último APK desde GitHub Releases.",
    step3Num: "03",
    step3Title: "Inicia sesión en 1 clic",
    step3Desc: "Abre KeepNotes, introduce la dirección de tu Nextcloud y autoriza el acceso en tu navegador mediante Login Flow v2.",

    // Security & Architecture
    secHeadingPre: "Arquitectura y confianza",
    secHeading: "Tus datos bajo tu control absoluto",
    secSubheading: "Conexión directa y cifrada entre tu smartphone y tu servidor, sin intermediarios",
    secDirectTitle: "Conexión directa",
    secDirectDesc: "La aplicación se comunica única y directamente con tu dominio Nextcloud mediante HTTPS. Los servidores intermediarios simplemente no existen.",
    secNoTrackTitle: "Sin rastreadores ni analítica",
    secNoTrackDesc: "Sin Firebase, Google Analytics, Sentry ni SDKs de terceros. Ni un solo byte de telemetría sale de tu dispositivo.",
    secBiometricTitle: "Caja fuerte local",
    secBiometricDesc: "Las credenciales y tokens se guardan de forma segura en Android EncryptedSharedPreferences y se protegen con biometría.",

    // Architecture Diagram
    archSchemaBadge: "Esquema arquitectónico de interacción",
    archPhoneTitle: "Tu smartphone",
    archPhoneSub: "KeepNotes + Room DB",
    archHttpsBadge: "HTTPS directo",
    archZeroRelay: "Zero-Relay",
    archServerTitle: "Tu Nextcloud",
    archServerSub: "Notes API (v1/v2)",
    archFooter: "🔒 Aislamiento absoluto frente a servidores de terceros, nubes externas y analítica.",

    // FAQ Section
    faqHeadingPre: "Preguntas y respuestas",
    faqHeading: "Preguntas frecuentes",
    faqSubheading: "Respuestas a las dudas más comunes sobre el funcionamiento y la seguridad",

    faqQ1: "¿Se necesita conexión a internet constante para usar la app?",
    faqA1: "¡No! KeepNotes está diseñado bajo el principio Offline-First. La base de datos local Room es la única fuente de verdad. Puedes consultar, crear y editar notas sin conexión. En cuanto haya internet disponible, la aplicación realizará automáticamente una sincronización bidireccional.",

    faqQ2: "¿Es compatible con el tema oscuro?",
    faqA2: "Sí. La aplicación es totalmente compatible con el tema oscuro y las directrices de Material Design 3, adaptando automáticamente la interfaz y colores al tema del sistema de tu dispositivo Android.",

    faqQ3: "¿Se guardan mis contraseñas o notas en sus servidores?",
    faqA3: "Rotundamente no. Los desarrolladores no disponemos de ningún servidor de recopilación de datos. La comunicación se realiza exclusivamente entre tu smartphone y tu servidor Nextcloud mediante Login Flow v2 con un token seguro.",

    faqQ4: "¿Puedo usar la aplicación sin los servicios de Google Play?",
    faqA4: "Sí, totalmente. KeepNotes es 100% software libre y de código abierto (FOSS). No incluye ninguna biblioteca propietaria de Google y está disponible en F-Droid y en los APKs de GitHub Releases. Funciona de forma excelente en sistemas degoogled (LineageOS, GrapheneOS, /e/OS, etc.).",

    faqQ5: "¿Qué versiones de Android son compatibles?",
    faqA5: "KeepNotes es compatible con Android 8.0 (Oreo) y superior, estando totalmente optimizado para Android 14 y Android 15 manteniendo un rendimiento ágil en cualquier dispositivo.",

    faqQ6: "¿Cómo instalo la aplicación Notes en mi servidor Nextcloud?",
    faqA6: "En la interfaz web de Nextcloud, como administrador, dirígete a «Aplicaciones», busca en el catálogo la aplicación oficial «Notes» y pulsa «Descargar y activar». No se requiere ninguna configuración adicional.",

    // CTA Banner
    ctaHeading: "¿Listo para organizar tus notas con facilidad?",
    ctaSubheading: "Descarga KeepNotes for Nextcloud hoy mismo: libre, gratuito y creado para tu privacidad.",
    ctaDownloadApk: "Descargar APK (GitHub)",
    ctaFdroid: "Disponible en F-Droid",

    // Footer
    footerDesc: "Cliente moderno, rápido y libre para Nextcloud Notes en Android con interfaz inspirada en Google Keep.",
    footerNavTitle: "Navegación",
    footerResourcesTitle: "Recursos",
    footerLegalTitle: "Información legal",
    footerPrivacyPolicy: "Política de privacidad",
    footerSourceCode: "Código fuente (GitHub)",
    footerReleases: "Versiones y binarios",
    footerIssues: "Informar de un error",
    footerLicense: "Licencia Apache-2.0",
    footerDisclaimer: "Nextcloud es una marca registrada de Nextcloud GmbH. KeepNotes es un proyecto independiente de código abierto y no está afiliado a Nextcloud GmbH.",
    footerCopy: "© 2026 KeepNotes for Nextcloud. Publicado bajo la licencia de código abierto Apache 2.0.",

    // Privacy Page Specific
    privacyTitle: "Política de privacidad de KeepNotes for Nextcloud",
    privacyLastUpdated: "Última actualización: 21 de noviembre de 2026",
    privacyIntro: "Respetamos profundamente tu derecho a la privacidad. KeepNotes for Nextcloud ha sido desarrollado con un principio fundamental: tus datos personales te pertenecen exclusivamente a ti.",
    privacyBackToHome: "← Volver al inicio",
    
    privacySec1Title: "1. Recopilación y cesión de datos",
    privacySec1Text: "La aplicación KeepNotes for Nextcloud NO recopila, NO almacena y NO comparte información personal, identificadores de dispositivo ni datos de analítica con terceros ni con los desarrolladores. No operamos servidores de datos de usuario, bases de datos externas ni plataformas de telemetría.",
    
    privacySec2Title: "2. Comunicación con el servidor Nextcloud",
    privacySec2Text: "La aplicación se comunica de forma exclusiva y directa con el servidor Nextcloud cuya dirección indicas durante la autenticación. Todas las operaciones de lectura, creación y edición de notas se transmiten mediante HTTPS cifrado directamente a tu propio servidor.",
    
    privacySec3Title: "3. Credenciales y tokens de acceso",
    privacySec3Text: "La autenticación se realiza mediante el mecanismo oficial Nextcloud Login Flow v2. La aplicación nunca ve ni almacena tu contraseña principal. El token de sesión obtenido se guarda localmente en el dispositivo dentro del almacenamiento seguro Android EncryptedSharedPreferences.",
    
    privacySec4Title: "4. Autenticación biométrica",
    privacySec4Text: "La función de bloqueo biométrico (huella dactilar, reconocimiento facial) utiliza la API nativa de Android BiometricPrompt. La aplicación no tiene acceso directo a tus datos biométricos: la verificación la gestiona de forma segura el hardware del sistema operativo.",

    privacySec5Title: "5. Ausencia de rastreadores y librerías de terceros",
    privacySec5Text: "En la aplicación no existen redes publicitarias, rastreadores ni servicios de telemetría de terceros (incluidos Google Play Services, Firebase, Sentry u otros). El código fuente de la aplicación es completamente abierto y auditable en GitHub.",

    privacySec6Title: "6. Contacto",
    privacySec6Text: "Si tienes alguna pregunta acerca de esta política de privacidad o sobre el funcionamiento de la aplicación, puedes abrir una incidencia en el repositorio oficial del proyecto en GitHub: https://github.com/maelst-dev/KeepNotes-for-Nextcloud/issues."
  },

  pt: {
    // Meta & SEO
    pageTitle: "KeepNotes for Nextcloud — Cliente Android inspirado no Google Keep",
    metaDescription: "Cliente moderno e rápido para Nextcloud Notes no Android com interface inspirada no Google Keep. Offline-First, Material 3, sincronização bidirecional, listas interativas e biometria.",
    privacyPageTitle: "Política de Privacidade — KeepNotes for Nextcloud",
    privacyMetaDesc: "Política de Privacidade da app Android KeepNotes for Nextcloud. 100% FOSS, zero rastreadores, zero anúncios e sem partilha de dados.",

    // Nav
    navFeatures: "Funcionalidades",
    navScreenshots: "Capturas",
    navHowTo: "Primeiros passos",
    navSecurity: "Segurança",
    navFaq: "FAQ",
    navDownload: "Descarregar",
    starOnGithub: "Estrela no GitHub",

    // Hero
    heroBadge: "100% Livre e de código aberto • Sem anúncios • Sem rastreadores",
    heroTitle: "Cliente Nextcloud Notes com interface inspirada no Google Keep",
    heroSubtitle: "Registo instantâneo de notas, listas de verificação interativas, arquitetura Offline-First robusta e sincronização bidirecional com a sua instância Nextcloud.",
    downloadApk: "Descarregar APK",
    downloadFdroid: "Disponível no F-Droid",
    fdroidComingSoon: "Brevemente",
    ctaFdroidSoon: "F-Droid — Brevemente",
    footerFdroid: "Catálogo F-Droid",
    soonBadge: "Breve",
    viewOnGithub: "Código-fonte",
    heroMockupAlt: "Ecrã principal do KeepNotes for Nextcloud",

    // Highlights / Stats badge
    statsOffline: "Offline-First",
    statsOfflineDesc: "Base de dados local Room",
    statsSync: "2-Way Sync",
    statsSyncDesc: "Por etags e carimbos de data",
    statsPrivacy: "0 rastreadores",
    statsPrivacyDesc: "Privacidade absoluta",

    // Features Section
    featuresHeadingPre: "Funcionalidades da aplicação",
    featuresHeading: "Tudo o que precisa para as suas notas",
    featuresSubheading: "Concebido com foco primordial na privacidade dos dados, no desempenho e na facilidade de utilização",
    
    feature1Title: "Interface inspirada no Google Keep",
    feature1Desc: "Esquema em grelha escalonada (Staggered Grid), suporte para cores dinâmicas do Material Design 3 e modos claro e escuro.",
    
    feature2Title: "Arquitetura Offline-First robusta",
    feature2Desc: "A base de dados local Room atua como fonte única da verdade. Operações e acesso instantâneos sem aguardar a rede.",
    
    feature3Title: "Sincronização bidirecional",
    feature3Desc: "Sincronização automática com o servidor através de etags e carimbos temporais, com indicação visual de progresso e estado.",
    
    feature4Title: "Markdown e listas interativas",
    feature4Desc: "Caixas de seleção clicáveis com riscado automático, continuação inteligente de listas com Enter e conversão rápida de texto para lista.",
    
    feature5Title: "Proteção biométrica",
    feature5Desc: "Proteja as suas notas pessoais: bloqueio da aplicação por impressão digital, reconhecimento facial ou PIN / padrão do dispositivo.",
    
    feature6Title: "Autenticação simples (Login Flow v2)",
    feature6Desc: "Início de sessão com 1 clique no navegador: sem necessidade de copiar URLs nem gerar senhas de aplicação complexas.",
    
    feature7Title: "100% Privacidade e FOSS",
    feature7Desc: "Sem dependências do Google Play Services, sem anúncios, sem telemetria nem analítica. As suas notas pertencem apenas a si.",
    
    feature8Title: "Personalização e tamanhos de letra",
    feature8Desc: "Ajuste independente do tamanho da letra para cartões e editor, seleção de idioma na app e organização limpa por categorias.",

    // Screenshots Section
    screenshotsHeadingPre: "Galeria da interface",
    screenshotsHeading: "Design pensado ao pormenor",
    screenshotsSubheading: "Explore capturas de ecrã reais da aplicação KeepNotes",
    screenshotsHint: "Clique em qualquer captura para ver em ecrã inteiro",

    screenshot1Title: "Ecrã principal de notas",
    screenshot1Desc: "Grelha escalonada com caixas interativas e pesquisa instantânea.",
    screenshot2Title: "Pré-visualização da lista",
    screenshot2Desc: "Conclua tarefas com um só toque diretamente na visualização.",
    screenshot3Title: "Editor de listas de verificação",
    screenshot3Desc: "Autopreenchimento inteligente com Enter, reordenação e Markdown.",
    screenshot4Title: "Converter em lista de verificação",
    screenshot4Desc: "Transforme texto simples numa lista interativa com um único toque.",
    screenshot5Title: "Gestão de categorias",
    screenshot5Desc: "Organize notas claramente por projetos, tópicos e etiquetas.",
    screenshot6Title: "Definições flexíveis",
    screenshot6Desc: "Escolha do tema, escala de tipo de letra e bloqueio biométrico.",
    lightboxHint: "Dica: Use as setas do teclado (← / →) ou deslize no telemóvel para navegar.",

    // How to start (3 steps)
    howToHeadingPre: "Início rápido",
    howToHeading: "Comece em 3 passos simples",
    howToSubheading: "Configuração simples e sem complicações",
    step1Num: "01",
    step1Title: "Ative o Notes no Nextcloud",
    step1Desc: "No painel web do seu Nextcloud, aceda a «Aplicações» e ative a aplicação oficial «Notes».",
    step2Num: "02",
    step2Title: "Instale o KeepNotes",
    step2Desc: "Instale o KeepNotes a partir do catálogo F-Droid ou descarregue o APK mais recente no GitHub Releases.",
    step3Num: "03",
    step3Title: "Inicie sessão com 1 clique",
    step3Desc: "Abra o KeepNotes, introduza o endereço da sua nuvem e confirme a autorização no navegador via Login Flow v2.",

    // Security & Architecture
    secHeadingPre: "Arquitetura e confiança",
    secHeading: "Os seus dados sob o seu controlo absoluto",
    secSubheading: "Ligação direta e encriptada entre o seu smartphone e o seu servidor sem intermediários",
    secDirectTitle: "Ligação direta",
    secDirectDesc: "A aplicação comunica única e diretamente com o domínio Nextcloud que indicar por HTTPS encriptado. Não existem servidores intermediários.",
    secNoTrackTitle: "Sem rastreadores nem telemetria",
    secNoTrackDesc: "Sem Firebase, Google Analytics, Sentry ou SDKs externos. Nem um único byte de telemetria sai do seu dispositivo.",
    secBiometricTitle: "Cofre local no dispositivo",
    secBiometricDesc: "As credenciais sensíveis são guardadas em segurança no Android EncryptedSharedPreferences e protegidas por biometria.",

    // Architecture Diagram
    archSchemaBadge: "Esquema arquitetónico de interação",
    archPhoneTitle: "O seu smartphone",
    archPhoneSub: "KeepNotes + Room DB",
    archHttpsBadge: "HTTPS direto",
    archZeroRelay: "Zero-Relay",
    archServerTitle: "O seu Nextcloud",
    archServerSub: "Notes API (v1/v2)",
    archFooter: "🔒 Isolamento total de quaisquer servidores de terceiros, nuvens externas e telemetria.",

    // FAQ Section
    faqHeadingPre: "Perguntas e respostas",
    faqHeading: "Perguntas frequentes",
    faqSubheading: "Respostas a dúvidas comuns sobre o funcionamento e segurança da aplicação",

    faqQ1: "É necessária uma ligação constante à internet para usar a aplicação?",
    faqA1: "Não! O KeepNotes foi concebido segundo o paradigma Offline-First. A base de dados local Room é a única fonte da verdade. Pode ler, criar e editar notas sem ligação. Assim que houver internet, a aplicação efetua automaticamente a sincronização bidirecional.",

    faqQ2: "O tema escuro é suportado?",
    faqA2: "Sim. A aplicação suporta totalmente o tema escuro e as diretrizes do Material Design 3, adaptando automaticamente a interface e as cores ao tema do seu dispositivo Android.",

    faqQ3: "As minhas credenciais ou notas ficam guardadas nos vossos servidores?",
    faqA3: "Categoricamente não. Os programadores não possuem quaisquer servidores para recolha de dados. Toda a comunicação ocorre estritamente entre o seu dispositivo e a sua instância Nextcloud via Login Flow v2 com um token de sessão seguro.",

    faqQ4: "Posso utilizar a aplicação sem os serviços Google Play?",
    faqA4: "Sim, sem dúvida. O KeepNotes é 100% software livre e de código aberto (FOSS). Não inclui bibliotecas proprietárias da Google e está disponível no F-Droid e em APKs diretos no GitHub Releases. Funciona perfeitamente em sistemas sem Google (LineageOS, GrapheneOS, /e/OS, etc.).",

    faqQ5: "Quais são as versões do Android suportadas?",
    faqA5: "O KeepNotes é compatível com o Android 8.0 (Oreo) e versões mais recentes, totalmente otimizado para Android 14 e Android 15, garantindo fluidez mesmo em dispositivos modestos.",

    faqQ6: "Como ativar a aplicação Notes no meu servidor Nextcloud?",
    faqA6: "Na interface web do Nextcloud, como administrador, basta aceder à secção «Aplicações», procurar a aplicação oficial «Notes» e clicar em «Transferir e ativar». Não são necessárias configurações adicionais.",

    // CTA Banner
    ctaHeading: "Pronto para organizar as suas notas com facilidade?",
    ctaSubheading: "Descarregue o KeepNotes for Nextcloud hoje mesmo: gratuito, de código aberto e focado na sua privacidade.",
    ctaDownloadApk: "Descarregar APK (GitHub)",
    ctaFdroid: "Disponível no F-Droid",

    // Footer
    footerDesc: "Cliente moderno, rápido e de código aberto para Nextcloud Notes no Android com interface inspirada no Google Keep.",
    footerNavTitle: "Navegação",
    footerResourcesTitle: "Recursos",
    footerLegalTitle: "Informação legal",
    footerPrivacyPolicy: "Política de Privacidade",
    footerSourceCode: "Código-fonte (GitHub)",
    footerReleases: "Lançamentos e binários",
    footerIssues: "Reportar um problema",
    footerLicense: "Licença Apache-2.0",
    footerDisclaimer: "Nextcloud é uma marca registada da Nextcloud GmbH. O KeepNotes é um projeto de código aberto independente e não é afiliado à Nextcloud GmbH.",
    footerCopy: "© 2026 KeepNotes for Nextcloud. Distribuído sob a licença de código aberto Apache 2.0.",

    // Privacy Page Specific
    privacyTitle: "Política de Privacidade do KeepNotes for Nextcloud",
    privacyLastUpdated: "Última atualização: 21 de novembro de 2026",
    privacyIntro: "Respeitamos profundamente o seu direito à privacidade. O KeepNotes for Nextcloud foi concebido com um princípio fundamental: os seus dados pessoais pertencem-lhe exclusivamente a si.",
    privacyBackToHome: "← Voltar à página inicial",
    
    privacySec1Title: "1. Recolha e partilha de dados",
    privacySec1Text: "A aplicação KeepNotes for Nextcloud NÃO recolhe, NÃO armazena e NÃO partilha dados pessoais, identificadores de dispositivo ou dados de análise com terceiros ou com os programadores. Não operamos servidores próprios, bases de dados ou plataformas de telemetria.",
    
    privacySec2Title: "2. Comunicação com o servidor Nextcloud",
    privacySec2Text: "A aplicação comunica única e diretamente com o servidor Nextcloud indicado por si na autenticação. Todas as ações de leitura, criação e edição de notas são transmitidas por protocolo HTTPS encriptado diretamente para o seu servidor.",
    
    privacySec3Title: "3. Credenciais e tokens de acesso",
    privacySec3Text: "A autenticação é efetuada através do mecanismo oficial Nextcloud Login Flow v2. A aplicação nunca acede nem guarda a sua palavra-passe principal. O token de acesso gerado é armazenado localmente no cofre protegido Android EncryptedSharedPreferences.",
    
    privacySec4Title: "4. Autenticação biométrica",
    privacySec4Text: "A funcionalidade de proteção biométrica (impressão digital, reconhecimento facial) utiliza a API nativa do sistema Android BiometricPrompt. A aplicação não tem acesso aos dados biométricos — a validação é processada pelo hardware seguro do sistema operativo.",

    privacySec5Title: "5. Ausência de rastreadores e bibliotecas externas",
    privacySec5Text: "A aplicação está livre de redes de publicidade, rastreadores e ferramentas de telemetria (incluindo Google Play Services, Firebase, Sentry ou outros). O código-fonte é totalmente aberto e auditável publicamente no GitHub.",

    privacySec6Title: "6. Contacto",
    privacySec6Text: "Se tiver dúvidas sobre esta Política de Privacidade ou sobre o funcionamento da aplicação, pode abrir uma issue no repositório oficial do projeto no GitHub: https://github.com/maelst-dev/KeepNotes-for-Nextcloud/issues."
  },

  fr: {
    // Meta & SEO
    pageTitle: "KeepNotes for Nextcloud — Client Android inspiré de Google Keep",
    metaDescription: "Client Android moderne et rapide pour Nextcloud Notes avec interface inspirée de Google Keep. Offline-first, Material 3, synchronisation bidirectionnelle, listes interactives et biométrie.",
    privacyPageTitle: "Politique de confidentialité — KeepNotes for Nextcloud",
    privacyMetaDesc: "Politique de confidentialité de l'application Android KeepNotes for Nextcloud. 100 % FOSS, zéro traqueur, zéro publicité, aucune collecte de données tierce.",

    // Nav
    navFeatures: "Fonctionnalités",
    navScreenshots: "Captures d'écran",
    navHowTo: "Prise en main",
    navSecurity: "Sécurité",
    navFaq: "FAQ",
    navDownload: "Télécharger",
    starOnGithub: "Étoile sur GitHub",

    // Hero
    heroBadge: "100 % Libre et Open Source • Sans publicité • Sans traqueur",
    heroTitle: "Client Nextcloud Notes avec interface inspirée de Google Keep",
    heroSubtitle: "Prise de notes instantanée, listes de tâches interactives, architecture Offline-First robuste et synchronisation bidirectionnelle fluide avec votre instance Nextcloud.",
    downloadApk: "Télécharger l'APK",
    downloadFdroid: "Disponible sur F-Droid",
    fdroidComingSoon: "Bientôt disponible",
    ctaFdroidSoon: "F-Droid — Bientôt",
    footerFdroid: "Catalogue F-Droid",
    soonBadge: "Bientôt",
    viewOnGithub: "Code source",
    heroMockupAlt: "Écran principal de KeepNotes for Nextcloud",

    // Highlights / Stats badge
    statsOffline: "Offline-First",
    statsOfflineDesc: "Base de données Room locale",
    statsSync: "Sync 2 directions",
    statsSyncDesc: "Par etag et horodatages",
    statsPrivacy: "0 traqueur",
    statsPrivacyDesc: "Vie privée totale",

    // Features Section
    featuresHeadingPre: "Fonctionnalités de l'application",
    featuresHeading: "Tout ce dont vous avez besoin pour vos notes",
    featuresSubheading: "Conçu en mettant l'accent sur la confidentialité des données, les performances et la simplicité d'utilisation",
    
    feature1Title: "Interface inspirée de Google Keep",
    feature1Desc: "Disposition en grille décalée (Staggered Grid), prise en charge des couleurs dynamiques de Material Design 3 et modes clair et sombre.",
    
    feature2Title: "Architecture Offline-First robuste",
    feature2Desc: "La base de données locale Room agit comme unique source de vérité. Sauvegarde instantanée et accès à vos notes sans attente réseau.",
    
    feature3Title: "Synchronisation bidirectionnelle",
    feature3Desc: "Synchronisation automatique avec votre serveur via etags et horodatages, avec barre de progression et état visuel.",
    
    feature4Title: "Markdown enrichi et listes interactives",
    feature4Desc: "Cases à cocher cliquables avec texte barré, continuation intelligente de liste avec Entrée et conversion rapide de texte en liste.",
    
    feature5Title: "Protection biométrique",
    feature5Desc: "Sécurisez vos notes personnelles : verrouillage de l'application par empreinte digitale, reconnaissance faciale ou code PIN / schéma.",
    
    feature6Title: "Connexion fluide (Login Flow v2)",
    feature6Desc: "Connexion en 1 clic dans le navigateur : nul besoin de saisir manuellement l'URL ou de générer des mots de passe d'application.",
    
    feature7Title: "100 % Vie privée et FOSS",
    feature7Desc: "Aucune dépendance aux services Google Play, sans publicité, sans télémétrie ni analytique. Vos notes vous appartiennent exclusivement.",
    
    feature8Title: "Personnalisation et tailles de police",
    feature8Desc: "Réglage indépendant de la taille de police pour les cartes et l'éditeur, choix de la langue et navigation fluide par catégories.",

    // Screenshots Section
    screenshotsHeadingPre: "Galerie de l'interface",
    screenshotsHeading: "Un design soigné dans les moindres détails",
    screenshotsSubheading: "Découvrez de véritables captures d'écran de l'application KeepNotes",
    screenshotsHint: "Cliquez sur une capture pour l'agrandir en plein écran",

    screenshot1Title: "Écran principal des notes",
    screenshot1Desc: "Grille décalée avec cases à cocher interactives et recherche instantanée.",
    screenshot2Title: "Aperçu de la liste",
    screenshot2Desc: "Cochez des tâches d'un simple toucher directement depuis l'aperçu.",
    screenshot3Title: "Éditeur de listes de tâches",
    screenshot3Desc: "Complétion intelligente avec Entrée, réorganisation et support Markdown.",
    screenshot4Title: "Convertir en liste de tâches",
    screenshot4Desc: "Transformez du texte brut en liste interactive en un seul geste.",
    screenshot5Title: "Gestion des catégories",
    screenshot5Desc: "Organisez vos notes par projets, thèmes et catégories personnalisées.",
    screenshot6Title: "Paramètres flexibles",
    screenshot6Desc: "Choix du thème, mise à l'échelle des polices et verrouillage biométrique.",
    lightboxHint: "Astuce : Utilisez les flèches du clavier (← / →) ou glissez sur smartphone pour naviguer.",

    // How to start (3 steps)
    howToHeadingPre: "Démarrage rapide",
    howToHeading: "Commencez en 3 étapes simples",
    howToSubheading: "Configuration simple sans instructions compliquées",
    step1Num: "01",
    step1Title: "Activez Notes dans Nextcloud",
    step1Desc: "Dans l'interface web de votre Nextcloud, accédez à « Applications » et activez l'application officielle « Notes ».",
    step2Num: "02",
    step2Title: "Installez KeepNotes",
    step2Desc: "Installez KeepNotes depuis le catalogue F-Droid ou téléchargez le dernier APK depuis les versions GitHub.",
    step3Num: "03",
    step3Title: "Connectez-vous en 1 clic",
    step3Desc: "Ouvrez KeepNotes, saisissez l'adresse de votre Nextcloud et validez la connexion dans le navigateur via Login Flow v2.",

    // Security & Architecture
    secHeadingPre: "Architecture et confiance",
    secHeading: "Vos données sous votre contrôle absolu",
    secSubheading: "Communication directe et chiffrée entre votre smartphone et votre serveur sans intermédiaire",
    secDirectTitle: "Connexion directe",
    secDirectDesc: "L'application communique uniquement et directement avec votre serveur Nextcloud via HTTPS chiffré. Aucun serveur relais n'intervient.",
    secNoTrackTitle: "Sans traqueur ni télémétrie",
    secNoTrackDesc: "Aucun SDK Firebase, Google Analytics, Sentry ou tiers. Pas un seul octet de télémétrie ne quitte votre appareil.",
    secBiometricTitle: "Coffre-fort local",
    secBiometricDesc: "Les jetons d'accès sensibles sont stockés dans Android EncryptedSharedPreferences et protégés par biométrie.",

    // Architecture Diagram
    archSchemaBadge: "Schéma d'interaction architecturale",
    archPhoneTitle: "Votre smartphone",
    archPhoneSub: "KeepNotes + Room DB",
    archHttpsBadge: "HTTPS direct",
    archZeroRelay: "Zero-Relay",
    archServerTitle: "Votre Nextcloud",
    archServerSub: "Notes API (v1/v2)",
    archFooter: "🔒 Isolation totale de tout serveur tiers, cloud externe et télémétrie.",

    // FAQ Section
    faqHeadingPre: "Questions et réponses",
    faqHeading: "Foire Aux Questions",
    faqSubheading: "Réponses aux questions courantes sur le fonctionnement de l'application et la sécurité",

    faqQ1: "Une connexion Internet permanente est-elle nécessaire pour utiliser l'application ?",
    faqA1: "Non ! KeepNotes est conçu selon le principe Offline-First. La base de données locale Room est l'unique source de vérité. Vous pouvez lire, créer et modifier vos notes hors ligne. Dès qu'une connexion est disponible, la synchronisation bidirectionnelle s'exécute automatiquement.",

    faqQ2: "Le thème sombre est-il pris en charge ?",
    faqA2: "Oui. L'application prend entièrement en charge le thème sombre et Material Design 3, en adaptant automatiquement ses couleurs et son interface au thème système de votre appareil Android.",

    faqQ3: "Mes mots de passe ou notes sont-ils stockés sur vos serveurs ?",
    faqA3: "Absolument pas. Les développeurs ne possèdent aucun serveur de collecte de données. Toutes les communications s'effectuent strictement entre votre smartphone et votre instance Nextcloud via Login Flow v2 avec un jeton sécurisé.",

    faqQ4: "Puis-je utiliser l'application sans les services Google Play ?",
    faqA4: "Oui, parfaitement. KeepNotes est un logiciel 100 % libre et open source (FOSS). Il ne contient aucune bibliothèque Google propriétaire et est disponible sur F-Droid ainsi qu'en APK direct sur GitHub Releases. Il fonctionne parfaitement sur les ROMs dégooglisées (LineageOS, GrapheneOS, /e/OS, etc.).",

    faqQ5: "Quelles sont les versions d'Android prises en charge ?",
    faqA5: "KeepNotes prend en charge Android 8.0 (Oreo) et versions supérieures, tout en étant optimisé pour Android 14 et Android 15, garantissant une grande réactivité sur tous les appareils.",

    faqQ6: "Comment activer l'application Notes sur mon serveur Nextcloud ?",
    faqA6: "Dans l'interface web de Nextcloud, en tant qu'administrateur, rendez-vous dans « Applications », recherchez l'application officielle « Notes » et cliquez sur « Télécharger et activer ». Aucune configuration complexe n'est requise.",

    // CTA Banner
    ctaHeading: "Prêt à organiser vos notes en toute simplicité ?",
    ctaSubheading: "Téléchargez KeepNotes for Nextcloud dès aujourd'hui : libre, gratuit et conçu pour respecter votre vie privée.",
    ctaDownloadApk: "Télécharger l'APK (GitHub)",
    ctaFdroid: "Disponible sur F-Droid",

    // Footer
    footerDesc: "Client Android moderne, rapide et open source pour Nextcloud Notes avec interface inspirée de Google Keep.",
    footerNavTitle: "Navigation",
    footerResourcesTitle: "Ressources",
    footerLegalTitle: "Mentions légales",
    footerPrivacyPolicy: "Politique de confidentialité",
    footerSourceCode: "Code source (GitHub)",
    footerReleases: "Versions et binaires",
    footerIssues: "Signaler un problème",
    footerLicense: "Licence Apache-2.0",
    footerDisclaimer: "Nextcloud est une marque déposée de Nextcloud GmbH. KeepNotes est un projet open source indépendant et n'est pas affilié à Nextcloud GmbH.",
    footerCopy: "© 2026 KeepNotes for Nextcloud. Publié sous licence open source Apache 2.0.",

    // Privacy Page Specific
    privacyTitle: "Politique de confidentialité de KeepNotes for Nextcloud",
    privacyLastUpdated: "Dernière mise à jour : 21 novembre 2026",
    privacyIntro: "Nous respectons votre droit à la vie privée. KeepNotes for Nextcloud a été conçu selon un principe fondamental : vos données personnelles vous appartiennent exclusivement.",
    privacyBackToHome: "← Retour à l'accueil",
    
    privacySec1Title: "1. Collecte et partage de données",
    privacySec1Text: "L'application KeepNotes for Nextcloud ne collecte, ne stocke et ne transmet AUCUNE donnée personnelle, identifiant d'appareil ou donnée d'analyse à des tiers ou aux développeurs. Nous n'exploitons aucun serveur de données utilisateur, base de données ni service d'analyse.",
    
    privacySec2Title: "2. Communication avec le serveur Nextcloud",
    privacySec2Text: "L'application communique exclusivement et directement avec le serveur Nextcloud dont vous indiquez l'adresse lors de la connexion. Toutes les opérations de lecture, création et modification de notes transitent via HTTPS sécurisé directement vers votre serveur.",
    
    privacySec3Title: "3. Identifiants et jetons d'accès",
    privacySec3Text: "L'authentification s'effectue via le mécanisme officiel Nextcloud Login Flow v2. L'application ne voit ni ne stocke jamais votre mot de passe principal. Le jeton d'accès généré est stocké localement sur l'appareil dans le stockage sécurisé Android EncryptedSharedPreferences.",
    
    privacySec4Title: "4. Authentification biométrique",
    privacySec4Text: "La fonction de protection biométrique (empreinte digitale, reconnaissance faciale) utilise l'API système Android BiometricPrompt. L'application n'a aucun accès direct aux données biométriques : la vérification est effectuée de manière matérielle par le système d'exploitation.",

    privacySec5Title: "5. Absence de traqueurs et de bibliothèques tierces",
    privacySec5Text: "L'application ne contient aucun réseau publicitaire, aucun traqueur et aucun service de télémétrie tiers (y compris Google Play Services, Firebase, Sentry ou autre). Le code source de l'application est entièrement ouvert et consultable sur GitHub.",

    privacySec6Title: "6. Contact",
    privacySec6Text: "Pour toute question relative à cette politique de confidentialité ou au fonctionnement de l'application, vous pouvez ouvrir un ticket sur le dépôt officiel du projet sur GitHub : https://github.com/maelst-dev/KeepNotes-for-Nextcloud/issues."
  },

  de: {
    // Meta & SEO
    pageTitle: "KeepNotes for Nextcloud — Android-Client im Stil von Google Keep",
    metaDescription: "Moderner und schneller Android-Client für Nextcloud Notes mit Benutzeroberfläche im Stil von Google Keep. Offline-First, Material 3, 2-Wege-Synchronisation, Checklisten und Biometrie.",
    privacyPageTitle: "Datenschutzerklärung — KeepNotes for Nextcloud",
    privacyMetaDesc: "Datenschutzerklärung für die Android-App KeepNotes for Nextcloud. 100 % FOSS, keine Tracker, keine Werbung, keine Datenweitergabe an Dritte.",

    // Nav
    navFeatures: "Funktionen",
    navScreenshots: "Screenshots",
    navHowTo: "Erste Schritte",
    navSecurity: "Sicherheit",
    navFaq: "FAQ",
    navDownload: "Herunterladen",
    starOnGithub: "Stern auf GitHub",

    // Hero
    heroBadge: "100 % Frei & Open Source • Keine Werbung • Keine Tracker",
    heroTitle: "Nextcloud Notes-Client mit an Google Keep angelehnter Oberfläche",
    heroSubtitle: "Blitzschnelles Notieren, interaktive Checklisten, robuste Offline-First-Architektur und nahtlose 2-Wege-Synchronisation mit Ihrer Nextcloud-Instanz.",
    downloadApk: "APK herunterladen",
    downloadFdroid: "Verfügbar auf F-Droid",
    fdroidComingSoon: "Bald verfügbar",
    ctaFdroidSoon: "F-Droid — Bald verfügbar",
    footerFdroid: "F-Droid-Katalog",
    soonBadge: "Bald",
    viewOnGithub: "Quellcode",
    heroMockupAlt: "Hauptbildschirm von KeepNotes for Nextcloud",

    // Highlights / Stats badge
    statsOffline: "Offline-First",
    statsOfflineDesc: "Lokale Room-Datenbank",
    statsSync: "2-Wege-Sync",
    statsSyncDesc: "Über etag & Zeitstempel",
    statsPrivacy: "0 Tracker",
    statsPrivacyDesc: "Vollständige Privatsphäre",

    // Features Section
    featuresHeadingPre: "App-Funktionen",
    featuresHeading: "Alles, was Sie für Ihre Notizen brauchen",
    featuresSubheading: "Entwickelt mit Fokus auf Datenschutz, Geschwindigkeit und intuitive Bedienung",
    
    feature1Title: "Von Google Keep inspirierte Oberfläche",
    feature1Desc: "Versetztes Kartenraster (Staggered Grid), dynamische Material-Design-3-Farben sowie helle und dunkle Designs.",
    
    feature2Title: "Robuste Offline-First-Architektur",
    feature2Desc: "Die lokale Room-Datenbank fungiert als zentrale Datenquelle. Sofortiges Speichern und Zugriff auf Notizen ganz ohne Netzwerkverzögerung.",
    
    feature3Title: "Bidirektionale Synchronisation",
    feature3Desc: "Automatische Serversynchronisation über etags und Zeitstempel, komplett mit visueller Fortschritts- und Statusanzeige.",
    
    feature4Title: "Erweitertes Markdown & Checklisten",
    feature4Desc: "Klickbare Kontrollkästchen mit Durchstreichung, intelligente Eingabetasten-Fortsetzung und 1-Klick-Text-zu-Listen-Konvertierung.",
    
    feature5Title: "Biometrischer Schutz",
    feature5Desc: "Schützen Sie persönliche Einträge: Zuverlässige App-Sperre per Fingerabdruck, Gesichtserkennung oder Geräte-PIN / -Muster.",
    
    feature6Title: "Nahtlose Anmeldung (Login Flow v2)",
    feature6Desc: "1-Klick-Anmeldung über den Browser: kein manuelles Kopieren von Server-URLs oder Erstellen umständlicher App-Passwörter.",
    
    feature7Title: "100 % Privatsphäre & FOSS",
    feature7Desc: "Keine Google Play Services-Abhängigkeiten, werbefrei, ohne Telemetrie und Analysedienste. Ihre Notizen gehören ganz allein Ihnen.",
    
    feature8Title: "Personalisierung & Schriftgrößen",
    feature8Desc: "Unabhängige Schriftgrößen für Karten und Editor, integrierte Sprachauswahl und übersichtliche Kategoriefilterung.",

    // Screenshots Section
    screenshotsHeadingPre: "Galerie der Benutzeroberfläche",
    screenshotsHeading: "Durchdachtes Design bis ins Detail",
    screenshotsSubheading: "Erleben Sie echte Bildschirmfotos der KeepNotes-App",
    screenshotsHint: "Klicken Sie auf ein beliebiges Bildschirmfoto für die Vollbildansicht",

    screenshot1Title: "Hauptbildschirm der Notizen",
    screenshot1Desc: "Versetztes Kartenraster mit Live-Kontrollkästchen und Sofortsuche.",
    screenshot2Title: "Checklisten-Vorschau",
    screenshot2Desc: "Aufgaben mit einem Fingertipp direkt in der Vorschau abhaken.",
    screenshot3Title: "Checklisten-Editor",
    screenshot3Desc: "Intelligente Enter-Fortsetzung, schnelles Sortieren und Markdown-Unterstützung.",
    screenshot4Title: "In Checkliste umwandeln",
    screenshot4Desc: "Fließtext mit einem einzigen Antippen in eine interaktive Checkliste verwandeln.",
    screenshot5Title: "Kategorieverwaltung",
    screenshot5Desc: "Notizen übersichtlich nach Projekten, Themen und Kategorien ordnen.",
    screenshot6Title: "Flexible Einstellungen",
    screenshot6Desc: "Designauswahl, unabhängige Schriftgrößen-Skalierung und biometrische App-Sperre.",
    lightboxHint: "Tipp: Nutzen Sie die Pfeiltasten (← / →) oder Wischgesten auf dem Smartphone zum Navigieren.",

    // How to start (3 steps)
    howToHeadingPre: "Schnellstart",
    howToHeading: "In 3 einfachen Schritten startklar",
    howToSubheading: "Mühelose Einrichtung ganz ohne komplizierte Anleitungen",
    step1Num: "01",
    step1Title: "Notes in Nextcloud aktivieren",
    step1Desc: "In der Web-Oberfläche Ihrer Nextcloud auf „Apps“ gehen und die offizielle App „Notes“ aktivieren.",
    step2Num: "02",
    step2Title: "KeepNotes installieren",
    step2Desc: "Installieren Sie KeepNotes aus dem F-Droid-Katalog oder laden Sie die aktuelle APK von GitHub Releases herunter.",
    step3Num: "03",
    step3Title: "Mit 1 Klick anmelden",
    step3Desc: "Öffnen Sie KeepNotes, geben Sie die Adresse Ihrer Nextcloud ein und bestätigen Sie die Anmeldung im Browser via Login Flow v2.",

    // Security & Architecture
    secHeadingPre: "Architektur und Vertrauen",
    secHeading: "Ihre Daten unter Ihrer vollständigen Kontrolle",
    secSubheading: "Direkte, verschlüsselte Verbindung zwischen Smartphone und Ihrem Server ohne Zwischenstationen",
    secDirectTitle: "Direkte Verbindung",
    secDirectDesc: "Die App kommuniziert ausschließlich und direkt über verschlüsseltes HTTPS mit Ihrer angegebenen Nextcloud-Domain. Zwischenserver gibt es nicht.",
    secNoTrackTitle: "Keine Tracker oder Telemetrie",
    secNoTrackDesc: "Kein Firebase, Google Analytics, Sentry oder Drittanbieter-SDKs. Kein einziges Byte an Telemetriedaten verlässt Ihr Gerät.",
    secBiometricTitle: "Lokaler Tresor",
    secBiometricDesc: "Sensible Sitzungstokens werden sicher in Android EncryptedSharedPreferences gespeichert und durch Biometrie geschützt.",

    // Architecture Diagram
    archSchemaBadge: "Architekturschema der Interaktion",
    archPhoneTitle: "Ihr Smartphone",
    archPhoneSub: "KeepNotes + Room DB",
    archHttpsBadge: "Direktes HTTPS",
    archZeroRelay: "Zero-Relay",
    archServerTitle: "Ihre Nextcloud",
    archServerSub: "Notes API (v1/v2)",
    archFooter: "🔒 Vollständige Isolation gegenüber Drittanbieter-Servern, fremden Clouds und Analysediensten.",

    // FAQ Section
    faqHeadingPre: "Fragen und Antworten",
    faqHeading: "Häufig gestellte Fragen",
    faqSubheading: "Antworten auf häufige Fragen zur App-Funktionalität und Sicherheit",

    faqQ1: "Wird eine ständige Internetverbindung zur Nutzung der App benötigt?",
    faqA1: "Nein! KeepNotes basiert auf dem Offline-First-Prinzip. Die lokale Room-Datenbank fungiert als zentrale Datenquelle. Sie können Notizen jederzeit ohne Internetverbindung ansehen, erstellen und bearbeiten. Sobald eine Verbindung besteht, synchronisiert die App automatisch bidirektional.",

    faqQ2: "Wird ein dunkles Design unterstützt?",
    faqA2: "Ja. Die App unterstützt das dunkle Design sowie Material Design 3 vollständig und passt Oberfläche und Farben automatisch an das Systemeinstellungs-Design Ihres Android-Geräts an.",

    faqQ3: "Werden meine Zugangsdaten oder Notizen auf Ihren Servern gespeichert?",
    faqA3: "Kategorisch nein. Die Entwickler betreiben keinerlei Server zur Datenerfassung. Die Kommunikation findet ausschließlich zwischen Ihrem Gerät und Ihrer eigenen Nextcloud-Instanz über Login Flow v2 mit einem sicheren Sitzungstoken statt.",

    faqQ4: "Kann ich die App ohne Google Play Services nutzen?",
    faqA4: "Ja, uneingeschränkt. KeepNotes ist 100 % freie Open-Source-Software (FOSS). Es enthält keinerlei proprietäre Google-Bibliotheken, ist im F-Droid-Katalog sowie als direkte APK auf GitHub Releases verfügbar und läuft einwandfrei auf entgoogelten Custom-ROMs (LineageOS, GrapheneOS, /e/OS usw.).",

    faqQ5: "Welche Android-Versionen werden unterstützt?",
    faqA5: "KeepNotes unterstützt Android 8.0 (Oreo) und neuer, ist vollständig für Android 14 und Android 15 optimiert und läuft auch auf älteren oder günstigeren Geräten gewohnt flüssig.",

    faqQ6: "Wie aktiviere ich die Notes-App auf meinem Nextcloud-Server?",
    faqA6: "In der Web-Oberfläche Ihrer Nextcloud melden Sie sich als Administrator an, wechseln zu „Apps“, suchen nach der offiziellen App „Notes“ und klicken auf „Herunterladen und aktivieren“. Es ist keine weitere Konfiguration nötig.",

    // CTA Banner
    ctaHeading: "Bereit für mühelose Notizenverwaltung?",
    ctaSubheading: "Laden Sie KeepNotes for Nextcloud noch heute herunter – frei, kostenlos und mit Fokus auf Datenschutz.",
    ctaDownloadApk: "APK herunterladen (GitHub)",
    ctaFdroid: "Verfügbar auf F-Droid",

    // Footer
    footerDesc: "Moderner, schneller und quelloffener Android-Client für Nextcloud Notes mit Benutzeroberfläche im Stil von Google Keep.",
    footerNavTitle: "Navigation",
    footerResourcesTitle: "Ressourcen",
    footerLegalTitle: "Rechtliches",
    footerPrivacyPolicy: "Datenschutzerklärung",
    footerSourceCode: "Quellcode (GitHub)",
    footerReleases: "Releases & Binärdateien",
    footerIssues: "Fehler melden",
    footerLicense: "Apache-2.0-Lizenz",
    footerDisclaimer: "Nextcloud ist eine eingetragene Marke der Nextcloud GmbH. KeepNotes ist ein unabhängiges Open-Source-Projekt und nicht mit Nextcloud GmbH verbunden.",
    footerCopy: "© 2026 KeepNotes for Nextcloud. Veröffentlicht unter der Open-Source-Lizenz Apache 2.0.",

    // Privacy Page Specific
    privacyTitle: "Datenschutzerklärung für KeepNotes for Nextcloud",
    privacyLastUpdated: "Zuletzt aktualisiert: 21. November 2026",
    privacyIntro: "Wir respektieren Ihr Recht auf Privatsphäre. KeepNotes for Nextcloud wurde nach einem grundlegenden Prinzip entwickelt: Ihre persönlichen Daten gehören ausschließlich Ihnen.",
    privacyBackToHome: "← Zurück zur Startseite",
    
    privacySec1Title: "1. Datenerfassung und -weitergabe",
    privacySec1Text: "Die Anwendung KeepNotes for Nextcloud erfasst, speichert und übermittelt KEINE personenbezogenen Daten, Gerätekennungen oder Analysedaten an Dritte oder die App-Entwickler. Wir betreiben keine eigenen Nutzerdatenserver, Datenbanken oder Analysedienste.",
    
    privacySec2Title: "2. Kommunikation mit dem Nextcloud-Server",
    privacySec2Text: "Die App kommuniziert ausschließlich und direkt mit dem Nextcloud-Server, dessen Adresse Sie bei der Anmeldung angeben. Sämtliche Lese-, Erstellungs- und Bearbeitungsvorgänge von Notizen werden über das verschlüsselte HTTPS-Protokoll direkt an Ihren Server übertragen.",
    
    privacySec3Title: "3. Zugangsdaten und Tokens",
    privacySec3Text: "Die Authentifizierung erfolgt über den offiziellen Mechanismus Nextcloud Login Flow v2. Die App sieht und speichert Ihr Master-Passwort zu keinem Zeitpunkt. Das erstellte Zugriffstoken wird lokal auf dem Gerät im geschützten Speicher Android EncryptedSharedPreferences aufbewahrt.",
    
    privacySec4Title: "4. Biometrische Authentifizierung",
    privacySec4Text: "Die biometrische Schutzfunktion (Fingerabdruck, Gesichtserkennung) nutzt die Standard-System-API Android BiometricPrompt. Die App hat keinen direkten Zugriff auf biometrische Daten – die Überprüfung erfolgt hardwarebasiert durch das Betriebssystem Ihres Geräts.",

    privacySec5Title: "5. Keine Drittanbieter-Tracker oder Bibliotheken",
    privacySec5Text: "In der App gibt es weder Werbenetzwerke, Tracker noch Telemetriedienste von Drittanbietern (einschließlich Google Play Services, Firebase, Sentry u. a.). Der Quellcode der Anwendung ist vollständig quelloffen und auf GitHub öffentlich einsehbar.",

    privacySec6Title: "6. Kontakt",
    privacySec6Text: "Wenn Sie Fragen zur Datenschutzerklärung oder zur Funktionsweise der Anwendung haben, können Sie gerne ein Ticket im offiziellen GitHub-Repository des Projekts erstellen: https://github.com/maelst-dev/KeepNotes-for-Nextcloud/issues."
  }
};

window.I18N_DATA = translations;
