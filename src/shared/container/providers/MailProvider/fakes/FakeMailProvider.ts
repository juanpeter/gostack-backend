import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProdiver from '../models/IMailProvider';

export default class FakeMailProvider implements IMailProdiver {
  private messages: ISendMailDTO[] = [];

  public async sendMail(message: ISendMailDTO): Promise<void> {
    this.messages.push(message);
  }
}
