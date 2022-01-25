# Exercise 5.1

[SHACL](https://www.w3.org/TR/shacl/) Shapes Constraint Language is 
a language for validating RDF graphs against a set of conditions.
These conditions are provided as shapes, which as also an RDF graph.

Starting from the below SHACL shape,
add property shapes for the following predicates
- `foaf:familyName` (required)
- `foaf:img` (required)
- `foaf:mbox` (required)
- `foaf:nick` (optional)
- `foaf:homepage` (optional)

Thus, you ignore organizations for now.
Use your solution of exercise 1.1 as input data for the validation.

Tip: try out your SHACL shapes via <https://shacl.org/playground/> 
or <https://shacl-playground.zazuko.com/>.

```turtle
@prefix rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs:  <http://www.w3.org/2000/01/rdf-schema#> .
@prefix sh:    <http://www.w3.org/ns/shacl#> .
@prefix foaf:  <http://xmlns.com/foaf/0.1/> .
@prefix ex:    <http://example.com/> .

ex:PersonShape
    a              sh:NodeShape ;
    sh:targetClass foaf:Person ;
    sh:property    ex:requiredGivenName .

ex:requiredGivenName
    a           sh:PropertyShape ;
    rdfs:label  "given name"@en ;
    sh:path     foaf:givenName ;
    sh:nodeKind sh:Literal ;
    sh:minCount 1 .
```