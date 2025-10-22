import React from 'react';
import { Award, Users, Globe2, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../mockData';
import { companyInfo } from '../data/companyInfo';
import { Card, CardContent } from '../components/ui/card';

const About = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const stats = [
    {
      icon: Award,
      value: '36',
      label: language === 'tr' ? 'Yıllık Deneyim' : language === 'en' ? 'Years Experience' : language === 'ar' ? 'سنة من الخبرة' : 'Лет опыта',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Users,
      value: '10000+',
      label: language === 'tr' ? 'Mutlu Müşteri' : language === 'en' ? 'Happy Clients' : language === 'ar' ? 'عميل سعيد' : 'Довольных клиентов',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Globe2,
      value: '50+',
      label: language === 'tr' ? 'İhracat Ülkesi' : language === 'en' ? 'Export Countries' : language === 'ar' ? 'دول التصدير' : 'Стран экспорта',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: TrendingUp,
      value: '#1',
      label: language === 'tr' ? 'Sektör Lideri' : language === 'en' ? 'Industry Leader' : language === 'ar' ? 'رائد الصناعة' : 'Лидер отрасли',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">{t.nav.about}</h1>
          <p className="text-xl text-blue-100">GOLD VAKUM SİSTEMLERİ MAKİNA SANAYİ TİCARET LİMİTED ŞİRKETİ</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* About Content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              {language === 'tr' ? 'Hakkımızda' : language === 'en' ? 'About Us' : language === 'ar' ? 'من نحن' : 'О нас'}
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-500 p-6 rounded-lg mb-6">
                <h3 className="text-2xl font-bold text-yellow-800 mb-3">
                  FOR THE OPTIMUM GOLD RECOVERY
                </h3>
                <p className="text-yellow-900 font-medium">
                  {language === 'tr'
                    ? 'Kuyumculuk sektörüne özel altın geri kazanım sistemlerinde uzmanız. Makinalarımız optimum verimlilik ve maksimum altın geri kazanımı sağlar.'
                    : language === 'en'
                    ? 'We specialize in gold recovery systems for the jewelry industry. Our machines provide optimum efficiency and maximum gold recovery.'
                    : language === 'ar'
                    ? 'نحن متخصصون في أنظمة استعادة الذهب لصناعة المجوهرات. توفر آلاتنا كفاءة مثالية وأقصى استرداد للذهب.'
                    : 'Мы специализируемся на системах восстановления золота для ювелирной промышленности. Наши машины обеспечивают оптимальную эффективность и максимальное восстановление золота.'}
                </p>
              </div>
              <p>
                <strong className="text-blue-600">{companyInfo.about[language].experience}</strong> - {language === 'tr'
                  ? 'GOLD Vakum Sistemleri, kuyumculuk ve altın işleme sektöründe 36 yıllık tecrübesiyle sektörün lider firmalarından biridir. Altın geri kazanımı, cila ve parlatma sistemleri konusunda uzmanlaşmış firmamız, %99 müşteri memnuniyeti ile sektörün öncüsüdür.'
                  : language === 'en'
                  ? 'GOLD Vacuum Systems is one of the leading companies in the jewelry and gold processing sector with 36 years of experience. Our company, specialized in gold recovery, polishing and finishing systems, is the pioneer of the industry with 99% customer satisfaction.'
                  : language === 'ar'
                  ? 'تعد GOLD Vacuum Systems واحدة من الشركات الرائدة في قطاع المجوهرات ومعالجة الذهب مع 36 عامًا من الخبرة. شركتنا المتخصصة في أنظمة استعادة الذهب والتلميع والتشطيب هي رائدة الصناعة مع 99٪ رضا العملاء.'
                  : 'GOLD Vacuum Systems является одной из ведущих компаний в секторе ювелирных изделий и обработки золота с 36-летним опытом. Наша компания, специализирующаяся на системах восстановления золота, полировки и отделки, является пионером отрасли с 99% удовлетворенностью клиентов.'}
              </p>
              <p>
                <strong className="text-green-600">{companyInfo.about[language].export}</strong> - {language === 'tr'
                  ? 'Modern üretim tesisimiz ve uzman kadromuzla, dünya çapında 50\'den fazla ülkeye ihracat yapmaktayız. CE sertifikalı ürünlerimiz, uluslararası kalite standartlarına uygun olarak üretilmektedir.'
                  : language === 'en'
                  ? 'With our modern production facility and expert staff, we export to more than 50 countries worldwide. Our CE certified products are manufactured in accordance with international quality standards.'
                  : language === 'ar'
                  ? 'مع منشأة إنتاجنا الحديثة وموظفينا الخبراء، نصدر إلى أكثر من 50 دولة في جميع أنحاء العالم. يتم تصنيع منتجاتنا الحاصلة على شهادة CE وفقًا لمعايير الجоدة الدولية.'
                  : 'Благодаря нашему современному производственному оборудованию и опытному персоналу, мы экспортируем в более чем 50 стран по всему миру. Наша продукция, сертифицированная CE, производится в соответствии с международными стандартами качества.'}
              </p>
              <p>
                <strong className="text-purple-600">{language === 'tr' ? 'Dünya Çapında Bayiliklerimiz:' : language === 'en' ? 'Our Dealers Worldwide:' : language === 'ar' ? 'وكلائنا في جميع أنحاء العالم:' : 'Наши дилеры по всему миру:'}</strong> {companyInfo.about[language].dealers}
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl opacity-20 blur-2xl" />
            <img
              src="https://customer-assets.emergentagent.com/job_00fb527f-13c0-4a88-8f54-3e96e9176e0d/artifacts/m2s1wccc_BT8A8012.jpg"
              alt="Factory"
              className="relative rounded-2xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-600">
                <CardContent className="p-6 text-center space-y-4">
                  <div className={`w-16 h-16 mx-auto rounded-xl ${stat.bgColor} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default About;
