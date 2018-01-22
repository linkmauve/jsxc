import Log from './util/Log'
import Account from './Account'
import JingleAbstractSession from './JingleAbstractSession'
import JingleHandler from './connection/JingleHandler'
import UserMedia from './UserMedia'
import Translation from './util/Translation'
import Notification from './Notification'
import JID from './JID'

export default class JingleStreamSession extends JingleAbstractSession {
   private adoptee: boolean = false;

   constructor(account, session) {
      super(account, session);

      this.storage.registerHook(this.session.sid, (newValue) => {
         if (newValue === 'adobted' && !this.adoptee) {
            console.log('session got adopted')

            session.emit('aborted');
         }
      });
   }

   public adopt() {
      this.adoptee = true;

      this.storage.setItem(this.getId(), 'adobted');
      this.storage.removeItem(this.getId());
   }

   public onOnceIncoming() {

   }

   protected onIncoming() {
      // Log.debug('incoming call from ' + this.session.peerID);
      //
      // let videoWindow = JingleHandler.getVideoDialog();
      // videoWindow.addSession(this.session);
      //
      // Promise.race([
      //    videoWindow.showCallDialog(this).then(() => {
      //       return UserMedia.request();
      //    }),
      //    new Promise((resolve, reject) => {
      //       this.on('terminated', () => {
      //          reject('aborted')
      //       });
      //
      //       this.on('aborted', () => {
      //          reject('aborted')
      //       });
      //    })
      // ]).then((stream) => {
      //    videoWindow.showVideoWindow(stream);
      //
      //    this.session.addStream(stream);
      //    this.session.accept();
      // }).catch((reason) => {
      //
      //    //@TODO user media request overlay
      //
      //    //@TODO post reason to chat window
      //    if (reason !== 'aborted') {
      //       Log.warn('Decline call', reason)
      //
      //       this.session.decline();
      //    }
      // });
   }
}