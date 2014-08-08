var Navigation = function(id){
	var that = this;
	
	this.menuItems;
	this.actualSelectedMenuItem = 'port-folio-button';
	
	//SET LISTENERS FOR EACH MENU ITEM WE HAVE
	this.setListeners = function(){ 
		var menuItems = document.getElementsByClassName('menu-item');
		
		//grab all menu items
		for(var n = 0; n < menuItems.length; ++n)
		{
			var menuItem = menuItems[n];
			
			// add the listener
			menuItem.onclick = function(e){
				
				// page is an attribute of the tag, we can use it foe setting an ajax call for instance
				var page = 'portfolio';
				var id;
				for(var n in e.currentTarget.attributes)
				{
					// html tag attributes
					var attrib = e.currentTarget.attributes[n];
					
					// the id
					if(attrib.name === 'id')
					{
						id = attrib.nodeValue;
					}
					// the special one for ajax tune up
					if(attrib.name === 'page')
					{
						page = attrib.nodeValue;
					}
				}
				
				// remove selected for css purpose
				document.getElementById(that.actualSelectedMenuItem).className = document.getElementById(that.actualSelectedMenuItem).className.replace(/selected/g, '');
				
				// save the id of the clicked item
				that.actualSelectedMenuItem = id;
				
				// add selected to the menu item for css purpose
				document.getElementById(id).className += " selected";
				
				// this is where we can do all kind of ajax magic for the page content
				switch(id)
				{
					case 'home-button':
						// deep linking
						window.location.hash = page;
					break;
					case 'port-folio-button':
						window.location.hash = page;
					break;
					case 'about-button':
						window.location.hash = page;
					break
				}
			}
		}
	}
}

// init
if (document.addEventListener)
{
	document.addEventListener("DOMContentLoaded", function(){
		  
		  var navigation = new Navigation();
		  navigation.setListeners();
		  mySweetAlbum('#gallery1');
	}, false);
};

