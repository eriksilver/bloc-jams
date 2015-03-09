 // holds the name of our tab button container for selection later in the function

 var tabsContainer = ".user-profile-tabs-container"

 //We want to be able to click a tab button, remove the :active pseudo-class from the active tab, 
 // and then apply the :active state to the clicked tab. After the click is registered, 
 // we want to select the .tab-pane that holds the active tab's content, then display it.
 var selectTabHandler = function(event) { //this function executes the tab toggle for the profile page
   $tab = $(this);
   $(tabsContainer + " li").removeClass('active');
   $tab.parent().addClass('active');
   selectedTabName = $tab.attr('href');
   console.log(selectedTabName);
   $(".tab-pane").addClass('hidden'); //'hidden' is a Bootstrap class that sets CSS display to none
   $(selectedTabName).removeClass('hidden');
   //this function is called to prevent the default behavior of an event on a certain HTML element
   //In this case, we're preventing the default behavior of an <a> tag with a href attribute defined 
   //-- this is the element that we click to switch tabs
   event.preventDefault(); 
 };
 
 //here we add the click handler to a callback on a jQuery click
 if (document.URL.match(/\/profile.html/)) {
   $(document).ready(function() {
     var $tabs = $(tabsContainer + " a");
     $tabs.click(selectTabHandler);
     $tabs[0].click();
   });
 }
