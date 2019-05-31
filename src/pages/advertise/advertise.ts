import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SmsServiceProvider } from '../../providers/sms-service/sms-service';

@IonicPage()
@Component({
  selector: 'page-advertise',
  templateUrl: 'advertise.html',
})
export class AdvertisePage {

  constructor(public navCtrl: NavController,
    public smsServiceProvider: SmsServiceProvider, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdvertisePage');
    this.smsServiceProvider.get('http://mansparsh.com/api/getallimages.php').subscribe(res => {
       console.log(res);
    });
  }

  start()
  {
    var sndotp = localStorage.getItem('isVerified');
    if(sndotp =='true')
    {
      this.navCtrl.setRoot('DashboardPage');
    }
    else{
      this.navCtrl.setRoot(HomePage);
    }
    
  }
}
