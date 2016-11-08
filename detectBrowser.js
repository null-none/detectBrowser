detectBrowser = {
    dataBrowser: [{
        string: navigator.userAgent,
        subString: "Chrome",
        identity: "Chrome"
    }, {
        string: navigator.userAgent,
        subString: "OmniWeb",
        versionSearch: "OmniWeb/",
        identity: "OmniWeb"
    }, {
        string: navigator.vendor,
        subString: "Apple",
        identity: "Safari",
        versionSearch: "Version"
    }, {
        prop: window.opera,
        identity: "Opera",
        versionSearch: "Version"
    }, {
        string: navigator.vendor,
        subString: "iCab",
        identity: "iCab"
    }, {
        string: navigator.vendor,
        subString: "KDE",
        identity: "Konqueror"
    }, {
        string: navigator.userAgent,
        subString: "Firefox",
        identity: "Firefox"
    }, {
        string: navigator.vendor,
        subString: "Camino",
        identity: "Camino"
    }, {
        string: navigator.userAgent,
        subString: "Netscape",
        identity: "Netscape"
    }, {
        string: navigator.userAgent,
        subString: "MSIE",
        identity: "Explorer",
        versionSearch: "MSIE"
    }, {
        string: navigator.userAgent,
        subString: "Gecko",
        identity: "Mozilla",
        versionSearch: "rv"
    }, {
        string: navigator.userAgent,
        subString: "Mozilla",
        identity: "Netscape",
        versionSearch: "Mozilla"
    }],
    dataOS: [{
        string: navigator.platform,
        subString: "Win",
        identity: "Windows"
    }, {
        string: navigator.platform,
        subString: "Mac",
        identity: "Mac"
    }, {
        string: navigator.userAgent,
        subString: "iPhone",
        identity: "iPhone/iPod"
    }, {
        string: navigator.platform,
        subString: "Linux",
        identity: "Linux"
    }, {
        string: navigator.userAgent,
        subString: ".NET",
        identity: "Explorer",
        versionSearch: "rv"
    }],
    searchString: function(data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1)
                    return data[i].identity;
            } else if (dataProp)
                return data[i].identity;
        }
    },
    searchVersion: function(dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    },
    browser: function() {
        return this.searchString(this.dataBrowser) || "";
    },
    version: function() {
        return this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion);
    },
    OS: function() {
        return this.searchString(this.dataOS) || "";
    },
    navigator: function() {
        var list = ['appCodeName', 'appName', 'appVersion', 'cookieEnabled', 'hardwareConcurrency', 'language', 'maxTouchPoints', 'onLine', 'platform', 'product', 'productSub', 'userAgent', 'vendor']
        var result = []
        list.forEach(function(item, i, arr) {
            result.push({
                name: item,
                value: navigator[item]
            })
        });
        return result;
    },
    screen: function() {
      var list = ['availHeight', 'availLeft', 'availTop', 'availWidth', 'colorDepth', 'height', 'pixelDepth', 'width']
      var result = []
      list.forEach(function(item, i, arr) {
          result.push({
              name: item,
              value: screen[item]
          })
      });
      return result;
    },
    history: function() {
      return history.length;
    },
    location: function() {
      var list = ['hash', 'host', 'hostname', 'href', 'origin', 'port', 'protocol', 'search']
      var result = []
      list.forEach(function(item, i, arr) {
          result.push({
              name: item,
              value: location[item]
          })
      });
      return result;
    },
    render: function() {
        return {
            'OS': this.OS(),
            'version': this.version(),
            'browser': this.browser(),
            'navigator': this.navigator(),
            'screen': this.screen(),
            'count URLs history': this.history(),
            'location': this.location()
        }
    }
}

detectBrowser.render();
