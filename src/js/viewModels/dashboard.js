/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojdatetimepicker',
             'ojs/ojselectcombobox', 'ojs/ojtimezonedata', 'ojs/ojknockout', 'ojs/ojpictochart', 'ojs/ojbutton', 'ojs/ojlegend','ojs/ojgauge'],
 function(oj, ko, $) {

    function DashboardViewModel() {
      var self = this;
      // Below are a subset of the ViewModel methods invoked by the ojModule binding
      // Please reference the ojModule jsDoc for additionaly available methods.

      /**
       * Optional ViewModel method invoked when this ViewModel is about to be
       * used for the View transition.  The application can put data fetch logic
       * here that can return a Promise which will delay the handleAttached function
       * call below until the Promise is resolved.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
       * the promise is resolved
       */

         this.value = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date(2017, 9, 5)));
         var self = this;
         var colorHandler = new oj.ColorAttributeGroupHandler();
         self.selectionValue = ko.observable('single');
         self.drillingValue = ko.observable('on');
         self.selectedItemsValue = ko.observableArray([]);
         self.selectedImageItemsValue = ko.observableArray([]);

         var imageData = [
           {name: 'iPhone', color: colorHandler.getValue('iPhone'), sourceHover: 'images/pictoChart/iphone-faded.png', source: 'images/pictoChart/iphone.png', sourceHoverSelected : 'images/pictoChart/iphone-inverted-faded.png',sourceSelected : 'images/pictoChart/iphone-inverted.png' ,count: 20},
           {name: 'iPad', color: colorHandler.getValue('iPad'), sourceHover: 'images/pictoChart/ipad-faded.png', source: 'images/pictoChart/ipad.png', sourceHoverSelected : 'images/pictoChart/ipad-inverted-faded.png',sourceSelected : 'images/pictoChart/ipad-inverted.png' ,count: 10},
           {name: 'Mac', color: colorHandler.getValue('Mac'), sourceHover: 'images/pictoChart/macBook-faded.png', source: 'images/pictoChart/macBook.png', sourceHoverSelected : 'images/pictoChart/macBook-inverted-faded.png',sourceSelected : 'images/pictoChart/macBook-inverted.png' ,count: 12}
         ];

         var regularData = [
           {name: 'iPhone', color: colorHandler.getValue('iPhone'),count: 20},
           {name: 'iPad', color: colorHandler.getValue('iPad'), count: 10},
           {name: 'Mac', color: colorHandler.getValue('Mac'), count: 12}
         ];

         self.selectionOptions = ko.observableArray([
             {id: 'none', label: 'none', value: 'none'},
             {id: 'single', label: 'single', value: 'single'},
             {id: 'multiple', label: 'multiple', value: 'multiple'}
         ]);

         self.drillingOptions = ko.observableArray([
             {id: 'off', label: 'off', value: 'off'},
             {id: 'on', label: 'on', value: 'on'}
         ]);


         self.pictoChartImageItems = ko.observableArray(imageData);
         self.pictoChartItems = ko.observableArray(regularData);
         self.selectionValueChange = function(event, data) {
             // reset initial selections
             if(data.value === 'multiple')
                 selected = ['iPhone', 'Mac'];
             else if(data.value === 'single')
                 selected = ['iPad'];
             else{
                 selected = [];
                 $('#currentText').html(" ");
                 $('#currentText2').html(" ");
                 $('#currentText5').html(" ");
                 $('#currentText6').html(" ");
             }
             $('#currentText3').html(" ");
             $('#currentText4').html(" ");
             $('#currentText7').html(" ");
             $('#currentText8').html(" ");
             self.selectedItemsValue(selected);
             self.selectedImageItemsValue(selected);

             return true;
         }

         self.drillValueChange = function (event, data) {
           if (data.value == 'off'){
             $('#currentText3').html(" ");
             $('#currentText4').html(" ");
             $('#currentText7').html(" ");
             $('#currentText8').html(" ");
           }
         }

         var selected = ['iPad'];
         self.selectedItemsValue(selected);
         self.selectedImageItemsValue(selected);
         $('#currentText').html("selected items: <br/>");
         $('#currentText2').html(selected);
         $('#currentText5').html("selected items: <br/>");
         $('#currentText6').html(selected);

         self.picto1Listener = function(event, ui) {
           if (ui['option'] == 'selection') {
             $('#currentText').html("selected items: <br/>");
             var items = "";
             if(ui['value']){
               for(var i = 0; i < ui['value'].length; i++){
                 if(ui['value'][i])
                   items += "    " + ui['value'][i] + "<br/>";
               }
               $('#currentText2').html(items);
               if (ui['value'].length == 0){$('#currentText').html("");$('#currentText2').html("");};
             }
           }
         }

         self.picto1DrillListener = function(event, ui) {
           $('#currentText3').html("drilled item: <br/>");
           $('#currentText4').html(ui.id);
         }


         self.picto2Listener = function(event, ui) {
           if (ui['option'] == 'selection') {
             $('#currentText5').html("selected items: <br/>");
             var items = "";
             if(ui['value']){
               for(var i = 0; i < ui['value'].length; i++){
                 if(ui['value'][i])
                   items += "    " + ui['value'][i] + "<br/>";
               }
               $('#currentText6').html(items);
               if (ui['value'].length == 0){$('#currentText5').html("");$('#currentText6').html("");};
             }
           }
         }

         self.picto2DrillListener = function(event, ui) {
           $('#currentText7').html("drilled item: <br/>");
           $('#currentText8').html(ui.id);
         }

      self.handleActivated = function(info) {
      };

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
       */
      self.handleAttached = function(info) {
        // Implement if needed
      };


      /**
       * Optional ViewModel method invoked after the bindings are applied on this View.
       * If the current View is retrieved from cache, the bindings will not be re-applied
       * and this callback will not be invoked.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       */
      self.handleBindingsApplied = function(info) {
        // Implement if needed
      };

      /*
       * Optional ViewModel method invoked after the View is removed from the
       * document DOM.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
       */
      self.handleDetached = function(info) {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new DashboardViewModel();
  }
);
