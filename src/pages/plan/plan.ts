import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';

@IonicPage()
@Component({
  selector: 'page-plan',
  templateUrl: 'plan.html',
})
export class PlanPage {
planList=[];
  constructor(public navCtrl: NavController,
    private loader: LoaderServiceProvider,
    public api: ApiProvider, public toastCtrl: ToastController, public navParams: NavParams) {
  }

  choosePlane()
  {
     this.navCtrl.setRoot('PaymentPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlanPage');
    this.getPlan();
  }

  getPlan()
  {
    this.loader.Show("Loading...");
    this.api.get('get_all_plans').subscribe(res => {
      console.log('this.res',res);
      this.loader.Hide();
      if(res.authorization)
      {
        this.planList = res.all_plans;
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
      this.loader.Hide();
      let toast = this.toastCtrl.create({
        message: 'Something went wrong, please try again', 
        position: 'top',
        duration: 3000
      });
      toast.present();
    });
  }
}
