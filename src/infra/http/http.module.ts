import { Module } from "@nestjs/common";
import { NotificationsController } from "./controllers/notifications.controller";
import { SendNotification } from '@app/use-cases/send-notification';
import { DataBaseModule } from "../database/database.module";
import { CancelNotification } from "@app/use-cases/cancel-notification";
import { ReadNotification } from "@app/use-cases/read-notification";
import { UnreadNotification } from "@app/use-cases/unread-notification";
import { GetRecipientNotifications } from "@app/use-cases/get-recipient-notifications";
import { CountRecipientNotifications } from '@app/use-cases/count-recipient-notifications';

@Module({
  imports: [DataBaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification, 
    CancelNotification,
    ReadNotification,
    UnreadNotification,
    GetRecipientNotifications,
    CountRecipientNotifications
  ]
})
export class HttpModule {}