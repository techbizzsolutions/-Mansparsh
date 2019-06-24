import { Component,ViewChild } from '@angular/core';
import { Nav,AlertController, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  user:any;
  pages:any = [];
  @ViewChild(Nav) nav: Nav;
  constructor(platform: Platform, statusBar: StatusBar,
    public menuCtrl: MenuController,public alertCtrl: AlertController, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      statusBar.backgroundColorByHexString("#FF6347");
      splashScreen.hide();
      // used for an example of ngFor and navigation
      this.pages = [{
        title: 'Home',
        component: 'DashboardPage',
        icon: 'ios-home'
      },
      {
        title: 'Matching Profiles',
        component: 'DashboardPage',
        icon: 'ios-people'
      },
      {
        title: 'Who View My Profile?',
        component: 'DashboardPage',
        icon: 'ios-people'
      },
      {
        title: 'Package',
        component: 'PlanPage',
        icon: 'md-list-box'
      },
      {
        title: 'Edit Profile',
        component: 'StepOnePage',
        icon: 'ios-create'
      },
      {
        title: 'Gallery Photo',
        component: 'DashboardPage',
        icon: 'ios-images'
      },
      {
        title: 'Happy Stories',
        component: 'DashboardPage',
        icon: 'ios-happy'
      },
      {
        title: 'Privacy Options',
        component: 'DashboardPage',
        icon: 'ios-lock'
      },
      {
        title: 'Help and Customer Support',
        component: 'DashboardPage',
        icon: 'md-help-circle'
      },
      {
        title: 'Log Out',
        icon: 'md-log-out'
      }];
      this.user = JSON.parse(localStorage.getItem('user'));
      if(this.user && this.user.member_id)
      {
        this.rootPage = 'DashboardPage';
      }
      else{
        this.rootPage = 'DashboardPage';
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
  openPage(page) {
    console.log("*****",page);
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
      switch(page.title)
      {
        case 'Home':
        this.nav.setRoot(page.component);
        break;
        case 'Log Out':
        localStorage.clear();
        this.menuCtrl.swipeEnable(false, 'menu1');
        this.nav.setRoot(LoginPage);
        break;
        default:
        {
          this.nav.push(page.component);
        }
      }
  }

}

