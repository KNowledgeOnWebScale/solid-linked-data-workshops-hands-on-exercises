# Exercise 4.1

In this exercise you will learn on how to use SPARQL queries to RDF data sources.

You can execute SPARQL queries live in the browser via <http://query.linkeddatafragments.org/>.

Resource for Yoda: <http://www.wikidata.org/entity/Q51730>

The following query selects all predicates and corresponding objects that are directly related to Yoda.

```sparql
PREFIX wd: <http://www.wikidata.org/entity/>

select * where {
 wd:Q51730 ?p ?o.
}
```

## Tasks

1. Get all IRIs of Yoda's students.

```sparql
PREFIX wd: <http://www.wikidata.org/entity/>
PREFIX p: <http://www.wikidata.org/prop/>

select * where {
 wd:Q51730 p:P802 [p:P802 ?o].
}
```

2. Get the English names of Yoda's students.

```sparql
PREFIX wd: <http://www.wikidata.org/entity/>
PREFIX p: <http://www.wikidata.org/prop/>
PREFIX ps: <http://www.wikidata.org/prop/statement/>

select * where {
  wd:Q51730 p:P802 [
    ps:P802 [rdfs:label ?o]
  ].
  
  filter (lang(?o) = 'en')
}
```

3. Get titles of all Star Wars movies in the order that the movies were released in France.

```sparql
PREFIX wd: <http://www.wikidata.org/entity/>
PREFIX p: <http://www.wikidata.org/prop/>
PREFIX ps: <http://www.wikidata.org/prop/statement/>

select ?name ?date where {
  wd:Q22092344 p:P527 [ps:P527 ?trilogy].
  
  ?trilogy p:P527 [ps:P527 ?movie].
  
  ?movie rdfs:label ?name;
         p:P577 [ps:P577 ?date; pq:P291 wd:Q142].
  
  filter (lang(?name) = 'en')
}
order by ?date
```

## References

- [SPARQL 1.1 Query Language](https://www.w3.org/TR/sparql11-query/)
- 