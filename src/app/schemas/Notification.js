import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
  {
    //conteudo da notificação
    content: {
      type: String,
      required: true,
    },
    //usuário que vai receber
    user: {
      type: Number,
      required: true,
    },
    //confirmação de lido
    read: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true, //created,updated
  }
);

export default mongoose.model('Notification', NotificationSchema);
