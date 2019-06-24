import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-step-two',
  templateUrl: 'step-two.html',
})
export class StepTwoPage {
  Heightlist = ["Below 4ft 6in", "4ft 7in", "4ft 8in", "4ft 9in", "4ft 10in", "4ft 11in", "5ft", "5ft 1in", "5ft 2in", "5ft 3in", "5ft 4in", "5ft 5in", "5ft 6in", "5ft 7in", "5ft 8in", "5ft 9in", "5ft 10in", "5ft 11in", "6ft", "6ft 1in", "6ft 2in", "6ft 3in", "6ft 4in", "6ft 5in", "6ft 6in", "6ft 7in", "6ft 8in", "6ft 9in", "6ft 10in", "6ft 11in", "7ft"];
  Weightlist = [];
  Complextionlist = ["Very Fair", "Fair", "Wheatish", "Wheatish Medium", "Wheatish Brown", "Dark"];
  BodyTypelist = ["Slim", "Average", "Athletic", "Heavy"];
  Disabilitylist = [{
    id: 0,
    name: "None"
  },
  {
    id: 1,
    name: "Physical Disability"
  }];
  Dietlist = ["Veg", "Eggeterian", "Occasionally Non-veg", "Non-Veg"];
  Smokelist = [{
    id: 0,
    name: "No"
  },
  {
    id: 1,
    name: "Yes"
  },
  {
    id: 2,
    name: "Occasionally"
  }];
  Intercastelist = [{
    id: 0,
    name: "No"
  },
  {
    id: 1,
    name: "Yes"
  }];
  Intercaste:any;
  mangalik:any;
  Raashilist = ["Aries or Maish", "Taurus or Vrish", "Gemini or Mithun", "Cancer or Kark", "Leo or Singh", "Virgo or Kanya", "Libra or Tula", "Scorpio or Vrishchik", "Sagittarius or Dhanu", "Capricorn or Makar", "Aquarius or Kumbh", "Pisces or Meen"];
  Complextion: any;
  BodyType: any;
  Raashi: any;
  Diet: any;
  Smoke: any;
  Drink: any;
  Height: any;
  Weight: any;
  Disability: any;
  private register: FormGroup;
  constructor(public navCtrl: NavController,
    private loader: LoaderServiceProvider,
    public formBuilder: FormBuilder,
    public api: ApiProvider, public toastCtrl: ToastController, public navParams: NavParams) {
    this.register = this.formBuilder.group({
      eye_color: ['', Validators.required],
      hair_color: ['', Validators.required],
      about_member: ['', Validators.required]
    });
    for (let index = 40; index < 151; index++) {
      this.Weightlist.push(index + " kg");

    }
  }

  ionViewDidLoad() {

  }

  logForm() {
    if(this.Height && this.Weight && this.Complextion && this.BodyType && this.Disability && this.Drink && this.Smoke && this.Diet && this.Raashi && this.mangalik && this.Intercaste)
    {
      this.register.value.height = this.Height;
    this.register.value.weight = this.Weight;
    this.register.value.complexion = this.Complextion;
    this.register.value.body_type = this.BodyType;
    this.register.value.any_disability = this.Disability;
    this.register.value.drink = this.Drink;
    this.register.value.smoke = this.Smoke;
    this.register.value.diet = this.Diet;
    this.register.value.raashi = this.Raashi;
    this.register.value.u_manglik = this.mangalik;
    this.register.value.prefered_status = this.Intercaste;
    this.loader.Show("Loading...");
    this.api.auth('profile_info_2', this.register.value).subscribe(res => {
      this.loader.Hide();
      console.log('this.res', res);
      if (res.authorization) {
        this.navCtrl.push('PlanPage');
      }
      else {
        let toast = this.toastCtrl.create({
          message: res.message,
          position: 'top',
          duration: 3000
        });
        toast.present();
      }

    }, err => {
      this.loader.Hide();
      console.log('login err', err);
      let toast = this.toastCtrl.create({
        message: 'Something went wrong, please try again',
        position: 'top',
        duration: 3000
      });
      toast.present();
    });
  }
  else
  {
    let toast = this.toastCtrl.create({
      message: 'Require all fileds',
      position: 'top',
      duration: 3000
    });
    toast.present();
  }
  }

}
