/**
 * Created by Adnan Ibrišimbegović on 06/08/2017.
 */

import {assign, merge} from 'lodash';
import angular from 'angular';
const module = angular.module('core.directives', []);

module.component('fhFilterText', {
    bindings: {
        placeholder: '@',
        colName: '@',
        model: '='
    },
    template: [
        '<input type="text" ng-model="$ctrl.model" ng-model-options="{ debounce: 500 }"',
        'placeholder="{{$ctrl.placeholder}}" class="form-control">'
    ].join(''),
    controller: function ($stateParams, $state) {
        'ngInject';
        const $ctrl = this;
        let previousVal;

        $ctrl.$onInit = () => {
            $ctrl.model = $stateParams[$ctrl.colName];
        };

        function updateStateParams() {
            const map = {};
            map[$ctrl.colName] = $ctrl.model;
            const params = assign({}, $stateParams, map);
            $state.go('.', params, { notify: false });
        }

        $ctrl.$doCheck = () => {
            if ($ctrl.model !== previousVal) {
                previousVal = $ctrl.model;
                updateStateParams()
            }
        };

    }
});

module.component('fhSort', {
    bindings: {
        colName: '<',
        label: '<'
    },
    require: {
        ngModelCtrl: 'ngModel'
    },
    template: '<a href ng-click="$ctrl.sortBy()" ng-class="{\'bg-warning\': $ctrl.isActiveCol()}">{{$ctrl.label}}</a>',
    controller: function ($stateParams, $state) {
        'ngInject';
        const $ctrl = this;

        $ctrl.$onInit = () => {
            $ctrl.ngModelCtrl.$setViewValue({
                sortBy: $stateParams.sortBy,
                reverse: $stateParams.reverse
            });
        };

        function updateStateParams() {
            const params = merge({}, $stateParams, $ctrl.ngModelCtrl.$viewValue);
            $state.go('.', params, { notify: false });
        }

        $ctrl.isActiveCol = () => {
            return $ctrl.ngModelCtrl.$viewValue.sortBy == $ctrl.colName;
        };

        $ctrl.sortBy = () => {
            const sort = $ctrl.ngModelCtrl.$viewValue;
            if (sort.sortBy === $ctrl.colName) {
                sort.reverse = !sort.reverse;

            } else {
                sort.sortBy = $ctrl.colName;
                sort.reverse = false;
            }

            $ctrl.ngModelCtrl.$setViewValue(sort);

            updateStateParams();

        };
    }
});

module.directive('fhErrorFor', ($log) => {
    'ngInject';

    return {
        scope: {
            field: '<fhErrorFor',
            className: '<errorClass'
        },
        link: ($scope, $elem, $attr) => {
            const className = $scope.className || 'has-error';

            function observeField(field) {
                if (!field) {
                    return false;
                }

                const form = field.$$parentForm;

                if (!form) {
                    $log.warn(`Unable to resolve parent form for field ${field.$name}`);
                    return;
                }

                $scope.$watch(() => {
                    return field.$invalid && (!field.$pristine || form.$submitted);
                }, (result) => {
                    if (result) {
                        $attr.$addClass(className);
                    } else {
                        $attr.$removeClass(className);
                    }
                });

            }

            const stopWatcher = $scope.$watch('field', (field) => {
                if (!field) {
                    return false;
                }

                stopWatcher();
                observeField(field);

            });

        },
    };

});

export default module.name;
