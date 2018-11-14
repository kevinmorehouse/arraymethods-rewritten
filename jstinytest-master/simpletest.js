/**
 * Very simple in-browser unit-test library, with zero deps.
 *
 * Background turns green if all tests pass, otherwise red.
 * View the JavaScript console to see failure reasons.
 *
 * Example:
 *
 *   adder.js (code under test)
 *
 *     function add(a, b) {
 *       return a + b;
 *     }
 *
 *   adder-test.html (tests - just open a browser to see results)
 *
 *     <script src="tinytest.js"></script>
 *     <script src="adder.js"></script>
 *     <script>
 *
 *     tests({
 *
 *       'adds numbers': function() {
 *         eq(6, add(2, 4));
 *         eq(6.6, add(2.6, 4));
 *       },
 *
 *       'subtracts numbers': function() {
 *         eq(-2, add(2, -4));
 *       },
 *
 *     });
 *     </script>
 *
 * That's it. Stop using over complicated frameworks that get in your way.
 *
 * -Joe Walnes
 * MIT License. See https://github.com/joewalnes/jstinytest/
 */

var TinyTestHelper = {
  renderStats: function(tests, failures) {
    var numberOfTests = Object.keys(tests).length;
    var successes = (numberOfTests - failures);
    var summaryString = 'Ran ' + numberOfTests + ' Tests: ' + successes + ' Successes, ' + failures + ' Failures';

    var summaryElement = document.createElement('h1');
    summaryElement.textContent = summaryString;
    document.body.appendChild(summaryElement);
    document.querySelector('h1').style.cssText = 'box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);font-family: arial; background-color: #333; text-shadow:0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19); color: white; padding: 10px 30px; margin: 5px; display: inline; border-radius: 25px;';
  }
};


var TinyTest = {

  run: function(tests) {
    var failures = 0;
    for (var testName in tests) {
      var testAction = tests[testName];
      try {
        testAction.apply(this);
        console.log('%c' + testName, 'font-family: tahoma; font-weight: bold; color: black; background-color: rgba(153, 255, 153, 0.9); padding: 5px 10px; border-radius: 15px;');
      } catch (e) {
        failures++;
        console.groupCollapsed('%c' + testName, 'font-family: tahoma; font-weight: bold; color: black; background-color: rgba(255, 153, 153, 0.9); padding: 5px 10px; border-radius: 15px;');
        console.error(e.stack);
        console.groupEnd();
      }
    }

    setTimeout(function() { // Give document a chance to complete
      if (window.document && document.body) {
        document.body.style.backgroundColor = (failures == 0 ? '#9f9' : '#f99');
        TinyTestHelper.renderStats(tests, failures);
      }
    }, 0);
  },

  fail: function(msg) {
    throw new Error('fail(): ' + msg);
  },

  assertStrictEquals: function(expected, actual) {
    if (expected !== actual) {
      throw new Error('assertStrictEquals() "' + expected + '" !== "' + actual + '"');
    }
  },

};

var fail = TinyTest.fail.bind(TinyTest),
  eq = TinyTest.assertStrictEquals.bind(TinyTest), // alias for assertStrictEquals
  assertStrictEquals = TinyTest.assertStrictEquals.bind(TinyTest),
  tests = TinyTest.run.bind(TinyTest);
