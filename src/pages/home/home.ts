import { Component } from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {Profile} from "../../interfaces/profile";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public profile = {} as Profile;

  constructor(public navCtrl: NavController,
              public modalCtrl : ModalController) {

  }

  modal(){
    let modal = this.modalCtrl.create('ModalPage');

    //넘겨준 값을 받음
    modal.onDidDismiss(data=>{

      if (Object.keys(data).length === 0){
        //property값이 없는 경우 : close()통해서 dissmiss()된 경우
        console.log(data);
      }else {
        //받아온 값 표시
        //console.log(data);
        this.profile.actionSwitch = data.actionSwitch;
        this.profile.name = data.name;
        this.profile.gender = data.gender;
        this.profile.domestic = data.domestic;
        this.profile.startDate = data.startDate;
      }
    });
    modal.present();
  }
}
