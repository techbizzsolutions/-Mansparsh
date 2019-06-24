import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { ApiProvider } from '../../providers/api/api';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
 memberList=[];
 user:any;
 page = 1;
 isShow:boolean = true;
 bannerData:any;
  constructor(public navCtrl: NavController,
    private loader: LoaderServiceProvider,
    public api: ApiProvider, public toastCtrl: ToastController,
    public navParams: NavParams) {
      this.getBanner();
  }

  open(item)
  {
     switch (item) {
       case "1":
         this.navCtrl.push(LoginPage);
         break;
         case "2":
          this.navCtrl.push(HomePage);
          break;
       default:
         break;
     }
  }

  getBanner()
  {
    this.api.get('get_banner_images').subscribe(res => {
      console.log('this.res',res);
      if(res.authorization)
      {
        this.bannerData = res.all_banners[Math.floor(Math.random()*res.all_banners.length)];
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
      console.log('login err',err);
      let toast = this.toastCtrl.create({
        message: 'Something went wrong, please try again', 
        position: 'top',
        duration: 3000
      });
      toast.present();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
    this.user = JSON.parse(localStorage.getItem('user'));
    if(this.user && this.user.member_id)
    {
      this.getData(this.user.member_id,this.page);
    }
    else{
      this.getData('0',this.page);
    }
    
  }

  doInfinite(infiniteScroll) {
    this.page = this.page+1;
    setTimeout(() => {
      this.ionViewDidLoad();
      infiniteScroll.complete();
    }, 1000);
  }

  getData(id,page) {
    this.loader.Show("Loading...");
    this.api.add('home', JSON.stringify({
      "member_id":id, /* or pass member id, if logged  */
      "page":page, /* 1,2,3,4......per page 10 records will shown */
    })).subscribe(res => {
      this.loader.Hide();
      console.log('this.res',res);
      if(res.authorization)
      {
        for(let i=0; i<res.listing.length; i++) {
          this.memberList.push(res.listing[i]);
        }
        if(!res.listing.length)
        {
           this.isShow = false;
        }
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
}
