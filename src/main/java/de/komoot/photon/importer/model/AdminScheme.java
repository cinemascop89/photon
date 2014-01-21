package de.komoot.photon.importer.model;

/**
 * model to store a nation's admin levels for city and country
 *
 * @author christoph
 */
public class AdminScheme {
    final public int country;
    final public int state;
    final public int city;

    public AdminScheme(int country, int state, int city) {
        this.country = country;
        this.state = state; // Also district, province, department
        this.city = city;
    }
}
