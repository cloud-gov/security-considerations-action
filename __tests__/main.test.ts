import { test } from 'node:test';
import assert from 'node:assert';
import { checkSecurityConsiderations } from "../src/checks";

test("Successfully sets security considerations", () => {
  const input = `
  # Hello World

  ## Security Considerations
  - Hello
  - World
  `;
  const checked = checkSecurityConsiderations(input);
  assert.equal(checked, true);
});

test("Successfully sets security considerations with one # heading", () => {
  const input = `
  # Hello World

  # Security Considerations
  - Hello
  - World
  `;
  const checked = checkSecurityConsiderations(input);
  assert.equal(checked, true);
});

test("Fails without security considerations heading", () => {
  const input = `
  # Hello World

  ## No Considerations
  None given
  `;
  const checked = checkSecurityConsiderations(input);
  assert.equal(checked, false);
});

test("Fails without security considerations description", () => {
  const input = `
  # Hello World

  ## Security Considerations
  `;
  const checked = checkSecurityConsiderations(input);
  assert.equal(checked, false);
});

test("Fails when template note for security considerations not changed", () => {
  const input = `
  # Hello World

  ## Security Considerations
  [Note the any security considerations here, or make note of why there are none]
  `;
  const checked = checkSecurityConsiderations(input);
  assert.equal(checked, false);
});
