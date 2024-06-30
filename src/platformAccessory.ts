import { Service, PlatformAccessory } from 'homebridge';

import { ThermometerPlatform } from './platform';

import request from 'request';

/**
 * Platform Accessory
 * An instance of this class is created for each accessory the platform registers.
 */
export class ThermometerPlatformAccessory {
  private service: Service;

  constructor(
    private readonly platform: ThermometerPlatform,
    private readonly accessory: PlatformAccessory,
  ) {

    // requesting and updating values
    this.httpRequest(accessory.context.device.httpRoute, accessory.context.device.jsonName, accessory.context.device.calibration || 0);

    // set accessory information
    this.accessory.getService(this.platform.Service.AccessoryInformation)!
      .setCharacteristic(this.platform.Characteristic.Manufacturer, accessory.context.device.manufacturer || 'Default-Manufacturer')
      .setCharacteristic(this.platform.Characteristic.Model, accessory.context.device.model || 'Default-Model')
      .setCharacteristic(this.platform.Characteristic.SerialNumber, accessory.context.device.serial || 'Default-Serial');

    // get the TemperatureSensor service if it exists, otherwise create a new TemperatureSensor service
    this.service = this.accessory.getService(this.platform.Service.TemperatureSensor) ||
    this.accessory.addService(this.platform.Service.TemperatureSensor);

    // this is what is displayed as the default name on the Home app
    this.service.setCharacteristic(this.platform.Characteristic.Name, accessory.context.device.thermometerName);

    /**
     * Updating characteristics values.
     * Here we update the temperature sensor values.
     */
    setInterval(() => {
      this.httpRequest(accessory.context.device.httpRoute, accessory.context.device.jsonName, accessory.context.device.calibration || 0);
      this.platform.log.debug('Interval update:', accessory.context.device.updateInterval);
    }, accessory.context.device.updateInterval * 1000);
  }

  /**
   * Handle the "GET" requests from HomeKit
   * These are sent when HomeKit wants to know the current state of the accessory.
   */
  async httpRequest(url: string, thermometer: string, calibration: number) {
    request(url, (error, response, body) => {
      if (error) {
        this.platform.log.warn('Error getting status:', error.message);
        this.service.getCharacteristic(this.platform.Characteristic.CurrentTemperature).updateValue(new Error('Polling failed'));
      } else {
        this.platform.log.debug('Device response:', body);
        try {
          const json = JSON.parse(body);
          const ev = eval("json." + thermometer) // i.e. "ext_temperature[0].tC" for a dsb18b20 on an Shely Uni at /status
          const temperature = (parseFloat(ev) + calibration).toFixed(2);
          this.service.getCharacteristic(this.platform.Characteristic.CurrentTemperature).updateValue(temperature);
          this.platform.log.info('Current temperature in', this.accessory.context.device.thermometerName, 'updated to', temperature);
        } catch (parseError) {
          this.platform.log.warn('Error parsing status:', parseError);
        }
      }
    });
  }
}
