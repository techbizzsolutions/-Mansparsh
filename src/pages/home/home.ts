import { Component } from '@angular/core';
import { NavController,AlertController,ToastController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SmsServiceProvider } from '../../providers/sms-service/sms-service';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { ApiProvider } from '../../providers/api/api';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private register : FormGroup;
  gender:any = "1";
  Maritiallist = [];
  Maritial:any;
  dob:any;
  Behalf:any;
  behalfs = [];
  agree:boolean = false;
  constructor(public navCtrl: NavController,
    private loader: LoaderServiceProvider,
    public api: ApiProvider, public toastCtrl: ToastController,private openNativeSettings: OpenNativeSettings,public formBuilder: FormBuilder,public alertCtrl: AlertController,public smsServiceProvider: SmsServiceProvider) {
    this.register = this.formBuilder.group({
      first_name:['',Validators.required],
      password:['',Validators.required],
      confirmpassword:['',Validators.required],
      email: ["",Validators.compose([
        Validators.required,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ])],
      last_name:['',Validators.required],
      mobile : ['',Validators.compose([Validators.required, Validators.pattern('^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$'), Validators.maxLength(15)])]
    });
  }

  logForm()
  {
    if(this.agree)
    {
      if(this.register.value.password == this.register.value.confirmpassword)
      {
        let dateformat = this.dob.split('-');
        this.register.value.date_of_birth = dateformat[2]+'/'+dateformat[1]+'/'+dateformat[0];
        this.register.value.gender = this.gender;
        this.register.value.on_behalf = this.Behalf;
        this.register.value.marital_status = this.Maritial;
        delete this.register.value['confirmpassword'];
        console.log(this.register.value);
        localStorage.setItem('user', JSON.stringify(this.register.value));
        var otp = Math.floor(1000 + Math.random() * 9000);
        localStorage.setItem('otp', otp+"");
        this.smsServiceProvider.sendMessage(this.register.value.mobile,"Your OTP is " + otp).then(res=>{
          if(res)
          {
           this.showAlert("Otp has been sent successfully to " +this.register.value.mobile, 1); 
          }
          else{
           this.showAlert("Please enable sms permission,Goto applications->Choose Law Protectors app ->Permissions-> enable sms", 2);    
          }
                        
         }).catch(res=>{
           console.log("smsServiceProvider catch" +res);
           this.showAlert("Messgae has been failed, please check your message service", 3); 
         })
      }
      else{
        let toast = this.toastCtrl.create({
          message: "Password does not match", 
          position: 'top',
          duration: 3000
        });
        toast.present();
      }
      
    }
    else{
      let toast = this.toastCtrl.create({
        message: "Please agree term and condition", 
        position: 'top',
        duration: 3000
      });
      toast.present();
    }
  }

  ionViewDidLoad() {
      this.loader.Show("Loading...");
      this.api.get('get_on_behalf').subscribe(res => {
        this.loader.Hide();
        console.log('this.res',res);
        if(res.authorization)
        {
          this.behalfs =res.on_behalf;
          this.getMaritial();
        }
        else{
          let toast = this.toastCtrl.create({
            message: res.message, 
            position: 'top',
            duration: 3000
          });
          toast.present();
        }
        
      }, err => {
        this.loader.Hide();
        console.log('login err',err);
        let toast = this.toastCtrl.create({
          message: 'Something went wrong, please try again', 
          position: 'top',
          duration: 3000
        });
        toast.present();
      });
  }

  getMaritial()
{
  this.loader.Show("Loading...");
  this.api.get('get_maritial_status').subscribe(res => {
    this.loader.Hide();
    console.log('this.res',res);
    if(res.authorization)
    {
      this.Maritiallist =res.marital_status;
     
    }
    else{
      let toast = this.toastCtrl.create({
        message: res.message, 
        position: 'top',
        duration: 3000
      });
      toast.present();
    }
    
  }, err => {
    this.loader.Hide();
    console.log('login err',err);
    let toast = this.toastCtrl.create({
      message: 'Something went wrong, please try again', 
      position: 'top',
      duration: 3000
    });
    toast.present();
  });
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
