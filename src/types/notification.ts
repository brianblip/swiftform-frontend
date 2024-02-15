export interface Notification {
  id: number;
  recipient_id: number;
  title: string;
  message: string;
  created_at: Date;
}