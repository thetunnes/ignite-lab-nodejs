import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from '@app/repositories/notifications-repository';
import { Notification } from '@app/entities/notification';

interface GetRecipientsNotificationRequest {
  recipientId: string
}

interface GetRecipientsNotificationResponse {
  notifications: Array<Notification>
}

@Injectable()
export class GetRecipientNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(request: GetRecipientsNotificationRequest): Promise<GetRecipientsNotificationResponse> {
    const { recipientId } = request

    const notifications = await this.notificationsRepository.findManyByRecipientId(recipientId)

    return {
      notifications
    }
  }
}