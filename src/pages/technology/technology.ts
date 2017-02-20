import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MyPage } from '../../pages/my-page/my-page';
import { NewsProvider } from '../../providers/news-provider';
import { MySegmentPage } from '../../pages/my-segment/my-segment';
import _ from "lodash";

/*
  Generated class for the Technology page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-technology',
    templateUrl: 'technology.html',

})
export class TechnologyPage {
    newsArr: Array < any > ;
    src: Array < any > ;
    initialItems: Array < any > ;
    bcolor: string[];
    icon: string[];
    constructor(public navCtrl: NavController, public navParams: NavParams, public newsProvider: NewsProvider) {
        this.newsArr = [];
        this.src = [];
        this.initialItems = [];
        this.bcolor = [
            'energized',
            'assertive',
            'positive',
            'calm',
            'balanced',
            'royal',
            'danger',
            'secondary'
        ];
        this.icon = [
            './assets/icon/grid-world.svg',
            './assets/icon/network.svg',
            './assets/icon/football.svg',
            './assets/icon/loss.svg',
            './assets/icon/newspaper.svg',
            './assets/icon/player.svg',
            './assets/icon/spotify-logo.svg',
            './assets/icon/atomic.svg'
        ]
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad TechnologyPage');
        this.newsProvider.loadNews().then((data: any) => {
            //console.log('data', data.sources);
            if (data.status == 'ok') {
                this.src = data.sources;
                this.newsArr = _.uniqBy(this.src, 'category');
                this.initialItems = _.uniqBy(this.src, 'category');
            }
        })
    }

    itemTapped(item, category, bcolor) {
        // That's right, we're pushing to ourselves!    
        this.navCtrl.push(MySegmentPage, {
            id: item,
            category: category,
            bcolor: bcolor,
            data: this.src
        });
    }

    getItems(ev: any) {
        // set val to the value of the searchbar
        let val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.newsArr = this.newsArr.filter((item) => {
                return (item.category.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        } else {
            this.newsArr = this.initialItems;
        }
    }

    doRefresh(refresher) {
        this.newsProvider.loadNews().then((data: any) => {
            //console.log('data', data.sources);
            this.initialItems = [];
            this.newsArr = [];
            if (data.status == 'ok') {
                this.src = data.sources;
                this.newsArr = _.uniqBy(this.src, 'category');
                this.initialItems = _.uniqBy(this.src, 'category');
                refresher.complete();
            }
        })
    }
}
