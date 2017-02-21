import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SpecificPage } from '../../pages/specific-page/specific-page';
import _ from "lodash";

@Component({
    selector: 'page-page1',
    templateUrl: 'page1.html'
})
export class Page1 {
    bookmark: Array < any > ;
    constructor(public navCtrl: NavController, public storage: Storage, public alertCtrl: AlertController) {
        this.initializeData();
    }

    private initializeData() {
        this.storage.get('bookmark').then((value) => {
            if (_.isEmpty(value)) {
                this.bookmark = [];
            } else {
                this.bookmark = _.uniqBy(value, 'title');
                console.log('this.bookmark', this.bookmark);
            }
        })
    }

    ionViewWillEnter() {
        console.log('ionViewWillEnter SpecificPagePage');
        this.initializeData();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Page1');
    }

    itemTapped(item) {
        // That's right, we're pushing to ourselves!    
        this.navCtrl.push(SpecificPage, {
            item: item,
            bcolor: item.bcolor,
            categoryName: item.category
        });
    }

}
