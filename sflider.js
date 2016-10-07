/* sflider */

_sfliderState = {
  currentSlideId: 0,
  slideChangeAllowed: true,
  config: null,
  obj: null,
  slidesCount: 0
}

function fixHeight(obj, value){
  $(obj).css("height", value);
  $(obj).css("max-height", value);
}
function mod(n, m) {
  return ((n % m) + m) % m; /* why would JS has modulo working properly with negative numbers? */
}
function setSfliderTimer(){
  clearTimeout(_sfliderState.sliderTimer);
  _sfliderState.sliderTimer = setTimeout( "_moveSflider(+1)", _sfliderState.config.timeout );
}

function _invokeSflider(config, obj, doNotFixHeight=false){
  _sfliderState.config = config;
  _sfliderState.obj    = obj;

  _sfliderState.slidesCount =
    $(_sfliderState.obj).children(".sflider-slides").children(".sflider-slide").length;

  if (doNotFixHeight) return;

  fixHeight(
    $(_sfliderState.obj),
    _sfliderState.config.height
  );
  $(_sfliderState.obj).css(
    "width",
    (_sfliderState.slidesCount*100)+"%"
  );
  $(_sfliderState.obj).children(".sflider-slides").children(".sflider-slide").css(
    "width",
    (100/_sfliderState.slidesCount)+"%"
  );
  fixHeight(
    $(obj).children(".control-key"),
    _sfliderState.config.height
  );
  fixHeight(
    $(obj).children(".sflider-slides").children(".sflider-slide"),
    _sfliderState.config.height
  );

  $(_sfliderState.obj)
    .mouseenter(function() {
      _sfliderState.slideChangeAllowed=false;
    })
    .mouseleave(function() {
      _sfliderState.slideChangeAllowed=true;
  });

  setSfliderTimer();
}

function _moveSflider(offset, force){
  if (_sfliderState.slideChangeAllowed || force){
    _sfliderState.currentSlideId =
      mod(_sfliderState.currentSlideId+offset, _sfliderState.slidesCount);

    $(_sfliderState.obj).children(".sflider-slides")
      .animate({left: "-"+(_sfliderState.currentSlideId*(100/_sfliderState.slidesCount))+"%"});
  }

  setSfliderTimer();
}
