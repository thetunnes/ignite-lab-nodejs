import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './erorrs/notification-not-found';
import { makeNotification } from '@test/factorys/notification-factory';
import { ReadNotification } from './read-notification';


describe('Read notification', () => {
  it('should be able to Read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const readNotification = new ReadNotification(notificationsRepository)

    const notification = makeNotification({
      readAt: new Date()
    })

    notificationsRepository.create(notification)

    await readNotification.execute({
      notificationId: notification.id
    });

    expect(notificationsRepository.notifications[0].readAt).toEqual(expect.any(Date))
  })

  it('should not be able to Read a non exist notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const readNotification = new ReadNotification(notificationsRepository)

    expect(() => {
      return readNotification.execute({
        notificationId: 'fake-notification-id'
      })
    }).rejects.toThrow(NotificationNotFound)
  })
})