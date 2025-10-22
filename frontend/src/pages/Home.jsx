import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Headphones, Shield, Globe2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../mockData';
import { categoriesAPI } from '../services/api';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Home = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoriesAPI.getAll();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const features = [
    {
      icon: Award,
      title: t.features.quality.title,
      description: t.features.quality.desc,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Headphones,
      title: t.features.support.title,
      description: t.features.support.desc,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Shield,
      title: t.features.warranty.title,
      description: t.features.warranty.desc,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Globe2,
      title: t.features.global.title,
      description: t.features.global.desc,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-gray-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE2YzAtMS4xLjktMiAyLTJzMiAuOSAyIDItLjkgMi0yIDItMi0uOS0yLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  {t.hero.title}
                </h1>
                <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                  {t.hero.subtitle}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products">
                  <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white group">
                    {t.hero.cta}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-blue-600 text-blue-600 hover:bg-blue-50">
                    {t.hero.quote}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl opacity-20 blur-2xl" />
              <img
                src={categories[0]?.image || 'https://customer-assets.emergentagent.com/job_00fb527f-13c0-4a88-8f54-3e96e9176e0d/artifacts/c3vefy9q_BT8A7957.jpg'}
                alt="GOLD Machinery"
                className="relative rounded-2xl shadow-2xl w-full h-auto transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">{t.categories.title}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.categories.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link key={category.id} to={`/products?category=${category.slug}`}>
                <Card className="group cursor-pointer overflow-hidden border-2 hover:border-blue-600 transition-all duration-300 hover:shadow-xl">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name[language]}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-1">{category.name[language]}</h3>
                      <p className="text-sm text-gray-200">{category.description[language]}</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <Button variant="ghost" className="w-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      {t.products.viewDetails}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t.features.title}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-600">
                  <CardContent className="p-6 space-y-4">
                    <div className={`w-16 h-16 rounded-xl ${feature.bgColor} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-8 w-8 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold">{t.contact.title}</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">{t.contact.subtitle}</p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              {t.hero.quote}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
