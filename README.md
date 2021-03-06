# BS Tools - BS for Bootstrap


# The tools included are:
1. HUD    - for easily creating a queue of alerts that will auto-dismiss when the queue is full
2. Modal  - a singleton-esque modal tool
3. Breadcrumb - Popping and pushing breadcrumbs

Check out the sweet JS Fiddle demoing this instead of reading. READING SUCKS.

[BS JS Fiddle](http://jsfiddle.net/coryodaniel/DMnfB/)

# Using HUD

```html
<div id="hud"></div>
```

Initialize the HUD object

```javascript
$(function(){
  // Give it a jQuery selector and queue size
  HUD.init('#hud', 3);
...
```

Create some alerts

```javascript
  HUD.success("Great Job!");
  HUD.error("Uh oh", "Stuff went crazy.");
  HUD.warning("Meh.", "Its all right we suppose", true);
  HUD.info("Great Socks.")
});
```

Other things you can do with it

```javascript
  HUD.dismiss(); //dismiss the oldest alert
  HUD.clear(); //dismisses all alerts
  HUD.success("Chain").error("That").warning("Ass"); //In case you want to

```

# Using Breadcrumb

Breadcrumb gives you an interface to push and pop breadcrumbs. Pass one argument for the
final crumb (span) pass two arguments for a COOL link.

```hrml
<ul id="breadcrumbs" class="breadcrumb"></ul>
```

```javascript
$(function(){
  //Init that bad boy & push some crumbs
  Breadcrumb.init('#breadcrumb').
    push("Home", "http://example.com").
    push("SockFarm", "http://example.com/socks");

  //Push a span onto the end
  Breadcrumb.push("Destination");

  //Pop dat
  Breadcrumb.pop();

  //Clear them all except the root
  Breadcrumb.clear();

  //Clear the root too
  Breadcrumb.clear(true);

  //Set a bunch
  Breadcrumb.set({
    "USA": 'http://cool.com',
    "CA": 'http://cooler.com',
    "Los Angeles": 'http://coolest.com',
    "My House" : null
  });

  Breadcrumb.last() // => Retreives the last href
});
```

# Using Modal
There are two additional CSS classes added to modals with this tool.
* modal-loading added to modal-body. Set up your loading modal
* modal-form added to modal wrapper. Changes the css so bootstrap forms fit inside well.

```javascript
Modal.init(true); //skip the footer, optional
Modal.loading(); 
Modal.setBody("NICE BODY");
Modal.setBody("NICE BODY", true); // ads

```
