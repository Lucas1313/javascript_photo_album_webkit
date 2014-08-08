var SweetAlbum = function(id)
{
	
	var that = this; //"top" the scope for this object
	
	that.album = document.querySelector(id);
	
	that.currentIcon = this.album.querySelector('#icon_0'); // the icon that is actually selected
	that.currentIconNumeral = 0; // numeric version
	
	that.arrow_left = that.album.querySelector('#gallery-arrow-left');
	that.arrow_right = that.album.querySelector('#gallery-arrow-right');
	
	that.image1 = that.album.querySelector('#gallery-image1');
	that.image2 = that.album.querySelector('#gallery-image2');
	
	that.caption = that.album.querySelector('#gallery-caption');
	that.caption_bkg = that.album.querySelector('#gallery-caption-bkg');
	that.caption_title = that.album.querySelector('#caption-title');
	that.caption_time = that.album.querySelector('#caption-time');
	that.caption_text = that.album.querySelector('#caption-text');
	
	
	
	that.photosTotal; //quantity of photo in the photo album
	that.overCaption = false; //test for roll over the caption
	that.imageOverTimer = 0; // the timer for roll out the image little delay 
	that.currentImage = 'gallery-image'; // the img tag showing the actual photo
	
	// INSERT THE TITLE TO THE TITLE DIV
	that.createTitle = function(){
		console.info('title ' + gallery.gallery.name);
		that.album.querySelector('#gallery-title').innerHTML = gallery.gallery.name;
	};
	
	// EXTRACT THE DATA FROM THE "galleryData.js" AND CREATES THE THUMBS
	// note: We set the photo and caption information in the thumbs, so all we have to do to display it is to 
	// fire a "onclick" event on the thumb to change photo and caption.
	
	that.createThumbs = function(){
		var thumbs = '';
		
		// iterate trough the data 
		for(var n in gallery.gallery.photos)
		{
			var photoData = gallery.gallery.photos[n];
			
			//thumb view
			thumbs  += '<img id="icon_'+n+'" class="thumb" src="' + photoData.thumb_url + '" photo="' + photoData.url + '" caption_title="' + photoData.title + '" caption_date="' + photoData.date + '" caption_location="' + photoData.location +'"></img>';
		}
		
		// set the thumbs
		that.album.querySelector('#gallery-thumbs').innerHTML = thumbs;
	};
	
	// ADD THE LISTENERS TO THE THUMBS
	that.addEventListeners = function(){
		
		//grab all the thumbs
		that.photosTotal = that.album.querySelectorAll('.thumb').length;
		
		// iterate trough all thumbs
		for (n = 0; n < that.photosTotal; ++n){

			var thumb = that.album.querySelectorAll('.thumb')[n];
			
			// add the listener
			thumb.onclick = function(e){
				
				// iterate trough all the thumb attribute to extract the photo/caption information from the html tag
				for(var n in e.currentTarget.attributes)
				{
					// html tag
					var attrib = e.currentTarget.attributes[n];
					
					if(attrib.name === 'id')
					{
						// reset the opacity of the old selected thumb, if any, by reseting the class name
						that.currentIcon.className = that.currentIcon.className.replace('thumb-selected','thumb');
						
						// save the new thumb id
						that.currentIcon = that.album.querySelector('#'+attrib.nodeValue);
						
						// set the opacity by changing the class name
						that.currentIcon.className = 'thumb-selected';
						
						// save the numeral part of the name
						that.currentIconNumeral = attrib.nodeValue.split('_')[1];
						
						// Now the arrows, if it's the first photo, we change the arrow class
						
						if(that.currentIcon.id == 'icon_0')
						{
							that.arrow_left.className += ' gallery-arrow-dead';
							
							//reset if needed the right arrow
							that.arrow_right.className = that.arrow_right.className.replace(' gallery-arrow-dead','');
						}
						else // it's not the first photo
						{
							// reset the left arrow
							that.arrow_left.className = that.arrow_left.className.replace(' gallery-arrow-dead','');
							
							// test if we are at the end of the photo stack
							if(that.photosTotal-1 == that.currentIconNumeral)
							{
								// kill the arrow
								that.arrow_right.className += ' gallery-arrow-dead';
							}
							else
							{
								// reset the arrow opacity if needed
								that.arrow_right.className = that.arrow_right.className.replace(' gallery-arrow-dead','');
							}
						}
						
					}
					
					// switch the photo
					if(attrib.name === 'photo')
					{
						console.info(that.currentImage);
						// test what img tag is used in "top" we use 2 image tags in top of each other for the fadein/out effect (css3 transition)
						if(that.currentImage == that.image1)
						{
							// set the underlying (opacity=0) img src with the new image
							that.image2.src = attrib.nodeValue;
							
							// trigger the fade in (opacity=1)
							that.image2.className = that.image2.className.replace(/hidden/g,'');
							
							// fade out the "top" image
							that.image1.className += ' hidden';
							
							// save the info about the current used img
							that.currentImage = that.image2;
						}
						else // div2 is in top
						{
							//set image
							that.image1.src = attrib.nodeValue;
							
							//trigger fade in
							that.image1.className = that.image1.className.replace(/hidden/g,'');
							
							//trigger fade out
							that.currentImage.className += ' hidden';
							
							// save the info about the current used img
							that.currentImage = that.image1;
						}
					}
					
					// set the caption and its background
					if(attrib.name === 'caption_title')
					{
						that.caption_title.innerHTML = attrib.nodeValue+', ';
					}
					if(attrib.name === 'caption_date')
					{
						that.caption_time.innerHTML = attrib.nodeValue+', ';
					}
					if(attrib.name === 'caption_location')
					{
						that.caption_text.innerHTML = attrib.nodeValue;
					}
				}
			}
		}
		// THE LEFT ARROW LISTENER
		that.arrow_left.onclick = function(){
			
			// test if we are at the beginning if we are the arrow will not trigger anything
			if(that.currentIconNumeral > 0) // not the beginning
			{
				// go up the stack of photo
				--that.currentIconNumeral;
				
				// reset the thumb class to set the opacity to 1
				that.currentIcon.className = 'thumb';
				
				// save the current thumb id
				that.currentIcon = that.album.querySelector('#icon_'+that.currentIconNumeral);
				
				// set the event parameters (currentTarget) for the event handler 
				var e = {currentTarget : that.currentIcon};
				
				// fire event
				that.currentIcon.onclick(e);
				
			}
		}
		
		// THE LEFT ARROW LISTENER
		that.arrow_right.onclick = function(){

			// test if we are at the end if we are the arrow will not trigger anything
			if(that.currentIconNumeral < that.photosTotal-1)
			{
				// go down the photo stack
				++that.currentIconNumeral;
				
				//reset the thumb opacity
				that.currentIcon.className = 'thumb';
				
				//save the new thumb id
				that.currentIcon = that.album.querySelector('#icon_'+that.currentIconNumeral);

				//prepare the event, set the event params currentTarget 
				var e = {currentTarget : that.currentIcon};
				
				//fire the onclick event
				that.currentIcon.onclick(e);
				
			}
		}
		
		// SET LISTENERS FOR THE IMAGES
		function setListenerForImage(imageToSet){
			
			// THE MAIN IMAGE SHOWS THE CAPTION ON ROLLOVER
			imageToSet.onmouseover = function(){
				
				console.info("MOUSE ENTER IMAGE")
				// clear the interval if it's there
				clearInterval(that.imageOverTimer);
				
				// trigger fade in for the caption + its bkg 
				that.caption_bkg.className = that.caption_bkg.className.replace(/hidden/g,'');
				that.caption.className = that.caption.className.replace('hidden','');
			}
			
			// MOUSE OUT OF THE IMAGE HIDES THE CAPTION
			imageToSet.onmouseout = function(){		
				
				// hack to avoid hiding the caption if the user rolls over it
				that.imageOverTimer = setInterval( function(){
					
					// test if we are over the caption
					if(!that.overCaption)
					{
						// we are not, hide the caption
						that.caption_bkg.className += 'hidden';
						that.caption.className += 'hidden';
						
						clearInterval(that.imageOverTimer);
					}
				}, 500);
				
				return true;
			}
		}
		function setTimer(){
			
		}
		// SET LISTENERS FOR THE IMAGES CALL
		setListenerForImage(that.image1);
		setListenerForImage(that.image2);
		
		// TEST IF WE ARE OVER THE CAPTION
		that.caption_bkg.onmouseover = function(){	
			that.overCaption = true;
		}
		that.caption.onmouseover = function(){
			that.overCaption = true;
			// trigger fade in for the caption + its bkg 
			that.caption_bkg.className = that.caption_bkg.className.replace('hidden','');
			that.caption.className = that.caption.className.replace('hidden','');
		}
		that.caption_bkg.onmouseout = function(){
			that.overCaption = false;
		}
		
		var mouseOverCaption;
		that.caption.onmouseout = function(){
			that.overCaption = false;
					
			if(!that.overCaption && !that.caption_bkg.className.match(/hidden/g))
			{
				// hide the caption
				that.caption_bkg.className += 'hidden';
				that.caption.className += 'hidden';
				that.overCaption = false;
				
			}

		}
		
	}
	
	// SHOW THE FIRST IMAGE
	this.initImage = function(){
		var e = {};
		that.currentIcon = that.album.querySelector('#icon_0');
		e.currentTarget = that.currentIcon;
		that.currentIcon.onclick(e);
	}
}

// INITIALISATION OF THE GALLERY
var mySweetAlbum = function(gallery_id){
	sweetAlbum = new SweetAlbum(gallery_id);
	sweetAlbum.createTitle();
	sweetAlbum.createThumbs();
	sweetAlbum.addEventListeners();
	sweetAlbum.initImage();
};
