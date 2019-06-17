import { Component,ViewChild } from '@angular/core';
import { Nav,AlertController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  user:any;
  @ViewChild(Nav) nav: Nav;
  constructor(platform: Platform, statusBar: StatusBar,public alertCtrl: AlertController, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      statusBar.backgroundColorByHexString("#FF6347");
      splashScreen.hide();
      this.user = JSON.parse(localStorage.getItem('user'));
      if(this.user)
      {
        this.rootPage = 'DashboardPage';
      }
      else{
        this.rootPage = LoginPage;
      }
      platform.registerBackButtonAction(() => {
        if (this.nav.canGoBack()) {
          this.nav.pop();
        }
        else {
          console.log("else");
          let alert = this.alertCtrl.create({
            subTitle: 'Do you want to exit from the app ?',
            cssClass: 'alertDanger',
            buttons: [{
              text: 'Yes',
              handler: () => {
                // close the sliding item
                platform.exitApp();
              }
            },
            {
              text: 'No',
              handler: () => {
                // close the sliding item
              }
            }]
          });
          // now present the alert on top of all other content
          alert.present();
        }
      });
    });
  }
}

