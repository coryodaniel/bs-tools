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
var Modal = (function(){
  var reflection; /* tracks if this has been initialized, also gives access to 'this' to privates */
  var ele, id, isLoading;
  id = 'modal';

  function body(){
    if( ele ){
      return ele.find('.modal-body');
    }
  }
  function footer(){
    if( ele ){
      return ele.find('.modal-footer');
    }
  }
  function header(){
    if( ele ){
      return ele.find('.modal-header');
    }
  }

  function destroy(){
    $('.modal-backdrop').remove();
    if( ele ){ ele.remove(); }
    reflection = null;
    ele = null;
  }

  return{
    /**
     * Gets the jQuery modal element, used this for debugging.
     *
     * Examples:
     *
     *     Modal.element();
     *
     * @return {Object} jQuery Element
     * @api private
     */     
    element: function(){
      return ele;
    },
    /**
     * Is the modal visible
     *
     * Examples:
     *
     *     Modal.visible();
     *
     * @return {Boolen} is it visible
     * @api public
     */   
    visible: function(){
      return !ele.is(":hidden");
    },
    /**
     * Is the modal hidden
     *
     * Examples:
     *
     *     Modal.hidden();
     *
     * @return {Boolen} is it hidden
     * @api public
     */   
    hidden: function(){
      return !this.visible();
    },

    /**
     * Sets the modal `body`
     *
     * Examples:
     *
     *     Modal.setBody( $('<span>').text("COOL CATS, MAN") );
     *     Modal.setBody( $('<span>').text("COOL CATS, MAN"), true );
     *
     * @param {String} Body HTML
     * @param {String} CSS class to apply to .modal-body, useful for handling forms in modals
     * @return {Modal} Chainable response
     * @api public
     */       
     setBody: function(html, withForm){
      isLoading = false;
      if(withForm){
        if( footer() ){ footer().remove() };
        body().closest('.modal').addClass('modal-form');
      }
      // Set the height to auto to get ride of loading screens CSS...
      
      if( this.visible() ){
        body().slideUp(function(){
          body().css('height', 'auto').html(html).slideDown();
        });
      } else {
        body().css('height', 'auto').html(html);
      }

      return this;      
    },
    /**
     * Sets the modal `header`
     *
     * Examples:
     *
     *     Modal.setHeader( "My Header" );
     *     Modal.setHeader( "My Header", "Small Text" );
     *
     * @param {String} `h3` HTML
     * @param {String} `small` HTML
     * @return {Modal} Chainable response
     * @api public
     */    
    setTitle: function(text,small){    
      header().find('h3').html(text);

      if(small){
        header().find('h3').append( $('<small>').html(small) );
      }

      return this;
    },
    /**
     * Sets the modal `footer`
     *
     * Examples:
     *
     *     Modal.setFooter( $('<span>').text("COOL CATS, MAN") );
     *
     * @param {String} Footer HTML
     * @return {Modal} Chainable response
     * @api public
     */    
    setFooter: function(html){
      footer().html(html);
      return this;
    },
    /**
     * Clears all sections of Modal
     *
     * Examples:
     *
     *     Modal.clear()
     *
     * @return {Modal} Chainable response
     * @api public
     */    
    clear: function(){
      footer().empty();
      header().empty();
      body().empty();

      return this;
    },
    /**
     * Sets loading mode with optional `text`.
     *
     * Examples:
     *
     *     Modal.loading();
     *     Modal.loading('Cats');
     *
     * Options:
     * 
     *   - `text` defaulting to _undefined_
     *
     * @param {String} string for loading title
     * @return {Modal} Chainable response
     * @api public
     */
    loading: function(text){
      if( text ){
        this.setTitle(text,"Loading");
      } else {
        this.setTitle("Loading");
      }

      isLoading = true;
      body().empty().css('height', '200px').spin("large", "#ccc");
      this.display();
      return this;
    },
    /**
     * Displays the modal
     *
     * Examples:
     *
     *     Modal.display()
     *
     * @return {Modal} Chainable response
     * @api public
     */  
    display: function(){
      ele.modal('show');
      return this;
    },
    /**
     * Toggles the modal
     *
     * Examples:
     *
     *     Modal.toggle()
     *
     * @return {Modal} Chainable response
     * @api public
     */      
    toggle: function(){
      ele.modal('toggle');
      return this;
    },
    /**
     * Hides the modal
     *
     * Examples:
     *
     *     Modal.hide()
     *
     * @return {Modal} Chainable response
     * @api public
     */          
    hide: function(){
      ele.modal('hide');
      return this;
    },
    /**
     * Attach an event handler to `shown`
     *
     * Examples:
     *
     *     Modal.onShown(callback,true)
     *     Modal.onShown(callback,false)
     *
     * @param {Function} callback to fire after `shown`
     * @param {Boolean} attach callback once
     * @return {Modal} Chainable response
     * @api public
     */      
    onShown:function(fn,once){
      if( once ){
        ele.one('shown', fn);
      } else {
        ele.on('shown', fn);
      }
      return this;
    },
    /**
     * Attach an event handler to `hidden`
     *
     * Examples:
     *
     *     Modal.onHidden(callback,true)
     *     Modal.onHidden(callback,false)
     *
     * @param {Function} callback to fire after `hidden`
     * @param {Boolean} attach callback once
     * @return {Modal} Chainable response
     * @api public
     */          
    onHidden: function(fn, once){
      if( once ){
        ele.one('hidden', fn);
      } else {
        ele.on('hidden', fn);
      }
      return this;
    },
    /**
     * Violently destroys the modal and calls `init`
     *
     * Examples:
     *
     *     Modal.reset()
     *     
     * @return {Modal} Chainable response
     * @api public
     */     
    reset: function(noFooter){
      if( reflection ){ destroy(); }
      return this.init(noFooter);
    },
    /**
     * Initializes the Modal
     *
     * Examples:
     *
     *     Modal.init(true)
     *     Modal.init(false)
     *     
     * @param {Boolean} disable default footer
     * @return {Modal} Chainable response
     * @api public
     */         
    init : function(noFooter){
      if( reflection ){ return this; }
      reflection = this;
      $('body').append(
        Handlebars.templates['views/modal']({
          id:     id,
          title:  "hi",
          small:  "small",
          body:   "body"
        })
      );

      ele = $('#' + id);
      if( noFooter ){ footer().empty(); }

      return this;
    }
  };
})();