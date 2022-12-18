import { Content } from "@app/entities/content";
import { Notification, NotificationsProps } from "@app/entities/notification";

type Override = Partial<NotificationsProps>

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'social',
    content: new Content('New friend request'),
    recipientId: 'recipient-1',
    ...override
  })
}