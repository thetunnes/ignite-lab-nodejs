import { CancelNotification } from './cancel-notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './erorrs/notification-not-found';
import { makeNotification } from './../../../test/factorys/notification-factory';
import { GetRecipientNotifications } from './get-recipient-notifications';


describe('Get recipient notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const getRecipientNotifications = new GetRecipientNotifications(notificationsRepository)

    await notificationsRepository.create(makeNotification({ recipientId: 'recipient-1'}))

    await notificationsRepository.create(makeNotification({ recipientId: 'recipient-1'}))
    
    await notificationsRepository.create(makeNotification({ recipientId: 'recipient-2'}))
 

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'recipient-1'
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(expect.arrayContaining([
      expect.objectContaining({ recipientId: 'recipient-1' }),
      expect.objectContaining({ recipientId: 'recipient-1' })
    ]))
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