function documentReady() {
  let MAX_SNOW = 100;
  let MAX_SNOW_SIZE = 10;
  let MAX_SNOW_SPEED = 1;

  snowStart();

  function snowStart() {
    // console.log("// Snow animation start");
    createSnows();
  }

  function createSnows() {

    let container = $("#snow-animation-container");

    for (let i = 0; i < MAX_SNOW; i++) {
      let appendItem = getRandomItem(i);
              container.append(appendItem);
      let animateItem = $(".snow" + String(i));
      let randomTime = Math.random() * MAX_SNOW_SPEED;
      goAnimate(animateItem, i, randomTime);
      goAnimate2(animateItem);
    };

    // console.log("// Create snows");
  }

  function goAnimate(item, id, randomTime) {
    TweenMax.to(item, randomTime, {
      css: {
        marginTop: "+=100"
      },
      ease: Linear.easeNone,
      onComplete: function() {
        let topPosition = item.css("margin-top").replace("px", "");
        if (topPosition > $(window).height()) {
          changePosition(item);
          randomTime = Math.random() * MAX_SNOW_SPEED;
          goAnimate(item, id, randomTime);
        } else {
          goAnimate(item, id, randomTime);
        }

      }
    });
  }

  function goAnimate2(item) {

    let directionTime = 1 + Math.floor(Math.random() * 5);
    let randomDirection = 1 + Math.floor(Math.random() * 4);
    let delayTime = 1 + Math.floor(Math.random() * 3);

    if (randomDirection == 1) {

      TweenMax.to(item, directionTime, {
        css: {
          marginLeft: "+=100"
        },
        ease: Linear.easeOut,
        onComplete: function() {

          TweenMax.to(item, directionTime, {
            css: {
              marginLeft: "-=100"
            },
            delay: delayTime,
            ease: Linear.easeOut,
            onComplete: function() {
              goAnimate2(item);
            }
          });
        }
      });
    } else if (randomDirection == 2) {

      TweenMax.to(item, directionTime, {
        css: {
          marginLeft: "-=100"
        },
        ease: Linear.easeOut,
        onComplete: function() {
          TweenMax.to(item, directionTime, {
            css: {
              marginLeft: "+=100"
            },
            delay: delayTime,
            ease: Linear.easeOut,
            onComplete: function() {

              goAnimate2(item);

            }
          });
        }
      });
    } else if (randomDirection == 3) {

      TweenMax.to(item, directionTime, {
        css: {
          marginLeft: "+=100"
        },
        ease: Linear.easeOut,
        onComplete: function() {
          goAnimate2(item);
        }
      });
    } else if (randomDirection == 4) {

      TweenMax.to(item, directionTime, {
        css: {
          marginLeft: "-=100"
        },
        ease: Linear.easeOut,
        onComplete: function() {
          goAnimate2(item);
        }
      });
    }
  }

  function changePosition(item) {
    let _width = Math.floor(Math.random() * MAX_SNOW_SIZE);
    let _height = _width;
    let _blur = Math.floor(Math.random() * 5 + 2);
    let _left = Math.floor(Math.random() * ($(window).width() - _width));
    let _top = -$(window).height() + Math.floor(Math.random() * ($(window).height() - _height));

    item.css("width", _width);
    item.css("height", _height);
    item.css("margin-left", _left);
    item.css("margin-top", _top);
  }

  function getRandomItem(id) {
    let _width = Math.floor(Math.random() * MAX_SNOW_SIZE);
    let _height = _width;
    let _blur = 1;
    let _left = Math.floor(Math.random() * ($(window).width() - _width));
    let _top = -$(window).height() + Math.floor(Math.random() * ($(window).height() - _height));
    let _id = id;

    return getSmallSnow(_width, _height, _blur, _left, _top, _id);
  }

  function getSmallSnow(width, height, blur, left, top, id) {
    let item = "<div class='snow" + id + "' style='position:absolute; margin-left: " + left + "px; margin-top: " + top + "px; width: " + width + "px; height: " + height + "px; border-radius: 50%; background: #fff; z-index:999; blur: 0.5'>"
    return item;
  }

}

export { documentReady }