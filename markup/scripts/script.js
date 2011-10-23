// Fix for iOS viewport scale bug: https://gist.github.com/901295#file_ios_viewport_scaling_bug_fix.js
(function(doc) {
  var addEvent = 'addEventListener',
      type = 'gesturestart',
      qsa = 'querySelectorAll',
      scales = [1, 1],
      meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];

  function fix() {
    meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
    doc.removeEventListener(type, fix, true);
  }

  if ((meta = meta[meta.length - 1]) && addEvent in doc) {
    fix();
    scales = [.25, 1.6];
    doc[addEvent](type, fix, true);
  }
}(document));


// Scroll to top, hide address bar on mobile devices - 1 for android, 0 for the rest: https://gist.github.com/1183357
(function(win) {
  var doc = win.document;
  
  // If there's a hash, or addEventListener is undefined, stop here
  if (!location.hash && win.addEventListener) {
    
    //scroll to 1
    window.scrollTo(0, 1);
    var scrollTop = 1,
    
    //reset to 0 on bodyready, if needed
    bodycheck = setInterval(function() {
      if (doc.body) {
        clearInterval(bodycheck);
        scrollTop = 'scrollTop' in doc.body ? doc.body.scrollTop : 1;
        win.scrollTo(0, scrollTop === 1 ? 0 : 1);
      } 
    }, 15 );
    
    win.addEventListener('load', function() {
      setTimeout(function() {
        //reset to hide addr bar at onload
        win.scrollTo(0, scrollTop === 1 ? 0 : 1);
      }, 0);
    }, false);
  }
})(this);