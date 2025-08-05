import { useState } from 'react';
import { Input } from '../../../shared/ui/Input/Input';
import { Button } from '../../../shared/ui/Button/Button';

export const SendMessageForm = () => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!message.trim()) return;
        console.log("Sending message:", message);
        setMessage('');
    }

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <Input 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write message"
                className="flex-1"
                autoComplete="off"
            />
            <Button type="submit" disabled={!message.trim()}>
                Send
            </Button>
        </form>
    )
}