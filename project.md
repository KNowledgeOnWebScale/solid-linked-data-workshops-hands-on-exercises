# Project

This is a small project to combine all the different things you have learned in the previous exercises.
You will publish meal recipes in RDF, mark your favourite recipes, and query the recipes of others. 

## Tasks
1. Publish an RDF file online stating your name, IRI, and that you attended these workshops.
2. Represent the recipes in RDF. See below for more information about the used data.
   Things that might be helpful: Turtle, JSON-LD, RML.io.
3. Add some of your favourite recipes to your RDF file of step 1.
4. Create a SHACL shape for the data in step 2 and compare it with the other participants.
5. Make the RDF publicly available through http(s). 
   Things that might be helpful: Community Solid Server, CORS, GitHub pages.
6. Query for your favourite recipes and their ingredients. 
   Things that might be helpful: SPARQL, Comunica.
7. Query for matching ingredients in your and the other participant's favourite recipes.
   Things that might be helpful: SPARQL, Comunica.

## Data

We use the [TheMealDB](https://www.themealdb.com/): an open, crowd-sourced database of recipes from around the world.
It has a [JSON API](https://www.themealdb.com/api.php).

You only need to publish the data of the meals that start with the first letter of your name and the last letter of your name.
For example, if your name is "Luke Skywalker" then you will use the recipes starting with "l" and "r".
The API has an API method for that: <www.themealdb.com/api/json/v1/1/search.php?f=[letter]> where `[letter]`
is the letter that meals have to start with.
For example, for Luke Skywalker we have <<www.themealdb.com/api/json/v1/1/search.php?f=l> and
<<www.themealdb.com/api/json/v1/1/search.php?f=r>.