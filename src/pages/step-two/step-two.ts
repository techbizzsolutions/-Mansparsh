import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-step-two',
  templateUrl: 'step-two.html',
})
export class StepTwoPage {

  Maritiallist = [];
  Religionlist = [];
  Castelist = [];
  subCastelist = [];
  Countrylist = [];
  satelist = [];
  Citylist = [];
  City:any;
  state:any;
  Caste:any;
  Country:any;
  subCaste:any;
  Maritial:any;
  Religion:any;
  private register : FormGroup;
  constructor(public navCtrl: NavController,
    private loader: LoaderServiceProvider,
    public formBuilder: FormBuilder,
    public api: ApiProvider, public toastCtrl: ToastController, public navParams: NavParams) {
      this.register = this.formBuilder.group({
        language: ['', Validators.required],
        education: ['', Validators.required],
        occupation: ['', Validators.required],
        salary: ['', Validators.required],
        address: ['', Validators.required],
        mobile : ['',Validators.compose([Validators.required, Validators.pattern('^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$'), Validators.maxLength(15)])]
      });
  }

  ionViewDidLoad() {
    //this.getMaritial();
}

logForm()
{
  this.navCtrl.push('StepTwoPage');
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
      this.getReligion();
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

getReligion()
{
  this.loader.Show("Loading...");
  this.api.get('get_religion').subscribe(res => {
    this.loader.Hide();
    console.log('this.res',res);
    if(res.authorization)
    {
      this.Religionlist =res.profile_religion;
      this.getCaste();
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

getCaste()
{
  this.loader.Show("Loading...");
  this.api.add('get_caste',{
    "religion_id":this.Religion
  }).subscribe(res => {
    this.loader.Hide();
    console.log('this.res',res);
    if(res.authorization)
    {
      this.Castelist =res.profile_caste;
      this.getsubCaste();
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

getsubCaste()
{
  this.loader.Show("Loading...");
  this.api.add('get_sub_caste',{
    "caste_id":this.Caste
  }).subscribe(res => {
    this.loader.Hide();
    console.log('this.res',res);
    if(res.authorization)
    {
      this.subCastelist =res.profile_sub_caste;
      this.getCountry();
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

getCountry()
{
  this.loader.Show("Loading...");
  this.api.get('get_country').subscribe(res => {
    this.loader.Hide();
    console.log('this.res',res);
    if(res.authorization)
    {
      this.Countrylist =res.profile_country;
      this.getState();
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

getState()
{
  this.loader.Show("Loading...");
  this.api.add('get_state',{
    "country_id":this.Country
  }).subscribe(res => {
    this.loader.Hide();
    console.log('this.res',res);
    if(res.authorization)
    {
      this.satelist =res.profile_state;
      this.getCity();
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

getCity()
{
  this.loader.Show("Loading...");
  this.api.add('get_city',{
    "state_id":this.state
  }).subscribe(res => {
    this.loader.Hide();
    console.log('this.res',res);
    if(res.authorization)
    {
      this.Citylist =res.profile_city;
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
