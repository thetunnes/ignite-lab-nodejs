import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './erorrs/notification-not-found';
import { makeNotification } from '@test/factorys/notification-factory';
import { ReadNotification } from './read-notification';
import { UnreadNotification } from './unread-notification';


describe('Unread notification', () => {
  it('should be able to unRead a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const unreadNotification = new UnreadNotification(notificationsRepository)

    const notification = makeNotification({
      readAt: new Date()
    })

    notificationsRepository.create(notification)

    await unreadNotification.execute({
      notificationId: notification.id
    });

    expect(notificationsRepository.notifications[0].readAt).toBeNull()
  })

  it('should not be able to unRead a non exist notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const readNotification = new ReadNotification(notificationsRepository)

    expect(() => {
      return readNotification.execute({
        notificationId: 'fake-notification-id'
      })
    }).rejects.toThrow(NotificationNotFound)
  })
})