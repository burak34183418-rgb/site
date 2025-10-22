"""
Seed initial data to database
Run this script to populate the database with categories and initial products
"""
import asyncio
from database import categories_collection, products_collection, db
from datetime import datetime

async def seed_categories():
    """Seed initial categories"""
    categories = [
        {
            "id": "cat-steam-generator",
            "name": {
                "tr": "Buhar Jeneratörü",
                "en": "Steam Generator",
                "ar": "مولد البخار",
                "ru": "Парогенератор"
            },
            "description": {
                "tr": "Profesyonel istim makinaları",
                "en": "Professional steam machines",
                "ar": "آلات بخار احترافية",
                "ru": "Профессиональные паровые машины"
            },
            "slug": "steam-generator",
            "image": "https://customer-assets.emergentagent.com/job_00fb527f-13c0-4a88-8f54-3e96e9176e0d/artifacts/c3vefy9q_BT8A7957.jpg",
            "created_at": datetime.utcnow()
        },
        {
            "id": "cat-vacuum-systems",
            "name": {
                "tr": "Vakum Sistemleri",
                "en": "Vacuum Systems",
                "ar": "أنظمة الفراغ",
                "ru": "Вакуумные системы"
            },
            "description": {
                "tr": "Masaüstü cila makinaları ve vakum sistemleri",
                "en": "Desktop polishing machines and vacuum systems",
                "ar": "آلات تلميع مكتبية وأنظمة فراغ",
                "ru": "Настольные полировальные машины и вакуумные системы"
            },
            "slug": "vacuum-systems",
            "image": "https://customer-assets.emergentagent.com/job_00fb527f-13c0-4a88-8f54-3e96e9176e0d/artifacts/m2s1wccc_BT8A8012.jpg",
            "created_at": datetime.utcnow()
        },
        {
            "id": "cat-industrial-press",
            "name": {
                "tr": "Endüstriyel Pres",
                "en": "Industrial Press",
                "ar": "مكبس صناعي",
                "ru": "Промышленный пресс"
            },
            "description": {
                "tr": "İstim makinası entegre pres sistemleri",
                "en": "Steam machine integrated press systems",
                "ar": "أنظمة مكابس متكاملة مع آلة البخار",
                "ru": "Прессовые системы с интегрированной паровой машиной"
            },
            "slug": "industrial-press",
            "image": "https://customer-assets.emergentagent.com/job_00fb527f-13c0-4a88-8f54-3e96e9176e0d/artifacts/wr1vvevf_BT8A8026.jpg",
            "created_at": datetime.utcnow()
        }
    ]
    
    # Clear existing categories
    await categories_collection.delete_many({})
    
    # Insert categories
    await categories_collection.insert_many(categories)
    print(f"✅ Seeded {len(categories)} categories")

