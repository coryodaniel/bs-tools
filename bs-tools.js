var HUD = (function(){
  var queueSize   = 3;
  var selector    = '#headsup';
  var element, reflection;
  return {
    count: function(){
      return element.find('.alert:visible').length;
    },
    init: function(sel,count){
      if(sel){  selector  = sel;}
      if(count){queueSize = count;}

      reflection = this;
      element = $(selector);
      return this;
    },
    clear: function(){
      element.empty();
      return this;
    },
    dismiss: function(){
      element.find('.alert:first-child').slideUp(function(){
        $(this).remove();
      });
      return this;
    },
    alert: function(content,heading,block,alertType){
      var msg = $("<div>").addClass('alert');
      
      if( block ){ msg.addClass('alert-block'); }
    
      if( alertType ){ msg.addClass("alert-" + alertType); }
      
      if( heading ){
        msg.append(
          $("<h4>").addClass("alert-heading").html(heading)
        );
      } 
      
      msg.append( content ).prepend(
        $('<a>').addClass('close').data('dismiss','alert').text('×')
      ).hide();

      element.append(msg);
      msg.fadeIn(function(){
        if( reflection.count() > queueSize){ reflection.dismiss(); }
      });
      
      return this;
    },
    warning:  function(content,heading,block){
      return this.alert(content,heading,block,'warning');
    },
    error:    function(content,heading,block){
      return this.alert(content,heading,block,'error');
    },
    success:  function(content,heading,block){
      return this.alert(content,heading,block,'success');
    },
    info:     function(content,heading,block){
      return this.alert(content,heading,block,'info');
    }
  };
})();