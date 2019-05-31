import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(public navCtrl: NavController,
    private themeableBrowser: ThemeableBrowser,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  //   const options: ThemeableBrowserOptions = {
  //     statusbar: {
  //       color: '#d72738'
  //   },
  //   toolbar: {
  //       height: 46,
  //       color: '#f6453f'
  //   },
  //   title: {
  //       color: '#003264ff',
  //       showPageTitle: true,
  //       staticText:'Mansparsh'
  //   },
  //   closeButton: {
  //       image: 'ic_action_remove',
  //       imagePressed: 'ic_action_remove',
  //       align: 'left',
  //       event: 'closePressed'
  //   },
  //   backButtonCanClose: true
  // };
 
  //   const browser: ThemeableBrowserObject = this.themeableBrowser.create('http://mansparsh.com/home/login', '_blank', options);
 
  //   browser.on('loadstart').subscribe(event => {
  //     console.log("loadstart");
      
  //     })
  //     browser.on('loadstop').subscribe(event => {
  //     console.log("loadstop");
      
  //     });
  //   browser.on('closePressed').subscribe(data => {
  //     browser.close();
  //   })
  }

}
