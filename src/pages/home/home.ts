import { Component } from '@angular/core';
import { NavController,AlertController,ToastController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SmsServiceProvider } from '../../providers/sms-service/sms-service';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private register : FormGroup;
  constructor(public navCtrl: NavController, public toastCtrl: ToastController,private openNativeSettings: OpenNativeSettings,public formBuilder: FormBuilder,public alertCtrl: AlertController,public smsServiceProvider: SmsServiceProvider) {
    this.register = this.formBuilder.group({
      Mobile : ['',Validators.compose([Validators.required, Validators.pattern('^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$'), Validators.maxLength(15)])]
    });
  }

  logForm()
  {
    console.log(this.register.value);
    localStorage.setItem('user', JSON.stringify(this.register.value));
    var otp = Math.floor(1000 + Math.random() * 9000);
    localStorage.setItem('otp', otp+"");
    this.smsServiceProvider.sendMessage(this.register.value.Mobile,"Your OTP is " + otp).then(res=>{
      if(res)
      {
       this.showAlert("Otp has been sent successfully to " +this.register.value.Mobile, 1); 
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
            case 1:
            this.navCtrl.setRoot('OtpPage');
            break;
            case 2:
            {
              this.openNativeSettings.open("application").then(res=>{
              })
              .catch(err=>{})
            }
            break;
            default :
            this.navCtrl.setRoot('OtpPage');
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
}
