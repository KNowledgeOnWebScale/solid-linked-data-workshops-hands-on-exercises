# Exercise 5.5

[Shape Expressions](http://shex.io/shex-primer/) (ShEx) is a language for describing RDF graph structures. 
A ShEx schema prescribes conditions that RDF data graphs must meet in order to be considered conformant.
ShEx and SHACL have similarities, such as:
- Have as goal to describe and validate RDF graphs.
- Constraints on incoming/outgoing arcs.
- Cardinalities.

They also have differences, such as:
- ShEx only defines structure of nodes, while SHACL defines structure and can have target declarations.
- ShEx separates validation language and triggering mechanism, while in SHACL target declarations can be part of shapes graph.
- ShEx designed with focus on human-readability, while SHACL design is focused on RDF vocabulary.

**Task:** Recreate your SHACL shapes of exercise 5.3 in a ShEx schema,
starting from the schema below.

```
PREFIX ex: <http://example.com/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

<ex:PersonShape> {
  foaf:givenName LITERAL+ ;
}
```

Tip: try your ShEx schema via <https://rawgit.com/shexSpec/shex.js/master/packages/shex-webapp/doc/shex-simple.html>.
Do not forget to add your targets in the query map.