# Exercise 4.1

Get IRIs of all Yoda's students,
using a [SPARQL](https://www.w3.org/TR/sparql11-query/) query
on [Wikidata](https://www.wikidata.org/wiki/Wikidata:Main_Page).

You can execute SPARQL queries on the Wikidata dataset in the browser via <https://query.wikidata.org/>.

Information about Yoda
- Wiki page: <https://www.wikidata.org/wiki/Q51730>
- Resource: <http://www.wikidata.org/entity/Q51730>

Tip: the following query selects all predicates and corresponding objects that are directly related to Yoda.

```sparql
PREFIX wd: <http://www.wikidata.org/entity/>

select * where {
 wd:Q51730 ?p ?o.
}
```

