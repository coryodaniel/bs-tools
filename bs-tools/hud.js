/*
bs-tools v 0.0.1
http://github.com/coryodaniel/bs-tools
 
Copyright (c) 2012 Cory ODaniel (bs@coryodaniel.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
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