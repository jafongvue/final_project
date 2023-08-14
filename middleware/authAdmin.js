export default function (context) {
	// If the user is not authenticated
	if (context.$cookies.get('admin')) {
		return context.redirect('/admin');
	}
}