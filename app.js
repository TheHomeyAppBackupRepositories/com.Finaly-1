'use strict';

const Homey = require('homey');
const { HomeyAPIApp } = require('homey-api');


class MyApp extends Homey.App {

  /**
   * onInit is called when the app is initialized.
   */
  async onInit() {

    // register system events
    this.homey.on('memwarn', () => console.log('memwarn!'));

    // access a Manager
    const longitude = await this.homey.geolocation.getLongitude();
    this.log('Latitude: ', longitude );
    this.api = new HomeyAPIApp({
      homey: this.homey, 
      debug: true 
    });
    this.startLoop();

    this.log('MyApp has been initialized');
  };

  async startLoop() {
    let systemInfo = null;
    // systemInfo = 
    // this.storageInfo = await this.api.system.getStorageInfo( );
    systemInfo = await this.api.system.getStorageInfo( )
    .then((systemInfo) => {
      // this.log('this.systemInfo i :' , systemInfo );
      this.systemInfo = systemInfo
    })
    .catch((err) => {
      this.error(err);
    })
    .finally((systemInfo) => {
      this.log('Experiment completed: ' , this.systemInfo.used );
      this.homey.setTimeout(() => {
        // do something
        this.startLoop();
      }, 20000);
    });
  
    // this.log('this.systemInfo a :' , this.systemInfo.uptime );
  };
}

module.exports = MyApp;
