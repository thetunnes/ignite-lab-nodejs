import { Notification } from '../entities/notification';
import { CancelNotification } from './cancel-notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { Content } from '@app/entities/content';
import { NotificationNotFound } from './erorrs/notification-not-found';
import { CountRecipientNotifications } from './count-recipient-notifications';
import { makeNotification } from './../../../test/factorys/notification-factory';


describe('Count recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const countRecipientNotifications = new CountRecipientNotifications(notificationsRepository)

    await notificationsRepository.create(makeNotification({ recipientId: 'recipient-1'}))

    await notificationsRepository.create(makeNotification({ recipientId: 'recipient-1'}))
    
    await notificationsRepository.create(makeNotification({ recipientId: 'recipient-2'}))
 

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1'
    });

    expect(count).toEqual(2)
  })

  it('should not be able to cancel a non exist notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const cancelNotification = new CancelNotification(notificationsRepository)

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id'
      })
    }).rejects.toThrow(NotificationNotFound)
  })
})