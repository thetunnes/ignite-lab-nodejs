import { Notification } from "src/app/entities/notification"
import { NotificationsRepository } from "src/app/repositories/notifications-repository"

export class InMemoryNotificationsRepository implements NotificationsRepository {


  public notifications: Notification[] = []

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find((notif) => (notif.id === notificationId))

    if (!notification) {
      return null
    }
    return notification
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter(notif => notif.recipientId === recipientId)
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter(notif => notif.recipientId === recipientId).length
  }
  
  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex((notif) => notif.id === notification.id)
    
    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification
    }
  }

  async create(notification: Notification) {
    this.notifications.push(notification)
  }
}