async def seed_products():
    """Seed initial products with user-uploaded images"""
    products = [
        # Vacuum Systems - New products from user uploads
        {
            "id": "prod-talasli-kurutma",
            "category_id": "cat-vacuum-systems",
            "name": {
                "tr": "Talaşlı Kurutma Makinası",
                "en": "Chip Drying Machine",
                "ar": "آلة تجفيف الرقائق",
                "ru": "Машина для сушки стружки"
            },
            "description": {
                "tr": "Endüstriyel talaşlı kurutma makinası. Yüksek verimli çift çekmeceli sistem ile hızlı kurutma sağlar.",
                "en": "Industrial chip drying machine. Provides fast drying with high-efficiency double drawer system.",
                "ar": "آلة تجفيف الرقائق الصناعية. توفر تجفيفًا سريعًا بنظام درج مزدوج عالي الكفاءة.",
                "ru": "Промышленная машина для сушки стружки. Обеспечивает быструю сушку благодаря высокоэффективной системе с двойным ящиком."
            },
            "specs": {
                "power": "2.2 KW",
                "voltage": "380V",
                "dimensions": "80x60x90 cm",
                "weight": "75 kg"
            },
            "features": {
                "tr": ["Çift çekmece sistemi", "Güçlü vakum", "CE sertifikalı", "Dayan ıklı yapı"],
                "en": ["Double drawer system", "Powerful vacuum", "CE certified", "Durable structure"],
                "ar": ["نظام درج مزدوج", "فراغ قوي", "معتمد من CE", "هيكل متين"],
                "ru": ["Система с двойным ящиком", "Мощный вакуум", "Сертифицирован CE", "Прочная конструкция"]
            },
            "images": ["https://customer-assets.emergentagent.com/job_beymen-site-clone/artifacts/3tkk664t_BT8A8035.png"],
            "price": "Fiyat için iletişime geçin",
            "is_active": True,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "id": "prod-ciftli-masa-cila",
            "category_id": "cat-vacuum-systems",
            "name": {
                "tr": "Çiftli Masaüstü Cila Makinası",
                "en": "Double Desktop Polishing Machine",
                "ar": "آلة تلميع مكتبية مزدوجة",
                "ru": "Двойная настольная полировальная машина"
            },
            "description": {
                "tr": "İki kişilik çalışmaya uygun çiftli masaüstü cila makinası. Yüksek verimlilik için ideal.",
                "en": "Double desktop polishing machine suitable for two-person operation. Ideal for high efficiency.",
                "ar": "آلة تلميع مكتبية مزدوجة مناسبة لعمل شخصين. مثالية للكفاءة العالية.",
                "ru": "Двойная настольная полировальная машина для работы двух человек. Идеальна для высокой производительности."
            },
            "specs": {
                "power": "1.5 KW",
                "voltage": "220V",
                "dimensions": "60x40x45 cm",
                "weight": "35 kg"
            },
            "features": {
                "tr": ["İki kişilik çalışma", "Güçlü motor", "Sessiz çalışma", "Kolay temizlik"],
                "en": ["Two-person operation", "Powerful motor", "Quiet operation", "Easy cleaning"],
                "ar": ["عمل شخصين", "محرك قوي", "تشغيل هادئ", "تنظيف سهل"],
                "ru": ["Работа двух человек", "Мощный двигатель", "Тихая работа", "Легкая очистка"]
            },
            "images": ["https://customer-assets.emergentagent.com/job_beymen-site-clone/artifacts/h2rjnq9j_BT8A8046.png"],
            "price": "Fiyat için iletişime geçin",
            "is_active": True,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "id": "prod-lap-makinasi",
            "category_id": "cat-vacuum-systems",
            "name": {
                "tr": "Lap Makinası",
                "en": "Lap Machine",
                "ar": "آلة اللف",
                "ru": "Шлифовальная машина"
            },
            "description": {
                "tr": "Profesyonel lap makinası. Hassas yüzey işleme için idealdir.",
                "en": "Professional lap machine. Ideal for precise surface processing.",
                "ar": "آلة لف احترافية. مثالية لمعالجة الأسطح الدقيقة.",
                "ru": "Профессиональная шлифовальная машина. Идеальна для точной обработки поверхностей."
            },
            "specs": {
                "power": "1.8 KW",
                "voltage": "220V / 380V",
                "table_size": "50x40 cm",
                "weight": "45 kg"
            },
            "features": {
                "tr": ["Hassas işleme", "Ayarlanabilir hız", "Güçlü vakum", "CE sertifikalı"],
                "en": ["Precise processing", "Adjustable speed", "Powerful vacuum", "CE certified"],
                "ar": ["معالجة دقيقة", "سرعة قابلة للتعديل", "فراغ قوي", "معتمد من CE"],
                "ru": ["Точная обработка", "Регулируемая скорость", "Мощный вакуум", "Сертифицирован CE"]
            },
            "images": ["https://customer-assets.emergentagent.com/job_beymen-site-clone/artifacts/491kyifz_BT8A8072.jpg"],
            "price": "Fiyat için iletişime geçin",
            "is_active": True,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "id": "prod-tekli-cila-new",
            "category_id": "cat-vacuum-systems",
            "name": {
                "tr": "Tekli Cila Makinası - Premium",
                "en": "Single Polishing Machine - Premium",
                "ar": "آلة تلميع منفردة - بريميوم",
                "ru": "Одинарная полировальная машина - Премиум"
            },
            "description": {
                "tr": "Premium model tekli cila makinası. Gelişmiş özellikler ve üstün performans.",
                "en": "Premium model single polishing machine. Advanced features and superior performance.",
                "ar": "طراز بريميوم آلة تلميع منفردة. ميزات متقدمة وأداء متفوق.",
                "ru": "Премиум модель одинарной полировальной машины. Расширенные функции и превосходная производительность."
            },
            "specs": {
                "power": "0.85 KW",
                "voltage": "220V",
                "dimensions": "45x35x40 cm",
                "weight": "18 kg"
            },
            "features": {
                "tr": ["Premium model", "Dijital kontrol", "Güçlü vakum", "Sessiz çalışma"],
                "en": ["Premium model", "Digital control", "Powerful vacuum", "Quiet operation"],
                "ar": ["طراز بريميوم", "تحكم رقمي", "فراغ قوي", "تشغيل هادئ"],
                "ru": ["Премиум модель", "Цифровое управление", "Мощный вакуум", "Тихая работа"]
            },
            "images": ["https://customer-assets.emergentagent.com/job_beymen-site-clone/artifacts/snym796f_BT8A8136.png"],
            "price": "Fiyat için iletişime geçin",
            "is_active": True,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "id": "prod-kumlama",
            "category_id": "cat-vacuum-systems",
            "name": {
                "tr": "Kumlama Makinası",
                "en": "Sandblasting Machine",
                "ar": "آلة السفع بالرمل",
                "ru": "Пескоструйная машина"
            },
            "description": {
                "tr": "El kollu kumlama kabini. Hassas yüzey temizleme ve hazırlama işlemleri için.",
                "en": "Manual sandblasting cabinet. For precise surface cleaning and preparation.",
                "ar": "خزانة السفع بالرمل اليدوية. لتنظيف وإعداد الأسطح الدقيقة.",
                "ru": "Ручная пескоструйная камера. Для точной очистки и подготовки поверхностей."
            },
            "specs": {
                "power": "0.75 KW",
                "voltage": "220V",
                "cabinet_size": "60x50x60 cm",
                "weight": "55 kg"
            },
            "features": {
                "tr": ["El kollu sistem", "Güçlü vakum", "Görüş penceresi", "Işıklı çalışma alanı"],
                "en": ["Manual system", "Powerful vacuum", "Viewing window", "Illuminated work area"],
                "ar": ["نظام يدوي", "فراغ قوي", "نافذة عرض", "منطقة عمل مضاءة"],
                "ru": ["Ручная система", "Мощный вакуум", "Смотровое окно", "Освещенная рабочая зона"]
            },
            "images": ["https://customer-assets.emergentagent.com/job_beymen-site-clone/artifacts/52ummve3_BT8A8096.png"],
            "price": "Fiyat için iletişime geçin",
            "is_active": True,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "id": "prod-orta-makina",
            "category_id": "cat-vacuum-systems",
            "name": {
                "tr": "Orta Boy Cila Makinası",
                "en": "Medium Size Polishing Machine",
                "ar": "آلة تلميع متوسطة الحجم",
                "ru": "Полировальная машина среднего размера"
            },
            "description": {
                "tr": "Orta ölçekli işletmeler için ideal cila makinası. Dengeli güç ve kompakt tasarım.",
                "en": "Ideal polishing machine for medium-sized businesses. Balanced power and compact design.",
                "ar": "آلة تلميع مثالية للشركات متوسطة الحجم. قوة متوازنة وتصميم مدمج.",
                "ru": "Идеальная полировальная машина для средних предприятий. Сбалансированная мощность и компактный дизайн."
            },
            "specs": {
                "power": "1.2 KW",
                "voltage": "220V",
                "dimensions": "55x40x50 cm",
                "weight": "28 kg"
            },
            "features": {
                "tr": ["Orta ölçekli", "Dengeli güç", "Kompakt tasarım", "Kolay kullanım"],
                "en": ["Medium scale", "Balanced power", "Compact design", "Easy to use"],
                "ar": ["حجم متوسط", "قوة متوازنة", "تصميم مدمج", "سهل الاستخدام"],
                "ru": ["Средний размер", "Сбалансированная мощность", "Компактный дизайн", "Простота в использовании"]
            },
            "images": ["https://customer-assets.emergentagent.com/job_beymen-site-clone/artifacts/8d468nzl_BT8A8162.png"],
            "price": "Fiyat için iletişime geçin",
            "is_active": True,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "id": "prod-calisma-tezgahi-1",
            "category_id": "cat-vacuum-systems",
            "name": {
                "tr": "Profesyonel Çalışma Tezgahı",
                "en": "Professional Workbench",
                "ar": "منضدة عمل احترافية",
                "ru": "Профессиональный верстак"
            },
            "description": {
                "tr": "Entegre çalışma tezgahı. Çoklu işlem istasyonu ile verimli çalışma.",
                "en": "Integrated workbench. Efficient work with multi-process station.",
                "ar": "منضدة عمل متكاملة. عمل فعال مع محطة متعددة العمليات.",
                "ru": "Интегрированный верстак. Эффективная работа с многопроцессной станцией."
            },
            "specs": {
                "power": "2.0 KW",
                "voltage": "220V / 380V",
                "dimensions": "120x70x85 cm",
                "weight": "95 kg"
            },
            "features": {
                "tr": ["Çoklu istasyon", "Geniş çalışma alanı", "Entegre vakum", "Sağlam yapı"],
                "en": ["Multi-station", "Wide work area", "Integrated vacuum", "Solid structure"],
                "ar": ["محطات متعددة", "منطقة عمل واسعة", "فراغ متكامل", "هيكل صلب"],
                "ru": ["Многостанционный", "Широкая рабочая зона", "Встроенный вакуум", "Прочная конструкция"]
            },
            "images": ["https://customer-assets.emergentagent.com/job_beymen-site-clone/artifacts/el8u9u7j_BT8A8171.png"],
            "price": "Fiyat için iletişime geçin",
            "is_active": True,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "id": "prod-calisma-tezgahi-2",
            "category_id": "cat-vacuum-systems",
            "name": {
                "tr": "Standart Çalışma Tezgahı",
                "en": "Standard Workbench",
                "ar": "منضدة عمل قياسية",
                "ru": "Стандартный верстак"
            },
            "description": {
                "tr": "Standart model çalışma tezgahı. Her ölçekteki işletme için uygun.",
                "en": "Standard model workbench. Suitable for businesses of all sizes.",
                "ar": "نموذج قياسي لمنضدة العمل. مناسب للشركات بجميع الأحجام.",
                "ru": "Стандартная модель верстака. Подходит для предприятий всех размеров."
            },
            "specs": {
                "power": "1.8 KW",
                "voltage": "220V",
                "dimensions": "100x60x80 cm",
                "weight": "75 kg"
            },
            "features": {
                "tr": ["Standart model", "Pratik kullanım", "Dayanıklı", "Uygun fiyat"],
                "en": ["Standard model", "Practical use", "Durable", "Affordable"],
                "ar": ["طراز قياسي", "استخدام عملي", "متين", "سعر معقول"],
                "ru": ["Стандартная модель", "Практичное использование", "Прочный", "Доступная цена"]
            },
            "images": ["https://customer-assets.emergentagent.com/job_beymen-site-clone/artifacts/irckqbwb_BT8A8170.png"],
            "price": "Fiyat için iletişime geçin",
            "is_active": True,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "id": "prod-2-kisilik-tezgah",
            "category_id": "cat-vacuum-systems",
            "name": {
                "tr": "2 Kişilik Çalışma Tezgahı",
                "en": "2-Person Workbench",
                "ar": "منضدة عمل لشخصين",
                "ru": "Верстак на 2 человека"
            },
            "description": {
                "tr": "İki kişilik profesyonel çalışma tezgahı. Yüksek verimlilik için tasarlandı.",
                "en": "Two-person professional workbench. Designed for high efficiency.",
                "ar": "منضدة عمل احترافية لشخصين. مصممة للكفاءة العالية.",
                "ru": "Профессиональный верстак на два человека. Разработан для высокой эффективности."
            },
            "specs": {
                "power": "2.5 KW",
                "voltage": "380V",
                "dimensions": "140x80x90 cm",
                "weight": "110 kg"
            },
            "features": {
                "tr": ["2 kişilik", "Geniş alan", "Güçlü vakum", "Profesyonel"],
                "en": ["2-person", "Wide area", "Powerful vacuum", "Professional"],
                "ar": ["شخصين", "منطقة واسعة", "فراغ قوي", "احترافي"],
                "ru": ["2 человека", "Широкая площадь", "Мощный вакуум", "Профессиональный"]
            },
            "images": ["https://customer-assets.emergentagent.com/job_beymen-site-clone/artifacts/smc6x6zl_BT8A8186.png"],
            "price": "Fiyat için iletişime geçin",
            "is_active": True,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "id": "prod-tezgah-detay",
            "category_id": "cat-vacuum-systems",
            "name": {
                "tr": "Detaylı İşlem Tezgahı",
                "en": "Detailed Processing Workbench",
                "ar": "منضدة معالجة مفصلة",
                "ru": "Детальный обрабатывающий верстак"
            },
            "description": {
                "tr": "Hassas işlemler için özel tasarım tezgah. Çok amaçlı kullanım.",
                "en": "Specially designed workbench for precise operations. Multipurpose use.",
                "ar": "منضدة مصممة خصيصًا للعمليات الدقيقة. استخدام متعدد الأغراض.",
                "ru": "Специально разработанный верстак для точных операций. Многоцелевое использование."
            },
            "specs": {
                "power": "1.5 KW",
                "voltage": "220V",
                "dimensions": "90x65x75 cm",
                "weight": "65 kg"
            },
            "features": {
                "tr": ["Hassas işlem", "Çok amaçlı", "Kompakt", "Güvenli"],
                "en": ["Precise operation", "Multipurpose", "Compact", "Safe"],
                "ar": ["عملية دقيقة", "متعدد الأغراض", "مدمج", "آمن"],
                "ru": ["Точная работа", "Многоцелевой", "Компактный", "Безопасный"]
            },
            "images": ["https://customer-assets.emergentagent.com/job_beymen-site-clone/artifacts/6vm8gqry_BT8A8190.jpg"],
            "price": "Fiyat için iletişime geçin",
            "is_active": True,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "id": "prod-super-lap-2",
            "category_id": "cat-vacuum-systems",
            "name": {
                "tr": "Süper Lap Makinası",
                "en": "Super Lap Machine",
                "ar": "آلة لف فائقة",
                "ru": "Супер шлифовальная машина"
            },
            "description": {
                "tr": "Yüksek performanslı süper lap makinası. İleri teknoloji ile üstün sonuçlar.",
                "en": "High performance super lap machine. Superior results with advanced technology.",
                "ar": "آلة لف فائقة عالية الأداء. نتائج متفوقة مع التكنولوجيا المتقدمة.",
                "ru": "Высокопроизводительная супер шлифовальная машина. Превосходные результаты с передовыми технологиями."
            },
            "specs": {
                "power": "2.5 KW",
                "voltage": "380V",
                "table_size": "70x50 cm",
                "weight": "65 kg"
            },
            "features": {
                "tr": ["Yüksek performans", "İleri teknoloji", "Hassas kontrol", "CE sertifikalı"],
                "en": ["High performance", "Advanced technology", "Precise control", "CE certified"],
                "ar": ["أداء عالي", "تكنولوجيا متقدمة", "تحكم دقيق", "معتمد من CE"],
                "ru": ["Высокая производительность", "Передовая технология", "Точный контроль", "Сертифицирован CE"]
            },
            "images": ["https://customer-assets.emergentagent.com/job_beymen-site-clone/artifacts/ri3t6iz4_BT8A8238.jpg"],
            "price": "Fiyat için iletişime geçin",
            "is_active": True,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "id": "prod-king-makina",
            "category_id": "cat-vacuum-systems",
            "name": {
                "tr": "King Cila Makinası",
                "en": "King Polishing Machine",
                "ar": "آلة تلميع كينج",
                "ru": "Полировальная машина Кинг"
            },
            "description": {
                "tr": "Premium sınıf King model cila makinası. Endüstriyel kullanım için en üst segment.",
                "en": "Premium class King model polishing machine. Top segment for industrial use.",
                "ar": "آلة تلميع طراز كينج من الفئة الممتازة. الشريحة العليا للاستخدام الصناعي.",
                "ru": "Полировальная машина премиум-класса модели Кинг. Топ-сегмент для промышленного использования."
            },
            "specs": {
                "power": "3.0 KW",
                "voltage": "380V",
                "dimensions": "80x60x75 cm",
                "weight": "85 kg"
            },
            "features": {
                "tr": ["Premium model", "Yüksek kapasite", "Profesyonel", "Dayanıklı yapı"],
                "en": ["Premium model", "High capacity", "Professional", "Durable structure"],
                "ar": ["طراز بريميوم", "سعة عالية", "احترافي", "هيكل متين"],
                "ru": ["Премиум модель", "Высокая мощность", "Профессиональный", "Прочная конструкция"]
            },
            "images": ["https://customer-assets.emergentagent.com/job_beymen-site-clone/artifacts/0ownvyev_BT8A8267.png"],
            "price": "Fiyat için iletişime geçin",
            "is_active": True,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "id": "prod-x7-premium",
            "category_id": "cat-vacuum-systems",
            "name": {
                "tr": "X7 Premium Cila Makinası",
                "en": "X7 Premium Polishing Machine",
                "ar": "آلة تلميع X7 بريميوم",
                "ru": "Полировальная машина X7 Премиум"
            },
            "description": {
                "tr": "X7 serisi premium cila makinası. En yeni teknoloji ve üstün performans bir arada.",
                "en": "X7 series premium polishing machine. Latest technology and superior performance combined.",
                "ar": "آلة تلميع بريميوم من سلسلة X7. أحدث التقنيات والأداء المتفوق معًا.",
                "ru": "Премиум полировальная машина серии X7. Новейшие технологии и превосходная производительность вместе."
            },
            "specs": {
                "power": "2.8 KW",
                "voltage": "220V / 380V",
                "dimensions": "75x55x70 cm",
                "weight": "72 kg"
            },
            "features": {
                "tr": ["X7 teknoloji", "Premium özellikler", "Çift voltaj", "Yüksek verim"],
                "en": ["X7 technology", "Premium features", "Dual voltage", "High efficiency"],
                "ar": ["تقنية X7", "ميزات بريميوم", "جهد مزدوج", "كفاءة عالية"],
                "ru": ["Технология X7", "Премиум функции", "Двойное напряжение", "Высокая эффективность"]
            },
            "images": ["https://customer-assets.emergentagent.com/job_beymen-site-clone/artifacts/otbo3pa0_BT8A8297.jpg"],
            "price": "Fiyat için iletişime geçin",
            "is_active": True,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "id": "prod-iki-kisilik-lap",
            "category_id": "cat-vacuum-systems",
            "name": {
                "tr": "İki Kişilik Lap Makinası",
                "en": "Two-Person Lap Machine",
                "ar": "آلة لف لشخصين",
                "ru": "Шлифовальная машина на два человека"
            },
            "description": {
                "tr": "İki operatör için tasarlanmış profesyonel lap makinası. Çift taraflı çalışma imkanı.",
                "en": "Professional lap machine designed for two operators. Double-sided operation capability.",
                "ar": "آلة لف احترافية مصممة لمشغلين اثنين. إمكانية العمل على الوجهين.",
                "ru": "Профессиональная шлифовальная машина для двух операторов. Возможность двусторонней работы."
            },
            "specs": {
                "power": "3.5 KW",
                "voltage": "380V",
                "table_size": "100x60 cm",
                "weight": "95 kg"
            },
            "features": {
                "tr": ["İki kişilik", "Çift taraflı", "Yüksek kapasite", "Profesyonel kullanım"],
                "en": ["Two-person", "Double-sided", "High capacity", "Professional use"],
                "ar": ["شخصين", "وجهين", "سعة عالية", "استخدام احترافي"],
                "ru": ["Двухместный", "Двусторонний", "Высокая мощность", "Профессиональное использование"]
            },
            "images": ["https://customer-assets.emergentagent.com/job_beymen-site-clone/artifacts/oe58dcx6_BT8A8304.png"],
            "price": "Fiyat için iletişime geçin",
            "is_active": True,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "id": "prod-mega-cila-2",
            "category_id": "cat-vacuum-systems",
            "name": {
                "tr": "Mega Cila Makinası",
                "en": "Mega Polishing Machine",
                "ar": "آلة تلميع ميجا",
                "ru": "Мега полировальная машина"
            },
            "description": {
                "tr": "Mega boyutlarda cila makinası. Büyük ölçekli üretim için ideal çözüm.",
                "en": "Mega size polishing machine. Ideal solution for large-scale production.",
                "ar": "آلة تلميع ميجا الحجم. الحل الأمثل للإنتاج واسع النطاق.",
                "ru": "Полировальная машина мега размера. Идеальное решение для крупномасштабного производства."
            },
            "specs": {
                "power": "4.0 KW",
                "voltage": "380V",
                "dimensions": "120x80x90 cm",
                "weight": "150 kg"
            },
            "features": {
                "tr": ["Mega kapasite", "Endüstriyel güç", "Büyük alan", "Heavy-duty"],
                "en": ["Mega capacity", "Industrial power", "Large area", "Heavy-duty"],
                "ar": ["سعة ميجا", "قوة صناعية", "منطقة كبيرة", "للاستخدام الشاق"],
                "ru": ["Мега мощность", "Промышленная сила", "Большая площадь", "Сверхпрочный"]
            },
            "images": ["https://customer-assets.emergentagent.com/job_beymen-site-clone/artifacts/fzhurecv_BT8A8345.jpg"],
            "price": "Fiyat için iletişime geçin",
            "is_active": True,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
    ]
    
    # Clear existing products
    await products_collection.delete_many({})
    
    # Insert products
    await products_collection.insert_many(products)
    print(f"✅ Seeded {len(products)} products")

async def main():
    """Main seed function"""
    print("🌱 Starting database seed...")
    
    await seed_categories()
    await seed_products()
    
    print("✅ Database seed completed successfully!")
    print("\n📊 Summary:")
    print(f"   - Categories: {await categories_collection.count_documents({})}")
    print(f"   - Products: {await products_collection.count_documents({})}")
    print("\n🔐 Default Admin Credentials:")
    print("   - Username: admin")
    print("   - Password: admin123")

if __name__ == "__main__":
    asyncio.run(main())
