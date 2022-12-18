import { Content } from "./content"
import { Notification } from "./notification"


describe('Notification', () => {
  it('should be able notification create', () => {
    const notification = new Notification({
      content: new Content('Nova solicitação de amizade'),
      category: 'social',
      recipientId: 'example-recipientId',
      createdAt: new Date()
    })
  })
})