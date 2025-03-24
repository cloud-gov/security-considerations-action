import {expect, test} from "@jest/globals";
import {checkSecurityConsiderations} from "../src/checks";

test("Successfully sets security considerations", async () => {
  const input = `
  # Hello World

  ## Security Considerations
  - Hello
  - World
  `;
  const checked = checkSecurityConsiderations(input);
  await expect(checked).toBeTruthy();
});

test("Successfully sets security considerations with one # heading", async () => {
  const input = `
  # Hello World

  # Security Considerations
  - Hello
  - World
  `;
  const checked = checkSecurityConsiderations(input);
  await expect(checked).toBeTruthy();
});

test("Fails without security considerations heading", async () => {
  const input = `
  # Hello World

  ## No Considerations
  None given
  `;
  const checked = checkSecurityConsiderations(input);
  await expect(checked).toBeFalsy();
});

test("Fails without security considerations description", async () => {
  const input = `
  # Hello World

  ## Security Considerations
  `;
  const checked = checkSecurityConsiderations(input);
  await expect(checked).toBeFalsy();
});

test("Fails when template note for security considerations not changed", async () => {
  const input = `
  # Hello World

  ## Security Considerations
  [Note the any security considerations here, or make note of why there are none]
  `;
  const checked = checkSecurityConsiderations(input);
  await expect(checked).toBeFalsy();
});
