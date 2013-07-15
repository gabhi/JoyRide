/*global require:true */

require.config({
	deps: ["game"],
	waitSeconds: 30,
	baseUrl: "/",
	paths: {
		// External libraries
		"jquery": "jquery-2.0.3.min"
	},
	useStrict: true,
	shim: {
		jquery: {
			exports: "$"
		}
	}
});
