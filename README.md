# photon

_Photon_ is an open source geocoder built for [OpenStreetMap](http://www.osm.org) data. It is based on [Apache Solr](http://lucene.apache.org/solr/) - an efficient and highly scalable search platform.

_Photon_ was developed by [komoot](http://www.komoot.de) and provides search-as-you-type and multilingual support. It's used in production with thousands of requests per minute at
 [www.komoot.de](http://www.komoot.de).

The project consistes of three parts:

1. Solr configuration
2. Converter that creates a solr xml file from a [Nominatim](http://wiki.openstreetmap.org/wiki/Nominatim) database (Java)
3. Testing environment for developing (Java)

## Feature overview
- performance (< 50ms per request)
- [highly scalable](http://lucene.apache.org/solr/features.html)
- OSM data import (via [Nominatim](https://github.com/twain47/Nominatim))
- search-as-you-type
- location bias

### Missing features
- spellchecker
- reverse geocoding
- continuous data updates

## How to use
### Import data
_Photon_ needs a dataset (addresses, streets, cities, ...). Solr provides numerous input formats, including xml. Currently you cannot convert an OpenStreetMap planet file to use it with _photon_. Instead you can use the _NominatorImporter_ included in this project to dump a nominatim database to a xml file. Refer to Nominatim's [Installation Guide](http://wiki.openstreetmap.org/wiki/Nominatim/Installation) how to setup and fill a postgis database. It takes up to 10 days and sufficient RAM to import the entire world, you might prefer taking a smaller region.

Once you have a nominatim database you can run the _NominatorImporter_ to create the solr index

```bash
mvn compile exec:java -Dexec.mainClass=de.komoot.photon.importer.NominatimImporter -Dexec.args="...args..."
```

command line arguments

 - ```-h``` postgis database host, e.g. _localhost_
 - ```-d``` database name, usually _Nominatim_
 - ```-u``` username of database user
 - ```-P``` password of database user
 - ```-p``` database port, optional default value is 5432
 - ```-f``` path of xml output file, e.g. _/Users/christoph/berlin.sorl.xml.gz_
 - ```-l``` languages to import, e.g. _de en es_

A complete example:

```bash
mvn compile exec:java -Dexec.mainClass=de.komoot.photon.importer.NominatimImporter -Dexec.args="-h localhost -d nominatim_island -u christoph -P christoph -f /Users/christoph/iceland.solr.xml.gz -l en de es" > /home/christoph/island_import.log
```

This will take some time (Europe ~ 12 hours). 

If you just want to check out _photon_ you can use our example dump of Iceland too: [src/main/solrindex/iceland.solr.xml.gz](src/main/solrindex/iceland.solr.xml.gz) (©&nbsp;[OpenStreetMap contributors](http://www.openstreetmap.org/copyright)). 

### Setup Solr
You need to install Apache Solr (tested with version 4.4). Using Mac OS X and homebrew you can type:

```bash
brew install solr
```

Start solr and pass the configuration directory that is part of the project [src/main/solrconfig/](src/main/solrconfig/)

```bash
solr /Users/christoph/komoot/solr4/src/main/solrconfig/
```

On other systems you might want to start solr that way:

```bash
java -Dsolr.solr.home=/Users/christoph/komoot/solr4/src/main/solrconfig/ -jar start.jar
```

Check Solr's admin interface on [http://localhost:8983/solr/](http://localhost:8983/solr/)

You can already query for places but no search results will be found as we have not imported any data yet. To do so we need to type:

```bash
curl "http://localhost:8983/solr/collection1/update?commit=true" -F stream.file=/Users/christoph/iceland.solr.xml
curl "http://localhost:8983/solr/collection1/update" -F stream.body=' <optimize />'
```

Don't forget to unzip the xml file first.

Now solr is up and running and filled with data. You can start searching for places:

[/select?q=reykjavik](http://localhost:8983/solr/collection1/select?q=reykjavik&wt=json&indent=true)

To find places in german you can select another _request handler_ defined in [solrconfig.xml](/src/main/solrconfig/collection1/conf/solrconfig.xml?source=c):

[/select?q=reykjavik&qt=german](http://localhost:8983/solr/collection1/select?q=reykjavik&wt=json&indent=true&qt=german)

You can add further languages of choice in [solrconfig.xml](/src/main/solrconfig/collection1/conf/solrconfig.xml?source=c).

If you want to take better account of results that are nearby a location (e.g. lat=50.0 lon=10.0), you can use a request handler with location bias:

[/select?q=reykjavik&qt=english_loc&pt=50.0,10.0](http://localhost:8983/solr/collection1/select?q=reykjavik&wt=json&indent=true&qt=english_loc&pt=50.0,10.0)


## Run the demo UI

The python demo UI is located in `src/main/python/demo`.

It has been developped with python3.3 (but should work with python2.x). We suggest to use virtualenv for the installation.

* Get the virtualenv system packages:
  ```
  sudo apt-get install python-pip python-virtualenv virtualenvwrapper
  ```
* Create a virtualenv:
 ```
 mkvirtualenv -p python3.3 photon
 ```
* Install dependencies:
 ```
 cd src/main/python/demo
 pip install -r requirements.txt
 ```
* Run the server
 ```
 make serve
 ```
* Go to http://localhost:5001/ and test it!

## How to contribute

Join us in improving _photon_ and feel free to contact us!

For developing we used a test-based approch, the test environment and testcases are located in [src/main/java/de/komoot/search/tests/](src/main/java/de/komoot/search/tests/). Every test consists of a xml file (test data) and csv file (test definition).

## Licence
_Photon_ software is open source and licensed under [Apache License, Version 2.0](http://opensource.org/licenses/Apache-2.0)
