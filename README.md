<p  align="center">

  

<a href="https://homebridge.io/"><img  src="https://github.com/Jakubkuba9000/homebridge-http-json-thermometer/blob/main/images/homebridge-logo.png"  width="150"></a>

  

</p>

  

<span  align="center">

  

# HTTP JSON Thermometer

[![npm](https://img.shields.io/npm/v/homebridge-http-json-thermometer.svg)](https://www.npmjs.com/package/homebridge-http-json-thermometer) [![verified-by-homebridge](https://badgen.net/badge/homebridge/verified/purple)](https://github.com/homebridge/homebridge/wiki/Verified-Plugins) [![npm](https://img.shields.io/npm/dt/homebridge-http-json-thermometer.svg)](https://www.npmjs.com/package/homebridge-http-json-thermometer) [![GitHub last commit](https://img.shields.io/github/last-commit/Jakubkuba9000/homebridge-http-json-thermometer.svg)](https://github.com/Jakubkuba9000/homebridge-http-json-thermometer) [![Donate](https://img.shields.io/badge/donate-PayPal-blue.svg)](https://paypal.me/Jakubkuba9000)

</span>

## Description

This [Homebridge](https://github.com/homebridge/homebridge) plugin allows you to integrate web-based thermometers into Apple's HomeKit. By making straightforward HTTP requests, the plugin continuously retrieves temperature data from your thermometer.

## Compatibility

Probably any web-based thermometer that supports displaying values in JSON over HTTP. <br/>
Personally tested on thermometers from the manufacturer [Brrr.cz](https://brrr.cz). <br/>
[![brrr](https://github.com/Jakubkuba9000/homebridge-http-json-thermometer/blob/main/images/brrr.png)](https://brrr.cz)


## Installation

1. Install [Homebridge](https://github.com/homebridge/homebridge#installation).
2. Install this plugin: `npm install -g homebridge-http-json-thermometer` or through Homebridge UI by clicking the <kbd>INSTALL</kbd> buttton.
3. Update your `config.json` file by clicking the <kbd>SETTINGS</kbd> button through Homebridge UI or manually. See the explanations and samples below.


## Configuration

### Configuration example
```json
{
	"platform": "HttpJsonThermometer",
	"thermometers": [
		{
			"thermometerName": "Terrarium thermometer",
			"httpRoute": "http://ipaddress/status/",
			"updateInterval": 60,
			"jsonName": "temp",
			"calibration": 0.16,
			"manufacturer": "Default-Manufacturer",
			"model": "Default-Model",
			"serial": "Default-Serial"
		}
	]
}
```

### Core
| Key | Description | Default |
| --- | --- | --- |
| `platform` | Must be `HttpJsonThermometer` | `HttpJsonThermometer` |
| `thermometerName` | This will be the name of your thermometer that appears in the Home app. This must be unique. | `Terrarium thermometer` |
| `httpRoute` | This must be a path to a JSON format that looks like this, for example:<br />{<br /> &emsp;&quot;temp&quot;: &quot;24.88&quot;,<br />&emsp;&quot;temp2&quot;: &quot;24.06&quot;,<br />&emsp;&quot;temp3&quot;: &quot;23.75&quot;<br />} | `http://ipaddress/status/` |
| `updateInterval` | Interval after which the values are updated. | `60` |
| `jsonName` | This must be the name of the thermometer in JSON format.<br />In the case above it could be <strong>temp</strong> or <strong>temp2</strong> or <strong>temp3</strong>. | `temp` |

### Additional options
| Key | Description | Default |
| --- | --- | --- |
| `calibration` | Only if you need to calibrate your thermometer. It will increase or decrease the value. For example if you need to decrease by 0,05 then `-0,05` and if you need to increase by 0.6 then `0.60` |`0.00`|
| `manufacturer` | Manufacturer of your thermometer. | `Default-Manufacturer` |
| `model` | Thermometer model. | `Default-Model` |
| `serial` | Serial number of your thermometer. | `Default-Serial` |

### More thermometers
You can also have more than one thermometer. Simply click the button <kbd>ADD TO THERMOMETERS</kbd> in UI or add it manually like this:
```json
{
	"platform": "HttpJsonThermometer",
	"thermometers": [
		{
			"thermometerName": "Terrarium thermometer",
			"httpRoute": "http://ipaddress/status/",
			"updateInterval": 60,
			"jsonName": "temp",
			"calibration": 0.16,
			"manufacturer": "Default-Manufacturer",
			"model": "Default-Model",
			"serial": "Default-Serial"
		},
		{
			"thermometerName": "Kitchen thermometer",
			"httpRoute": "http://yourdomain.com/temp/",
			"updateInterval": 15,
			"jsonName": "t1",
			"manufacturer": "yourdomain.com",
			"model": "WIFI_USB",
			"serial": "S3r14lNumb3r"
		},
		{
			"thermometerName": "Bathroom thermometer",
			"httpRoute": "http://192.168.1.155/temperature/",
			"updateInterval": 120,
			"jsonName": "temperature"
		}
	]
}
```

## HomeKit limitations

Unfortunately, HomeKit has the limitation that it rounds values to 0.5 °C. This can be solved by downloading the free [Eve](https://apps.apple.com/us/app/eve-for-matter-homekit/id917695792) app or another similar app. These applications usually show a value accurate to one decimal place.


## Credits

- [Brrr.cz](https://brrr.cz)
- [Getting Started with Homebridge Plugin Development](https://youtu.be/cptIm2naxs4?si=99_ukhch63nWhbb5)
- [Homebridge API](https://developers.homebridge.io/#/)
- [homebridge-http-thermometer](https://github.com/phenotypic/homebridge-http-thermometer)
- [homebridge-plugin-template](https://github.com/homebridge/homebridge-plugin-template)
