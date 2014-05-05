/*jshint jquery: true */
/*globals asyncTest,deepEqual,equal,expect,module,notDeepEqual,notEqual,notStrictEqual,ok,QUnit,raises,start,stop,strictEqual,test,jQuery */
(function($){
    'use strict';
    
    var $fixture, t, tests = {
        init: function() {
            var el;
            
            $fixture.append('<input id=test1 />');
            
            $('#test1').qcTimepicker();
            
            el = document.getElementById('test1');
            
            strictEqual($('#test1-qcTimepicker', $fixture).length, 1);
            strictEqual(el.style.display, 'none');
            strictEqual(el.tabIndex, -1);
        },
        
        initDouble: function() {
            var el;
            
            $fixture.append('<input id=test1 />');
            
            $('#test1').qcTimepicker();
            $('#test1').qcTimepicker();
            
            el = document.getElementById('test1');
            
            strictEqual(el.parentNode.children.length - 1, 1);
        },
        
        initValue: function() {
            var qc;
            
            $fixture.append('<input id=test1 value=13:30:00 />');
            
            $('#test1').qcTimepicker();
            
            qc = document.getElementById('test1-qcTimepicker');
            
            strictEqual(qc.value, '13:30:00');
        },
        
        initInputTimeValue: function() {
            var qc;
            
            $fixture.append('<input type=time value=15:00:00 id=test1 />');
            
            $('#test1').qcTimepicker();
            
            qc = document.getElementById('test1-qcTimepicker');
            
            strictEqual(qc.value, '15:00:00');
        },
        
        initRequired: function() {
            var qc, dummyInput = document.createElement('input');
            if(typeof dummyInput.required === 'undefined') {
                // Can't test feature in unsupported browsers
                expect(0);
                return;
            }
            
            $fixture.append('<input id=test1 required />');
            
            $('#test1').qcTimepicker();
            
            qc = document.getElementById('test1-qcTimepicker');
            
            ok(qc.required);
        },
        
        initUnidentified: function() {
            $fixture.append('<input data-test=foo /><input data-test=foo />');
            
            $('[data-test="foo"]').qcTimepicker();
            
            strictEqual($('#qcTimepicker-1', $fixture).length, 1);
            strictEqual($('select[id^="qcTimepicker-"]', $fixture).length, 2);
        },
        
        rangeDefault: function() {
            var qc;
            
            $fixture.append('<input id=test1 />');
            
            $('#test1').qcTimepicker();
            
            qc = document.getElementById('test1-qcTimepicker');
            
            strictEqual(qc.children[1].innerHTML, '0:00');
            strictEqual(qc.children[2].innerHTML, '0:30');
            strictEqual(qc.lastChild.innerHTML, '23:30');
            strictEqual(qc.children.length, 24 * 2 + 1);
        },
        
        rangeCustom: function() {
            var qc;
            
            $fixture.append('<input id=test1 />');
            
            $('#test1').qcTimepicker({
                minTime: '9',
                maxTime: '17'
            });
            
            qc = document.getElementById('test1-qcTimepicker');
            
            strictEqual(qc.children[1].innerHTML, '9:00');
            strictEqual(qc.children[1].value, '09:00:00');
            strictEqual(qc.children[2].innerHTML, '9:30');
            strictEqual(qc.children[2].value, '09:30:00');
            strictEqual(qc.lastChild.innerHTML, '17:00');
            strictEqual(qc.lastChild.value, '17:00:00');
            strictEqual(qc.children.length, (17 - 9) * 2 + 1 + 1);
        },
        
        rangeDateObject: function() {
            var qc, d1 = new Date(2014, 4, 1, 9, 0, 0), d2 = new Date(2014, 4, 1, 17, 0, 0);
            
            $fixture.append('<input id=test1 />');
            
            $('#test1').qcTimepicker({
                minTime: d1,
                maxTime: d2
            });
            
            qc = document.getElementById('test1-qcTimepicker');
            
            strictEqual(qc.children[1].innerHTML, '9:00');
            strictEqual(qc.children[1].value, '09:00:00');
            strictEqual(qc.children[2].innerHTML, '9:30');
            strictEqual(qc.children[2].value, '09:30:00');
            strictEqual(qc.lastChild.innerHTML, '17:00');
            strictEqual(qc.lastChild.value, '17:00:00');
            strictEqual(qc.children.length, (17 - 9) * 2 + 1 + 1);
        },
        
        rangeGoofy: function() {
            var qc;
            
            $fixture.append('<input id=test1 />');
            
            $('#test1').qcTimepicker({
                minTime: '29:89:60',
                maxTime: '16:80'
            });
            
            qc = document.getElementById('test1-qcTimepicker');
            
            strictEqual(qc.children[1].innerHTML, '6:30');
            strictEqual(qc.children[1].value, '06:30:00');
            strictEqual(qc.lastChild.innerHTML, '17:00');
            strictEqual(qc.lastChild.value, '17:00:00');
            strictEqual(qc.children.length, (17 - 6) * 2 + 1);
        },
        
        rangeInvalid: function() {
            var qc1;
            
            $fixture.append('<input id=test1 />');
            $fixture.append('<input id=test2 />');
            
            $('#test1').qcTimepicker({
                minTime: '2',
                maxTime: '1'
            });
            
            qc1 = document.getElementById('test1-qcTimepicker');
            
            // Max > min
            strictEqual(qc1.children.length, 1);
            
            // Completely invalid values
            throws(function() {
                $('#test2').qcTimepicker({
                    minTime: 'foo',
                    maxTime: '-6'
                });
            }, 'InvalidArgumentException');
        },
        
        step: function() {
            var qc;
            
            $fixture.append('<input id=test1 />');
            $('#test1').qcTimepicker({
                step: '0:15'
            });
            
            qc = document.getElementById('test1-qcTimepicker');
            
            strictEqual(qc.children[1].innerHTML, '0:00');
            strictEqual(qc.children[2].innerHTML, '0:15');
            strictEqual(qc.lastChild.innerHTML, '23:45');
            strictEqual(qc.children.length, 24 * 4 + 1);
        },
        
        stepRange: function() {
            var qc;
            
            $fixture.append('<input id=test1 />');
            
            $('#test1').qcTimepicker({
                minTime: '9',
                maxTime: '16:50',
                step: '0:15'
            });
            
            qc = document.getElementById('test1-qcTimepicker');
            
            strictEqual(qc.children[1].innerHTML, '9:00');
            strictEqual(qc.children[2].innerHTML, '9:15');
            strictEqual(qc.lastChild.innerHTML, '16:45');
            strictEqual(qc.children.length, (17 - 9) * 4 + 1);
        },
        
        stepInvalid: function() {
            $fixture.append('<input id=test1 />');
            
            throws(function() {
                $('#test1').qcTimepicker({
                    step: -0.3
                });
            }, 'InvalidArgumentException');
            
            throws(function() {
                $('#test1').qcTimepicker({
                    step: 'foo'
                });
            }, 'InvalidArgumentException');
            
            throws(function() {
                $('#test1').qcTimepicker({
                    step: null
                });
            }, 'InvalidArgumentException');
            
            throws(function() {
                $('#test1').qcTimepicker({
                    step: '2:-1:-0'
                });
            }, 'InvalidArgumentException');
        },
        
        label: function() {
            var elLabel;
            
            $fixture.append('<label id=foo for=test1>Foo</label><input id=test1 />');
            
            $('#test1').qcTimepicker();
            
            elLabel = document.getElementById('foo');
            
            strictEqual(elLabel.htmlFor, 'test1-qcTimepicker');
            
            // document.activeElement doesn't work in PhantomJS 
            // See https://github.com/netzpirat/guard-jasmine/issues/48
            if (typeof window.callPhantom !== 'function') {
                // Test label functionality
                $(elLabel).trigger('click');
                strictEqual(document.getElementById('test1-qcTimepicker') === document.activeElement, true);
            }
        },
        
        placeholder: function() {
            $fixture.append('<input id=test1 placeholder=foo />');
            $fixture.append('<input id=test2 />');
            $fixture.append('<input id=test3 placeholder=foo />');
            $fixture.append('<input id=test4 />');
            
            $('#test1, #test2').qcTimepicker();
            $('#test3, #test4').qcTimepicker({
                placeholder: 'bar'
            });
            
            strictEqual(document.getElementById('test1-qcTimepicker').firstChild.innerHTML, 'foo');
            strictEqual(document.getElementById('test2-qcTimepicker').firstChild.innerHTML, $.fn.qcTimepicker.defaults.placeholder);
            strictEqual(document.getElementById('test3-qcTimepicker').firstChild.innerHTML, 'foo');
            strictEqual(document.getElementById('test4-qcTimepicker').firstChild.innerHTML, 'bar');
        },
        
        hide: function() {
            var qc;
            
            $fixture.append('<input id=test1 />');
            
            $('#test1').qcTimepicker().qcTimepicker('hide');
            
            qc = document.getElementById('test1-qcTimepicker');
            
            strictEqual(qc.style.display, 'none');
        },
        
        show: function() {
            var qc;
            
            $fixture.append('<input id=test1 />');
            
            $('#test1').qcTimepicker();
            
            qc = document.getElementById('test1-qcTimepicker');
            
            qc.style.display = 'none';
            $('#test1').qcTimepicker('show');
            notStrictEqual(qc.style.display, 'none');
            
            $('#test1').qcTimepicker('hide').qcTimepicker('show');
            notStrictEqual(qc.style.display, 'none');
        },
        
        destroy: function() {
            var el1, el2, el3, qc1;
            
            $fixture.append('<input class=time id=test1 />');
            $fixture.append('<input class=time id=test2 tabindex=5 />');
            $fixture.append('<input class=time id=test3 tabindex=-1 />');
            
            $('.time').qcTimepicker();
            
            el1 = document.getElementById('test1');
            el2 = document.getElementById('test2');
            el3 = document.getElementById('test3');
            
            // Destroy normal
            $('#test1').qcTimepicker('destroy');
            qc1 = document.getElementById('test1-qcTimepicker');
            
            strictEqual(qc1, null);
            notStrictEqual(el1.style.display, 'none');
            notStrictEqual(el1.tabIndex, -1);
            
            // Destroy custom tabindex
            $('#test2').qcTimepicker('destroy');
            
            strictEqual(el2.tabIndex, 5);
            
            // Destroy negative tabindex
            $('#test3').qcTimepicker('destroy');
            
            strictEqual(el3.tabIndex, -1);
        },
        
        setOptions: function() {
            var qc;
            
            $fixture.append('<input id=test1 />');
            
            $('#test1').qcTimepicker();
            
            qc = document.getElementById('test1-qcTimepicker');
            
            $('#test1').qcTimepicker('options', {
                required: true
            });
            strictEqual(qc.required, true);
            
            $('#test1').qcTimepicker('options', {
                required: false
            });
            strictEqual(qc.required, false);
        },
        
        classNamesOne: function() {
            $fixture.append('<input id=test1 />');
            
            $('#test1').qcTimepicker({
                classes: 'foo'
            });
            
            ok($('#test1-qcTimepicker', $fixture).hasClass('foo'));
        },
        
        classNamesMultiple: function() {
            $fixture.append('<input id=test1 />');
            
            $('#test1').qcTimepicker({
                classes: ['bar', 'baz']
            });
            
            ok($('#test1-qcTimepicker', $fixture).hasClass('bar') && $('#test1-qcTimepicker', $fixture).hasClass('baz'));  
        },
        
        inputChange: function() {
            var el, qc;
            
            $fixture.append('<input id=test1 />');
            
            $('#test1').qcTimepicker();
            
            el = document.getElementById('test1');
            qc = document.getElementById('test1-qcTimepicker');
            
            strictEqual(el.value, '');
            
            // Test changing dropdown
            $('#test1-qcTimepicker').val('14:00:00').trigger('change');
            strictEqual(el.value, '14:00:00');
            
            // Test changing original input (programmatically)
            $('#test1').val('15:00:00').trigger('change');
            strictEqual(qc.value, '15:00:00');
        },
        
        inputTimeChange: function() {
            var el, qc;
            
            $fixture.append('<input type=time id=test1 />');
            
            $('#test1').qcTimepicker();
            
            el = document.getElementById('test1');
            qc = document.getElementById('test1-qcTimepicker');
            
            strictEqual(el.value, '');
            
            // Test changing dropdown
            $('#test1-qcTimepicker').val('14:00:00').trigger('change');
            strictEqual(el.value, '14:00:00');
            
            // Test changing original input (programmatically)
            $('#test1').val('15:00:00').trigger('change');
            strictEqual(qc.value, '15:00:00');
        },
        
        format: function() {
            var testFunction = function(format) {
                $fixture.html('<input id=test1 />');
                
                $('#test1').qcTimepicker({
                    format: format,
                    minTime: '00:01:09',
                    maxTime: '00:01:09'
                });
                
                return document.getElementById('test1-qcTimepicker').lastChild.innerHTML;
            };
            
            var testFormats = {
                'h:m:s a': '12:1:9 am',
                'hh:mm:ss a': '12:01:09 am',
                'H:m:s': '0:1:9',
                'HH:mm:ss': '00:01:09',
                'k:m:s': '1:1:9',
                'kk:mm:ss': '01:01:09',
                'K:m:s a': '1:1:9 am',
                'KK:mm:ss a': '01:01:09 am',
                'A': '69000',
                '\\aa\\h': 'aamh',
                '\\\\': '',
                '\\mm': 'm1',
                '\\m\\m': 'mm'
            };
            
            $.each(testFormats, function(k, v) {
                strictEqual(testFunction(k), v);
            });
        }
    };
    
    module('Tests', {
        setup: function() {
            $fixture = $('#qunit-fixture');
        }
    });
    
    for(t in tests) {
        if(tests.hasOwnProperty(t)) {
            test(t, tests[t]);
        }
    }
}(jQuery));