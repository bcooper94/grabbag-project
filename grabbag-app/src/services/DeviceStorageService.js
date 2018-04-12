export default class DeviceStorageService {
  static DEVICE_STORE_KEY = 'deviceStore';

  constructor() {
    if (!this._isLocalStorageAvailable()) {
      throw new Error('Local storage is not available on this device');
    } else {
      console.debug('Local storage is available');
    }

    this.devices = [];
  }

  getAllDevices() {
    let deviceString = window.localStorage.getItem(
      DeviceStorageService.DEVICE_STORE_KEY);

    if (deviceString) {
      this.devices = JSON.parse(deviceString);
    }

    return this.devices;
  }

  storeDevice(device) {
    this.devices.push(device);
    this._syncStorage();
  }

  removeDevice(targetDevice) {
    this.devices.splice(this.devices.findIndex(device =>
      device.wikiid === targetDevice));
    this._syncStorage();
  }

  clearDevices() {
    this.devices = [];
    this._syncStorage();
  }

  _syncStorage() {
    if (this._isLocalStorageAvailable()) {
      window.localStorage.setItem(DeviceStorageService.DEVICE_STORE_KEY,
        JSON.stringify(this.devices));
    } else {
      throw new Error('DeviceStorageService failed to store device list: '
        + 'local storage is not available on this platform');
    }
  }

  // Credit: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
  _isLocalStorageAvailable() {
    let storage;

    try {
      let x = '__storage_test__';
      storage = window['localStorage'];
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    }
    catch (e) {
      return e instanceof DOMException && (
        // everything except Firefox
        e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage.length !== 0;
    }
  }
}