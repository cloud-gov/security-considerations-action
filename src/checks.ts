const scRegex = new RegExp("#+ security considerations", "mi");

function checkHeading(body: string): boolean {
  const checked = scRegex.test(body);
  return checked;
}

function checkDescription(body: string): boolean {
  const executed = scRegex.exec(body);
  if (!executed) { return false; }

  const instance = executed[0];
  const { index, input } = executed;
  const inputLength = input.trim().length;
  const startOfDescription = index + instance.length;

  if (inputLength <= startOfDescription + 1) { return false; }

  return true;
}

function checkTemplateNote(body: string): boolean {
  const regex = new RegExp("Note the any security considerations", "mi");
  const checked = regex.test(body);
  return checked;
}

export function checkSecurityConsiderations(body: string): boolean {
  const hasHeading = checkHeading(body);
  const hasDescription = checkDescription(body);
  const hasTemplateNote = checkTemplateNote(body);

  if (hasHeading && hasDescription && !hasTemplateNote) { return true; }

  return false;
}
