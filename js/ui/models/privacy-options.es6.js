const Parent = window.DDG.base.Model;

function PrivacyOptions (attrs) {
    Parent.call(this, attrs);
};


PrivacyOptions.prototype = $.extend({},
  Parent.prototype,
  {
      update: function(settings) {
          this.trackerBlockingEnabled = settings['trackerBlockingEnabled'];
          this.httpsEverywhereEnabled =settings['httpsEverywhereEnabled'];
          this.embeddedTweetsEnabled = settings['embeddedTweetsEnabled'];
      },

      modelName: 'privacyOptions',

      toggle: function (k) {
          if (this.hasOwnProperty(k)) {
              this[k] = !this[k];
              console.log(`PrivacyOptions model toggle ${k} is now ${this[k]}`);
              chrome.runtime.sendMessage({updateSetting: {name: k, value: this[k]}});
          }
      }

  }
);


module.exports = PrivacyOptions;

