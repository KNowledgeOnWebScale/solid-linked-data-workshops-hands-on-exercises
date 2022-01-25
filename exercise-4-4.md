# Exercise 4.4

Create a federated SPARQL query that returns all books by San Franciscan authors in the Harvard Library. You can
execute (federated) SPARQL queries live in the browser via <http://query.linkeddatafragments.org/>.

You should use the following data sources:

| Data source                          | Data                                            | Link                                          |
|--------------------------------------|-------------------------------------------------|-----------------------------------------------|
| DBpedia                              | Authors and their birth places                  | <http://fragments.dbpedia.org/2016-04/en>     |
| Virtual International Authority File | Links same authors across multiple data sources | <http://data.linkeddatafragments.org/viaf>    |
| Harvard Library                      | Books and their authors at Harvard Library      | <http://data.linkeddatafragments.org/harvard> |

You should use the following vocabularies:

| Name              | Prefix        | Url                                     | Interesting properties         |
|-------------------|---------------|-----------------------------------------|--------------------------------|
 | DBpedia           | `dbpedia-owl` | <http://dbpedia.org/ontology/>          | `dbpedia-owl:birthPlace`       |
| RDF Schema        | `rdfs`        | <http://www.w3.org/2000/01/rdf-schema#> | `rdfs:label`                   |
 | Schema.org        | `schema`      | <http://schema.org/>                    | `schema:sameAs`, `schema:name` |
| FOAF              | `foaf`        | <http://xmlns.com/foaf/0.1/>            | `foaf:name`                    |
| Dublin Core Terms | `dc`          | <http://purl.org/dc/terms/>             | `dc:contributor`, `dc:title`   |