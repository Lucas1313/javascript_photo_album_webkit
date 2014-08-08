    describe('photoalbum_test',function(){
	it('currentIcon should default to icon_0', function(){
		console.log('test');
		expect(mySweetGallery.currentIcon).toBe('icon_0');
	});
	it('clicking icon_2 should result into the current icon as icon_1', function () {
		  runs( function () {
			  var e = {};
			    e.currentTarget = document.getElementById('icon_1');
				document.getElementById('icon_1').onclick(e);
				expect(mySweetGallery.currentIcon).toBe('icon_1');
		  });
	});
	it('Click the arrow right will increase the icon value and set it\'s class to dead if it is the last one', function(){
		runs(function(){
			while(!document.getElementById('gallery-arrow-right').className.match(/dead/g))
			{
				
				document.getElementById('gallery-arrow-right').onclick();
				console.log('mySweetGallery.currentIcon '+mySweetGallery.currentIcon);
			}
			expect(mySweetGallery.currentIcon).toBe('icon_4');
		})
		
	})
	it('Click the arrow right will decrease the icon value and set it\'s class to dead if it is the first one', function(){
		runs(function(){
			setInterval(function(){
			while(!document.getElementById('gallery-arrow-left').className.match(/dead/g))
			{
				document.getElementById('gallery-arrow-left').onclick();
				console.log('mySweetGallery.currentIcon '+mySweetGallery.currentIcon);
			}
			expect(mySweetGallery.currentIcon).toBe('icon_0');
			},1000);
		})
	});
	it('rolling over the image will set the caption to visible', function(){
		runs(function(){
			
			document.getElementById('gallery-image').onmouseover();			
			expect(document.getElementById('gallery-caption').className).toBe('gallery-caption ');
		})
	});
	it('Rolling out of the image will remove the caption', function(){
		
		runs(function(){
			setInterval(function(){
				document.getElementById('gallery-image').onmouseout();
				expect(document.getElementById('gallery-caption').className).toBe('gallery-caption hidden');
			}, 2000)
		})
	})
	it('should spy on icon_3 click event', function() {
	    spyOn(document.getElementById('icon_3'), 'onclick');
	    var e = {};
	    e.currentTarget = document.getElementById('icon_3');
	    document.getElementById('icon_3').onclick(e)
	    expect(document.getElementById('icon_3').onclick).toHaveBeenCalledWith(e);
	  });
})