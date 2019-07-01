import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-step-one',
  templateUrl: 'step-one.html',
})
export class StepOnePage {
  Religionlist = [];
  Castelist = [];
  subCastelist = [];
  Countrylist = [];
  satelist = [];
  Citylist = [];
  Langlist = [];
  Lang:any;
  City:any;
  state:any;
  Caste:any;
  Country:any;
  subCaste:any;
  Religion:any;
  private register : FormGroup;
  constructor(public navCtrl: NavController,
    private loader: LoaderServiceProvider,
    public formBuilder: FormBuilder,
    public api: ApiProvider, public toastCtrl: ToastController, public navParams: NavParams) {
      this.register = this.formBuilder.group({
        highest_education: ['', Validators.required],
        occupation: ['', Validators.required],
        annual_income: ['', Validators.required],
        address: ['', Validators.required],
        whatsapp_number : ['',Validators.compose([Validators.required, Validators.pattern('^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$'), Validators.maxLength(15)])]
      });
  }

  ionViewDidLoad() {
    this.getReligion();
}

logForm()
{
  
  if(this.Religion && this.Caste && this.subCaste && this.Country && this.City && this.state && this.Lang)
  {
    this.register.value.religion = this.Religion;
    this.register.value.caste = this.Caste;
    this.register.value.sub_caste = this.subCaste;
    this.register.value.country = this.Country;
    this.register.value.city = this.City;
    this.register.value.state = this.state;
    this.register.value.mother_tongue = this.Lang;
    this.loader.Show("Loading...");
    this.api.auth('profile_info_1',this.register.value).subscribe(res => {
    this.loader.Hide();
    console.log('this.res',res);
    if(res.authorization)
    {
      this.navCtrl.push('StepTwoPage');
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
else{
  let toast = this.toastCtrl.create({
    message: 'Require all fileds', 
    position: 'top',
    duration: 3000
  });
  toast.present();
}
  
}

selectReligion()
{
  this.Castelist = [];
  this.subCastelist = [];
  this.getCaste();
}

selectCaste()
{
  this.subCastelist = [];
  this.getsubCaste();
}

getLang()
{
  this.loader.Show("Loading...");
  this.api.get('get_mother_tongue').subscribe(res => {
    this.loader.Hide();
    console.log('this.res',res);
    if(res.authorization)
    {
      this.Langlist =res.mother_tongue;
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
      this.getLang();
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

selectCountry()
{
  this.satelist = [];
  this.Citylist = [];
  this.getState();
}

selectSate()
{
  this.Citylist = [];
  this.getCity();
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
