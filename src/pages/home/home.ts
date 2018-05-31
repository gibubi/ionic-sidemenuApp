import { Component } from '@angular/core';
import {AlertController, ModalController, NavController} from 'ionic-angular';
import {Profile} from "../../interfaces/profile";
import {Account} from "../../interfaces/account";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public profile = {} as Profile;
  public accountData = {} as Account;

  constructor(public navCtrl: NavController,
              public modalCtrl : ModalController,
              public alertCtrl : AlertController
              ) {

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

  //Prompt Alert
  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Login',
      message: "이름과 이메일을 입력하세요",
      inputs: [
        {
          name: 'name',
          placeholder: '이름 입력'
        },
        {
          name: 'email',
          placeholder: '이메일 입력'
        },
      ],
      buttons: [
        {
          text: '취소',
          handler: data => {
            console.log('Cancel clicked');
            console.log(data);
          }
        },
        {
          text: '저장',
          handler: data => {
            console.log('Saved clicked');
            console.log(data);

            this.accountData = {name:data.name, email:data.email};
            this.navCtrl.push('NavPage', {account:this.accountData});
          }
        }
      ]
    });
    prompt.present();
  }
}
