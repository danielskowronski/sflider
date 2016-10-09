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
function modRange(x, min, max){
  var r = mod(x, max);
  if (r==0) r=1;
  return r;
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

  //dup overlap slide
  var first = $($(_sfliderState.obj).children(".sflider-slides").children()[0]).clone()
  $(first).prop("id","dupFirst").appendTo($(_sfliderState.obj).children(".sflider-slides"))
  _sfliderState.slidesCount++;
  var preLast = $($(_sfliderState.obj).children(".sflider-slides").children()[$($(_sfliderState.obj).children(".sflider-slides").children()).length-2]).clone()
  $(preLast).prop("id","dupPreLast").prependTo($(_sfliderState.obj).children(".sflider-slides"))
  _sfliderState.slidesCount++;

  if (!doNotFixHeight) fixHeight(
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
  if (!doNotFixHeight) fixHeight(
    $(obj).children(".control-key"),
    _sfliderState.config.height
  );
  if (!doNotFixHeight) fixHeight(
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

  //dup overlap slid - preLast
  _sfliderState.currentSlideId=1;
  $(_sfliderState.obj).children(".sflider-slides").css("left", currPercOffset());

  setSfliderTimer();
}
function currPercOffset(){
  return "-"+(_sfliderState.currentSlideId*(100/_sfliderState.slidesCount))+"%"
}
function _moveSflider(offset, force){

  if (_sfliderState.slideChangeAllowed || force){

    _sfliderState.currentSlideId =
      modRange(_sfliderState.currentSlideId+offset, 1, _sfliderState.slidesCount);

      if (offset<0) console.log(_sfliderState.currentSlideId)
    $(_sfliderState.obj).children(".sflider-slides")
      .animate(
        {left: currPercOffset()},
        500,
        function(){
          //dup overlap slide ->
          if (offset>0 && _sfliderState.currentSlideId == _sfliderState.slidesCount-2) {
            _sfliderState.currentSlideId = 0;
            $(_sfliderState.obj).children(".sflider-slides").css("left", currPercOffset());
          }
          //dup overlap slide <-
          if (offset<0 && _sfliderState.currentSlideId == 1) {
            _sfliderState.currentSlideId = _sfliderState.slidesCount-1;
            $(_sfliderState.obj).children(".sflider-slides").css("left", currPercOffset());
          }
        }
      );



  }


  setSfliderTimer();
}
