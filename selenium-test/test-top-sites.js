var chrome = require('selenium-webdriver/chrome'),
    webdriver = require('selenium-webdriver'),
    test = require('selenium-webdriver/testing'),
    assert = require('selenium-webdriver/testing/assert'),
    input = require('selenium-webdriver/lib/input'),
    logger = require('selenium-webdriver/lib/logging'),
    localStorage = require('localStorage');

var EXT_PATH = '../build/chrome-zeroclick-latest.crx',
    BASE_URL = 'chrome-extension://cjkpfdbancffifiponpcgmapihcohejj/html/';

const topSites = require('./topSites.json');
const alexa = require('alexa-top-sites');
var wd = null;

function init() {
        var options = new chrome.Options().addExtensions(EXT_PATH);

        wd = new webdriver.Builder()
                .forBrowser('chrome')
                .setChromeOptions(options)
                .build();
}

function tearDown() {
    wd.quit();
}

init();

topSites.some((url) => {
    runTest("http://" + url);
});

function runTest(url) {
        wd.executeScript("window.location.href='" + url + "'");
}
