import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ComicsServiceProvider } from '../../providers/comics-service/comics-service';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the ComicsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comics',
  templateUrl: 'comics.html',
})
export class ComicsPage  {

  comics: any[] = [];
  comicsTest: any[] = [];
  copyComics: any[] = [];
  comicsCurrent: any[] = [];
  imageSize: string;
  like ='Like';
  dislike = 'Dislike';
  preload = false;
  prueba = "si funciona el envio de datos igual";


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public comicsServiceProvider: ComicsServiceProvider,
    public loadingCtrl: LoadingController

  ) {
  }

  ionViewDidLoad() {
    this.getAllComics();
  }


  getAllComics() {
    this.imageSize = 'portrait_fantastic';
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.comicsServiceProvider.getComics()
      .subscribe(
        (data) => {
          this.comicsCurrent = this.mapItems(data['data']['results']);
          this.comics = this.comicsCurrent;
          this.preload = true;
          loader.dismiss();
          this.copyComics = this.comicsCurrent;
        },
        (error) => {
          console.log(error);
        }
      )
  }
  getIconFormat(format: string) {
    let iconFormat = 'book';
    if (format === 'Digital Comic') {
      iconFormat = 'desktop';
    }
    if (format === 'Hardcover') {
      iconFormat = 'bookmarks';
    }
    return iconFormat;
  }

  mapItems(items: any[]): any[] {
    return items.map(x => {
      return {
        id: x.id,
        title: x.title,
        pathImage: x.thumbnail.path + '/' + this.imageSize + '.' + x.thumbnail.extension,
        format: x.format,
        iconFormat: this.getIconFormat(x.format),
        price: x.prices[0].price,
        variants: x.variants.length,
        page: x.pageCount,
        countVotes: this.getLocalStorage(x.id),
      };
    });
  }

  getItems(ev: any) {
    this.comics = [];
    this.comics = this.copyComics;
    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.comics = this.comics.filter((comics) => {
        return (comics.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }


  btnCountVotes(item: any, type: string) {
    const STORAGE_KEY = 'local_comicslist_' + item.id;
    let vote: number;
    if (type === "like") {
      vote = item.countVotes++;
    } else {
      vote = item.countVotes--;
    }
    localStorage.setItem(STORAGE_KEY, vote.toString());
  }

  getLocalStorage(comicsId: string) {
    const STORAGE_KEY = 'local_comicslist_' + comicsId;
    let local = localStorage.getItem(STORAGE_KEY);
    if (local) {
      return local;
    } else {
      return 0;
    }
  }
}
