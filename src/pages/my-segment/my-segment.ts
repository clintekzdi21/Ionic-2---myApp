import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MyPage } from '../../pages/my-page/my-page';
import _ from "lodash";

/*
  Generated class for the MySegment page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-my-segment',
    templateUrl: 'my-segment.html'
})
export class MySegmentPage {
    newsArr: Array < any > ;
    category: string;
    source: Array <any>;
    bcolor: string;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.newsArr = this.navParams.get('data');
      this.category = this.navParams.get('category');
      this.bcolor = this.navParams.get('bcolor');
      this.source = _.filter(this.newsArr, {'category':this.category});      
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MySegmentPage');
    }

    itemTapped(item) {
        // That's right, we're pushing to ourselves!    
        this.navCtrl.push(MyPage, {
            id: item,
            category: this.category,
            bcolor: this.bcolor
        });
    }
}
