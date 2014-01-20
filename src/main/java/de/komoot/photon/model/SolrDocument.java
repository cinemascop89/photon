package de.komoot.photon.model;

import org.apache.solr.client.solrj.beans.Field;

/** solr document */
public class SolrDocument {
	@Field
	public String coordinate;
	@Field
	public long id;
	@Field
	public String street;
	@Field
	public String housenumber;
	@Field
	public float score;
	@Field
	public String postcode;

	@Field
	public String name;
	@Field
	public String name_de;
	@Field
	public String name_en;
	@Field
	public String name_fr;
	@Field
	public String name_it;
	@Field
	public String name_es;
	@Field
	public String name_pt;
	@Field
	public String name_ja;
	@Field
	public String name_zh;

	@Field
	public String country;
	@Field
	public String country_de;
	@Field
	public String country_en;
	@Field
	public String country_fr;
	@Field
	public String country_it;
	@Field
	public String country_es;
    	@Field
	public String country_pt;
	@Field
	public String country_ja;
	@Field
	public String country_zh;


	@Field
	public String city;
	@Field
	public String city_de;
	@Field
	public String city_en;
	@Field
	public String city_fr;
	@Field
	public String city_it;
	@Field
	public String city_es;
	@Field
	public String city_pt;
	@Field
	public String city_ja;
	@Field
	public String city_zh;

	@Field
	public String places;
	@Field
	public String places_de;
	@Field
	public String places_en;
	@Field
	public String places_fr;
	@Field
	public String places_it;
	@Field
	public String places_es;
	@Field
	public String places_pt;
	@Field
	public String places_ja;
	@Field
	public String places_zh;

	@Field
	public String type;

	public String getCoordinate() {
		return coordinate;
	}

	public String getHousenumber() {
		return housenumber;
	}

	public String getPostcode() {
		return postcode;
	}

	public float getScore() {
		return score;
	}

	public String getStreet() {
		return street;
	}

	public DocumentFieldI18n getCity() {
            return new DocumentFieldI18n(city, city_de, city_en, city_fr, city_it, city_es, city_pt, city_ja, city_zh);
	}

	public DocumentFieldI18n getCountry() {
            return new DocumentFieldI18n(country, country_de, country_en, country_fr, country_it, country_es, country_pt, country_ja, country_zh);
	}

	public DocumentFieldI18n getName() {
            return new DocumentFieldI18n(name, name_de, name_en, name_fr, name_it, name_es, name_pt, name_ja, name_zh);
	}

	public DocumentFieldI18n getPlaces() {
            return new DocumentFieldI18n(places, places_de, places_en, places_fr, places_it, places_es, places_pt, places_ja, places_zh);
	}
}
