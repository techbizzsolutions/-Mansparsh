import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SmsServiceProvider } from '../../providers/sms-service/sms-service';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';

@IonicPage()
@Component({
  selector: 'page-otp',
  templateUrl: 'otp.html',
})
export class OtpPage {

  otp:any;
  user:any;
  constructor(public navCtrl: NavController,private openNativeSettings: OpenNativeSettings,public smsServiceProvider: SmsServiceProvider,public alertCtrl: AlertController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.user = JSON.parse(localStorage.getItem('user')) ;
    console.log('ionViewDidLoad OtpPage',this.user.Mobile);
  }

  resendOtp()
  {
       var otp = Math.floor(1000 + Math.random() * 9000);
       localStorage.setItem('otp', otp+"");
       this.smsServiceProvider.sendMessage(this.user.Mobile,"Your OTP is " + otp).then(res=>{
         if(res)
         {
          this.showAlert("Otp has been sent successfully to " +this.user.Mobile, 1); 
         }
         else{
          this.showAlert("Please enable sms permission,Goto applications->Choose Law Protectors app ->Permissions-> enable sms", 2);    
         }
                       
        }).catch(res=>{
          console.log("smsServiceProvider catch" +res);
          this.showAlert("Messgae has been failed, please check your message service", 3); 
        })
  }

  showAlert(message,bol)
  {
    let alert = this.alertCtrl.create({
      subTitle: message,
      buttons: [{
        text: 'Ok',
        handler: () => {
          switch (bol)
          {
            case 2:
            {
              this.openNativeSettings.open("application").then(res=>{
              })
              .catch(err=>{})
            }
            break;
            case 4:
            {
             
            }
            break;
            default :
            this.navCtrl.setRoot('DashboardPage');
          }
        }
      },
      {
        text: 'Cancle',
        handler: () => {
          // close the sliding item
        }
      }]
    });
    // now present the alert on top of all other content
    alert.present();
  }

  verifyOtp()
  {
    if(this.otp)
    {
      var sndotp = localStorage.getItem('otp');
      console.log("catch" +sndotp);
      if(this.otp == sndotp)
      {
        localStorage.setItem('isVerified', 'true');
        this.navCtrl.setRoot('DashboardPage');
      }
      else{
        this.showAlert("Please enter correct otp", 4); 
      }
      
    }
    else{
      this.showAlert("Please enter otp", 4); 
    }
  }

  editnumber()
  {
    this.navCtrl.setRoot(HomePage);
  }
}
