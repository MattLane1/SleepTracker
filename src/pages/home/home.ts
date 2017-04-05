import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

    constructor(public navCtrl: NavController, storage: Storage) {

        //Set up internal storage through Ionic2
        storage.ready().then(() => {

            // set a key/value
        //    storage.set('name', 'Max');

            // Or to get a key/value pair
            storage.get('name').then((val) => {
                console.log('Your name is', val);
            })
        });
    }

    //The user has pressed the button that they have gone to sleep
    sleep() {

        console.log('Zzzz');
    }

    //The user has pressed the button to signal they have woken up in the night
    wakeNight() {
        console.log('nightWake');
    }

    //The user has woke up for the day
    wake() {
        console.log('Morning');
    }
}
