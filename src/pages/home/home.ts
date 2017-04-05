import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {

    //Variable for the current date and time
    currentDate: string;
    currentTime: string;

    //Variable for the current date and time
    previousDate: string;
    previousTime: string;

    //Variable for how long they slept
    timeSlept: string;

    constructor(public navCtrl: NavController, public storage: Storage) {
        this.previousDate = "loading";
    }

    //The user has pressed the button that they have gone to sleep
    sleep() {

        //Get the current time and date
        this.currentDate = new Date().toLocaleDateString();
        this.currentTime = new Date().toLocaleTimeString();

        //Debug
        console.log('Sleep');
        console.log(this.currentTime);
        console.log(this.currentDate);


        this.storage.ready().then(() => {

            //Record the time and date the user went to sleep
            this.storage.set('SleepTime', this.currentTime);
            this.storage.set('SleepDate', this.currentDate);
        });

    }

    //The user has pressed the button to signal they have woken up in the night
    wakeNight() {
        console.log('nightWake');
        console.log("Went to bed at...", this.previousTime);
        console.log('Went to bed on...', this.previousDate);
    }

    //The user has woke up for the day
     wake() {

        //Get the current ay and time
        this.currentTime = new Date().toLocaleTimeString();

        //Retrieve the time and date the user went to sleep
        this.storage.ready().then(() => {

            this.storage.get('SleepTime').then((val) => {
                this.previousTime = val;
            })

            this.storage.get('SleepDate').then((val) => {
                this.previousDate = val;
            })

        });

         //If we have a good value, proceed.
        if (this.previousDate != "loading") {
            console.log(this.previousDate);
            this.compareTimes();
        }

    }

     compareTimes() {

         var prevDay;
         var curDay;
         var curTime;
         var prevTime;

         var passedMins;
         var passedHours;
         var passedSeconds;

         //Get the current day
         this.currentDate = new Date().toLocaleDateString();
         curDay = this.currentDate.split("-");
         //Get the day they went to sleep
         prevDay = this.previousDate.split("-");

         //Get the current time
         curTime = this.currentTime.split("-");
         //Get the time they went to sleep
         prevTime = this.previousTime.split("-");

         if (curTime != prevTime) {
             passedHours = (prevTime[0] - curTime[0]);
             passedMins = prevTime[1] - curTime[1];
             passedSeconds = prevTime[2] - curTime[2];

             console.log('----TIME DIFFERENCE-----');
             console.log(passedHours);
             console.log(passedMins);
             console.log(passedSeconds);
             console.log('------------------------');
         }
       

         //Debug
         console.log('Wake');
         console.log('passedSecs', prevTime[0]);
         console.log('passed', prevTime[1]);
         console.log('passed', prevDay[1]);


         console.log("day = ", prevDay[2]);
         console.log("CurTime = " + this.currentTime);
         console.log("CurDate = " + this.currentDate);
         console.log("Went to bed at...", this.previousTime);
         console.log('Went to bed on...', this.previousDate);
     }

}


/*
        //Set up internal storage through Ionic2
        storage.ready().then(() => {

            // set a key/value
        //    storage.set('name', 'Max');

            // Or to get a key/value pair
            storage.get('name').then((val) => {
                console.log('Your name is', val);
            })
        });
*/