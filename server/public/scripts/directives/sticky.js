myApp.directive('sticky', Sticky);

	Sticky.$inject = [ '$mdSticky' ];

	function Sticky($mdSticky) {
		return {
			restrict : 'A',
			link : function(scope, element) {
				$mdSticky(scope, element);
			}
		};
	}
})();
