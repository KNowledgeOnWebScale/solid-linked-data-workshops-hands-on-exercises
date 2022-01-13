# Exercise 3.2

Create YARRRML rules to convert the person and organization data below into RDF.
Do not forget to link the people to their organizations through your rules.
Use the FOAF vocabulary for modeling, as you have done for exercise 1.1.

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

