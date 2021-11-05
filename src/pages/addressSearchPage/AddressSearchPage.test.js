import { render, screen } from '@testing-library/react';
import AddressSearchPage from './AddressSearchPage';
import getPostalCode from "../../functions/getPostalCode";
import verifyPostalCode from "../../functions/verifyPostalCode";

const postalCode = 10274;
const invalidPostalCode = 110120;
const address = {
  "address_components": [
    {
      "long_name": "Cherry Street",
      "short_name": "Cherry St",
      "types": [
        "route"
      ]
    },
    {
      "long_name": "Manhattan",
      "short_name": "Manhattan",
      "types": [
        "sublocality_level_1",
        "sublocality",
        "political"
      ]
    },
    {
      "long_name": "New York",
      "short_name": "New York",
      "types": [
        "locality",
        "political"
      ]
    },
    {
      "long_name": "New York County",
      "short_name": "New York County",
      "types": [
        "administrative_area_level_2",
        "political"
      ]
    },
    {
      "long_name": "New York",
      "short_name": "NY",
      "types": [
        "administrative_area_level_1",
        "political"
      ]
    },
    {
      "long_name": "Estados Unidos",
      "short_name": "US",
      "types": [
        "country",
        "political"
      ]
    },
    {
      "long_name": "10002",
      "short_name": "10002",
      "types": [
        "postal_code"
      ]
    }
  ],
  "formatted_address": "Cherry St, New York, NY 10002, EE. UU.",
  "geometry": {
    "location": {
      "lat": 40.7115488,
      "lng": -73.9865557
    }
  },
  "place_id": "EiJDaGVycnkgU3QsIE5ldyBZb3JrLCBOWSAxMDAwMiwgVVNBIi4qLAoUChIJbQz1iitawokRQ810vZLePDYSFAoSCTsIP9OlT8KJEWL-d-EGjwvI",
  "html_attributions": []
};

test('renders Where are you located?', () => {
  render(<AddressSearchPage />);
  const linkElement = screen.getByText(/Where are you located?/i);
  expect(linkElement).toBeInTheDocument();
});

describe('Get postal code from google places object', () => {
  it('Get valid postal code', () => {
    const postalCode = getPostalCode(address);
    expect(postalCode).toBe(10002);
  })
})

describe('Verify postal code', () => {
  it('Get valid postal code', () => {
    const validCode = verifyPostalCode(postalCode);
    expect(validCode).toBeTruthy();
  })
  it('Get invalid postal code', () => {
    const invalidCode = verifyPostalCode(invalidPostalCode);
    expect(invalidCode).toBeFalsy();
  })
})