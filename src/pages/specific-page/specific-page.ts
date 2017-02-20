import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';
import { Storage } from '@ionic/storage';
import _ from "lodash";

/*
  Generated class for the SpecificPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-specific-page',
    templateUrl: 'specific-page.html'
})
export class SpecificPage {
    article: any;
    bcolor: string;
    category: string;
    bookmark: Array < any > ;
    bol: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public alertCtrl: AlertController) {
        this.article = this.navParams.get('item');
        this.bcolor = this.navParams.get('bcolor');
        this.category = this.navParams.get('categoryName');
        storage.get('bookmark').then((value) => {
            if (_.isEmpty(value)) {
                this.bookmark = [];
            } else {
                this.bookmark = value;
            }
            this.bol = _.find(this.bookmark, { title: this.article.title });
        })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SpecificPagePage');
    }

    openPage(url) {
        let browser = new InAppBrowser(url, '_blank', 'location=yes');
    }

    getBookmark(item) {
        item.bcolor = this.bcolor;
        item.category = this.category;
        this.bookmark.push(item);
        this.storage.set('bookmark', this.bookmark);
        let alert = this.alertCtrl.create({
            title: 'Message',
            subTitle: 'Article added to bookmark!',
            buttons: ['OK']
        });
        alert.present();
    }

}
