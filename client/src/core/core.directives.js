/**
 * Created by Adnan Ibrišimbegović on 06/08/2017.
 */

import angular from 'angular';
const module = angular.module('core.directives', []);

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
