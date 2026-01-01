import { Phone, Edit2, Trash2, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Contact } from '@/mock/data';

interface ContactCardProps {
  contact: Contact;
  onEdit?: () => void;
  onDelete?: () => void;
  onCall?: () => void;
}

const ContactCard = ({ contact, onEdit, onDelete, onCall }: ContactCardProps) => {
  return (
    <div className="bg-card rounded-2xl p-4 flex items-center gap-4">
      {/* Avatar */}
      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
        <User size={24} className="text-muted-foreground" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground truncate">{contact.name}</h3>
        <p className="text-sm text-muted-foreground">{contact.phone}</p>
        <span className="text-xs text-primary">{contact.relation}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onCall}
          className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center touch-feedback"
        >
          <Phone size={18} />
        </button>
        <button
          onClick={onEdit}
          className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center touch-feedback"
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={onDelete}
          className="w-10 h-10 rounded-full bg-destructive/20 text-destructive flex items-center justify-center touch-feedback"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
