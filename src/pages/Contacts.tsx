import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, User, Search } from 'lucide-react';
import ContactCard from '@/components/ContactCard';
import { mockContacts } from '@/mock/data';
import type { Contact } from '@/mock/data';

const Contacts = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone: '', relation: '' });

  const handleDelete = (id: string) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  const handleAdd = () => {
    if (newContact.name && newContact.phone) {
      const contact: Contact = {
        id: Date.now().toString(),
        ...newContact,
      };
      setContacts([...contacts, contact]);
      setNewContact({ name: '', phone: '', relation: '' });
      setShowAddModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="bg-card px-6 pt-12 pb-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center touch-feedback"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Emergency Contacts</h1>
            <p className="text-sm text-muted-foreground">
              {contacts.length} contacts saved
            </p>
          </div>
        </div>

        {/* Info card */}
        <div className="bg-primary/10 rounded-2xl p-4">
          <p className="text-sm text-primary">
            These contacts will be automatically notified when you trigger an SOS alert.
          </p>
        </div>
      </div>

      {/* Contacts List */}
      <div className="px-6 py-4 space-y-3">
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onDelete={() => handleDelete(contact.id)}
            onEdit={() => {}}
            onCall={() => {}}
          />
        ))}
      </div>

      {/* Add Contact Button */}
      <div className="fixed bottom-8 right-6 z-40">
        <button
          onClick={() => setShowAddModal(true)}
          className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-glow-teal touch-feedback"
        >
          <Plus size={28} />
        </button>
      </div>

      {/* Add Contact Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          />
          <div className="relative w-full bg-card rounded-t-3xl p-6 slide-up">
            <div className="flex justify-center mb-4">
              <div className="w-10 h-1 bg-muted-foreground/30 rounded-full" />
            </div>

            <h2 className="text-xl font-bold text-foreground mb-6">Add Contact</h2>

            <div className="space-y-4 mb-6">
              <div className="bg-secondary rounded-2xl p-4">
                <label className="text-xs text-muted-foreground block mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Contact name"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  className="w-full bg-transparent text-foreground outline-none"
                />
              </div>

              <div className="bg-secondary rounded-2xl p-4">
                <label className="text-xs text-muted-foreground block mb-1">Phone</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  className="w-full bg-transparent text-foreground outline-none"
                />
              </div>

              <div className="bg-secondary rounded-2xl p-4">
                <label className="text-xs text-muted-foreground block mb-1">Relation</label>
                <input
                  type="text"
                  placeholder="e.g., Family, Friend, Partner"
                  value={newContact.relation}
                  onChange={(e) => setNewContact({ ...newContact, relation: e.target.value })}
                  className="w-full bg-transparent text-foreground outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-secondary text-foreground py-4 rounded-2xl font-semibold touch-feedback"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="flex-1 bg-primary text-primary-foreground py-4 rounded-2xl font-semibold touch-feedback"
              >
                Add Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;
