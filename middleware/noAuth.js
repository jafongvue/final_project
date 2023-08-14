export default function (context) {
	// If the user is not authenticated
	if (context.$cookies.get('token')) {
    if(context.$cookies.get('status')=='Admin' || context.$cookies.get('status')=='admin')
		return context.redirect('/Admin/management/home');
    if(context.$cookies.get('status')=='user' || context.$cookies.get('status')=='User')
		return context.redirect('/Shop/product');
    if(context.$cookies.get('status')=='customer' || context.$cookies.get('status')=='customer')
		return context.redirect('/view.Customer');
	}
}
