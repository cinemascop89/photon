package de.komoot.photon.importer.model;

/**
 * enumeration that represents NominatimEntry's type {@link NominatimEntry#getType()}
 *
 * @author christoph
 */
public enum ENTRY_TYPE {
	CITY,
        STATE,
	STREET,
	COUNTRY;

	@Override
	public String toString() {
		return name();
	}
}
