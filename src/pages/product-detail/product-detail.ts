import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Product} from "../../interfaces/product";
import {RestProvider} from "../../providers/rest/rest";

/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  product:Product;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private rest:RestProvider,
              private toastCtrl:ToastController) {
    this.product = new Product(this.navParams.get('myProduct'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }

  saveProduct(product:Product){
    //수정
    if (product.id){
      this.rest.updateProduct(product)
        .subscribe(pro =>{
          this.product = pro;
          this.showMessage("Product:" + pro.id + " - " + pro.name + " 수정됨");
          this.navCtrl.setRoot('ProductListPage');
        });
    }else{ //null이면 등록
      this.rest.createProduct(product)
        .subscribe(res => {
          this.product = res;
          this.showMessage("Product:" + res.id + " - " + res.name + " 등록됨");
          this.navCtrl.setRoot('ProductListPage'); //강제화면갱신효과
          //this.navCtrl.pop(); //의미상 pop이 맞음=> 화면갱신 코드 필요
        });
    }
  } //saveProduct

  deleteProduct(productId:number){
    this.rest.deleteProductById(productId)
      .subscribe(pro => {
        //this.product = pro;
        this.showMessage("Product:" + productId  + " 삭제됨");
        this.navCtrl.setRoot('ProductListPage');
      });
  }

  //
  showMessage(message : string){
    this.toastCtrl.create({
      message : message,
      showCloseButton : true,
      duration : 3000, //3초
      position : 'middle'
    }).present();
  }
}
