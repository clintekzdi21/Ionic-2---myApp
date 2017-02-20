import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { NewsProvider } from '../../providers/news-provider';
import { SpecificPage } from '../../pages/specific-page/specific-page';

/*
  Generated class for the MyPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-my-page',
    templateUrl: 'my-page.html'
})
export class MyPage {
    categoryName: string;
    newsId: string;
    newsSource: Array < any > ;
    newsArticles: Array < any > ;
    bcolor: string;
    constructor(public navCtrl: NavController, public navParams: NavParams, public newsProvider: NewsProvider, public loadingCtrl: LoadingController) {

        this.newsSource = [];
        this.newsId = this.navParams.get('id');
        this.categoryName = this.navParams.get('category');
        console.log(this.categoryName);
        this.newsArticles = [];
        this.bcolor = this.navParams.get('bcolor');

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MyPage');
        this.newsProvider.loadNewsArticles(this.newsId).then((data: any) => {
            this.newsSource = data.source;
            this.newsArticles = data.articles;
        });
    }

    itemTapped(item) {
        // That's right, we're pushing to ourselves!    
        this.navCtrl.push(SpecificPage, {
            item: item,
            bcolor: this.bcolor,
            categoryName: this.categoryName
        });
    }

    doRefresh() {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.newsSource = [];
        this.newsArticles = [];
        this.newsProvider.loadNewsArticles(this.newsId).then((data: any) => {
            this.newsSource = data.source;
            this.newsArticles = data.articles;
            loading.dismiss();
        });
    }

}
