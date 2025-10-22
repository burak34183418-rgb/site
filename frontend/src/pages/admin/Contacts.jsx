import React, { useState, useEffect } from 'react';
import { contactAPI } from '../../services/api';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { useToast } from '../../hooks/use-toast';
import { Mail, Trash2, Check, X } from 'lucide-react';
import { Badge } from '../../components/ui/badge';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await contactAPI.getAll();
      setContacts(response.data);
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Mesajlar yüklenirken bir hata oluştu',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await contactAPI.markRead(id);
      fetchContacts();
      toast({ title: 'Başarılı', description: 'Mesaj okundu olarak işaretlendi' });
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'İşlem başarısız',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bu mesajı silmek istediğinizden emin misiniz?')) return;

    try {
      await contactAPI.delete(id);
      fetchContacts();
      toast({ title: 'Başarılı', description: 'Mesaj silindi' });
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Mesaj silinemedi',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">İletişim Mesajları</h1>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          {contacts.filter(c => !c.is_read).length} Okunmamış
        </Badge>
      </div>

      <div className="space-y-4">
        {contacts.map((contact) => (
          <Card
            key={contact.id}
            className={`hover:shadow-lg transition-shadow ${
              !contact.is_read ? 'border-l-4 border-l-blue-600 bg-blue-50/30' : ''
            }`}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-bold text-gray-900">{contact.name}</h3>
                    {!contact.is_read && (
                      <Badge className="bg-blue-600">Yeni</Badge>
                    )}
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>📧 {contact.email}</p>
                    <p>📱 {contact.phone}</p>
                    {contact.company && <p>🏢 {contact.company}</p>}
                    <p className="text-xs text-gray-500">
                      📅 {new Date(contact.created_at).toLocaleString('tr-TR')}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {!contact.is_read && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMarkRead(contact.id)}
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Okundu
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => handleDelete(contact.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Mesaj:</p>
                <p className="text-gray-900 whitespace-pre-wrap">{contact.message}</p>
              </div>
            </CardContent>
          </Card>
        ))}

        {contacts.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Henüz mesaj yok</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Contacts;
