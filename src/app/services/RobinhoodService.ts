/**
 * Created by roy_f on 9/4/2017.
 */


import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import {reject} from "q";
import {Stock} from "./Stock.model";
@Injectable()

export class RobinhoodService{

  public _apiUrl = 'https://api.robinhood.com/';
  public _endpoints = {
    login:  'api-token-auth/',
    logout: 'api-token-logout/',
    investment_profile: 'user/investment_profile/',
    accounts: 'accounts/',
    ach_iav_auth: 'ach/iav/auth/',
    ach_relationships:  'ach/relationships/',
    ach_transfers:'ach/transfers/',
    ach_deposit_schedules: "ach/deposit_schedules/",
    applications: 'applications/',
    dividends:  'dividends/',
    edocuments: 'documents/',
    instruments:  'instruments/',
    margin_upgrade:  'margin/upgrades/',
    markets:  'markets/',
    notifications:  'notifications/',
    notifications_devices: "notifications/devices/",
    orders: 'orders/',
    cancel_order: 'orders/',      //API expects https://api.robinhood.com/orders/{{orderId}}/cancel/
    password_reset: 'password_reset/request/',
    quotes: 'quotes/',
    document_requests:  'upload/document_requests/',
    user: 'user/',

    user_additional_info: "user/additional_info/",
    user_basic_info: "user/basic_info/",
    user_employment: "user/employment/",
    user_investment_profile: "user/investment_profile/",

    watchlists: 'watchlists/Default',
    positions: 'positions/',
    fundamentals: 'fundamentals/',
    sp500_up: 'midlands/movers/sp500/?direction=up',
    sp500_down: 'midlands/movers/sp500/?direction=down',
    news: 'midlands/news/'
  }

  _private = {
    session : {},
    headers : {
      'Accept': '*/*',
      'Accept-Language': 'en;q=1, fr;q=0.9, de;q=0.8, ja;q=0.7, nl;q=0.6, it;q=0.5',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      'X-Robinhood-API-Version': '1.152.0',
      'Authorization' : null
    },
  }

  account = {
    positions: [],
    watchList: [],
    information: null
  }

  parent = this;
  serviceInterval = null;

  constructor(public http: Http){

  }

  startService(username:string, password:string){
    return(new Promise((resolve,reject)=>{
      this.login(username, password).then(()=>{
        this.setAccountInformation().then(()=>{
          const parent = this;
          this.serviceInterval = setInterval(function(){
            parent.getPositions().then(res=>{
              console.log(parent.account.positions);
            });
            parent.getWatchList().then(res=>{
              console.log(parent.account.watchList);
            });
          }, 4000);
          resolve();
        })
      },()=>{
        reject();
      })
    }))
  }

  setHeaders(){
    const header = new Headers();
    for (const h of Object.keys(this._private.headers)) {
      header.set(h, this._private.headers[h]);
    }
    return (header);
  }

  addTokenToHeader(token){
    this._private.headers.Authorization = "Token " + token;
  }

  getPositions(){
    return(new Promise((resolve,reject)=>{
      //somehow using urlParams doesn't work? so I have to put it in manually???
      this.http.get(this._apiUrl + this._endpoints.positions
        +"?nonzero=true",{
        headers: this.setHeaders()
      }).subscribe(res=>{
        const positions = [];
        res.json().results.forEach(r=>{
          positions.push(new Stock(r));
        });
        const promises = [];
        positions.forEach(position=>{
          const p = this.getInstrument(position);
          promises.push(p);
        })
        Promise.all(promises).then(()=>{
          this.account.positions = positions;
          resolve(res);
        })
      }, error=>{
        reject(error);
      })
    }))
  }

  resolveField(object, fieldName){
    return(new Promise((resolve,reject)=>{
      this.http.get(object[fieldName]).subscribe(res=>{
        object[fieldName] = res.json();
        resolve(res)
      },error=>{
        reject(error);
      })
    }))
  }

  getInstrument(position:Stock){
    return(new Promise((resolve,reject)=>{
      this.http.get(position.data.instrument).subscribe(res=>{
        position.data.instrument = res.json();
        this.getQuote(position.data.instrument).then(res2=>{
          resolve(res2);
        },error=>{
          reject(error);
        })
      }, error=>{
        reject(error);
      })
    }))
  }

  getQuote(instrument){
    return(new Promise((resolve,reject)=>{
      this.http.get(instrument.quote).subscribe(res=>{
        instrument.quote = res.json();
        resolve(res);
      }, error=>{
        reject(error);
      })
    }))
  }

  getWatchList(){
    return(new Promise((resolve,reject)=>{
      this.http.get(this._apiUrl + this._endpoints.watchlists,{
        headers: this.setHeaders()
      }).subscribe(res=>{
        const watchList = [];
        res.json().results.forEach(data=>{
          watchList.push(new Stock(data));
        });
        const promises =[]
        watchList.forEach(watchItem =>{
          promises.push(this.getInstrument(watchItem));
        })
        Promise.all(promises).then(()=>{
          this.account.watchList = watchList;
          resolve(res);
        });
      }, error=>{
        reject(error);
      })
    }))
  }

  setAccountInformation(){
    return(new Promise((resolve,reject)=>{
      this.http.get(this._apiUrl + this._endpoints.accounts,{
        headers: this.setHeaders()
      }).subscribe(res=>{
        this.account.information = res.json().results[0];
        resolve(res);
      }, error=>{
        reject(error);
      })
    }))
  }
  login(username: string, password: string){
    return(new Promise((resolve,reject)=>{
      this.http.post(this._apiUrl + this._endpoints.login, {
        username: username,
        password: password
      }).subscribe(res=>{
        this.addTokenToHeader(res.json().token);
        resolve(res);
      })
    }))
  }
  logout(){
    return(new Promise((resolve,reject)=>{
      this.http.get(this._endpoints.logout, {
        headers: this.setHeaders()
      }).subscribe(res=>{
        resolve(res);
      }, ()=>{
        reject();
      });
    }))
  }


}
