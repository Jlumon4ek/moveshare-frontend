// src/features/SendMessageForm/ui/SendMessageForm.tsx
import { useState } from 'react';
import { Input } from '../../../shared/ui/Input/Input';
import { Button } from '../../../shared/ui/Button/Button';
import { Send } from 'lucide-react';

interface SendMessageFormProps {
    onSend: (messageText: string) => void;
    disabled?: boolean;
}

export const SendMessageForm = ({ onSend, disabled }: SendMessageFormProps) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedMessage = message.trim();
        if(!trimmedMessage) return;
        
        onSend(trimmedMessage);
        setMessage('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Предотвращаем перенос строки
            handleSubmit(e as any);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <Input 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Write a message..."
                className="flex-1"
                autoComplete="off"
                disabled={disabled}
            />
            <Button type="submit" disabled={!message.trim() || disabled}>
                <Send size={18} />
                <span className="sr-only">Send</span>
            </Button>
        </form>
    );
};