import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../mockData';
import { productsAPI, categoriesAPI } from '../services/api';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Products = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        productsAPI.getAll({ is_active: true }),
        categoriesAPI.getAll(),
      ]);
      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categories.length > 0) {
      const category = categories.find(c => c.slug === categoryParam);
      if (category) {
        setSelectedCategory(category.id);
      }
    }
  }, [searchParams, categories]);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category_id === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16 relative overflow-hidden">
        <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-20">
          <img
            src="https://customer-assets.emergentagent.com/job_beymen-site-clone/artifacts/3dm45or1_WhatsApp%20Image%202025-10-20%20at%2003.44.32.jpeg"
            alt="GOLD Logo"
            className="h-32 w-auto object-contain brightness-200"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">{t.products.title}</h1>
          <p className="text-xl text-blue-100">{t.categories.subtitle}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">{t.categories.title}</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className={selectedCategory === 'all' ? 'bg-blue-600 hover:bg-blue-700' : ''}
            >
              {language === 'tr' ? 'Tümü' : language === 'en' ? 'All' : language === 'ar' ? 'الكل' : 'Все'}
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id ? 'bg-blue-600 hover:bg-blue-700' : ''}
              >
                {category.name[language]}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-600">
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={product.images[0]}
                  alt={product.name[language]}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {product.name[language]}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3">{product.description[language]}</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{language === 'tr' ? 'Güç' : language === 'en' ? 'Power' : language === 'ar' ? 'القوة' : 'Мощность'}:</span>
                    <span className="font-semibold text-gray-900">{product.specs.power}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{language === 'tr' ? 'Voltaj' : language === 'en' ? 'Voltage' : language === 'ar' ? 'الجهد' : 'Напряжение'}:</span>
                    <span className="font-semibold text-gray-900">{product.specs.voltage}</span>
                  </div>
                </div>
                <div className="pt-4 flex gap-3">
                  <Link to={`/product/${product.id}`} className="flex-1">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      {t.products.viewDetails}
                    </Button>
                  </Link>
                  <Link to={`/contact?product=${product.id}`}>
                    <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                      {t.products.getQuote}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
