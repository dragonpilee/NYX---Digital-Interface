
export enum SenderType {
  USER = 'user',
  BOT = 'bot',
  SYSTEM = 'system', // For system messages like errors or API key issues
}

export interface Message {
  id: string;
  text: string;
  sender: SenderType;
  timestamp: number;
  isStreaming?: boolean;
}
    