import { Component } from '@angular/core';
import { NavController, AlertController,ToastController, Events } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { ApiProvider } from '../../providers/api/api';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private register : FormGroup;
  constructor(public navCtrl: NavController,
    private loader: LoaderServiceProvider,
    public api: ApiProvider,
    public events: Events,
     public toastCtrl: ToastController,public formBuilder: FormBuilder,public alertCtrl: AlertController) {
      this.register = this.formBuilder.group({
        password: ['', Validators.required],
        mobile : ['',Validators.compose([Validators.required, Validators.pattern('^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$'), Validators.maxLength(15)])]
      });
  }

  logForm()
  {
    console.log(this.register.value);
    this.loader.Show("Loading...");
      this.api.add('login', this.register.value).subscribe(res => {
        console.log('login',res);
        this.loader.Hide();
        if(res.authorization)
        {
          this.register.value.res = res;
          localStorage.setItem('user', JSON.stringify(this.register.value));
          this.events.publish('user:loggedIn');
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
      })
    
  }

  login()
  {
    this.navCtrl.push('ForgotpassPage');
  }
  
}