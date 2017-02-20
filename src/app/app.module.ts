import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { MyPage } from '../pages/my-page/my-page';
import { TechnologyPage } from '../pages/technology/technology';
import { NewsProvider } from '../providers/news-provider';
import { SpecificPage } from '../pages/specific-page/specific-page';
import { MySegmentPage } from '../pages/my-segment/my-segment';
import { Storage } from '@ionic/storage';



@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    MyPage,
    TechnologyPage,
    SpecificPage,
    MySegmentPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    MyPage,
    TechnologyPage,
    SpecificPage,
    MySegmentPage
  ],
  providers: [
  {provide: ErrorHandler, useClass: IonicErrorHandler}, 
  NewsProvider,
  Storage
  ]
})
export class AppModule {}
