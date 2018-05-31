import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from "rxjs";

import "rxjs/add/operator/map"
import "rxjs/add/operator/catch"
import {Product} from "../../interfaces/product";

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  baseUrl:string = 'http://localhost:3000';

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  //prodct 전체 리스트
  public getProducts():Observable<Product[]>{

    return this.http.get(this.baseUrl + "/products")
      .map((resp:Product[]) => {  //형식 변환
        return resp.map(product => {
          return new Product(product);
        })
      })
      .catch(err => {  //예외 발생시
        return Observable.empty<Product[]>()
      });
  }
}
/*
return type : Observable<Object>
->
Observable<Prodcut[]> 로 변환하는 과정

   Object -> Product생성자를 통하여 생성
 */
