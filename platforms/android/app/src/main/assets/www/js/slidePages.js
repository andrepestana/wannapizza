document.addEventListener("DOMContentLoaded", function() {
  var lastElementClicked;

  Barba.Pjax.init();
  Barba.Prefetch.init();
  var goingForward = true;

  Barba.Dispatcher.on('linkClicked', function(el) {
    lastElementClicked = el;
    el.dataset.direction == 'right' ? goingForward = true : goingForward = false;

    //Keep menu link bold if it was clicked
    $("a[data-menu-name]").parent('li').removeClass('active');
    $("a[data-menu-name='"+el.dataset.menuName+"']").parent('li').addClass('active');
  });

  var MovePage = Barba.BaseTransition.extend({
    start: function() {
      this.originalThumb = lastElementClicked;

      Promise
        .all([this.newContainerLoading, this.scrollTop()])
        .then(this.movePages.bind(this));
    },

    scrollTop: function() {
      var deferred = Barba.Utils.deferred();
      var obj = { y: window.pageYOffset };

      TweenLite.to(obj, 0.4, {
        y: 0,
        onUpdate: function() {
          if (obj.y === 0) {
            deferred.resolve();
          }

          window.scroll(0, obj.y);
        },
        onComplete: function() {
          deferred.resolve();
        }
      });

      return deferred.promise;
    },

    movePages: function() {
      var _this = this;

      TweenLite.set(this.newContainer, {
        visibility: 'visible',
        xPercent: goingForward ? 100 : -100,
        position: 'fixed',
        left: 0,
        top: 0,
        right: 0
      });

      TweenLite.to(this.oldContainer, 0.6, { xPercent: goingForward ? -100 : 100 });
      TweenLite.to(this.newContainer, 0.6, { xPercent: 0, onComplete: function() {
        TweenLite.set(_this.newContainer, { clearProps: 'all' });
        _this.done();
      }});
    }
  });

  Barba.Pjax.getTransition = function() {
    return MovePage;
  };

  Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container) {
    populatePizzasDropdown();
    addEventListenerToButtons();

    if($('#news').length) {

      // Note: some RSS feeds can't be loaded in the browser due to CORS security.
      // To get around this, you can use a proxy.
      const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

      let parser = new RSSParser();
      parser.parseURL(CORS_PROXY + 'https://www.cbc.ca/cmlink/rss-topstories', function(err, feed) {
        console.log(feed.title);
        var newsContent = "";
        feed.items.forEach(function(entry) {
          newsContent = newsContent + '<h3>' + entry.title + '</h3><div>' + entry.content + '</div><hr/>';
        })
        $('#news').html(newsContent);
      })

    }
  });
  var links = document.querySelectorAll('a[href]');
  var cbk = function(e) {
   if(e.currentTarget.href === window.location.href) {
     e.preventDefault();
     e.stopPropagation();
   }
  };

  for(var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', cbk);
  }
});
