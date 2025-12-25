# Datasets Description

This directory contains datasets used by the Canada Trade Intelligence Assistant (CTIA).

## Datasets Overview

### 1. `tfo_exporters_full.csv`

**Description:** A comprehensive list of exporters from the Trade Facilitation Office (TFO) Canada database.

**Structure:**
- **Format:** CSV (Comma-separated values)
- **Total Records:** 7,443 companies (excluding header)
- **Columns:**
  - `Company`: Name of the exporting company
  - `Country`: Target country for exports
  - `Industry`: Industry sector classification
  - `Details URL`: Link to the company's detailed profile on tfocanada.ca

**Use Case:** This dataset enables the CTIA to provide information about Canadian exporters, their target markets, and industry sectors. Useful for trade intelligence queries about specific companies, countries, or industries.

**Source:** Trade Facilitation Office (TFO) Canada - https://tfocanada.ca/

---

### 2. `trade_commissioners_index.json`

**Description:** An indexed database of Canadian Trade Commissioners organized by country, providing contact information for trade support services.

**Structure:**
- **Format:** JSON
- **Organization:** Indexed by country under `byCountry` key
- **Total Countries:** 229 countries
- **Total Entries:** 5,042 trade commissioner records

**Record Fields:**
- `name`: Trade Commissioner's name
- `office`: Embassy, Consulate, or Trade Office name
- `title`: Job title (e.g., Trade Commissioner, Senior Trade Commissioner, Trade Commissioner Assistant)
- `email`: Contact email address
- `country`: Country of responsibility
- `sector`: (Optional) Specific industry sector specialization (e.g., Aerospace, Agriculture, Automotive, Clean technologies, Defence, Education)

**Use Case:** This dataset allows the CTIA to help users find the appropriate Canadian Trade Commissioner contact for specific countries or industry sectors. Essential for connecting businesses with government trade support services.

**Source:** Global Affairs Canada - Trade Commissioner Service

---

## Usage Notes

- Both datasets are used by the CTIA to provide comprehensive trade intelligence and facilitate connections between Canadian businesses and international markets.
- The datasets are periodically updated to reflect current information.
- For questions about specific data points or updates, refer to the original sources listed above.

