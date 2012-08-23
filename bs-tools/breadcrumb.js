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
var Breadcrumb = {
  selector: null,
  init: function(sel){
    this.selector = sel;
    return this;
  },
  clear: function(remove_root){
    if(remove_root){
      this.selector.html('');
    } else {
      this.selector.find('li:not(:first-child)').remove();
    }
    return this;
  },
  set: function(list,remove_root){
    this.clear(remove_root);
    $.each(list, function(k,v){
      Breadcrumb.push(k,v);
    });
    return this;
  },
  /* get the last link in the bread crumb */
  last: function(){
    return this.selector.find('a:last').attr('href');
  },
  push: function(name,link){
    var crumb = $('<li>');
    crumb.append(
      $('<span>').addClass('divider').append(
        $('<i>').addClass('icon-chevron-right')
      )
    );

    if( link ){
      crumb.append( 
        $('<a>').html(name).attr('href',link) 
      ).append(
        $('<span>').html(name).hide()
      );
    } else {
      crumb.append(
        $('<span>').html(name)
      );
    }

    this.selector.append( crumb );

    this.selector.find('li:not(:last-child) a').show();
    this.selector.find('li:not(:last-child) span:not(.divider)').hide();

    this.selector.find('li:last-child a').hide();
    this.selector.find('li:last-child span:not(.divider)').show();    
    return this;
  },
  pop: function(){
    this.selector.find('li:last').remove();
    return this;
  }
};