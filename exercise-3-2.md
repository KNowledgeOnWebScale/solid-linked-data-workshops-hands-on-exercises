# Exercise 3.1

Create YARRRML rules to convert the person and organization data below into RDF.
Do not forget to link the people to their organizations through your rules.

Tip: test your YARRRML rules via [Matey](https://rml.io/yarrrml/matey/).

## Person data

```csv
id,firstname,lastname,name,nickname,org-id
0,Gwendolyne,Stacy,,Gwen,new-u
1,,,T'Challa,Black Panther,avngrs
2,Wanda,Maximoff,,Scarlet Witch,avngrs
3,Rita,Clarkson,,,new-u
```

## Organization data

```json
[
  {
    "id": "new-u",
    "name": "New U Technologies"
  },
  {
    "id": "avngrs",
    "name": "Avengers"
  }
]
```

