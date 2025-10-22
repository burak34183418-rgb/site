import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations, products } from '../mockData';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const ProductDetail = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const t = translations[language];
  const product = products.find(p => p.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {language === 'tr' ? 'Ürün bulunamadı' : language === 'en' ? 'Product not found' : language === 'ar' ? 'لم يتم العثور على المنتج' : 'Продукт не найден'}
          </h1>
          <Link to="/products">
            <Button>{t.products.title}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link to="/products" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 group">
          <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          <span className="ml-1">{t.products.title}</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <div className="aspect-square bg-white p-8">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name[language]}
                  className="w-full h-full object-contain"
                />
              </div>
            </Card>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-blue-600 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.name[language]}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">{product.description[language]}</p>
            </div>

            {/* Specifications */}
            <Card className="border-2 border-blue-100 bg-blue-50/50">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t.products.specifications}</h3>
                <div className="space-y-3">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-2 border-b border-blue-200 last:border-0">
                      <span className="text-gray-700 font-medium capitalize">{key}</span>
                      <span className="text-gray-900 font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tabs for Features */}
            <Tabs defaultValue="features" className="w-full">
              <TabsList className="grid w-full grid-cols-1">
                <TabsTrigger value="features">{t.products.features}</TabsTrigger>
              </TabsList>
              <TabsContent value="features" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      {product.features[language].map((feature, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="mt-1 flex-shrink-0">
                            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                              <Check className="h-3 w-3 text-green-600" />
                            </div>
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* CTA Buttons */}
            <div className="space-y-4 pt-4">
              <Link to={`/contact?product=${product.id}`} className="block">
                <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-lg">
                  {t.products.getQuote}
                </Button>
              </Link>
              <div className="text-center">
                <p className="text-sm text-gray-500">{product.price}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
