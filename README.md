# BS Tools - BS for Bootstrap


# The tools included are:
1. HUD    - for easily creating a queue of alerts that will auto-dismiss when the queue is full
2. Modal  - a singleton-esque modal tool
3. Breadcrumb - Popping and pushing breadcrumbs



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

```hrml
<div id="breadcrumbs"></div>
```

```javascript
```

clear 
set
last
push
pop