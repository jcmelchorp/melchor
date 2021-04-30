function nastavRozmeryObrazovky() {
  /*
  var orientace = 'undefined';
  if (typeof window.orientation !== 'undefined') { 
      orientace = window.orientation;
  }
  */
  var vyskaObrazovky = Get_Cookie("vyskaObrazovky");
  var sirkaObrazovky = Get_Cookie("sirkaObrazovky");
  var w = window,
  d = document,
  e = d.documentElement,
  g = d.getElementsByTagName('body')[0],
  sirkaObrazovky = w.innerWidth || e.clientWidth || g.clientWidth,
  vyskaObrazovky = w.innerHeight|| e.clientHeight|| g.clientHeight;        
  setCookie("vyskaObrazovky", vyskaObrazovky);	
  setCookie("sirkaObrazovky", sirkaObrazovky);
  //setCookie("orientace", orientace);    	
}   
//http://www.webfaq.cz/clanek/Javascript-cookies-jak-spravne-nastavit-cookies-v-javascriptu-jak-pouzivat-cookies-path  
function setCookie(key, value) {
	value = encodeURIComponent(value); // hodnota value by měla být minimálně escapována pomocí funkce escape()	
	value+='; path=/';
	// expirace
	var date = new Date();
	date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000);
	value+='; expires=' + date.toGMTString();
	document.cookie = key + '=' + value;
}

//http://techpatterns.com/downloads/javascript_cookies.php
function Get_Cookie(check_name) {
	// first we'll split this cookie up into name/value pairs
	// note: document.cookie only returns name=value, not the other components
	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; // set boolean t/f default f

	for ( i = 0; i < a_all_cookies.length; i++ )
	{
		// now we'll split apart each name=value pair
		a_temp_cookie = a_all_cookies[i].split( '=' );


		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

		// if the extracted name matches passed check_name
		if ( cookie_name == check_name )
		{
			b_cookie_found = true;
			// we need to handle case where cookie has no value but exists (no = sign, that is):
			if ( a_temp_cookie.length > 1 )
			{
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
			}
			// note that in cases where cookie is initialized but no value, null is returned
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( !b_cookie_found )
	{
		return null;
	}
}  

 
