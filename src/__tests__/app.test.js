const server = require("../app");
const request = require("supertest");
const testDids = require("./testDids.json");

test("responds with didResolutionResult", async () => {
  const did = "did:eosio:<TODO INSERT REAL TEST ACCOUNT>";
  const response = await request(server).get(`/1.0/identifiers/${did}`);
  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty("didDocument");
  expect(response.body).toHaveProperty("didDocumentMetadata");
  expect(response.body.didResolutionMetadata).toEqual({
    contentType: "application/did+ld+json",
  });
});

test("responds with 400 for corrupted/unknown did", async () => {
  const did = "<TODO INSERT CORRUPTED TEST DID>";
  const response = await request(server).get(`/1.0/identifiers/${did}`);
  expect(response.status).toBe(400);
});

function testDid(did, expectedResult) {
  return test(`test did: ${did}`, async () => {
    const response = await request(server).get(`/1.0/identifiers/${did}`);
    const { status, body } = response;
    expect(status).toBe(200);
    expect(body.didDocumentMetadata).toEqual(
      expectedResult.didDocumentMetadata
    );
    expect(body.didDocument).toEqual(expectedResult.didDocument);
    expect(body.didResolutionMetadata).toEqual(
      expectedResult.didResolutionMetadata
    );
  });
}

describe("responds with known didDocuments", () => {
  testDids.forEach(({ did, expectedResult }) => testDid(did, expectedResult));
});
