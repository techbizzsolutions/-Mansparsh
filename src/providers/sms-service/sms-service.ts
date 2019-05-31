import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SMS } from '@ionic-native/sms';
import { Observable } from "rxjs/Observable";

@Injectable()
export class SmsServiceProvider {
  constructor(public http: HttpClient, private sms: SMS) {
    console.log('Hello SmsServiceProvider Provider');
  }

  get(url): Observable<any> {
    return this.http.get<any>(url);
  }

sendMessage(number:any, msg): Promise<any>
  {
    return new Promise((resolve, reject) => {
      this.sms.send(number, msg).then((result) => {
              resolve(true);
            }, (error) => {
              console.log("sms send" , error);
                this.sms.hasPermission().then(res=>{
                    console.log(number + "sms hasPermission" , msg);
                    if(res)
                    {
                      reject(false);
                    }
                    else{
                      console.log("sms else");
                      resolve(false);
                    }       
                  })
                  .catch(err=>{
                    console.log("sms hasPermission else");
                    reject(false);
                  })
            });
      
    });   
  }


}
