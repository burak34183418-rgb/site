import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations, products } from '../mockData';
import { companyInfo } from '../data/companyInfo';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent } from '../components/ui/card';
import { useToast } from '../hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

const Contact = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    product: '',
    message: '',
  });

  useEffect(() => {
    const productId = searchParams.get('product');
    if (productId) {
      setFormData(prev => ({ ...prev, product: productId }));
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Import contactAPI
      const { contactAPI } = await import('../services/api');
      
      await contactAPI.submit({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || null,
        product_id: formData.product || null,
        message: formData.message,
      });
      
      toast({
        title: t.contact.success,
        description: language === 'tr' ? 'En kısa sürede sizinle iletişime geçeceğiz.' : language === 'en' ? 'We will contact you shortly.' : language === 'ar' ? 'سنتواصل معك قريبًا.' : 'Мы свяжемся с вами в ближайшее время.',
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        product: '',
        message: '',
      });
    } catch (error) {
      toast({
        title: language === 'tr' ? 'Hata' : language === 'en' ? 'Error' : language === 'ar' ? 'خطأ' : 'Ошибка',
        description: language === 'tr' ? 'Mesaj gönderilemedi' : language === 'en' ? 'Message could not be sent' : language === 'ar' ? 'تعذر إرسال الرسالة' : 'Сообщение не отправлено',
        variant: 'destructive',
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">{t.contact.title}</h1>
          <p className="text-xl text-blue-100">{t.contact.subtitle}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border-2">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.contact.name} *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={t.contact.name}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.contact.email} *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder={t.contact.email}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.contact.phone} *
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+90 (XXX) XXX XX XX"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.contact.company}
                  </label>
                  <Input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={t.contact.company}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.contact.product}
                  </label>
                  <Select
                    value={formData.product}
                    onValueChange={(value) => setFormData({ ...formData, product: value })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t.contact.product} />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id.toString()}>
                          {product.name[language]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.contact.message} *
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder={t.contact.message}
                    className="w-full"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                  <Send className="mr-2 h-5 w-5" />
                  {t.contact.send}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white">
              <CardContent className="p-8 space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.footer.contact}</h3>

                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-white rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {language === 'tr' ? 'Adres' : language === 'en' ? 'Address' : language === 'ar' ? 'العنوان' : 'Адрес'}
                      </h4>
                      <p className="text-gray-600 text-sm">{companyInfo.address[language]}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-white rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Phone className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {language === 'tr' ? 'Telefon' : language === 'en' ? 'Phone' : language === 'ar' ? 'الهاتف' : 'Телефон'}
                      </h4>
                      <p className="text-gray-600 text-sm">+90 (XXX) XXX XX XX</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-white rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Mail className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {language === 'tr' ? 'E-posta' : language === 'en' ? 'Email' : language === 'ar' ? 'البريد الإلكتروني' : 'Эл. почта'}
                      </h4>
                      <p className="text-gray-600 text-sm">info@goldvakum.com</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Working Hours */}
            <Card className="border-2">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {language === 'tr' ? 'Çalışma Saatleri' : language === 'en' ? 'Working Hours' : language === 'ar' ? 'ساعات العمل' : 'Часы работы'}
                </h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>{language === 'tr' ? 'Pazartesi - Cuma' : language === 'en' ? 'Monday - Friday' : language === 'ar' ? 'الإثنين - الجمعة' : 'Понедельник - Пятница'}</span>
                    <span className="font-semibold">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === 'tr' ? 'Cumartesi' : language === 'en' ? 'Saturday' : language === 'ar' ? 'السبت' : 'Суббота'}</span>
                    <span className="font-semibold">09:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === 'tr' ? 'Pazar' : language === 'en' ? 'Sunday' : language === 'ar' ? 'الأحد' : 'Воскресенье'}</span>
                    <span className="font-semibold">{language === 'tr' ? 'Kapalı' : language === 'en' ? 'Closed' : language === 'ar' ? 'مغلق' : 'Закрыто'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
