import * as core from "@actions/core";
import * as github from "@actions/github";
import {checkSecurityConsiderations} from "./checks";

async function run(): Promise<void> {
  try {
    const {context} = github;
    const isDraft = (context.payload.pull_request?.draft ?? false) === true;
    const isClosed =
      (context.payload.pull_request?.state ?? "open").toLowerCase() === "closed";
    const isDependabot = context.actor === "dependabot[bot]";

    if (isDependabot) {
      return;
    }

    if (isDraft) {
      skipCheck('PR is in "draft" status. Skipping check...');
      return;
    }

    if (isClosed) {
      skipCheck('PR is "closed". Skipping check...');
      return;
    }

    const body = context.payload.pull_request?.body ?? "";
    const prChecked = checkSecurityConsiderations(body);

    if (!prChecked) {
      return core.setFailed(
        "Security Considerations not properly documented in PR. Please update PR.",
      );
    }
  } catch (error) {
    if (error instanceof Error) { core.setFailed(error.message); }
  }
}

function skipCheck(message: string): void {
  core.info(message);
  core.setOutput("security-considerations-check", false);
}

run();
