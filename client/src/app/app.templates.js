(function() {

    'use strict';

    angular
        .module('app')
        .factory('templateFactory', TemplateFactory);



    /*@ngInject*/
    function TemplateFactory() {

        var template = {};

        template.createNumberFilterTemplate = function(operator, value) {
            return 'data.filter(new FilterFunction<Integer>() {\n  public boolean filter(Integer value) {\n   return value ' + operator + ' ' + value + ';\n }\n});';
        };

        template.createStringFilterTemplate = function(operator, value) {
            var operation = '';

            if(operator === 'Equals'){
                operation = 'value.equals("' + value + '")';
            }
            else if(operator === 'NotEquals'){
                operation = '!value.equals("' + value + '")';
            }
            else if(operator === 'Contains'){
                operation = 'value.contains("' + value + '")';
            }
            else if(operator === 'NotContains'){
                operation = '!value.contains("' + value + '")';
            }
            else if(operator === 'Matches'){
                operation = 'value.matches("' + value + '")';
            }
            else if(operator === 'StartsWith'){
                operation = 'value.startsWith("' + value + '")';
            }
            else if(operator === 'EndsWith'){
                operation = 'value.endsWith("' + value + '")';
            }

            return 'data.filter(new FilterFunction<String>() {\n  public boolean filter(String value) {\n    return ' + operation + '; \n  }\n});';
        };

        template.createFlatMapTemplate = function() {
            return 'package testpackage;\n' +
                    'import org.apache.flink.*;\n' +
                    'import org.apache.flink.util.*;\n' +
                    'import org.apache.flink.api.java.operators.*;\n' +
                    'import org.apache.flink.api.java.*;\n' +
                    'import org.apache.flink.api.common.*;\n' +
                    'import org.apache.flink.api.common.functions.*;\n' +
                    'import org.apache.flink.api.java.aggregation.Aggregations;\n' +
                    'import org.apache.flink.api.java.tuple.*;\n' +
                    'public class Tokenizer implements FlatMapFunction<String, Tuple2<String, Integer>> {\n' +
                    '@Override\n' +
                    'public void flatMap(String value, Collector<Tuple2<String, Integer>> out) {\n' +
                    '    for (String token : value.split("\\W")) {\n' +
                    '      out.collect(new Tuple2<String, Integer>(token, 1));\n' +
                    '    }\n' +
                    '  }\n' +
                    '}';
        };

        template.createMapTemplate = function() {
            return 'public class IntAdder implements MapFunction<Tuple2<Integer, Integer>, Integer> {\n  @Override\n  public Integer map(Tuple2<Integer, Integer> in) {\n    return in.f0 + in.f1;\n  }\n}';
        };

        template.createCustomFilterTemplate = function() {
            return 'public class NaturalNumberFilter implements FilterFunction<Integer> {\n  @Override\n  public boolean filter(Integer number) {\n    return number >= 0;\n  }\n}';
        };

        template.createReduceTemplate = function() {
            return 'public class IntSummer implements ReduceFunction<Integer> {\n  @Override\n  public Integer reduce(Integer num1, Integer num2) {\n    return num1 + num2;\n  }\n}';
        };

        return template;
    }

})();
