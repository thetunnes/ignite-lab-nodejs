import { NotificationsRepository } from "../repositories/notifications-repository";
import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from "./erorrs/notification-not-found";

interface UnreadNotificationRequest {
  notificationId: string;
}

type UnreadNotificationResponse = void

@Injectable()
export class UnreadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(request: UnreadNotificationRequest): Promise<UnreadNotificationResponse> {
    const { notificationId } = request

    const notification = await this.notificationsRepository.findById(notificationId)

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.unRead()

    await this.notificationsRepository.save(notification)
  }
}