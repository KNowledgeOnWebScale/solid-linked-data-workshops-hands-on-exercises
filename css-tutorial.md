This is a tutorial uses the [Community Solid Server (CSS)](https://github.com/solid/community-server)
to both provide an introduction to Solid server behaviour,
and an introduction to the CSS itself.

## Index
- [Index](#index)
- [Requirements](#requirements)
- [Community Solid Server](#community-solid-server)
  * [Getting started](#getting-started)
  * [Example Solid HTTP requests](#example-solid-http-requests)
    + [GETting resources](#getting-resources)
    + [POSTing new resources](#posting-new-resources)
    + [PUTting new data](#putting-new-data)
    + [PATCHing resources](#patching-resources)
    + [DELETE a resource](#delete-a-resource)
  * [Using a different configuration](#using-a-different-configuration)
    + [File backend](#file-backend)
- [Web Access Control (WAC)](#web-access-control--wac-)
  * [Setup](#setup)
    + [WebID](#webid)
    + [Access Control List](#access-control-list)
    + [Access Control Policies](#access-control-policies)
- [Authentication and client applications](#authentication-and-client-applications)
  * [Authentication client](#authentication-client)
  * [Accessing a protected resource](#accessing-a-protected-resource)
  * [Authentication summary](#authentication-summary)
  * [Solid client applications](#solid-client-applications)
- [Editing Community server configurations](#editing-community-server-configurations)
  * [Components.js](#componentsjs)
  * [Customizing imports](#customizing-imports)
    + [Disabling authorization](#disabling-authorization)
  * [Rewriting configurations](#rewriting-configurations)

## Requirements

You will need the following to follow this tutorial:

* [git](https://git-scm.com/)
* [Node.js](https://nodejs.org/en/)
  * Preferably 16.x but at the time of writing 12.x and 14.x should also work.
* A text editor

It makes things easier to keep all the work contained in a specific folder.
For the rest of this tutorial we will always assume this is the current working directory unless otherwise noted.

## Community Solid Server
CSS is an open and modular implementation of the Solid [protocol](https://solidproject.org/TR/protocol).
It's easy to set up, and due to its modular nature many features can be configured,
some of which we will cover later.

More information on the server can be found in the [repository](https://github.com/solid/community-server).

### Getting started
While the server can be installed as a global application,
we will be working directly from the source in this tutorial.
This can be done by cloning the server from the git repository and installing it:

```shell
git clone git@github.com:solid/community-server.git
cd community-server
npm install
```

After that the server can be started by running the following command from the same folder:
```shell
npm start
```

This will start your own Solid server, which can be seen at http://localhost:3000/ .

### Example Solid HTTP requests
All interactions with the server happen through HTTP requests,
which each HTTP method having its own use.
Below are some common examples.
These can be run using `curl` on the command line,
or by manually constructing the queries in a HTTP client such as [Hoppscotch](https://hoppscotch.io/).

#### GETting resources
GET can be used to request resources:

```shell
curl http://localhost:3000/
```
```turtle
@prefix dc: <http://purl.org/dc/terms/>.
@prefix ldp: <http://www.w3.org/ns/ldp#>.
@prefix posix: <http://www.w3.org/ns/posix/stat#>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.

<> a <http://www.w3.org/ns/pim/space#Storage>, ldp:Container, ldp:BasicContainer, ldp:Resource;
    dc:modified "2022-01-11T12:00:06.000Z"^^xsd:dateTime;
    <http://www.w3.org/ns/auth/acl#accessControl> <.acl>.
```

Note that this is a turtle representation of the root container.
CSS supports content negotiation for many formats,
in case n-triples are preferred these can be requested by sending the corresponding Accept header for example.

```shell
curl -H "Accept: application/n-triples"  http://localhost:3000/
```
```
<http://localhost:3000/> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/ns/pim/space#Storage> .
<http://localhost:3000/> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/ns/ldp#Container> .
<http://localhost:3000/> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/ns/ldp#BasicContainer> .
<http://localhost:3000/> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/ns/ldp#Resource> .
<http://localhost:3000/> <http://purl.org/dc/terms/modified> "2022-01-11T12:00:06.000Z"^^<http://www.w3.org/2001/XMLSchema#dateTime> .
<http://localhost:3000/> <http://www.w3.org/ns/auth/acl#accessControl> <http://localhost:3000/.acl> .
```

And in case the HTML representation is needed as seen in the previous step,
an `text/html` Accept header can be sent along.

#### POSTing new resources
New resources can be created using POST requests.
We will use the `-v` flag to see the response headers
since the Location header returns the location of this new resource.

```shell
curl -v -X POST -H "Content-Type: text/plain" -d "abc" http://localhost:3000/
```

```
Location: http://localhost:3000/823df3de-5766-4d2a-97d7-2a79a7093c57
```

The Slug header can also be used to recommend a name for the server to use:

```shell
curl -v -X POST -H "Slug: custom" -H "Content-Type: text/plain" -d "abc" http://localhost:3000/
```
```
Location: http://localhost:3000/custom
```

This new resource can then be seen at http://localhost:3000/customName .
Note that the Slug header is a suggestion,
servers are not required to use it.

#### PUTting new data
PUT is used to write data to a specific location.
In case that location already exists the data there will be overwritten.
If not, a new resource will be created.

```shell
curl -X PUT -H "Content-Type: text/turtle" -d "<ex:s> <ex:p> <ex:o>." http://localhost:3000/a/b/c
```
Doing a GET to http://localhost:3000/a/b/c will show that the resource is created.
Note that this single request also created the intermediate containers 
http://localhost:3000/a/ and http://localhost:3000/a/b/ , which can also be accessed now.

As mentioned, we can also overwrite the data at a location
```shell
curl -X PUT -H "Content-Type: text/turtle" -d "<ex:s2> <ex:p2> <ex:o2>." http://localhost:3000/a/b/c
```
This command will completely replace the data found at http://localhost:3000/a/b/c .

#### PATCHing resources
PATCH can be used to update resources.
This is useful if you do not want to completely overwrite a resource with a PUT
and only want to make a smaller change.

Currently, the only supported PATCH format in CSS (and most Solid servers)
is [SPARQL UPDATE](https://www.w3.org/TR/sparql11-update/) which can only be used on RDF resources.
Fortunately we created an RDF resource in the previous step that we can now update.

```shell
curl -X PATCH -H "Content-Type: application/sparql-update" -d "INSERT DATA { <ex:s3> <ex:p3> <ex:o3> }" http://localhost:3000/a/b/c
```
The above command will append the triple `<ex:s3> <ex:p3> <ex:o3>.` to the RDF resource,
which can be verified by GETting http://localhost:3000/a/b/c .

#### DELETE a resource
Finally, DELETE can be used to remove resources.

```shell
curl -X DELETE http://localhost:3000/a/b/c
```

This will completely remove the resource from the server.
The parent containers will remain,
so http://localhost:3000/a/ and http://localhost:3000/a/b/ still exist.

### Using a different configuration
The server we have been using so far has been running with a memory backend,
which means all data will be lost when the server is stopped.
There are many ways to configure CSS and several default configurations are provided that can be used.
When starting the server with `npm start` the server will default to a memory-based configuration.

#### File backend
To have a more permanent storage solution, we will now start the server with a file backend.
First stop the server that is still running, 
then start it again with the following command from the source folder:
```shell
npm start -- -c config/file.json -f ../.data
```
The above command will start the server with the `file.json` config,
one of the available [default configurations](https://github.com/solid/community-server/tree/main/config),
which starts the server with a file backend.
The `-f ../.data` parameter tells the server we want all data to be stored in that folder. 

## Web Access Control (WAC)
In the previous HTTP examples no authentication was required to modify any of the resources,
but in practice you probably want to control who is allowed to read and modify data.
CSS (and most other Solid servers) make use of 
[Web Access Control (WAC)](https://solid.github.io/web-access-control-spec/)
to restrict access to resources.

First we will set up the server after which we will cover the basics of this authentication scheme.

### Setup
With the newly configured server,
if you browse to http://localhost:3000/ you will now see a setup screen.
This setup allows you already set some initial permissions on the server.

For this tutorial we will choose the `Sign up for an account` option.
Choose the options to create a new WebID in the root,
more on what this means later.
Make sure you don't forget the email/password combination that you choose.
The response page will show some extra information about the setup result.

#### WebID
In the previous step the server created several resources for you,
including a profile document with a WebID.
A [WebID](https://dvcs.w3.org/hg/WebID/raw-file/tip/spec/identity-respec.html)
is a way to identify yourself on the Web.
We will make use of this a bit later in this tutorial.
After setup, you can find your profile resource at http://localhost:3000/profile/card ,
with your WebID being http://localhost:3000/profile/card#me .

In case that you want multiple users to have their WebID on your server,
you could have chosen to create your WebID in a specific namespace during setup.

#### Access Control List
Your WebID needs to be publicly accessible, so you can be identified,
but your other resources can have restricted access.
For example, when trying to access the profile container http://localhost:3000/profile/
you will receive a `403: Not Logged In` error.

We will cover how to correctly authenticate in the next chapter,
but we can already have a look now why this is the case.
Since the server is now running in file mode,
we can cheat and have a look at the files on disk to see what exactly is causing this.

WAC makes use of Access Control List (ACL) resources to determine what is allowed.
In general, these resources have an `.acl` extension.
The ACL resource that determines access to the root container would be `http://localhost:3000/.acl`.
This means that we can find our root ACL resource by looking for the `.data/.acl` file.
This file has the following contents:

```turtle
# Root ACL resource for the agent account
@prefix acl: <http://www.w3.org/ns/auth/acl#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.

# The homepage is readable by the public
<#public>
    a acl:Authorization;
    acl:agentClass foaf:Agent;
    acl:accessTo <./>;
    acl:mode acl:Read.

# The owner has full access to every resource in their pod.
# Other agents have no access rights,
# unless specifically authorized in other .acl resources.
<#owner>
    a acl:Authorization;
    acl:agent <http://localhost:3000/profile/card#me>;
    # Optional owner email, to be used for account recovery:
    acl:agent <mailto:test@example.com>;
    # Set the access to the root storage folder itself
    acl:accessTo <./>;
    # All resources will inherit this authorization, by default
    acl:default <./>;
    # The owner has all of the access modes allowed
    acl:mode
        acl:Read, acl:Write, acl:Control.
```

A full explanation of all triples can be found in the WAC specification.
The first block makes it so the root container (`acl:accessTo <./>`) 
is readable (`acl:mode acl:Read`) 
by all agents (`acl:agentClass foaf:Agent`).

The second block defines that the user identified as 
our WebID (`acl:agent <http://localhost:3000/profile/card#me>`)
has full access (`acl:mode acl:Read, acl:Write, acl:Control`)
to both the root container (`acl:accessTo <./>`)
and all its recursively contained resources (`acl:default <./>`).

This explains why we could not access the profile container:
we did not identify ourselves as our WebID.

You might wonder why we could read the profile resource
even though the above ACL resource prevents all access recursively.
The reason for this is that WAC tries to find the ACL resource
closest to the resource that is being accessed.
When trying to access http://localhost:3000/profile/card,
the server will first try to find the ACL resource http://localhost:3000/profile/card.acl.
Only if that one is not found will it try look for ACL resources in the parent containers:
http://localhost:3000/profile/.acl and eventually http://localhost:3000/.acl.
If you look again at the files, you will note that there is a `.data/profile/card.acl` file,
which allows full read access to the resource,
thereby making the profile fully readable for everyone.

#### Access Control Policies
While this is not covered in this tutorial,
it should already being noted that research is being done
into having a new authentication mechanism for Solid servers called
[Access Control Policies (ACP)](https://github.com/solid/authorization-panel/blob/main/proposals/acp/index.md).
This is not supported yet in CSS but is planned as a future alternative.

## Authentication and client applications
As could be seen in the previous section,
it is important to authenticate with a specific WebID to access protected resources.
Solid makes use of OpenID and OAuth to support this.
All information related to this can be found in the
[Solid-OIDC specification](https://solid.github.io/solid-oidc/).

First we will show an example of how authentication works,
after we will provide an explanation of why exactly this works.

### Authentication client
The de facto solution for authenticating with a Solid server is the 
[solid-client-authn](https://github.com/inrupt/solid-client-authn-js) library.
Start by cloning and installing that library in the tutorial folder:
```shell
git clone git@github.com:inrupt/solid-client-authn-js.git
cd solid-client-authn-js
npm install
```

This library contains both implementations for authenticating using Node.js and JavaScript in the browser.
Besides that it also has several example client implementations.
We will use one of these as an example.
After installation is complete, use the following commands to install and start this client:
```shell
cd packages/browser/examples/demoClientApp
npm install
npm start
```
This should automatically open a new tab in your browser at http://localhost:3001/.

### Accessing a protected resource
In the authentication client, fill in the address of your running CSS instance (`http://localhost:3000/`)
in the `Identity Provider` field and press `Log In`.
This will redirect you to your CSS instance that will ask for your email and password combination.
After logging in there you will be redirected back to the authentication client
which will now show that you will be identified with your WebID.

You can now enter http://localhost:3000/profile/ in the field below that and press fetch
to access the resource that was previously restricted.

### Authentication summary
The Solid-OIDC specification contains all the details,
but below is a simplified summary of what happened during authentication above.

 1. The Solid authn client asks what your Identity Provider (IdP) is.
 2. The client redirects you to that IdP so you can identify yourself.
 3. The IdP provides proof of what your WebID is.
 4. The client adds this proof to its request when accessing a resource on the Solid server.
 5. The Solid server GETs the WebID to find which IdP it trusts.
 6. The Solid server asks the IdP if the provided proof is valid.
 7. The Solid server verifies if the provided WebID can access the requested resource. 
 8. The Solid server returns the resource.

You might be wondering what this IdP is that has been mentioned several times.
This is a server that conforms to the Solid-OIDC specification and can identify a WebID.
Fortunately the CSS, besides implementing the Solid protocol,
also fully implements the expected IdP behaviour,
so it is both a Solid server and an IdP.

Step 5 mentions that your WebID contains which IdP you trust.
You can see this by looking at your profile document http://localhost:3000/profile/card#me.
It will contain the triple `:me solid:oidcIssuer <http://localhost:3000/> .`.
This is the triple that identifies our CSS instance as a trusted IdP.

In this example the CSS instance contained the resource you were trying to access,
it contained your WebID, and it was your trusted IdP.
In practice these could all be different servers,
which could all be different CSS instances or all instances of different Solid implementations.

### Solid client applications
An important part of the Solid ecosystem is the independence of clients and servers:
it should have no impact on a client what Solid server implementation is used,
as long as it follows the specification.

We already saw an example of such an application in the previous section.
The authentication client did not care that we were running a CSS instance,
any kind of Solid server would work.

An example of a more generic Solid client is [Penny](https://gitlab.com/vincenttunru/penny),
of which you can find a running instance at https://penny.vincenttunru.com/.
Penny allows you to connect to your Solid server which you can then also use to access private data.
This is an example of a more complete application
that makes use of the authentication library in the background.

## Editing Community server configurations
At this point you can stop your CSS instance as we are going to have a look
at how to customize a CSS configuration.
Do not delete the `.data` folder yet though as we will reuse that data.
We already saw in a previous section that it is possible configure the server
to have a memory backend or a file backend, but many more options are available.

### Components.js
When we wanted CSS to store data on disk,
we told it to use the configuration
[config/file.json](https://github.com/solid/community-server/blob/main/config/file.json)
which you can find in the CSS source folder.
This is a [JSON-LD](https://json-ld.org/) file that mostly imports many other JSON-LD documents.
If you explored all the imports you would find out that these documents
link all classes together with their parameters.
This is done using [Components.js](https://github.com/LinkedSoftwareDependencies/Components.js),
a semantic dependency injection framework.
In this tutorial we will only cover a few basics of how CSS uses this framework,
more detailed information can be found in the Components.js
[documentation](http://componentsjs.readthedocs.io/).

### Customizing imports
The imports you see in the configuration file
all refer to files found in subfolders of the `config` folder.
These folders and files have been structured in a such a way
that every import line corresponds to a specific feature that can be changed.

For example, if you look the config that is used
when running the server with `npm start` (`config/default.json`)
you can see it has the following import:
```
"files-scs:config/storage/backend/memory.json"
```
On the other hand, `config/file.json` has the following import instead:
```
"files-scs:config/storage/backend/file.json"
```
Simply by changing that import in a configuration you can tell it what backend to use.
Every subfolder of `config` has a `README` document explaining what the available options are.
For example, if you have a look at
[config/storage/README.md](https://github.com/solid/community-server/tree/main/config/storage)
you can see that it is also possible to have a SPARQL backend by changing the import to use `sparql.json`.
At the time of writing there are 29 import lines, so those are 29 features that can easily be customized.

As for why these imports use the `files-scs` prefix we refer to the Components.js documentation
as this is based on the project settings.

#### Disabling authorization
As an example, we will create a new config that fully disables authorization.
This way we can read all our data without needing an authentication client.
This is not something you want to do in production,
but can be useful when running experiments during development.

To start, copy the `config/file.json` file to your root tutorial folder,
this is the same folder that should contain your `.data` folder,
and rename it to `unsafe.json`.
The import we want to change is the one that is responsible for authorization,
which is the `files-scs:config/ldp/authorization/webacl.json` import.
Looking at the documentation for the 
[ldp configuration options](https://github.com/solid/community-server/blob/main/config/ldp/README.md)
we can see that another option for authorization is `allow-all`,
so change that import line to be `files-scs:config/ldp/authorization/allow-all.json` instead.
Now start the server with the new server as follows:
```shell
cd community-server
npm start -- -c ../unsafe.json -f ../.data
```
This will start the server again on http://localhost:3000/ .
If you now browse to http://localhost:3000/profile/
you will be able to see the contents of that container,
while this was hidden when running our previous instance,
showing that authentication no longer checks requests.
Note also that all data is still there even though 
the server was stopped and restarted with a different configuration.

### Rewriting configurations
Sometimes more customization is needed than what changing the imports allow.
In those cases it will be necessary to create a configuration that is a combination
of specific imports and custom Components.js.
This requires more knowledge about the server and Components.js so we will not go deeper into this,
but an example is the
[config/sparql-file-storage.json](https://github.com/solid/community-server/blob/main/config/sparql-file-storage.json)
configuration, which uses a file backend for internal data such as accounts,
and a SPARQL backend for all standard Solid data.
This configuration is missing a few imports,
and instead replaced their functionality by the objects found in the body of that configuration.
