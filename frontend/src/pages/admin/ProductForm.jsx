import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productsAPI, categoriesAPI } from '../../services/api';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { useToast } from '../../hooks/use-toast';
import { Save, ArrowLeft, Upload, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Switch } from '../../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditMode = !!id;

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    category_id: '',
    name: { tr: '', en: '', ar: '', ru: '' },
    description: { tr: '', en: '', ar: '', ru: '' },
    specs: { power: '', voltage: '', dimensions: '', weight: '' },
    features: { tr: [''], en: [''], ar: [''], ru: [''] },
    price: 'Fiyat için iletişime geçin',
    is_active: true,
    images: [],
  });

  useEffect(() => {
    fetchCategories();
    if (isEditMode) {
      fetchProduct();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await categoriesAPI.getAll();
      setCategories(response.data);
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Kategoriler yüklenirken hata oluştu',
        variant: 'destructive',
      });
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await productsAPI.getById(id);
      setFormData(response.data);
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Ürün yüklenirken hata oluştu',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditMode) {
        await productsAPI.update(id, formData);
        toast({ title: 'Başarılı', description: 'Ürün güncellendi' });
      } else {
        await productsAPI.create(formData);
        toast({ title: 'Başarılı', description: 'Ürün eklendi' });
      }
      navigate('/admin/products');
    } catch (error) {
      toast({
        title: 'Hata',
        description: error.response?.data?.detail || 'Ürün kaydedilemedi',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !isEditMode) return;

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    try {
      await productsAPI.uploadImage(id, formData);
      toast({ title: 'Başarılı', description: 'Resim yüklendi' });
      fetchProduct();
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Resim yüklenemedi',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (index) => {
    try {
      await productsAPI.deleteImage(id, index);
      toast({ title: 'Başarılı', description: 'Resim silindi' });
      fetchProduct();
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Resim silinemedi',
        variant: 'destructive',
      });
    }
  };

  const addFeature = (lang) => {
    setFormData({
      ...formData,
      features: {
        ...formData.features,
        [lang]: [...formData.features[lang], ''],
      },
    });
  };

  const updateFeature = (lang, index, value) => {
    const newFeatures = [...formData.features[lang]];
    newFeatures[index] = value;
    setFormData({
      ...formData,
      features: {
        ...formData.features,
        [lang]: newFeatures,
      },
    });
  };

  const removeFeature = (lang, index) => {
    const newFeatures = formData.features[lang].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      features: {
        ...formData.features,
        [lang]: newFeatures,
      },
    });
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" onClick={() => navigate('/admin/products')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Geri
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditMode ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Temel Bilgiler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Kategori *</label>
                  <Select
                    value={formData.category_id}
                    onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Kategori seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name.tr}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Aktif</label>
                  <Switch
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Multi-language Names */}
            <Card>
              <CardHeader>
                <CardTitle>Ürün İsimleri</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="tr">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="tr">Türkçe</TabsTrigger>
                    <TabsTrigger value="en">English</TabsTrigger>
                    <TabsTrigger value="ar">عربي</TabsTrigger>
                    <TabsTrigger value="ru">Русский</TabsTrigger>
                  </TabsList>
                  {['tr', 'en', 'ar', 'ru'].map((lang) => (
                    <TabsContent key={lang} value={lang}>
                      <Input
                        value={formData.name[lang]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            name: { ...formData.name, [lang]: e.target.value },
                          })
                        }
                        required
                        placeholder="Ürün adı"
                      />
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>

            {/* Descriptions */}
            <Card>
              <CardHeader>
                <CardTitle>Açıklamalar</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="tr">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="tr">Türkçe</TabsTrigger>
                    <TabsTrigger value="en">English</TabsTrigger>
                    <TabsTrigger value="ar">عربي</TabsTrigger>
                    <TabsTrigger value="ru">Русский</TabsTrigger>
                  </TabsList>
                  {['tr', 'en', 'ar', 'ru'].map((lang) => (
                    <TabsContent key={lang} value={lang}>
                      <Textarea
                        value={formData.description[lang]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: { ...formData.description, [lang]: e.target.value },
                          })
                        }
                        required
                        rows={4}
                        placeholder="Ürün açıklaması"
                      />
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>

            {/* Specs */}
            <Card>
              <CardHeader>
                <CardTitle>Teknik Özellikler</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Güç</label>
                  <Input
                    value={formData.specs.power}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specs: { ...formData.specs, power: e.target.value },
                      })
                    }
                    placeholder="örn: 3.5 KW"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Voltaj</label>
                  <Input
                    value={formData.specs.voltage}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specs: { ...formData.specs, voltage: e.target.value },
                      })
                    }
                    placeholder="örn: 220V"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Ölçüler</label>
                  <Input
                    value={formData.specs.dimensions}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specs: { ...formData.specs, dimensions: e.target.value },
                      })
                    }
                    placeholder="örn: 60x40x35 cm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Ağırlık</label>
                  <Input
                    value={formData.specs.weight}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specs: { ...formData.specs, weight: e.target.value },
                      })
                    }
                    placeholder="örn: 15 kg"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Özellikler</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="tr">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="tr">Türkçe</TabsTrigger>
                    <TabsTrigger value="en">English</TabsTrigger>
                    <TabsTrigger value="ar">عربي</TabsTrigger>
                    <TabsTrigger value="ru">Русский</TabsTrigger>
                  </TabsList>
                  {['tr', 'en', 'ar', 'ru'].map((lang) => (
                    <TabsContent key={lang} value={lang} className="space-y-2">
                      {formData.features[lang].map((feature, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={feature}
                            onChange={(e) => updateFeature(lang, index, e.target.value)}
                            placeholder="Özellik"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeFeature(lang, index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button type="button" variant="outline" onClick={() => addFeature(lang)} className="w-full">
                        + Özellik Ekle
                      </Button>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle>Resimler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditMode && (
                  <div>
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label htmlFor="image-upload">
                      <Button type="button" asChild disabled={uploading} className="w-full">
                        <span>
                          <Upload className="mr-2 h-4 w-4" />
                          {uploading ? 'Yükleniyor...' : 'Resim Yükle'}
                        </span>
                      </Button>
                    </label>
                  </div>
                )}

                {!isEditMode && (
                  <p className="text-sm text-gray-600">Ürünü kaydetin, sonra resim ekleyin</p>
                )}

                <div className="space-y-2">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img src={image} alt="Product" className="w-full h-32 object-cover rounded" />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleDeleteImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="p-4 space-y-2">
                <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
                  <Save className="mr-2 h-4 w-4" />
                  {loading ? 'Kaydediliyor...' : 'Kaydet'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate('/admin/products')}
                >
                  İptal
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
