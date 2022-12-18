import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from '@app/repositories/notifications-repository';

interface CountRecipientsNotificationRequest {
  recipientId: string
}

interface CountRecipientsNotificationResponse {
  count: number
}

@Injectable()
export class CountRecipientNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(request: CountRecipientsNotificationRequest): Promise<CountRecipientsNotificationResponse> {
    const { recipientId } = request

    const count = await this.notificationsRepository.countManyByRecipientId(recipientId)

    return {
      count
    }
  }
}